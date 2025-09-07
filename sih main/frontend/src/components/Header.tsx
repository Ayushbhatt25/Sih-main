import { Camera, Users, BarChart3, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Header = ({ currentView, onViewChange }: HeaderProps) => {
  const getPageTitle = () => {
    switch (currentView) {
      case 'camera':
        return 'Take Attendance';
      case 'students':
        return 'My Students';
      case 'reports':
        return 'Attendance Reports';
      case 'dashboard':
        return 'Attendance Dashboard';
      default:
        return 'TeacherCam';
    }
  };

  return (
    <header className="bg-card border-b border-border shadow-medium">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {getPageTitle()}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Quick and easy attendance tracking
            </p>
          </div>
          
          <nav className="flex gap-2">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('dashboard')}
              className="flex items-center gap-2"
            >
              <BarChart3 size={16} />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
            
            <Button
              variant={currentView === 'camera' ? 'camera' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('camera')}
              className="flex items-center gap-2"
            >
              <Camera size={16} />
              <span className="hidden sm:inline">Camera</span>
            </Button>
            
            <Button
              variant={currentView === 'students' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('students')}
              className="flex items-center gap-2"
            >
              <Users size={16} />
              <span className="hidden sm:inline">Students</span>
            </Button>
            
            <Button
              variant={currentView === 'reports' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('reports')}
              className="flex items-center gap-2"
            >
              <FileText size={16} />
              <span className="hidden sm:inline">Reports</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;