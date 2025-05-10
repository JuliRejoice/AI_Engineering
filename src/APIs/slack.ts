import { supabase } from "@/lib/supabase";
import { Job } from "@/types/job";

export async function sendSlackAlert(jobData: Job,type = 1): Promise<void> {
  const job_id = jobData.jobid ?? 'Unknown';
  const client_companyName = jobData.client_company ?? 'None';
  const client_city = jobData.client_location ?? 'Unknown';
  const client_pastHires = jobData.client_past_hires ?? 'Unknown';
  const client_totalSpend = jobData.client_total_spend ?? 'Unknown';
  const client_totalSpendCurrency = 'USD';
  const job_description = jobData.description ?? 'No description available';
  const job_proposal = jobData.proposal ?? 'No proposal available';
  const person_name = jobData.person_name ?? 'Unknown';

  const payload = {
    "channel": import.meta.env.VITE_SLACK_CHANNEL,
    "text": type === 1 ? `📜 *New Upwork Proposal Draft for Job ID: ${job_id}:*` : `Proposal Send by ${person_name}`,
    "attachments": type === 1 ? [
      {
        "text": `Job Title: ${jobData.title}`,
        "mrkdwn_in": ["text"]
      },
      {
        "text": `Job URL: ${jobData.job_url}`,
        "mrkdwn_in": ["text"]
      },
      {
        "text": `Client Details: \n*Company*: ${client_companyName} \n*Location*: ${client_city} \n*Past Hires*: ${client_pastHires} \n*Total Spend*: ${client_totalSpend} ${client_totalSpendCurrency}`,
        "mrkdwn_in": ["text"]
      },
      {
        "text": `*Job Description:* \n${job_description}`,
        "mrkdwn_in": ["text"]
      }
    ] : [
      {
        "text": `*Proposal:* \n${job_proposal}`,
        "mrkdwn_in": ["text"]
      }
    ]
  }

  const { data } = await supabase.functions.invoke('new-proposal-alert', {
    body: JSON.stringify(payload)
  })
  
  await supabase
    .from("jobs")
    .update({ lead_id: data.data.ts })
    .eq("id", jobData.id);

  return data;
}


export async function slackThreadResponse(jobData: any): Promise<any> {
  try {
    const person_name = jobData.person_name ?? 'Unknown';
    const job_description = jobData.proposal ?? 'No proposal text available';
    const threadTs = jobData.lead_id;

    if (threadTs) {
      const payload = {
        "channel": import.meta.env.VITE_SLACK_CHANNEL,
        "text": `Proposal Send by ${person_name}`,
        "thread_ts": String(threadTs),
        "attachments": [
          {
            "text": `*Proposal:* \n${job_description}`,
            "mrkdwn_in": ["text"]
          }
        ]
      }
      const { data } = await supabase.functions.invoke('replay-proposal-thread', {
        body: JSON.stringify(payload)
      })
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}