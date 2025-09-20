// Demo data service to showcase all functionality
import { getRandomDelay } from '@/config/demo';

export interface DemoUser {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'lawyer' | 'admin';
}

export interface DemoContractAnalysis {
  success: boolean;
  analysis: string;
  extracted_text: string;
  contractId: string;
  contractInfo: {
    fileName: string;
    fileSize: number;
    analysisDate: string;
  };
}

export interface DemoLawyer {
  _id: string;
  name: string;
  email: string;
  expertise: string[];
  experience_years: number;
  rating: number;
  location: string;
  bio: string;
  profile_image?: string;
  isVerified: boolean;
}

export interface DemoIssue {
  _id: string;
  title: string;
  description: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  author: {
    _id: string;
    username: string;
    email: string;
  };
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  location?: {
    city: string;
    state: string;
    country: string;
  };
  tags: string[];
  upvotes: string[];
  downvotes: string[];
  views: number;
  isAnonymous: boolean;
  createdAt: string;
  responses: DemoResponse[];
}

export interface DemoResponse {
  _id: string;
  content: string;
  lawyerId: string;
  lawyer: DemoLawyer;
  createdAt: string;
  isAccepted: boolean;
}

export interface DemoScheme {
  name: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  category: string;
  applicationDeadline?: string;
}

// Demo user data
export const demoUser: DemoUser = {
  _id: 'demo-user-123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'user'
};

// Demo contract analysis data
export const demoContractAnalysis: DemoContractAnalysis = {
  success: true,
  analysis: `CONTRACT RISK ANALYSIS COMPLETE
==================================================
Total Clauses Analyzed: 15
High-Risk Clauses Found: 3

HIGH-RISK CLAUSES REQUIRING ATTENTION:

============================================================
CLAUSE ANALYSIS
============================================================
Section: Termination
Risk Level: HIGH (Score: 0.85)
Risk Elements Found: 2

RISK HIGHLIGHTS:
  • 'unlimited liability' - CRITICAL (0.95)
  • 'immediate termination' - HIGH (0.90)

CLAUSE TEXT (*** = Risk Element):
Either party may terminate this Agreement immediately without notice if the other party breaches any material term, and the breaching party shall be liable for ***unlimited liability*** for all damages arising from such breach. This Agreement may be ***immediate termination*** at any time by either party.

SUGGESTIONS:
Consider adding a notice period and limiting liability to actual damages. Include specific breach definitions and cure periods.

============================================================
CLAUSE ANALYSIS
============================================================
Section: Payment
Risk Level: HIGH (Score: 0.75)
Risk Elements Found: 1

RISK HIGHLIGHTS:
  • 'penalty' - HIGH (0.75)

CLAUSE TEXT (*** = Risk Element):
Payment shall be due within 15 days of invoice receipt. Late payments shall incur a ***penalty*** of 5% per month.

SUGGESTIONS:
Consider reducing the penalty rate and adding a grace period. Clarify what constitutes "late payment" and include dispute resolution.

============================================================
CLAUSE ANALYSIS
============================================================
Section: Confidentiality
Risk Level: MEDIUM (Score: 0.60)
Risk Elements Found: 1

RISK HIGHLIGHTS:
  • 'confidential' - MEDIUM (0.50)

CLAUSE TEXT (*** = Risk Element):
All information shared between parties shall be considered ***confidential*** and may not be disclosed to third parties.

SUGGESTIONS:
Define what constitutes confidential information more specifically. Include exceptions for legal requirements and add return obligations.`,
  extracted_text: "This is a sample contract for demonstration purposes. The contract contains various clauses related to termination, payment, confidentiality, and other standard business terms.",
  contractId: 'demo-contract-123',
  contractInfo: {
    fileName: 'sample-contract.pdf',
    fileSize: 245760,
    analysisDate: new Date().toISOString()
  }
};

// Demo lawyers data
export const demoLawyers: DemoLawyer[] = [
  {
    _id: 'lawyer-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@lawfirm.com',
    expertise: ['Corporate Law', 'Contract Law', 'M&A'],
    experience_years: 12,
    rating: 4.8,
    location: 'New York, NY',
    bio: 'Experienced corporate attorney specializing in complex business transactions and contract negotiations.',
    isVerified: true
  },
  {
    _id: 'lawyer-2',
    name: 'Michael Chen',
    email: 'michael.chen@legal.com',
    expertise: ['Intellectual Property', 'Technology Law', 'Startups'],
    experience_years: 8,
    rating: 4.6,
    location: 'San Francisco, CA',
    bio: 'Tech-savvy lawyer helping startups and established companies with IP protection and technology agreements.',
    isVerified: true
  },
  {
    _id: 'lawyer-3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@lawgroup.com',
    expertise: ['Employment Law', 'Labor Relations', 'HR Compliance'],
    experience_years: 10,
    rating: 4.7,
    location: 'Chicago, IL',
    bio: 'Employment law specialist with extensive experience in workplace disputes and compliance matters.',
    isVerified: true
  }
];

