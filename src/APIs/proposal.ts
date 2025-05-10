import axios from 'axios';

export const generateProposal = async (jobId: string) => {
  try {
    const response = await axios.post(
      "https://api-upwork-agent.rejoicehub.com/generate-proposal",
      { job_id: jobId },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
