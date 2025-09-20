# Demo Authentication Feature

This application now includes a comprehensive demo authentication system that allows users to test all features without requiring a real backend or database.

## Features

### Demo Mode Toggle
- Toggle between demo mode and real authentication
- Available on both Sign In and Sign Up pages
- Visual indicator shows current mode status

### Pre-configured Demo Accounts

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| User | john@demo.com | demo123 | Regular user account |
| Lawyer | sarah@demo.com | demo123 | Verified lawyer account |
| Admin | admin@demo.com | demo123 | Admin account with full access |
| Pending Lawyer | pending@demo.com | demo123 | Lawyer account pending verification |

### Demo Features

#### Sign In Page
- Demo mode toggle button
- Quick-fill buttons for each demo account type
- Automatic form population with demo credentials
- Visual demo mode indicators

#### Sign Up Page
- Demo mode toggle button
- Auto-login after successful demo registration
- Simulated lawyer application process
- Real-time demo mode status

#### Demo Indicators
- Fixed demo mode indicator in top-right corner
- Role-specific information display
- Demo instructions tooltip
- Visual feedback for demo mode status

#### Demo Instructions
- Comprehensive guide on main page
- Step-by-step instructions
- Available features list
- Quick access buttons to authentication pages

## How to Use

### For Testing
1. Navigate to the Sign In page
2. Click "Demo Mode ON" toggle
3. Click any demo credential button to auto-fill
4. Click "Sign in" to authenticate
5. Explore all features with simulated data

### For Development
1. Demo mode is automatically enabled in development
2. All API calls are intercepted and return mock data
3. No real backend connection required
4. Perfect for UI/UX testing and demonstrations

## Technical Implementation

### Files Added/Modified
- `src/services/demoAuth.ts` - Demo authentication service
- `src/store/reducer.ts` - Redux store updates for demo mode
- `src/pages/SignIn.tsx` - Demo mode integration
- `src/pages/SignUp.tsx` - Demo mode integration
- `src/components/DemoIndicator.tsx` - Demo mode indicator
- `src/components/DemoInstructions.tsx` - Demo instructions component
- `src/pages/Index.tsx` - Added demo instructions to main page

### Key Features
- **No Backend Required**: All authentication is handled client-side
- **Realistic Data**: Demo users have proper role-based permissions
- **Seamless Switching**: Toggle between demo and real mode easily
- **Visual Feedback**: Clear indicators show when demo mode is active
- **Comprehensive Testing**: All user roles and states are covered

## Benefits

1. **Easy Testing**: No need to set up backend or database
2. **Quick Demos**: Perfect for showcasing the application
3. **Development Friendly**: Work on frontend without backend dependencies
4. **User Onboarding**: New users can explore without creating accounts
5. **Role Testing**: Test different user roles and permissions easily

## Demo Mode Persistence

Demo mode state is stored in localStorage and persists across browser sessions. It automatically enables in development mode and can be manually toggled by users.

## Security Note

Demo mode is purely for testing and demonstration purposes. All data is simulated and no real authentication or data persistence occurs when demo mode is active.
