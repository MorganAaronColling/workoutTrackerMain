import React, { useState } from 'react';
import { ExerciseHistory } from './ExerciseHistory';
import WorkoutTracker from './WorkoutTracker';

interface ExerciseLog {
  id: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  unit: string;
  date: string;
}

export const ExerciseLogger: React.FC = () => {
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);

  const handleLogExercises = (logs: ExerciseLog[]) => {
    setExerciseLogs([...exerciseLogs, ...logs]);
  };

  return (
    <div>
      <WorkoutTracker onLogExercises={handleLogExercises} />
      <ExerciseHistory logs={exerciseLogs} />
    </div>
  );
};