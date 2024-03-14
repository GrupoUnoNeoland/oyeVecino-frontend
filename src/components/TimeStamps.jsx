import React from 'react';
import './TimeStamps.css';
export const TimeStamps = ({ createdAt }) => {
  const creationDate = new Date(createdAt);

  const formatCreationDate = creationDate.toLocaleString('es-ES', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="timestamp-container">
      <p className="timestamp">{formatCreationDate}</p>
    </div>
  );
};
