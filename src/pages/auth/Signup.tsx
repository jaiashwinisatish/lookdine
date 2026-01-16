import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, SignupData } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Check, User, Mail, Lock, Phone, MapPin, Calendar as CalendarIcon, Upload, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ExtendedSignupData extends SignupData {
  phone?: string;
  address?: string;
  confirmPassword?: string;
  dateOfBirth?: string;
  username?: string;
  avatar?: string;
  interests?: string[];
}

interface ValidationError {
  field: keyof ExtendedSignupData;
  message: string;
}

export default function Signup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [formData, setFormData] = useState<ExtendedSignupData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    username: "",
    avatar: "",
    interests: []
  });

  const interestsOptions = [
    "Dating", "Food", "Extrovert", "Travel", "Music", "Tech"
  ];

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
    
    // Cleanup function
    return () => {
      try {
        localStorage.removeItem('signup_form_data');
      } catch (error) {
        console.warn('Could not clear signup form data:', error);
      }
    };
  }, []);

  // Save form data to localStorage whenever it changes (but exclude large data like images)
  useEffect(() => {
    if (formData.name || formData.email || formData.password) {
      // Create a version without the avatar to avoid quota issues
      const dataToSave = {
        ...formData,
        avatar: undefined // Don't save base64 image to localStorage
      };
      try {
        localStorage.setItem('signup_form_data', JSON.stringify(dataToSave));
      } catch (error) {
        console.warn('Could not save form data to localStorage:', error);
        // Clear existing data if quota is exceeded
        try {
          localStorage.removeItem('signup_form_data');
        } catch (clearError) {
          console.warn('Could not clear localStorage:', clearError);
        }
      }
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
        if (!formData.username || formData.username.trim().length < 3) {
          newErrors.push({ field: 'username', message: 'Username must be at least 3 characters long' });
        }
        if (!formData.interests || formData.interests.length === 0) {
          newErrors.push({ field: 'interests', message: 'Please select at least one interest' });
        }
        break;
      case 4:
        if (!formData.password || formData.password.length < 8) {
          newErrors.push({ field: 'password', message: 'Password must be at least 8 characters long' });
        }
        if (!formData.confirmPassword || formData.password !== formData.confirmPassword) {
          newErrors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
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
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      
      const signupData: any = {
        name: formData.name!,
        email: formData.email!,
        password: formData.password!,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        username: formData.username,
        avatar: formData.avatar,
        interests: formData.interests
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
              <h3 className="text-lg font-semibold">Personal Basics</h3>
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
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfBirth ? format(new Date(formData.dateOfBirth), "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        handleInputChange('dateOfBirth')({ target: { value: date.toISOString().split('T')[0] } });
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {getFieldError('dateOfBirth') && (
                <p className="text-sm text-red-500">{getFieldError('dateOfBirth')}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Contact Details</h3>
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
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Account Identity</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleInputChange('username')}
                className={getFieldError('username') ? 'border-red-500' : ''}
              />
              {getFieldError('username') && (
                <p className="text-sm text-red-500">{getFieldError('username')}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Avatar (Optional)</Label>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback>
                    {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Check file size (max 2MB)
                        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
                        if (file.size > MAX_FILE_SIZE) {
                          toast({
                            title: "File Too Large",
                            description: "Please select an image smaller than 2MB",
                            variant: "destructive"
                          });
                          return;
                        }
                        
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleInputChange('avatar')({ target: { value: reader.result as string } });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Interests</Label>
              <div className="flex flex-wrap gap-2">
                {interestsOptions.map((interest) => (
                  <Badge
                    key={interest}
                    variant={formData.interests?.includes(interest) ? "default" : "outline"}
                    className={getFieldError('interests') ? "border-red-500 cursor-pointer" : "cursor-pointer"}
                    onClick={() => {
                      const currentInterests = formData.interests || [];
                      const newInterests = currentInterests.includes(interest)
                        ? currentInterests.filter(i => i !== interest)
                        : [...currentInterests, interest];
                      handleInputChange('interests')({ target: { value: newInterests } });
                    }}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
              {getFieldError('interests') && (
                <p className="text-sm text-red-500">{getFieldError('interests')}</p>
              )}
            </div>
          </div>
        );

      case 4:
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

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Step {step} of {totalSteps}: {step === 1 ? 'Personal Basics' : step === 2 ? 'Contact Details' : step === 3 ? 'Account Identity' : 'Security'}
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
    </div>
  );
}
