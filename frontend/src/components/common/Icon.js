import React from 'react';

export const Icon = ({ name }) => {
  // Version simplifiée sans bibliothèque d'icônes
  return <span className={`icon-${name}`}>{name}</span>;
};