import React from 'react';
import { Icon } from '../common/Icon';

const StatCard = ({ title, value, percentage, icon, color }) => {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">
        <Icon name={icon} />
      </div>
      <div className="stat-content">
        <h3>{title}</h3>
        <div className="stat-value">{value}</div>
        {percentage !== undefined && (
          <div className="stat-percentage">
            {percentage.toFixed(1)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;