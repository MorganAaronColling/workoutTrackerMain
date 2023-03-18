import React, { useState } from 'react';
import { View, Picker, Item, Flex, TextField } from '@adobe/react-spectrum';
import ExerciseCard from './ExerciseCard';


interface Exercise {
  exercise: string;
  category: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
}

interface CardHolderProps {
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
}

const CardHolder: React.FC<CardHolderProps> = ({ exercises, onSelectExercise }) => {
  const [filter, setFilter] = useState('All');
  const [muscleFilter, setMuscleFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredExercises = exercises.filter((e) => {
    const categoryFilterMatch = filter === 'All' || e.category === filter;
    const muscleFilterMatch = muscleFilter === 'All' || e.primaryMuscles.includes(muscleFilter);
    const searchFilterMatch = e.exercise.toLowerCase().includes(search.toLowerCase());
    return categoryFilterMatch && muscleFilterMatch && searchFilterMatch;
  });

  // Sort the exercises alphabetically by exercise name
  const sortedExercises = filteredExercises.sort((a, b) => a.exercise.localeCompare(b.exercise));

  // Get unique primary muscle groups
  const uniqueMuscleGroups = Array.from(
    new Set(exercises.flatMap((exercise) => exercise.primaryMuscles))
  ).sort();

  return (
    <View>
      <TextField
        label="Search by exercise name"
        value={search}
        onChange={setSearch}
        marginBottom="size-100"
      />
      <Picker
        label="Filter by category"
        selectedKey={filter}
        onSelectionChange={(key) => setFilter(key.toString())}
        marginBottom="size-100"
      >
        <Item key="All">All</Item>
        <Item key="Arms">Arms</Item>
        <Item key="Chest">Chest</Item>
        <Item key="Legs">Legs</Item>
        <Item key="Back">Back</Item>
        <Item key="Shoulders">Shoulders</Item>
      </Picker>
      <Picker
        label="Filter by primary muscle group"
        selectedKey={muscleFilter}
        onSelectionChange={(key) => setMuscleFilter(key.toString())}
        marginBottom="size-200"
      >
        <Item key="All">All</Item>
        {(uniqueMuscleGroups as any).map((muscleGroup) => (
          <Item key={muscleGroup}>{muscleGroup}</Item>
        ))}
      </Picker>
      <Flex direction="row" gap="size-200" wrap>
        {sortedExercises.map((exercise, index) => (
          <ExerciseCard key={index} data={exercise} onClick={() => onSelectExercise(exercise)} />
        ))}
      </Flex>
    </View>
  );
};

export default CardHolder;

