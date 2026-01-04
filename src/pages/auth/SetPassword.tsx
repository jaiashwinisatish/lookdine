
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function SetPassword() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Set New Password</h1>
        <form onSubmit={(e) => { e.preventDefault(); navigate("/auth/login"); }} className="space-y-4">
          <Input type="password" placeholder="New Password" required />
          <Input type="password" placeholder="Confirm Password" required />
          <Button type="submit" className="w-full">Set Password</Button>
        </form>
      </div>
    </div>
  );
}
