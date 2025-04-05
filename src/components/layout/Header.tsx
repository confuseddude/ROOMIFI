
import React from "react";
import { Bell, Menu, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {!isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
          )}
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Link to="/login">
            <Button variant="ghost" size="icon">
              <LogIn className="h-5 w-5" />
              <span className="sr-only">Login</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
