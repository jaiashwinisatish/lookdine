import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { LoginCredentials } from "@/services/api";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data as LoginCredentials);
      toast({ title: "Welcome back!" });
      
      // Small delay to ensure state is updated
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Login Failed", description: error.message });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Split Container */}
      <div className="flex-grow flex flex-col md:flex-row">
        
        {/* Left Side: Image (Hidden on small screens) */}
        <div className="hidden md:block md:w-1/2 bg-muted overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692"
            alt="Authentication"
            className="h-full w-full object-cover grayscale brightness-50"
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">Login</h1>
              <p className="text-muted-foreground">Welcome back! Please sign in to your account</p>
              <p className="text-xs text-muted-foreground">
                Don't have an account? <Link to="/signup" className="underline font-medium text-primary">Sign up</Link>
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="Enter your registered email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link to="/forgot-password" title="Forgot Password" className="text-xs text-muted-foreground hover:underline">Forgot?</Link>
                    </div>
                    <FormControl><Input type="password" placeholder="Enter your password" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Authenticating..." : "Login"}
                </Button>
              </form>
            </Form>

            <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">OR</span>
                <Separator className="flex-1" />
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account? <Link to="/signup" className="underline font-medium text-primary">Sign up here</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Professional Footer */}
      <footer className="border-t py-6 px-4 md:px-8 bg-background">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/policy" className="hover:text-foreground">Policy</Link>
          </div>
          <p>© 2026 YourBrand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}