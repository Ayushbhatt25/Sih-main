import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Download, Filter, TrendingUp } from "lucide-react";

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState("2024-01");
  
  // Mock student data with attendance
  const students = [
    { 
      rollNo: "001", 
      name: "Alice Johnson", 
      attendance: {
        "2024-01-15": true, "2024-01-14": true, "2024-01-13": true, "2024-01-12": false,
        "2024-01-11": true, "2024-01-10": true, "2024-01-09": true, "2024-01-08": true
      }
    },
    { 
      rollNo: "002", 
      name: "Bob Smith", 
      attendance: {
        "2024-01-15": true, "2024-01-14": false, "2024-01-13": true, "2024-01-12": true,
        "2024-01-11": false, "2024-01-10": true, "2024-01-09": true, "2024-01-08": true
      }
    },
    { 
      rollNo: "003", 
      name: "Carol Davis", 
      attendance: {
        "2024-01-15": false, "2024-01-14": true, "2024-01-13": true, "2024-01-12": true,
        "2024-01-11": true, "2024-01-10": true, "2024-01-09": false, "2024-01-08": true
      }
    },
    { 
      rollNo: "004", 
      name: "David Wilson", 
      attendance: {
        "2024-01-15": true, "2024-01-14": true, "2024-01-13": true, "2024-01-12": true,
        "2024-01-11": true, "2024-01-10": false, "2024-01-09": true, "2024-01-08": true
      }
    },
    { 
      rollNo: "005", 
      name: "Eva Brown", 
      attendance: {
        "2024-01-15": true, "2024-01-14": true, "2024-01-13": false, "2024-01-12": false,
        "2024-01-11": true, "2024-01-10": true, "2024-01-09": true, "2024-01-08": false
      }
    },
    { 
      rollNo: "006", 
      name: "Frank Miller", 
      attendance: {
        "2024-01-15": false, "2024-01-14": true, "2024-01-13": true, "2024-01-12": true,
        "2024-01-11": true, "2024-01-10": true, "2024-01-09": true, "2024-01-08": true
      }
    }
  ];

  // Get days for selected month
  const getDaysInMonth = (monthYear: string) => {
    const [year, month] = monthYear.split('-');
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      if (i <= 15) { // Only show first 15 days for demo
        days.push(`${monthYear}-${i.toString().padStart(2, '0')}`);
      }
    }
    return days.reverse(); // Latest first
  };

  const monthDays = getDaysInMonth(selectedMonth);

  // Calculate attendance percentage for each student
  const getAttendancePercentage = (attendance: Record<string, boolean>) => {
    const totalDays = Object.keys(attendance).length;
    const presentDays = Object.values(attendance).filter(Boolean).length;
    return Math.round((presentDays / totalDays) * 100);
  };

  const months = [
    { value: "2024-01", label: "January 2024" },
    { value: "2023-12", label: "December 2023" },
    { value: "2023-11", label: "November 2023" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <Card className="p-6 gradient-hero shadow-large border-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-primary-foreground">Attendance Reports</h2>
            <p className="text-primary-foreground/80">
              Track student attendance and generate detailed reports
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 shadow-medium"
            >
              <Download className="mr-2" size={20} />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4 shadow-medium">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="text-primary" size={20} />
            <span className="font-medium">Filters:</span>
          </div>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 shadow-medium">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CalendarDays className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-2xl font-bold">{students.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-medium">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <TrendingUp className="text-accent" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Attendance</p>
              <p className="text-2xl font-bold text-accent">
                {Math.round(students.reduce((acc, student) => 
                  acc + getAttendancePercentage(student.attendance), 0) / students.length)}%
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-medium">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CalendarDays className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Days Tracked</p>
              <p className="text-2xl font-bold">{monthDays.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card className="shadow-medium overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold">Monthly Attendance Overview</h3>
          <p className="text-sm text-muted-foreground">Day-wise attendance tracking for all students</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-semibold min-w-[80px]">Roll No</th>
                <th className="text-left p-3 font-semibold min-w-[160px]">Student Name</th>
                {monthDays.map((day) => (
                  <th key={day} className="text-center p-2 font-semibold min-w-[40px] text-xs">
                    {new Date(day).getDate()}
                  </th>
                ))}
                <th className="text-center p-3 font-semibold min-w-[80px]">Overall</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                const percentage = getAttendancePercentage(student.attendance);
                return (
                  <tr key={student.rollNo} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <td className="p-3 font-medium">{student.rollNo}</td>
                    <td className="p-3">{student.name}</td>
                    {monthDays.map((day) => {
                      const isPresent = student.attendance[day];
                      return (
                        <td key={day} className="p-2 text-center">
                          {isPresent !== undefined ? (
                            <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-xs font-medium ${
                              isPresent 
                                ? 'bg-accent text-accent-foreground' 
                                : 'bg-destructive text-destructive-foreground'
                            }`}>
                              {isPresent ? '✓' : '✗'}
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full mx-auto bg-muted"></div>
                          )}
                        </td>
                      );
                    })}
                    <td className="p-3 text-center">
                      <Badge 
                        variant="outline" 
                        className={`${
                          percentage >= 90 
                            ? 'bg-accent/20 text-accent border-accent/30' 
                            : percentage >= 75 
                            ? 'bg-primary/20 text-primary border-primary/30'
                            : 'bg-destructive/20 text-destructive border-destructive/30'
                        }`}
                      >
                        {percentage}%
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Reports;