import React from 'react';

const ProductivityMetricsCard = ({ metrics }) => {
  return (
    <div className="productivity-metrics">
      <div className="metric-card">
        <h3>Completion Rate</h3>
        <div className="metric-value">{metrics.completionRate}%</div>
      </div>
      
      <div className="metric-card">
        <h3>Avg. Completion Time</h3>
        <div className="metric-value">{metrics.averageCompletionTime} days</div>
      </div>
      
      <div className="metric-card">
        <h3>Tasks Completed This Week</h3>
        <div className="metric-value">{metrics.tasksCompletedThisWeek}</div>
      </div>
      
      <div className="metric-card">
        <h3>Overdue Tasks</h3>
        <div className="metric-value">{metrics.overdueTasks}</div>
      </div>
    </div>
  );
};

export default ProductivityMetricsCard;