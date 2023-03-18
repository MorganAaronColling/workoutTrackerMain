import React from "react";


interface ExerciseLog {
  id: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  unit: string;
  date: string;
}


interface ExerciseHistoryProps {
  logs: ExerciseLog[];
}

export const ExerciseHistory: React.FC<ExerciseHistoryProps> = ({ logs }) => {
  const groupedLogs = logs.reduce((acc, log) => {
    if (!acc[log.id]) {
      acc[log.id] = {
        date: log.date,
        logs: [],
      };
    }
    acc[log.id].logs.push(log);
    return acc;
  }, {});

  return (
    <div>
      <h2>Exercise History</h2>
      {Object.entries(groupedLogs).map(([id, group]: any) => (
        <div key={id}>
          <h3>
            Workout ID: {id} - Date: {new Date(group.date).toLocaleDateString()}
          </h3>
          <table>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {group.logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.exercise}</td>
                  <td>{log.sets}</td>
                  <td>{log.reps}</td>
                  <td>{log.weight}</td>
                  <td>{log.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};