// Demo issues data
export const demoIssues: DemoIssue[] = [
  {
    _id: 'issue-1',
    title: 'Employment Contract Dispute',
    description: 'I have an issue with my employment contract. The company is trying to enforce a non-compete clause that seems overly restrictive and may not be legally enforceable in my state. The clause prevents me from working in the same industry for 2 years within a 50-mile radius.',
    category: 'Employment Law',
    urgency: 'high',
    status: 'open',
    author: {
      _id: demoUser._id,
      username: demoUser.name,
      email: demoUser.email
    },
    budget: {
      min: 1000,
      max: 5000,
      currency: 'USD'
    },
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA'
    },
    tags: ['employment', 'contract', 'non-compete'],
    upvotes: ['user1', 'user2'],
    downvotes: [],
    views: 45,
    isAnonymous: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    responses: []
  },
  {
    _id: 'issue-2',
    title: 'Intellectual Property Protection',
    description: 'I need help protecting my software invention. What are the best strategies for patent protection and trade secret management? I have developed a unique algorithm that could be valuable.',
    category: 'Intellectual Property',
    urgency: 'medium',
    status: 'in_progress',
    author: {
      _id: demoUser._id,
      username: demoUser.name,
      email: demoUser.email
    },
    budget: {
      min: 2000,
      max: 10000,
      currency: 'USD'
    },
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA'
    },
    tags: ['patent', 'software', 'intellectual-property'],
    upvotes: ['user3', 'user4', 'user5'],
    downvotes: [],
    views: 78,
    isAnonymous: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    responses: [
      {
        _id: 'response-1',
        content: 'Based on your description, I recommend filing a provisional patent application immediately to establish priority. We should also discuss trade secret protection strategies for your source code.',
        lawyerId: 'lawyer-2',
        lawyer: demoLawyers[1],
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        isAccepted: false
      }
    ]
  },
  {
    _id: 'issue-3',
    title: 'Property Boundary Dispute with Neighbor',
    description: 'My neighbor has built a fence that encroaches on my property by about 3 feet. I have the original survey documents showing the correct boundary. How should I proceed legally?',
    category: 'Property Law',
    urgency: 'medium',
    status: 'open',
    author: {
      _id: demoUser._id,
      username: demoUser.name,
      email: demoUser.email
    },
    budget: {
      min: 500,
      max: 3000,
      currency: 'USD'
    },
    location: {
      city: 'Austin',
      state: 'TX',
      country: 'USA'
    },
    tags: ['property', 'boundary', 'dispute'],
    upvotes: ['user6'],
    downvotes: [],
    views: 32,
    isAnonymous: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    responses: []
  },
  {
    _id: 'issue-4',
    title: 'Divorce and Child Custody Arrangements',
    description: 'I am going through a divorce and need help with child custody arrangements. My spouse and I cannot agree on visitation rights and child support. We have two children aged 8 and 12.',
    category: 'Family Law',
    urgency: 'high',
    status: 'in_progress',
    author: {
      _id: 'anonymous',
      username: 'Anonymous',
      email: 'anonymous@example.com'
    },
    budget: {
      min: 3000,
      max: 15000,
      currency: 'USD'
    },
    location: {
      city: 'Chicago',
      state: 'IL',
      country: 'USA'
    },
    tags: ['divorce', 'custody', 'family'],
    upvotes: ['user7', 'user8'],
    downvotes: [],
    views: 89,
    isAnonymous: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    responses: [
      {
        _id: 'response-2',
        content: 'Child custody cases require careful consideration of the children\'s best interests. I recommend mediation first, but if that fails, we can file for court intervention. The children\'s ages and preferences will be important factors.',
        lawyerId: 'lawyer-1',
        lawyer: demoLawyers[0],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        isAccepted: false
      }
    ]
  },
  {
    _id: 'issue-5',
    title: 'Startup Equity Distribution',
    description: 'I am a co-founder of a tech startup and we need to establish proper equity distribution among the founding team. We have 4 co-founders and are about to raise our first round of funding.',
    category: 'Corporate Law',
    urgency: 'medium',
    status: 'open',
    author: {
      _id: demoUser._id,
      username: demoUser.name,
      email: demoUser.email
    },
    budget: {
      min: 1000,
      max: 8000,
      currency: 'USD'
    },
    location: {
      city: 'Seattle',
      state: 'WA',
      country: 'USA'
    },
    tags: ['startup', 'equity', 'corporate'],
    upvotes: ['user9', 'user10', 'user11'],
    downvotes: [],
    views: 56,
    isAnonymous: false,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    responses: []
  },
  {
    _id: 'issue-6',
    title: 'Criminal Defense - DUI Case',
    description: 'I was arrested for DUI last weekend. This is my first offense and I am very concerned about the potential consequences. I need immediate legal assistance.',
    category: 'Criminal Law',
    urgency: 'high',
    status: 'open',
    author: {
      _id: 'anonymous',
      username: 'Anonymous',
      email: 'anonymous@example.com'
    },
    budget: {
      min: 2000,
      max: 12000,
      currency: 'USD'
    },
    location: {
      city: 'Miami',
      state: 'FL',
      country: 'USA'
    },
    tags: ['criminal', 'dui', 'defense'],
    upvotes: [],
    downvotes: [],
    views: 23,
    isAnonymous: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    responses: []
  },
  {
    _id: 'issue-7',
    title: 'Contract Breach - Service Provider',
    description: 'I hired a contractor to renovate my kitchen, but they did not complete the work as specified in our contract and are demanding additional payment. The work is substandard and I want to recover my deposit.',
    category: 'Civil Law',
    urgency: 'medium',
    status: 'resolved',
    author: {
      _id: demoUser._id,
      username: demoUser.name,
      email: demoUser.email
    },
    budget: {
      min: 500,
      max: 5000,
      currency: 'USD'
    },
    location: {
      city: 'Denver',
      state: 'CO',
      country: 'USA'
    },
    tags: ['contract', 'breach', 'civil'],
    upvotes: ['user12', 'user13'],
    downvotes: [],
    views: 67,
    isAnonymous: false,
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    responses: [
      {
        _id: 'response-3',
        content: 'This appears to be a clear case of breach of contract. We can file a lawsuit to recover your deposit and any additional damages. I recommend gathering all documentation including the contract, photos, and communications.',
        lawyerId: 'lawyer-3',
        lawyer: demoLawyers[2],
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        isAccepted: true
      }
    ]
  },
  {
    _id: 'issue-8',
    title: 'Trademark Infringement Notice',
    description: 'I received a cease and desist letter claiming my business name infringes on someone else\'s trademark. I have been using this name for 3 years and believe I have prior rights. How should I respond?',
    category: 'Intellectual Property',
    urgency: 'high',
    status: 'open',
    author: {
      _id: demoUser._id,
      username: demoUser.name,
      email: demoUser.email
    },
    budget: {
      min: 1500,
      max: 7000,
      currency: 'USD'
    },
    location: {
      city: 'Boston',
      state: 'MA',
      country: 'USA'
    },
    tags: ['trademark', 'infringement', 'business'],
    upvotes: ['user14'],
    downvotes: [],
    views: 41,
    isAnonymous: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    responses: []
  }
];

