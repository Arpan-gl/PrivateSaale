"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducer';
import { RootState } from '../store/store';
import { isDemoMode, setDemoMode } from '../services/demoAuth';

const SignOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.isLogin.user);
  const isDemo = useSelector((state: RootState) => state.isLogin.isDemoMode);

  const handleSignOut = async () => {
    try {
      if (isDemoMode() || isDemo) {
        // Demo mode sign out
        dispatch(logout());
        setDemoMode(false);
        toast({
          title: "Success",
          description: "Signed out successfully (Demo Mode)",
          variant: "default",
        });
        setTimeout(() => navigate("/"), 1000);
      } else {
        // Real API sign out
        const response = await axios.get("/signOut");
        const data = response.data;
        
        if (data.success) {
          dispatch(logout());
          toast({
            title: "Success",
            description: data.message,
            variant: "default",
          });
          setTimeout(() => navigate("/"), 1000);
        } else {
          toast({
            title: "Error",
            description: data.message || "An error occurred",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error signing out:", error);
      // Even if API fails, clear local state
      dispatch(logout());
      setDemoMode(false);
      toast({
        title: "Success",
        description: "Signed out successfully (local session cleared)",
        variant: "default",
      });
      setTimeout(() => navigate("/"), 1000);
    }
  };

  return (
    <>
      <Header />
      <div className='w-full h-full flex flex-col justify- items-center p-4'>
        <Card className="w-[400px] shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <UserCircle className="h-20 w-20 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Account</CardTitle>
            <CardDescription className="text-center">
              You are currently signed in as:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-lg font-medium text-muted-foreground">
              {user?.email || user?.username || 'Unknown User'}
            </div>
            {user && (
              <div className="text-center text-sm text-muted-foreground">
                Role: {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                {isDemo && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Demo Mode
                  </span>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              className="w-full bg-red-600 hover:bg-red-700" 
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignOut;