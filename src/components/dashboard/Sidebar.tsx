import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface UserCard {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

const userCards: UserCard[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Developer",
    imageUrl: "/logo.svg"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Designer",
    imageUrl: "/logo.svg"
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Product Manager",
    imageUrl: "/logo.svg"
  },
  {
    id: 4,
    name: "Mike Johnson",
    role: "Product Manager",
    imageUrl: "/logo.svg"
  }
];

export function Sidebar() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="sm:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[540px]">
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {userCards.map((user) => (
                <Card key={user.id} className="relative">
                  <CardContent className="p-4">
                    <img src={user.imageUrl} alt={`${user.name}'s logo`} className="w-full h-auto aspect-square object-cover" />
                  </CardContent>
                  <CardFooter className="absolute bottom-0 w-full bg-[#3A0519] text-white px-4 py-2">
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-gray-300">{user.role}</div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="hidden sm:block">
        <div className="grid grid-cols-1 gap-4">
          {userCards.map((user) => (
            <Card key={user.id} className="relative">
              <CardContent className="p-4">
                <img src={user.imageUrl} alt={`${user.name}'s logo`} className="w-full h-auto aspect-square object-cover" />
              </CardContent>
              <CardFooter className="absolute bottom-0 w-full bg-[#3A0519] text-white px-4 py-2">
                <div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-300">{user.role}</div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
} 