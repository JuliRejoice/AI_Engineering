import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/components/auth/LoginPage";
import { AuthProvider } from "@/contexts/AuthProvider";
import { useAuth } from "@/lib/auth";
import routes from "tempo-routes";
import { Toaster } from "@/components/ui/toaster";
import { AppLayout } from "@/components/layout/AppLayout";

import Home from "@/pages/home";
import Actions from '@/pages/actions';
import Projects from '@/pages/projects';
import Employees from '@/pages/employees';
import Settings from '@/pages/settings';
import RepositoryDetail from "@/pages/RepositoryDetail";
import CommitDetail from "@/pages/CommitDetail";
import EmployeeDashboard from "@/pages/EmployeeDashboard";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <AppLayout>{children}</AppLayout>;
}

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/actions"
            element={
              <ProtectedRoute>
                <Actions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        {/* <Route path="/repository/:repoName" element={<RepositoryDetail />} />
        <Route path="/commit/:commitId" element={<CommitDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Toaster />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
