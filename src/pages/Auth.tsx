
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, Apple, Facebook } from "lucide-react";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Authentication logic would go here once Supabase is connected
    console.log("Login attempt with:", email, password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      {/* App Branding Block */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-4 bg-brand-purple rounded-xl flex items-center justify-center">
          <span className="text-3xl font-bold text-white">R</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">RoomiFi</h1>
        <p className="text-muted-foreground mt-1">Smart Shared Living Assistant</p>
      </div>
      
      {/* Welcome Text Block */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-foreground">Welcome back!</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Sign in to manage your shared home effortlessly.
        </p>
      </div>
      
      {/* Login Form Block */}
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            
            <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-purple-dark">
              Login
            </Button>
          </form>
          
          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-sm text-brand-purple hover:underline">
              Forgot your password?
            </Link>
          </div>
          
          {/* Alternative Login Methods */}
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">OR</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <Button variant="outline" className="w-full">
              <svg 
                className="mr-2 h-4 w-4" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 48 48"
              >
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Continue with Google
            </Button>
            
            <Button variant="outline" className="w-full">
              <Facebook className="mr-2 h-4 w-4 text-blue-600" />
              Continue with Facebook
            </Button>
            
            <Button variant="outline" className="w-full">
              <Apple className="mr-2 h-4 w-4" />
              Continue with Apple
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Sign Up Prompt */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/register" className="text-brand-purple font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
      
      {/* Legal Footer */}
      <div className="mt-8 text-center text-xs text-muted-foreground">
        <p>
          By continuing, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-brand-purple">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline hover:text-brand-purple">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
