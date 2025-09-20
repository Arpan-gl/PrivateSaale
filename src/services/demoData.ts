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
      _id: demoUser._id,
      username: demoUser.name,
      email: demoUser.email
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
      _id: demoUser._id,
      username: demoUser.name,
      email: demoUser.email
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
    
    // Enhanced recommendation logic
    for (const lawyer of demoLawyers) {
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
      
      if (score > 0) {
        recommendations.push({
          ...lawyer,
          score: Math.min(score / 5, 1), // Normalize score to 0-1
          matchedExpertise,
          details: {
            expertise: matchedExpertise.join(', '),
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
}
