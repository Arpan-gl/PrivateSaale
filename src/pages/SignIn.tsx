import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Mail, Lock, Eye, EyeOff, Play, User, Briefcase, Shield } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import {login} from '../store/reducer';
import { demoSignIn, DEMO_CREDENTIALS, isDemoMode, setDemoMode } from '../services/demoAuth';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoMode, setDemoModeState] = useState(isDemoMode());
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let response;
      
      if (demoMode) {
        // Use demo authentication
        console.log("Using demo authentication with data:", formData);
        response = await demoSignIn(formData.email, formData.password);
      } else {
        // Use real API
        console.log("Sending signIn request with data:", formData);
        const apiResponse = await axios.post("/signIn", formData);
        response = apiResponse.data;
      }
      
      console.log("SignIn response:", response);

      if (response.success) {
        // Store complete user object including role
        dispatch(login({ user: response.user, isDemoMode: demoMode }));
        toast({
          title: "Success",
          description: response.message || "Signed in successfully",
          variant: "default",
        });
        // Navigate after successful sign in
        setTimeout(() => {
          if(response.user.role === "admin"){
            navigate("/admin");
          }else{
            navigate("/");
          }
        }, 1000);
      } else {
        toast({
          title: "Error",
          description: response.message || "Sign in failed",
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      console.error("Error signing in:", error);
      
      // Handle specific error messages from the API
      let errorMessage = "An error occurred while signing in. Please try again.";
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string }, status?: number } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.response?.status === 400) {
          errorMessage = "Invalid email or password";
        } else if (axiosError.response?.status === 404) {
          errorMessage = "User not found";
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleDemoMode = () => {
    const newDemoMode = !demoMode;
    setDemoModeState(newDemoMode);
    setDemoMode(newDemoMode);
    
    if (newDemoMode) {
      toast({
        title: "Demo Mode Enabled",
        description: "You can now use demo credentials to test the application",
        variant: "default",
      });
    } else {
      toast({
        title: "Demo Mode Disabled",
        description: "Using real authentication",
        variant: "default",
      });
    }
  };

  const fillDemoCredentials = (type: 'user' | 'lawyer' | 'admin' | 'pendingLawyer') => {
    const credentials = DEMO_CREDENTIALS[type];
    setFormData({
      email: credentials.email,
      password: credentials.password
    });
  };

  return (
    <>
    <Header />
    <div className='w-full h-full flex flex-col justify- items-center p-4'>
      <Card className="w-[400px] shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <LogIn className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign in to your account
          </CardDescription>
          
          {/* Demo Mode Toggle */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              type="button"
              onClick={toggleDemoMode}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${
                demoMode 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              <Play className="h-4 w-4" />
              {demoMode ? 'Demo Mode ON' : 'Demo Mode OFF'}
            </button>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  className="pl-9"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-9 pr-9"
                  placeholder='Password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Demo Credentials */}
            {demoMode && (
              <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-800 text-center">
                  Demo Credentials (Click to fill)
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoCredentials('user')}
                    className="flex items-center gap-2 text-xs"
                  >
                    <User className="h-3 w-3" />
                    User
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoCredentials('lawyer')}
                    className="flex items-center gap-2 text-xs"
                  >
                    <Briefcase className="h-3 w-3" />
                    Lawyer
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoCredentials('admin')}
                    className="flex items-center gap-2 text-xs"
                  >
                    <Shield className="h-3 w-3" />
                    Admin
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoCredentials('pendingLawyer')}
                    className="flex items-center gap-2 text-xs"
                  >
                    <Briefcase className="h-3 w-3" />
                    Pending
                  </Button>
                </div>
                <div className="text-xs text-blue-600 text-center">
                  All demo passwords: <code className="bg-blue-100 px-1 rounded">demo123</code>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
    </>
  );
}

export default SignIn;