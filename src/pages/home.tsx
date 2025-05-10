import { Dashboard } from "@/components/dashboard/Dashboard";
import { HomeProvider } from "@/contexts/HomeProvider";

function Home() {
  return (
    <HomeProvider>
      <Dashboard />
    </HomeProvider>
  );
}

export default Home;