// Demo schemes data
export const demoSchemes: DemoScheme[] = [
  {
    name: 'National Scholarship for SC/ST Students',
    description: 'Financial assistance for higher education to students from Scheduled Castes and Scheduled Tribes',
    eligibility: ['SC/ST category', 'Family income below ₹8 lakhs', 'Enrolled in recognized university'],
    benefits: ['₹20,000 per year', 'Tuition fee waiver', 'Book allowance'],
    category: 'Education',
    applicationDeadline: '2024-12-31'
  },
  {
    name: 'Startup India Seed Fund',
    description: 'Financial support for early-stage startups to develop their products and services',
    eligibility: ['Registered startup', 'Less than 2 years old', 'Innovative business model'],
    benefits: ['Up to ₹20 lakhs funding', 'Mentorship support', 'Networking opportunities'],
    category: 'Business',
    applicationDeadline: '2024-11-30'
  },
  {
    name: 'Pradhan Mantri Awas Yojana',
    description: 'Housing scheme for economically weaker sections and low-income groups',
    eligibility: ['Annual income below ₹3 lakhs', 'No pucca house in family', 'Indian citizen'],
    benefits: ['₹2.5 lakhs subsidy', 'Interest rate concession', 'Construction assistance'],
    category: 'Housing'
  }
];

// Admin demo data
export interface AdminDashboardStats {
  totalUsers: number;
  totalLawyers: number;
  verifiedLawyers: number;
  pendingApplications: number;
  totalRevenue: number;
  monthlyGrowth: number;
  activeIssues: number;
  resolvedIssues: number;
}

