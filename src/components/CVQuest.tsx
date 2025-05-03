
import { useState, useEffect } from "react";
import { Check, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useDeviceType } from "@/hooks/use-mobile";
import StatisticsCard from "./StatisticsCard";
import { useToast } from "@/hooks/use-toast";

export interface CVQuestTask {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
}

export interface CVQuestProgress {
  tasksCompleted: string[];
  points: number;
  badge: "ATS Rookie" | "CV Pro" | "Job Master";
  badgeLevel: number;
  unlocked3DayTrial: boolean;
}

const CVQuest = () => {
  const deviceType = useDeviceType();
  const { toast } = useToast();
  const isMobile = deviceType === 'mobile';

  // List of tasks for the CV Quest
  const tasks: CVQuestTask[] = [
    {
      id: "upload_cv",
      title: "Upload Your CV",
      description: "Upload your CV to start the optimization process",
      points: 10,
      completed: false
    },
    {
      id: "add_job_description",
      title: "Add a Job Description",
      description: "Add a job description to match against your CV",
      points: 15,
      completed: false
    },
    {
      id: "apply_suggestion",
      title: "Apply an Optimization Suggestion",
      description: "Improve your CV by applying one of our suggestions",
      points: 20,
      completed: false
    }
  ];

  // Default progress state
  const defaultProgress: CVQuestProgress = {
    tasksCompleted: [],
    points: 0,
    badge: "ATS Rookie",
    badgeLevel: 1,
    unlocked3DayTrial: false
  };
  
  // State for user progress
  const [progress, setProgress] = useState<CVQuestProgress>(defaultProgress);
  
  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('cvQuestProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);
  
  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cvQuestProgress', JSON.stringify(progress));
  }, [progress]);
  
  // Update tasks with completed status
  const tasksWithStatus = tasks.map(task => ({
    ...task,
    completed: progress.tasksCompleted.includes(task.id)
  }));
  
  // Calculate completion percentage
  const completedTasks = tasksWithStatus.filter(task => task.completed).length;
  const totalTasks = tasksWithStatus.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
  
  // For demo purposes: simulate completing a task
  const completeTask = (taskId: string) => {
    if (progress.tasksCompleted.includes(taskId)) return;
    
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const newTasksCompleted = [...progress.tasksCompleted, taskId];
    const newPoints = progress.points + task.points;
    
    // Determine badge level based on points
    let newBadge = progress.badge;
    let newBadgeLevel = progress.badgeLevel;
    
    if (newPoints >= 45) {
      newBadge = "Job Master";
      newBadgeLevel = 3;
    } else if (newPoints >= 25) {
      newBadge = "CV Pro";
      newBadgeLevel = 2;
    }
    
    // Check if all tasks are completed
    const allTasksCompleted = newTasksCompleted.length === tasks.length;
    const unlocked3DayTrial = allTasksCompleted || progress.unlocked3DayTrial;
    
    // Update progress
    setProgress({
      tasksCompleted: newTasksCompleted,
      points: newPoints,
      badge: newBadge,
      badgeLevel: newBadgeLevel,
      unlocked3DayTrial
    });
    
    // Show toast notification
    toast({
      title: `Task Completed: ${task.title}`,
      description: `You earned ${task.points} points!`,
    });
    
    // If all tasks completed, show premium trial notification
    if (allTasksCompleted && !progress.unlocked3DayTrial) {
      setTimeout(() => {
        toast({
          title: "Congratulations! 🎉",
          description: "You've unlocked a 3-day premium trial!",
        });
      }, 1500);
    }
  };
  
  // Reset progress (for demo purposes)
  const resetProgress = () => {
    setProgress(defaultProgress);
    toast({
      title: "Progress Reset",
      description: "Your CV Quest progress has been reset.",
    });
  };

  return (
    <section className="py-8 bg-gray-50 dark:bg-sa-blue/95">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1 text-sa-blue dark:text-white">
                CV Quest
              </h2>
              <p className="text-sa-gray dark:text-gray-300 text-sm">
                Complete tasks to earn points and unlock rewards
              </p>
            </div>
            
            <div className="mt-2 sm:mt-0 flex items-center">
              <Trophy className="w-5 h-5 text-sa-yellow mr-2" />
              <span className="text-sa-blue dark:text-white font-medium">
                {progress.points} points
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white dark:bg-sa-blue/30 rounded-xl p-6 mb-6 shadow-sm border border-gray-100 dark:border-sa-blue/50">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <StatisticsCard
                title="Quest Progress"
                value={`${completedTasks}/${totalTasks}`}
                subtitle="Tasks completed"
                icon="trophy"
                progress={completionPercentage}
              />
              
              <StatisticsCard
                title="Current Badge"
                value={progress.badge}
                subtitle={`Level ${progress.badgeLevel} badge`}
                icon="award"
                badgeText={`+${progress.points} pts`}
              />
            </div>
            
            {progress.unlocked3DayTrial && (
              <div className="bg-sa-green/10 border border-sa-green/20 rounded-lg p-4 mb-4 animate-fade-in">
                <h3 className="font-medium text-sa-green mb-1">Premium Trial Unlocked!</h3>
                <p className="text-sm text-sa-gray">
                  You've earned a 3-day premium trial. Enjoy all premium features!
                </p>
              </div>
            )}
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-sa-gray dark:text-gray-300">Overall progress</span>
                <span className="font-medium text-sa-blue dark:text-white">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2.5" />
            </div>
          </div>
          
          {/* Task List */}
          <div className="bg-white dark:bg-sa-blue/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-sa-blue/50">
            <h3 className="text-lg font-medium mb-4 text-sa-blue dark:text-white">
              Quest Tasks
            </h3>
            
            <div className="space-y-4">
              {tasksWithStatus.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-4 rounded-lg border ${
                    task.completed 
                      ? 'bg-sa-green/10 border-sa-green/30 dark:bg-sa-green/20' 
                      : 'bg-white dark:bg-sa-blue/20 border-gray-100 dark:border-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          task.completed 
                            ? 'bg-sa-green text-white' 
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          {task.completed ? <Check className="w-3.5 h-3.5" /> : null}
                        </div>
                        <h4 className={`ml-3 font-medium ${
                          task.completed 
                            ? 'text-sa-green dark:text-sa-green' 
                            : 'text-sa-blue dark:text-white'
                        }`}>
                          {task.title}
                        </h4>
                      </div>
                      <p className="text-sm text-sa-gray dark:text-gray-400 mt-1 ml-9">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-sa-yellow/20 text-sa-blue dark:bg-sa-yellow/30">
                        +{task.points} pts
                      </span>
                      {!task.completed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => completeTask(task.id)}
                          className="text-sa-blue dark:text-sa-green text-xs hover:bg-sa-blue/5 dark:hover:bg-sa-green/10 mt-2"
                        >
                          Complete for demo
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Demo controls */}
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-sa-gray dark:text-gray-400 mb-2">
                For demonstration purposes only:
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetProgress}
                className="text-xs"
              >
                Reset Progress
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVQuest;
