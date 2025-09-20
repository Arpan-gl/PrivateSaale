import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, User, Briefcase, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DemoInstructions: React.FC = () => {
  const demoCredentials = [
    {
      role: 'user',
      email: 'john@demo.com',
      password: 'demo123',
      description: 'Regular user account',
      icon: User,
      color: 'bg-blue-500'
    },
    {
      role: 'lawyer',
      email: 'sarah@demo.com',
      password: 'demo123',
      description: 'Verified lawyer account',
      icon: Briefcase,
      color: 'bg-green-500'
    },
    {
      role: 'admin',
      email: 'admin@demo.com',
      password: 'demo123',
      description: 'Admin account',
      icon: Shield,
      color: 'bg-purple-500'
    },
    {
      role: 'pending',
      email: 'pending@demo.com',
      password: 'demo123',
      description: 'Pending lawyer verification',
      icon: Briefcase,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Play className="h-8 w-8 text-blue-600" />
            <CardTitle className="text-3xl font-bold text-blue-800">
              Demo Mode Instructions
            </CardTitle>
          </div>
          <CardDescription className="text-lg text-blue-700">
            Test the application with pre-configured demo accounts
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Quick Start */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              Demo mode is automatically enabled for testing
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {demoCredentials.map((cred, index) => {
              const IconComponent = cred.icon;
              return (
                <Card key={index} className="border border-blue-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${cred.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 capitalize mb-1">
                      {cred.role} Account
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {cred.description}
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="bg-gray-100 p-2 rounded">
                        <strong>Email:</strong> {cred.email}
                      </div>
                      <div className="bg-gray-100 p-2 rounded">
                        <strong>Password:</strong> {cred.password}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* How to Use */}
          <div className="bg-white rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-blue-600" />
              How to Use Demo Mode
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong>Sign In:</strong> Go to the sign-in page and click the "Demo Mode ON" toggle
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong>Choose Account:</strong> Click any of the demo credential buttons to auto-fill the form
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong>Sign In:</strong> Click "Sign in" to log in with the demo account
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <strong>Explore:</strong> Test all features with the demo account - all data is simulated
                </div>
              </div>
            </div>
          </div>

          {/* Features Available */}
          <div className="bg-white rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Available Demo Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>User Registration & Authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Lawyer Application Process</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Admin Dashboard & Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Contract Analysis (Simulated)</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Legal Community Features</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Scheme Advisor (Simulated)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>AI Lawyer Chat (Simulated)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>All UI Components & Navigation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signIn">
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                <User className="h-4 w-4 mr-2" />
                Try Sign In
              </Button>
            </Link>
            <Link to="/signUp">
              <Button variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                <Briefcase className="h-4 w-4 mr-2" />
                Try Sign Up
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemoInstructions;
