import React from 'react';
import { Play, Info } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const DemoIndicator: React.FC = () => {
  const isDemoMode = useSelector((state: RootState) => state.isLogin.isDemoMode);
  const user = useSelector((state: RootState) => state.isLogin.user);

  if (!isDemoMode) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
        <Play className="h-4 w-4" />
        <div className="text-sm font-medium">
          Demo Mode
        </div>
        {user && (
          <div className="text-xs opacity-90">
            ({user.role})
          </div>
        )}
      </div>
      
      {/* Demo Instructions */}
      <div className="mt-2 bg-white border border-blue-200 rounded-lg shadow-lg p-3 max-w-xs">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-gray-700">
            <div className="font-medium text-blue-800 mb-1">Demo Mode Active</div>
            <div className="space-y-1">
              <div>• All data is simulated</div>
              <div>• No real API calls</div>
              <div>• Perfect for testing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoIndicator;