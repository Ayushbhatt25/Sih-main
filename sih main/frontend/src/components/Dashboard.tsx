import { Calendar, Users, TrendingUp, Camera, LogOut } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DashboardProps {
  onStartAttendance: () => void;
  onLogout: () => void;
}

const Dashboard = ({ onStartAttendance, onLogout }: DashboardProps) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Mock data for demonstration
  const todayStats = {
    totalStudents: 12,
    present: 10,
    absent: 2,
    attendanceRate: 83
  };

  const recentSessions = [
    { date: '2024-01-15', present: 11, total: 12, rate: 92 },
    { date: '2024-01-14', present: 10, total: 12, rate: 83 },
    { date: '2024-01-13', present: 12, total: 12, rate: 100 },
    { date: '2024-01-12', present: 9, total: 12, rate: 75 },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Welcome Section */}
      <Card className="p-6 gradient-hero shadow-large border-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-primary-foreground">Welcome back, Teacher!</h2>
            <p className="text-primary-foreground/80 mb-4">{today}</p>
            <p className="text-primary-foreground/60">
              Ready to take attendance for your class?
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="lg"
              onClick={onStartAttendance}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 shadow-medium"
            >
              <Camera className="mr-2" size={20} />
              Start Attendance
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onLogout}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 shadow-medium"
            >
              <LogOut className="mr-2" size={20} />
              Logout
            </Button>
          </div>
        </div>
      </Card>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 shadow-medium">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-2xl font-bold">{todayStats.totalStudents}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-medium">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Users className="text-accent" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Present Today</p>
              <p className="text-2xl font-bold text-accent">{todayStats.present}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-medium">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <Users className="text-destructive" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Absent Today</p>
              <p className="text-2xl font-bold text-destructive">{todayStats.absent}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-medium">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
              <p className="text-2xl font-bold">{todayStats.attendanceRate}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card className="p-6 shadow-medium">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="text-primary" size={24} />
          <h3 className="text-xl font-semibold">Recent Attendance Sessions</h3>
        </div>
        
        <div className="space-y-3">
          {recentSessions.map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium">
                  {new Date(session.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {session.present}/{session.total} students present
                </div>
              </div>
              
              <Badge 
                variant="outline" 
                className={`${
                  session.rate >= 90 
                    ? 'bg-accent/20 text-accent border-accent/30' 
                    : session.rate >= 80 
                    ? 'bg-primary/20 text-primary border-primary/30'
                    : 'bg-destructive/20 text-destructive border-destructive/30'
                }`}
              >
                {session.rate}%
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6 shadow-medium">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="p-4 h-auto flex-col gap-2"
            onClick={onStartAttendance}
          >
            <Camera size={24} />
            <span>Take New Attendance</span>
          </Button>
          
          <Button variant="outline" className="p-4 h-auto flex-col gap-2">
            <Users size={24} />
            <span>View All Students</span>
          </Button>
          
          <Button variant="outline" className="p-4 h-auto flex-col gap-2">
            <TrendingUp size={24} />
            <span>Attendance Reports</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;