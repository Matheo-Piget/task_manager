import React from 'react';

// Version simple des icônes pour le développement
export const Icon = ({ name }) => {
  const icons = {
    'clipboard': '📋',
    'check-circle': '✅',
    'alert-circle': '⚠️',
    'calendar': '📅',
    'user': '👤',
    'settings': '⚙️',
    'log-out': '🚪',
    'home': '🏠',
    'list': '📝',
    'bar-chart-2': '📊',
    'folder': '📁',
    'tag': '🏷️',
  };

  return <span className={`icon icon-${name}`}>{icons[name] || name}</span>;
};

export default Icon;