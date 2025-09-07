import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import CameraView from "@/components/CameraView";
import StudentGrid from "@/components/StudentGrid";
import Reports from "@/components/Reports";
import LoginPage from "@/components/LoginPage";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [classPhoto, setClassPhoto] = useState<string | null>(null);

  const handleStartAttendance = () => {
    setCurrentView('camera');
  };

  const handlePhotoTaken = (photo: string) => {
    setClassPhoto(photo);
    setCurrentView('students');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
    setClassPhoto(null);
  };

  const handleAttendanceComplete = (attendance: { [key: string]: boolean }) => {
    const presentCount = Object.values(attendance).filter(Boolean).length;
    const totalCount = Object.keys(attendance).length;
    
    toast({
      title: "Attendance Saved!",
      description: `${presentCount}/${totalCount} students marked present.`,
    });
    
    // Reset and go back to dashboard
    setClassPhoto(null);
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'camera':
        return <CameraView onPhotoTaken={handlePhotoTaken} />;
      case 'students':
        return (
          <StudentGrid 
            classPhoto={classPhoto || undefined}
            onAttendanceComplete={handleAttendanceComplete}
          />
        );
      case 'reports':
        return <Reports />;
      case 'dashboard':
      default:
        return <Dashboard onStartAttendance={handleStartAttendance} onLogout={handleLogout} />;
    }
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="py-6">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;
