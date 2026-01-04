
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Mock signup logic
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Sign Up - Step {step} of 3</h1>
        <form onSubmit={handleNext} className="space-y-4">
          {step === 1 && (
            <Input placeholder="Full Name" required />
          )}
          {step === 2 && (
            <Input type="email" placeholder="Email" required />
          )}
          {step === 3 && (
            <Input type="password" placeholder="Password" required />
          )}

          <Button type="submit" className="w-full">
            {step === 3 ? "Create Account" : "Next"}
          </Button>
        </form>
        <div className="text-center text-sm">
          Already have an account? <Link to="/auth/login" className="text-primary hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}
