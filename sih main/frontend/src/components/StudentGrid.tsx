import { useState } from "react";
import { Check, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Student {
  id: string;
  name: string;
  photo?: string;
  isPresent?: boolean;
}

interface StudentGridProps {
  classPhoto?: string;
  onAttendanceComplete: (attendance: { [key: string]: boolean }) => void;
}

// Mock student data
const mockStudents: Student[] = [
  { id: "1", name: "Emma Johnson" },
  { id: "2", name: "Liam Smith" },
  { id: "3", name: "Olivia Brown" },
  { id: "4", name: "Noah Davis" },
  { id: "5", name: "Ava Wilson" },
  { id: "6", name: "William Garcia" },
  { id: "7", name: "Sophia Martinez" },
  { id: "8", name: "James Anderson" },
  { id: "9", name: "Isabella Taylor" },
  { id: "10", name: "Benjamin Thomas" },
  { id: "11", name: "Mia Hernandez" },
  { id: "12", name: "Lucas Moore" },
];

const StudentGrid = ({ classPhoto, onAttendanceComplete }: StudentGridProps) => {
  const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({});

  const toggleAttendance = (studentId: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const markAllPresent = () => {
    const allPresent = mockStudents.reduce((acc, student) => {
      acc[student.id] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setAttendance(allPresent);
  };

  const clearAll = () => {
    setAttendance({});
  };

  const handleComplete = () => {
    onAttendanceComplete(attendance);
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const totalStudents = mockStudents.length;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Class Photo Preview */}
      {classPhoto && (
        <Card className="mb-6 p-4 shadow-medium">
          <div className="flex gap-4">
            <div className="w-32 h-24 rounded-lg overflow-hidden shadow-soft">
              <img
                src={classPhoto}
                alt="Class photo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Class Photo Captured</h3>
              <p className="text-sm text-muted-foreground">
                Mark attendance for each student by tapping their card
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Attendance Summary */}
      <Card className="mb-6 p-4 shadow-medium">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-base px-3 py-1">
              {presentCount} / {totalStudents} Present
            </Badge>
            <div className="text-sm text-muted-foreground">
              {totalStudents - presentCount} Absent
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear All
            </Button>
            <Button variant="secondary" size="sm" onClick={markAllPresent}>
              Mark All Present
            </Button>
            <Button variant="success" onClick={handleComplete}>
              Complete Attendance
            </Button>
          </div>
        </div>
      </Card>

      {/* Student Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mockStudents.map((student) => {
          const isPresent = attendance[student.id];
          return (
            <Card
              key={student.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:scale-105 ${
                isPresent === true
                  ? 'bg-accent/10 border-accent shadow-glow'
                  : isPresent === false
                  ? 'bg-destructive/10 border-destructive shadow-medium'
                  : 'hover:shadow-medium'
              }`}
              onClick={() => toggleAttendance(student.id)}
            >
              <div className="text-center">
                {/* Student Avatar */}
                <div className="relative mb-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center shadow-soft">
                    {student.photo ? (
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={24} className="text-muted-foreground" />
                    )}
                  </div>
                  
                  {/* Attendance Status */}
                  {isPresent !== undefined && (
                    <div
                      className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-medium ${
                        isPresent
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-destructive text-destructive-foreground'
                      }`}
                    >
                      {isPresent ? <Check size={14} /> : <X size={14} />}
                    </div>
                  )}
                </div>

                {/* Student Name */}
                <h4 className="font-medium text-sm leading-tight">{student.name}</h4>
                
                {/* Status Text */}
                <div className="mt-2">
                  {isPresent === true && (
                    <Badge variant="outline" className="text-xs bg-accent/20 text-accent border-accent/30">
                      Present
                    </Badge>
                  )}
                  {isPresent === false && (
                    <Badge variant="outline" className="text-xs bg-destructive/20 text-destructive border-destructive/30">
                      Absent
                    </Badge>
                  )}
                  {isPresent === undefined && (
                    <span className="text-xs text-muted-foreground">Tap to mark</span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StudentGrid;