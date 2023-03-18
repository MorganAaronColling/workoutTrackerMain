import React, { useState } from 'react';
import { View, Heading, Text, NumberField, Button, Flex, Picker, Item } from '@adobe/react-spectrum';
import CardHolder from './CardHolder';
import ExerciseData from '../data/exercises.json';
import { v4 as uuidv4 } from 'uuid';


interface Exercise {
    exercise: string;
    category: string;
    primaryMuscles: string[];
    secondaryMuscles: string[];
  }

interface SelectedExercise extends Exercise {
  sets: number;
  reps: number;
  weight: number;
  unit: 'kg' | 'lbs';
}

interface ExerciseLog {
  id: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  unit: string;
  date: string;
}

interface WorkoutTrackerProps {
  onLogExercises: (logs: ExerciseLog[]) => void;
}
const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ onLogExercises }) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [sets, setSets] = useState(1);
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [trackedExercises, setTrackedExercises] = useState<SelectedExercise[]>([]);

  const handleSelectExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const handleAddExercise = () => {
    if (selectedExercise) {
      setTrackedExercises([...trackedExercises, { ...selectedExercise, sets, reps, weight, unit }]);
      setSelectedExercise(null);
      setSets(1);
      setWeight(0);
    }
  };

  const handleRemoveExercise = (index: number) => {
    setTrackedExercises(trackedExercises.filter((_, i) => i !== index));
  };

  const handleLogWorkout = () => {
    const workoutId = uuidv4();
    const date = new Date().toISOString();

    const logs: ExerciseLog[] = trackedExercises.map((exercise) => ({
      id: workoutId,
      exercise: exercise.exercise,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      unit: exercise.unit,
      date,
    }));

    onLogExercises(logs);
  };

  return (
    <View>
      <Heading level={1} marginBottom="size-200">Workout Tracker</Heading>
      <CardHolder exercises={ExerciseData} onSelectExercise={handleSelectExercise} />
      {selectedExercise && (
        <Flex direction="column" gap="size-200" marginTop="size-200">
          <Heading level={2}>Selected Exercise: {selectedExercise.exercise}</Heading>
          <Flex direction="row" gap="size-50">
            <NumberField label="Number of sets" value={sets} onChange={setSets} minValue={1} />
            <NumberField label="Weight" value={weight} onChange={setWeight} minValue={0} />
            <NumberField label="Reps" value={reps} onChange={setReps} minValue={0} />
            <Picker label="Unit" selectedKey={unit} onSelectionChange={(key) => setUnit(key as 'kg' | 'lbs')}>
                <Item key="kg">kg</Item>
                <Item key="lbs">lbs</Item>
            </Picker>
          </Flex>
          <Button variant="cta" onPress={handleAddExercise}>Add Exercise to Workout</Button>
        </Flex>
      )}
      <Heading level={2} marginTop="size-200">Your Workout</Heading>
      <Button onPress={handleLogWorkout} variant={'cta'}>Log Workout</Button>
      <Flex direction="column" gap="size-100">
        {trackedExercises.map((exercise, index) => (
          <Flex key={index} justifyContent="space-between">
            <Text>{exercise.exercise} - Sets: {exercise.sets} - Weight: {exercise.weight} {exercise.unit}</Text>
            <Button variant="negative" onPress={() => handleRemoveExercise(index)}>Remove</Button>
          </Flex>
        ))}
      </Flex>
    </View>
  );
};

export default WorkoutTracker;
