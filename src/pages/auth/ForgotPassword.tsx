
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        <p className="text-center text-muted-foreground">Enter your email to reset your password</p>
        <form className="space-y-4">
          <Input type="email" placeholder="Email" required />
          <Button type="submit" className="w-full">Send Reset Link</Button>
        </form>
        <div className="text-center text-sm">
          <Link to="/auth/login" className="text-primary hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
