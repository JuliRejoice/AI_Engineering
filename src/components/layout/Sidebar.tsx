import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useNavigate, NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Settings, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export function Sidebar() {
  const { signOut, user, bdeProfile } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      title: "Projects",
      icon: FolderKanban,
      href: "/projects",
    },
    {
      title: "Employees",
      icon: Users,
      href: "/employees",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <aside className="w-64 border-r bg-card flex flex-col h-screen">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-base">Upwork Agent</h2>
            <p className="text-xs text-muted-foreground truncate">
              {bdeProfile?.name || user?.email || "User"}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink 
            key={item.href} 
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t mt-auto">
        <Button 
          variant="outline" 
          className="w-full justify-center text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => setShowLogoutConfirm(true)}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
  );
} 