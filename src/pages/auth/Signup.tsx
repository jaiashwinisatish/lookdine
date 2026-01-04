import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, SignupData } from "@/services/api";
import { toast } from "sonner";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (field: keyof SignupData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        setLoading(true);
        await signup(formData);
        toast.success("Account created successfully!");
        navigate("/");
      } catch (error) {
        console.error("Signup failed:", error);
        toast.error("Failed to create account. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Sign Up - Step {step} of 3</h1>
        <form onSubmit={handleNext} className="space-y-4">
          {step === 1 && (
            <Input
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleInputChange('name')}
            />
          )}
          {step === 2 && (
            <Input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleInputChange('email')}
            />
          )}
          {step === 3 && (
            <Input
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleInputChange('password')}
            />
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating Account..." : (step === 3 ? "Create Account" : "Next")}
          </Button>
        </form>
        <div className="text-center text-sm">
          Already have an account? <Link to="/auth/login" className="text-primary hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}
