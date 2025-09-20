// Demo authentication service for testing purposes
export interface DemoUser {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'lawyer' | 'admin';
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  lawyerProfile?: {
    isVerified: boolean;
    verificationStatus: 'pending' | 'approved' | 'rejected';
    applicationDate: string;
  };
}

// Predefined demo users for testing
export const DEMO_USERS: DemoUser[] = [
  {
    _id: 'demo-user-1',
    username: 'john_doe',
    email: 'john@demo.com',
    role: 'user',
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    _id: 'demo-lawyer-1',
    username: 'sarah_lawyer',
    email: 'sarah@demo.com',
    role: 'lawyer',
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    lawyerProfile: {
      isVerified: true,
      verificationStatus: 'approved',
      applicationDate: new Date().toISOString()
    }
  },
  {
    _id: 'demo-admin-1',
    username: 'admin_user',
    email: 'admin@demo.com',
    role: 'admin',
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    _id: 'demo-lawyer-pending',
    username: 'pending_lawyer',
    email: 'pending@demo.com',
    role: 'lawyer',
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    lawyerProfile: {
      isVerified: false,
      verificationStatus: 'pending',
      applicationDate: new Date().toISOString()
    }
  }
];

// Demo credentials for easy testing
export const DEMO_CREDENTIALS = {
  user: { email: 'john@demo.com', password: 'demo123' },
  lawyer: { email: 'sarah@demo.com', password: 'demo123' },
  admin: { email: 'admin@demo.com', password: 'demo123' },
  pendingLawyer: { email: 'pending@demo.com', password: 'demo123' }
};

// Demo authentication functions
export const demoSignIn = async (email: string, password: string): Promise<{ success: boolean; user?: DemoUser; message: string; token?: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Find user by email
  const user = DEMO_USERS.find(u => u.email === email);
  
  if (!user) {
    return {
      success: false,
      message: 'User not found'
    };
  }

  // Check password (in demo, all passwords are 'demo123')
  if (password !== 'demo123') {
    return {
      success: false,
      message: 'Invalid password'
    };
  }

  // Generate demo token
  const token = `demo-token-${user._id}-${Date.now()}`;

  return {
    success: true,
    user,
    message: 'Signed in successfully',
    token
  };
};

export const demoSignUp = async (userData: any): Promise<{ success: boolean; user?: DemoUser; message: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Check if user already exists
  const existingUser = DEMO_USERS.find(u => u.email === userData.email || u.username === userData.username);
  
  if (existingUser) {
    return {
      success: false,
      message: 'User already exists'
    };
  }

  // Create new demo user
  const newUser: DemoUser = {
    _id: `demo-${userData.userType}-${Date.now()}`,
    username: userData.username,
    email: userData.email,
    role: userData.userType,
    isActive: true,
    createdAt: new Date().toISOString(),
    lawyerProfile: userData.userType === 'lawyer' ? {
      isVerified: false,
      verificationStatus: 'pending',
      applicationDate: new Date().toISOString()
    } : undefined
  };

  // Add to demo users array (in real app, this would be saved to database)
  DEMO_USERS.push(newUser);

  return {
    success: true,
    user: newUser,
    message: userData.userType === 'lawyer' 
      ? 'Account created successfully! Your lawyer application has been submitted for review.'
      : 'Account created successfully!'
  };
};

// Check if demo mode is enabled
export const isDemoMode = (): boolean => {
  return localStorage.getItem('demoMode') === 'true' || 
         process.env.NODE_ENV === 'development' ||
         window.location.hostname === 'localhost';
};

// Enable/disable demo mode
export const setDemoMode = (enabled: boolean): void => {
  localStorage.setItem('demoMode', enabled.toString());
};
