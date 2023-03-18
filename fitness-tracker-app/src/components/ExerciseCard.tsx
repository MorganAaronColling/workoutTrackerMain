import React from 'react';
import { Text, Flex } from '@adobe/react-spectrum';
import './ExerciseCard.css'


interface Exercise {
  exercise: string;
  category: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
}

interface ExerciseCardProps {
  data: Exercise;
  onClick: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ data, onClick }) => {
  return (
    <button className='card' style={{width: '20em'}} onClick={onClick}>
      <Flex direction="column" gap="size-100">
        <Text>
          <strong>Exercise:</strong> {data.exercise}
        </Text>
        <Text>
          <strong>Category:</strong> {data.category}
        </Text>
        <Text>
          <strong>Primary Muscles:</strong> {data.primaryMuscles.join(', ')}
        </Text>
        <Text>
          <strong>Secondary Muscles:</strong> {data.secondaryMuscles.join(', ')}
        </Text>
      </Flex>
    </button>
  );
};

export default ExerciseCard;