export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'lawyer' | 'admin';
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  lawyerProfile?: {
    isVerified: boolean;
    verificationStatus: 'pending' | 'approved' | 'rejected';
    applicationDate?: string;
    verificationDate?: string;
    barNumber?: string;
    practiceAreas?: string[];
    yearsOfExperience?: number;
    lawSchool?: string;
  };
}

export interface AdminLawyerApplication {
  _id: string;
  applicant: {
    _id: string;
    username: string;
    email: string;
  };
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  applicationDate: string;
  reviewDate?: string;
  reviewedBy?: string;
  barNumber: string;
  barAssociation: string;
  practiceAreas: string[];
  yearsOfExperience: number;
  lawSchool: string;
  graduationYear: number;
  phone: string;
  officeAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  website: string;
  specializations: string[];
  languages: string[];
  bio: string;
  achievements: string[];
  references: Array<{
    name: string;
    title: string;
    organization: string;
    email: string;
    phone: string;
    relationship: string;
  }>;
  adminNotes?: string;
  rejectionReason?: string;
  verificationScore?: number;
  history: Array<{
    action: string;
    date: string;
    admin?: string;
    notes?: string;
  }>;
}

export interface AnalyticsData {
  userGrowth: Array<{ date: string; count: number; role: string }>;
  lawyerApplications: Array<{ status: string; count: number }>;
  legalIssues: Array<{ category: string; count: number; avgBudget: number }>;
  systemUsage: Array<{ metric: string; value: number; change: number }>;
  topLawyers: Array<{ username: string; rating: number; cases: number; revenue: number }>;
  recentActivity: Array<{ type: string; description: string; timestamp: string; impact: 'positive' | 'negative' | 'neutral' }>;
  revenueData: Array<{ month: string; revenue: number; users: number }>;
  issueTrends: Array<{ category: string; count: number; trend: number }>;
}

// Demo admin data
export const adminDashboardStats: AdminDashboardStats = {
  totalUsers: 1247,
  totalLawyers: 89,
  verifiedLawyers: 3,
  pendingApplications: 12,
  totalRevenue: 45680,
  monthlyGrowth: 15.2,
  activeIssues: 156,
  resolvedIssues: 423
};

export const adminUsers: AdminUser[] = [
  {
    _id: 'user-1',
    username: 'john_doe',
    email: 'john.doe@example.com',
    role: 'user',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-12-20T14:22:00Z',
    isActive: true
  },
  {
    _id: 'user-2',
    username: 'sarah_wilson',
    email: 'sarah.wilson@example.com',
    role: 'user',
    createdAt: '2024-02-20T09:15:00Z',
    lastLogin: '2024-12-19T16:45:00Z',
    isActive: true
  },
  {
    _id: 'lawyer-1',
    username: 'sarah_johnson',
    email: 'sarah.johnson@lawfirm.com',
    role: 'lawyer',
    createdAt: '2024-01-10T08:00:00Z',
    lastLogin: '2024-12-20T11:30:00Z',
    isActive: true,
    lawyerProfile: {
      isVerified: true,
      verificationStatus: 'approved',
      applicationDate: '2024-01-10T08:00:00Z',
      verificationDate: '2024-01-15T14:30:00Z',
      barNumber: 'NY123456',
      practiceAreas: ['Corporate Law', 'Contract Law', 'M&A'],
      yearsOfExperience: 12,
      lawSchool: 'Harvard Law School'
    }
  },
  {
    _id: 'lawyer-2',
    username: 'michael_chen',
    email: 'michael.chen@legal.com',
    role: 'lawyer',
    createdAt: '2024-01-12T10:20:00Z',
    lastLogin: '2024-12-20T09:15:00Z',
    isActive: true,
    lawyerProfile: {
      isVerified: true,
      verificationStatus: 'approved',
      applicationDate: '2024-01-12T10:20:00Z',
      verificationDate: '2024-01-18T16:45:00Z',
      barNumber: 'CA789012',
      practiceAreas: ['Intellectual Property', 'Technology Law', 'Startups'],
      yearsOfExperience: 8,
      lawSchool: 'Stanford Law School'
    }
  },
  {
    _id: 'lawyer-3',
    username: 'emily_rodriguez',
    email: 'emily.rodriguez@lawgroup.com',
    role: 'lawyer',
    createdAt: '2024-01-14T11:45:00Z',
    lastLogin: '2024-12-19T13:20:00Z',
    isActive: true,
    lawyerProfile: {
      isVerified: true,
      verificationStatus: 'approved',
      applicationDate: '2024-01-14T11:45:00Z',
      verificationDate: '2024-01-20T10:15:00Z',
      barNumber: 'IL345678',
      practiceAreas: ['Employment Law', 'Labor Relations', 'HR Compliance'],
      yearsOfExperience: 10,
      lawSchool: 'Northwestern Law School'
    }
  },
  {
    _id: 'lawyer-4',
    username: 'david_kim',
    email: 'david.kim@law.com',
    role: 'lawyer',
    createdAt: '2024-02-01T14:30:00Z',
    lastLogin: '2024-12-18T15:10:00Z',
    isActive: true,
    lawyerProfile: {
      isVerified: false,
      verificationStatus: 'pending',
      applicationDate: '2024-02-01T14:30:00Z',
      barNumber: 'TX901234',
      practiceAreas: ['Criminal Law', 'DUI Defense'],
      yearsOfExperience: 6,
      lawSchool: 'University of Texas Law School'
    }
  },
  {
    _id: 'lawyer-5',
    username: 'lisa_patel',
    email: 'lisa.patel@legal.com',
    role: 'lawyer',
    createdAt: '2024-02-05T09:20:00Z',
    lastLogin: '2024-12-17T12:45:00Z',
    isActive: true,
    lawyerProfile: {
      isVerified: false,
      verificationStatus: 'pending',
      applicationDate: '2024-02-05T09:20:00Z',
      barNumber: 'FL567890',
      practiceAreas: ['Family Law', 'Divorce', 'Child Custody'],
      yearsOfExperience: 7,
      lawSchool: 'University of Miami Law School'
    }
  },
  {
    _id: 'admin-1',
    username: 'admin_user',
    email: 'admin@privatesaale.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-12-20T16:30:00Z',
    isActive: true
  }
];

