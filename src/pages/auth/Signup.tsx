import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
<<<<<<< HEAD
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, SignupData } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Check, User, Mail, Lock, Phone, MapPin } from "lucide-react";

interface ExtendedSignupData extends SignupData {
  phone?: string;
  address?: string;
  confirmPassword?: string;
}

interface ValidationError {
  field: keyof ExtendedSignupData;
  message: string;
}
=======
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, SignupData } from "@/services/api";
import { toast } from "sonner";
>>>>>>> 6d5d7b28d0faeb8de253a4d87fcbe1b6bc9f08be

export default function Signup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [formData, setFormData] = useState<ExtendedSignupData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: ""
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  // Load saved form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('signup_form_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (formData.name || formData.email || formData.password) {
      localStorage.setItem('signup_form_data', JSON.stringify(formData));
    }
  }, [formData]);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: ValidationError[] = [];

    switch (currentStep) {
      case 1:
        if (!formData.name || formData.name.trim().length < 2) {
          newErrors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
        }
        break;
      case 2:
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.push({ field: 'email', message: 'Please enter a valid email address' });
        }
        if (!formData.phone || !/^\+?[\d\s-()]+$/.test(formData.phone)) {
          newErrors.push({ field: 'phone', message: 'Please enter a valid phone number' });
        }
        break;
      case 3:
        if (!formData.password || formData.password.length < 8) {
          newErrors.push({ field: 'password', message: 'Password must be at least 8 characters long' });
        }
        if (!formData.confirmPassword || formData.password !== formData.confirmPassword) {
          newErrors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
        }
        break;
      case 4:
        if (!formData.address || formData.address.trim().length < 5) {
          newErrors.push({ field: 'address', message: 'Please enter a valid address' });
        }
        break;
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleInputChange = (field: keyof ExtendedSignupData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors for this field when user starts typing
    setErrors(prev => prev.filter(error => error.field !== field));
=======
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
>>>>>>> 6d5d7b28d0faeb8de253a4d87fcbe1b6bc9f08be
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    
    if (!validateStep(step)) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before continuing",
        variant: "destructive"
      });
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      await handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      const signupData: SignupData = {
        name: formData.name!,
        email: formData.email!,
        password: formData.password!
      };

      const response = await signup(signupData);
      
      // Clear saved form data
      localStorage.removeItem('signup_form_data');
      
      toast({
        title: "Success",
        description: "Account created successfully!"
      });
      
      // Auto-login after successful signup
      if (response) {
        navigate("/auth/login");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getFieldError = (field: keyof ExtendedSignupData) => {
    return errors.find(error => error.field === field)?.message;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange('name')}
                className={getFieldError('name') ? 'border-red-500' : ''}
              />
              {getFieldError('name') && (
                <p className="text-sm text-red-500">{getFieldError('name')}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Contact Information</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange('email')}
                className={getFieldError('email') ? 'border-red-500' : ''}
              />
              {getFieldError('email') && (
                <p className="text-sm text-red-500">{getFieldError('email')}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                className={getFieldError('phone') ? 'border-red-500' : ''}
              />
              {getFieldError('phone') && (
                <p className="text-sm text-red-500">{getFieldError('phone')}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Lock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Security</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange('password')}
                className={getFieldError('password') ? 'border-red-500' : ''}
              />
              {getFieldError('password') && (
                <p className="text-sm text-red-500">{getFieldError('password')}</p>
              )}
              <p className="text-xs text-gray-500">Must be at least 8 characters long</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                className={getFieldError('confirmPassword') ? 'border-red-500' : ''}
              />
              {getFieldError('confirmPassword') && (
                <p className="text-sm text-red-500">{getFieldError('confirmPassword')}</p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Location</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange('address')}
                className={getFieldError('address') ? 'border-red-500' : ''}
              />
              {getFieldError('address') && (
                <p className="text-sm text-red-500">{getFieldError('address')}</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
=======
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
>>>>>>> 6d5d7b28d0faeb8de253a4d87fcbe1b6bc9f08be
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Step {step} of {totalSteps}: {step === 1 ? 'Personal Info' : step === 2 ? 'Contact' : step === 3 ? 'Security' : 'Location'}
          </CardDescription>
          <Progress value={progress} className="w-full mt-2" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNext} className="space-y-6">
            {renderStepContent()}
            
            <div className="flex justify-between space-x-2">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={loading}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>
              )}
              
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 ml-auto"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating Account...</span>
                  </>
                ) : step === totalSteps ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Create Account</span>
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
          
          <div className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
=======
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
>>>>>>> 6d5d7b28d0faeb8de253a4d87fcbe1b6bc9f08be
    </div>
  );
}
