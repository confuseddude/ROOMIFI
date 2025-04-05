
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="text-8xl font-bold text-brand-purple mb-2">404</h1>
        <p className="text-2xl font-medium mb-6">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8 max-w-md">
          We couldn't find the page you were looking for. Maybe it was moved or deleted.
        </p>
        <Link to="/">
          <Button className="bg-brand-purple hover:bg-brand-purple-dark">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