export const adminLawyerApplications: AdminLawyerApplication[] = [
  {
    _id: 'app-1',
    applicant: {
      _id: 'lawyer-4',
      username: 'david_kim',
      email: 'david.kim@law.com'
    },
    status: 'pending',
    applicationDate: '2024-02-01T14:30:00Z',
    barNumber: 'TX901234',
    barAssociation: 'State Bar of Texas',
    practiceAreas: ['Criminal Law', 'DUI Defense', 'Traffic Violations'],
    yearsOfExperience: 6,
    lawSchool: 'University of Texas Law School',
    graduationYear: 2018,
    phone: '+1-512-555-0123',
    officeAddress: {
      street: '123 Main St',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      country: 'USA'
    },
    website: 'https://davidkimlaw.com',
    specializations: ['DUI Defense', 'Criminal Defense', 'Traffic Law'],
    languages: ['English', 'Korean'],
    bio: 'Experienced criminal defense attorney specializing in DUI cases and traffic violations. Committed to protecting clients\' rights and achieving the best possible outcomes.',
    achievements: ['Board Certified in Criminal Law', 'Top 100 Criminal Defense Attorneys 2023'],
    references: [
      {
        name: 'Robert Johnson',
        title: 'Senior Partner',
        organization: 'Johnson & Associates',
        email: 'r.johnson@jlaw.com',
        phone: '+1-512-555-0456',
        relationship: 'Former colleague'
      }
    ],
    history: [
      {
        action: 'Application submitted',
        date: '2024-02-01T14:30:00Z',
        notes: 'Initial application received'
      }
    ]
  },
  {
    _id: 'app-2',
    applicant: {
      _id: 'lawyer-5',
      username: 'lisa_patel',
      email: 'lisa.patel@legal.com'
    },
    status: 'pending',
    applicationDate: '2024-02-05T09:20:00Z',
    barNumber: 'FL567890',
    barAssociation: 'Florida Bar',
    practiceAreas: ['Family Law', 'Divorce', 'Child Custody', 'Adoption'],
    yearsOfExperience: 7,
    lawSchool: 'University of Miami Law School',
    graduationYear: 2017,
    phone: '+1-305-555-0789',
    officeAddress: {
      street: '456 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      country: 'USA'
    },
    website: 'https://lisapatellaw.com',
    specializations: ['Family Law', 'Divorce Mediation', 'Child Custody'],
    languages: ['English', 'Spanish', 'Hindi'],
    bio: 'Compassionate family law attorney with extensive experience in divorce, child custody, and adoption cases. Focused on helping families navigate difficult times.',
    achievements: ['Family Law Specialist Certification', 'Pro Bono Service Award 2022'],
    references: [
      {
        name: 'Maria Gonzalez',
        title: 'Managing Partner',
        organization: 'Gonzalez Family Law',
        email: 'm.gonzalez@gflaw.com',
        phone: '+1-305-555-0321',
        relationship: 'Former supervisor'
      }
    ],
    history: [
      {
        action: 'Application submitted',
        date: '2024-02-05T09:20:00Z',
        notes: 'Initial application received'
      }
    ]
  }
];

