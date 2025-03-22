import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = {
  TODO: '#4299e1', // blue
  IN_PROGRESS: '#ed8936', // orange
  DONE: '#48bb78', // green
  ARCHIVED: '#a0aec0' // gray
};

const LABELS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  ARCHIVED: 'Archived'
};

const StatusChart = ({ data }) => {
  // Format data for the chart
  const chartData = Object.entries(data || {}).map(([status, count]) => ({
    name: LABELS[status] || status,
    value: count,
    color: COLORS[status] || '#cbd5e0'
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [value, 'Tasks']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusChart;