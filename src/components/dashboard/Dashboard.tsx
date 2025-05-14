import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { codeReview, fileReview, getProfileData } from "@/APIs/profile";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ⬅️ Import this

export function Dashboard() {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [employees, setEmployees] = useState<any[]>([]);
  const navigate = useNavigate(); // ⬅️ Initialize navigate

  useEffect(() => {
    const fetchEmployee = async () => {
      const allEmployees = await combineReviewData();
      setEmployees(allEmployees);
    };
    fetchEmployee();
  }, []);

  const openEmployeePage = (user: any) => {
    navigate("/employee", { state: user }); // ⬅️ Navigate and pass user
  };

  return (
    <div className="space-y-6">
      <div className="md:mt-0 mt-12">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          {new Intl.NumberFormat("en-US").format(totalCount)} jobs match your criteria
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {employees?.map((user: any) => (
          <Card
            key={user.github_username}
            className="relative cursor-pointer"
            onClick={() => openEmployeePage(user)}
          >
            <CardContent className="p-4 w-[250px]">
              {user.github_profile_url ? (
                <img
                  src="/logo.svg"
                  alt={`${user.github_username}'s avatar`}
                  className="w-[250px] h-auto aspect-square object-cover"
                />
              ) : (
                <User className="w-[250px] h-[250px]" />
              )}
            </CardContent>
            <CardFooter className="absolute bottom-0 w-full bg-[#3A0519] text-white px-4 py-2">
              <div>
                <div className="font-semibold">{user.github_username}</div>
                <a
                  href={user.github_profile_url}
                  className="text-sm text-gray-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  {user.github_profile_url}
                </a>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}


// Combine review data as before
async function combineReviewData() {
  const users = await getProfileData();     
  const commits = await codeReview();   
  const files = await fileReview();         

  console.log(commits)
  console.log(files)
  function calculateAvgScore(files: any[]): number {
    if (!files.length) return 0;
    const total = files.reduce((sum, file) => sum + (file.review?.metrics?.final_score || 0), 0);
    return Math.round(total / files.length);
  }

  function summarize(files: any[]): string {
    const issues = files.filter(file => (file.review?.metrics?.final_score || 0) < 60);
    return issues.length > 0
      ? `Some files show quality issues. Further refinement is recommended.`
      : `The user's code quality appears stable and maintainable.`;
  }

  return users.map((user: any) => {
    const userCommits = commits.filter((commit: any) => commit.user_id === user.id);
    const userFiles = files.filter((file: any) =>
      userCommits.some((commit: any) => commit.id === file.code_review_id)
    );

    return {
      github_username: user.github_username || user.username,
      github_profile_url: user.github_profile_url || user.profile_url,
      commits: userCommits,
      files: userFiles,
      final_summary: {
        avg_score: calculateAvgScore(userFiles),
        paragraph: summarize(userFiles),
      },
    };
  });
}