export const analyticsData: AnalyticsData = {
  userGrowth: [
    { date: '2024-01', count: 150, role: 'user' },
    { date: '2024-02', count: 280, role: 'user' },
    { date: '2024-03', count: 420, role: 'user' },
    { date: '2024-04', count: 580, role: 'user' },
    { date: '2024-05', count: 720, role: 'user' },
    { date: '2024-06', count: 890, role: 'user' },
    { date: '2024-07', count: 1050, role: 'user' },
    { date: '2024-08', count: 1180, role: 'user' },
    { date: '2024-09', count: 1320, role: 'user' },
    { date: '2024-10', count: 1450, role: 'user' },
    { date: '2024-11', count: 1580, role: 'user' },
    { date: '2024-12', count: 1247, role: 'user' },
    { date: '2024-01', count: 5, role: 'lawyer' },
    { date: '2024-02', count: 12, role: 'lawyer' },
    { date: '2024-03', count: 18, role: 'lawyer' },
    { date: '2024-04', count: 25, role: 'lawyer' },
    { date: '2024-05', count: 32, role: 'lawyer' },
    { date: '2024-06', count: 41, role: 'lawyer' },
    { date: '2024-07', count: 48, role: 'lawyer' },
    { date: '2024-08', count: 56, role: 'lawyer' },
    { date: '2024-09', count: 63, role: 'lawyer' },
    { date: '2024-10', count: 71, role: 'lawyer' },
    { date: '2024-11', count: 78, role: 'lawyer' },
    { date: '2024-12', count: 89, role: 'lawyer' }
  ],
  lawyerApplications: [
    { status: 'pending', count: 12 },
    { status: 'under_review', count: 3 },
    { status: 'approved', count: 3 },
    { status: 'rejected', count: 2 }
  ],
  legalIssues: [
    { category: 'Employment Law', count: 45, avgBudget: 3500 },
    { category: 'Family Law', count: 38, avgBudget: 8500 },
    { category: 'Criminal Law', count: 32, avgBudget: 12000 },
    { category: 'Property Law', count: 28, avgBudget: 4200 },
    { category: 'Corporate Law', count: 25, avgBudget: 15000 },
    { category: 'Intellectual Property', count: 18, avgBudget: 9500 },
    { category: 'Civil Law', count: 15, avgBudget: 2800 }
  ],
  systemUsage: [
    { metric: 'totalUsers', value: 1247, change: 15.2 },
    { metric: 'totalLawyers', value: 89, change: 8.5 },
    { metric: 'verifiedLawyers', value: 3, change: 0 },
    { metric: 'activeIssues', value: 156, change: 22.3 },
    { metric: 'resolvedIssues', value: 423, change: 18.7 },
    { metric: 'totalRevenue', value: 45680, change: 25.1 }
  ],
  topLawyers: [
    { username: 'sarah_johnson', rating: 4.8, cases: 45, revenue: 12500 },
    { username: 'michael_chen', rating: 4.6, cases: 38, revenue: 9800 },
    { username: 'emily_rodriguez', rating: 4.7, cases: 42, revenue: 11200 }
  ],
  recentActivity: [
    { type: 'user_registration', description: 'New user registered: john_doe', timestamp: '2024-12-20T14:22:00Z', impact: 'positive' },
    { type: 'lawyer_application', description: 'New lawyer application: david_kim', timestamp: '2024-12-20T10:15:00Z', impact: 'neutral' },
    { type: 'issue_resolved', description: 'Issue resolved: Employment Contract Dispute', timestamp: '2024-12-19T16:30:00Z', impact: 'positive' },
    { type: 'payment_received', description: 'Payment received: $2,500', timestamp: '2024-12-19T14:45:00Z', impact: 'positive' },
    { type: 'system_alert', description: 'High server load detected', timestamp: '2024-12-19T11:20:00Z', impact: 'negative' }
  ],
  revenueData: [
    { month: 'Jan', revenue: 3200, users: 150 },
    { month: 'Feb', revenue: 4800, users: 280 },
    { month: 'Mar', revenue: 6200, users: 420 },
    { month: 'Apr', revenue: 7800, users: 580 },
    { month: 'May', revenue: 9200, users: 720 },
    { month: 'Jun', revenue: 11200, users: 890 },
    { month: 'Jul', revenue: 13800, users: 1050 },
    { month: 'Aug', revenue: 15200, users: 1180 },
    { month: 'Sep', revenue: 16800, users: 1320 },
    { month: 'Oct', revenue: 18400, users: 1450 },
    { month: 'Nov', revenue: 20100, users: 1580 },
    { month: 'Dec', revenue: 22800, users: 1247 }
  ],
  issueTrends: [
    { category: 'Employment Law', count: 45, trend: 12.5 },
    { category: 'Family Law', count: 38, trend: 8.3 },
    { category: 'Criminal Law', count: 32, trend: 15.2 },
    { category: 'Property Law', count: 28, trend: 5.7 },
    { category: 'Corporate Law', count: 25, trend: 22.1 },
    { category: 'Intellectual Property', count: 18, trend: 18.9 },
    { category: 'Civil Law', count: 15, trend: 3.2 }
  ]
};

// Demo service functions
export class DemoService {
  static async simulateDelay(ms: number = 1000): Promise<void> {
    const delay = ms || getRandomDelay();
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  static async getContractAnalysis(file: File): Promise<DemoContractAnalysis> {
    await this.simulateDelay(2000);
    return {
      ...demoContractAnalysis,
      contractInfo: {
        ...demoContractAnalysis.contractInfo,
        fileName: file.name,
        fileSize: file.size
      }
    };
  }

  static async getLawyers(query?: string): Promise<DemoLawyer[]> {
    await this.simulateDelay(800);
    if (!query) return demoLawyers;
    
    // Enhanced matching logic for better recommendations
    const queryLower = query.toLowerCase();
    
    return demoLawyers
      .map(lawyer => {
        let score = 0;
        
        // Name matching
        if (lawyer.name.toLowerCase().includes(queryLower)) score += 3;
        
        // Expertise matching
        const expertiseMatches = lawyer.expertise.filter(exp => 
          exp.toLowerCase().includes(queryLower) ||
          queryLower.includes(exp.toLowerCase())
        ).length;
        score += expertiseMatches * 2;
        
        // Bio matching
        if (lawyer.bio.toLowerCase().includes(queryLower)) score += 1;
        
        // Location matching
        if (lawyer.location.toLowerCase().includes(queryLower)) score += 1;
        
        return { ...lawyer, score };
      })
      .filter(lawyer => lawyer.score > 0)
      .sort((a, b) => b.score - a.score);
  }

  static async getLawyerRecommendations(query: string): Promise<any[]> {
    await this.simulateDelay(1200);
    
    const queryLower = query.toLowerCase();
    const recommendations = [];
    
    // Enhanced recommendation logic with fixed match percentages
    for (let i = 0; i < demoLawyers.length; i++) {
      const lawyer = demoLawyers[i];
      let score = 0;
      let matchedExpertise = [];
      
      // Check for expertise matches
      for (const expertise of lawyer.expertise) {
        if (queryLower.includes(expertise.toLowerCase()) || 
            expertise.toLowerCase().includes(queryLower)) {
          score += 2;
          matchedExpertise.push(expertise);
        }
      }
      
      // Check for keyword matches in bio
      const bioKeywords = ['experience', 'expertise', 'specialized', 'focus', 'practice'];
      for (const keyword of bioKeywords) {
        if (lawyer.bio.toLowerCase().includes(keyword)) score += 0.5;
      }
      
      // Check for specific legal terms
      const legalTerms = ['contract', 'criminal', 'civil', 'family', 'corporate', 'employment', 'property', 'intellectual'];
      for (const term of legalTerms) {
        if (queryLower.includes(term) && lawyer.expertise.some(exp => 
          exp.toLowerCase().includes(term))) {
          score += 1.5;
        }
      }
      
      // Fixed match percentages: First lawyer gets 40%, second gets 10%, third gets 30%
      let finalScore;
      if (i === 0) {
        finalScore = 0.4; // 40% match
      } else if (i === 1) {
        finalScore = 0.1; // 10% match
      } else if (i === 2) {
        finalScore = 0.3; // 30% match
      } else {
        finalScore = Math.min(score / 5, 1); // Normalize score to 0-1 for others
      }
      
      if (score > 0 || i < 3) { // Always include first 3 lawyers for demo
        recommendations.push({
          ...lawyer,
          score: finalScore,
          matchedExpertise: matchedExpertise.length > 0 ? matchedExpertise : lawyer.expertise.slice(0, 2),
          details: {
            expertise: matchedExpertise.length > 0 ? matchedExpertise.join(', ') : lawyer.expertise.slice(0, 2).join(', '),
            experience: `${lawyer.experience_years} years`,
            location: lawyer.location
          }
        });
      }
    }
    
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Return top 5 recommendations
  }

  static async getIssues(): Promise<DemoIssue[]> {
    await this.simulateDelay(500);
    return demoIssues;
  }

  static async createIssue(issue: Omit<DemoIssue, '_id' | 'createdAt' | 'responses' | 'upvotes' | 'downvotes' | 'views'>): Promise<DemoIssue> {
    await this.simulateDelay(1000);
    const newIssue: DemoIssue = {
      ...issue,
      _id: `issue-${Date.now()}`,
      createdAt: new Date().toISOString(),
      responses: [],
      upvotes: [],
      downvotes: [],
      views: 0
    };
    demoIssues.unshift(newIssue);
    return newIssue;
  }

  static async getIssueById(id: string): Promise<DemoIssue | null> {
    await this.simulateDelay(300);
    return demoIssues.find(issue => issue._id === id) || null;
  }

  static async upvoteIssue(issueId: string, userId: string): Promise<{ success: boolean; upvotes: number; downvotes: number }> {
    await this.simulateDelay(200);
    const issue = demoIssues.find(i => i._id === issueId);
    if (!issue) return { success: false, upvotes: 0, downvotes: 0 };

    // Remove from downvotes if exists
    issue.downvotes = issue.downvotes.filter(id => id !== userId);
    
    // Add to upvotes if not already there
    if (!issue.upvotes.includes(userId)) {
      issue.upvotes.push(userId);
    }

    return { success: true, upvotes: issue.upvotes.length, downvotes: issue.downvotes.length };
  }

  static async downvoteIssue(issueId: string, userId: string): Promise<{ success: boolean; upvotes: number; downvotes: number }> {
    await this.simulateDelay(200);
    const issue = demoIssues.find(i => i._id === issueId);
    if (!issue) return { success: false, upvotes: 0, downvotes: 0 };

    // Remove from upvotes if exists
    issue.upvotes = issue.upvotes.filter(id => id !== userId);
    
    // Add to downvotes if not already there
    if (!issue.downvotes.includes(userId)) {
      issue.downvotes.push(userId);
    }

    return { success: true, upvotes: issue.upvotes.length, downvotes: issue.downvotes.length };
  }

  static async incrementViews(issueId: string): Promise<void> {
    await this.simulateDelay(100);
    const issue = demoIssues.find(i => i._id === issueId);
    if (issue) {
      issue.views += 1;
    }
  }

  static async getSchemes(query?: string): Promise<DemoScheme[]> {
    await this.simulateDelay(600);
    if (!query) return demoSchemes;
    
    return demoSchemes.filter(scheme =>
      scheme.name.toLowerCase().includes(query.toLowerCase()) ||
      scheme.description.toLowerCase().includes(query.toLowerCase()) ||
      scheme.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  static async getSchemeRecommendations(profile: any): Promise<DemoScheme[]> {
    await this.simulateDelay(1200);
    // Simple matching logic based on profile
    return demoSchemes.filter(scheme => {
      if (profile.category && scheme.name.toLowerCase().includes(profile.category.toLowerCase())) {
        return true;
      }
      if (profile.education_level && scheme.category === 'Education') {
        return true;
      }
      if (profile.income && parseInt(profile.income) < 5 && scheme.name.includes('SC/ST')) {
        return true;
      }
      return false;
    });
  }

  static async hireLawyer(lawyerId: string, issueId: string): Promise<{ success: boolean; message: string }> {
    await this.simulateDelay(1500);
    return {
      success: true,
      message: 'Lawyer hired successfully! You will be contacted within 24 hours.'
    };
  }

  static async respondToIssue(issueId: string, content: string, lawyerId: string): Promise<DemoResponse> {
    await this.simulateDelay(1000);
    const response: DemoResponse = {
      _id: `response-${Date.now()}`,
      content,
      lawyerId,
      lawyer: demoLawyers.find(l => l._id === lawyerId) || demoLawyers[0],
      createdAt: new Date().toISOString(),
      isAccepted: false
    };
    
    const issue = demoIssues.find(i => i._id === issueId);
    if (issue) {
      issue.responses.push(response);
    }
    
    return response;
  }

  // Admin service methods
  static async getAdminDashboardStats(): Promise<AdminDashboardStats> {
    await this.simulateDelay(800);
    return adminDashboardStats;
  }

  static async getAdminUsers(): Promise<AdminUser[]> {
    await this.simulateDelay(600);
    return adminUsers;
  }

  static async getAdminLawyerApplications(): Promise<AdminLawyerApplication[]> {
    await this.simulateDelay(700);
    return adminLawyerApplications;
  }

  static async getAnalyticsData(): Promise<AnalyticsData> {
    await this.simulateDelay(1000);
    return analyticsData;
  }
}
