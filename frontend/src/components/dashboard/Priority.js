import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
  LOW: '#4299e1', // blue
  MEDIUM: '#48bb78', // green
  HIGH: '#ed8936', // orange
  URGENT: '#f56565' // red
};

const LABELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent'
};

const PriorityChart = ({ data }) => {
  // Format data for the chart
  const chartData = Object.entries(data || {}).map(([priority, count]) => ({
    name: LABELS[priority] || priority,
    value: count,
    color: COLORS[priority] || '#cbd5e0'
  }));

  // Sort by priority level
  const priorityOrder = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
  chartData.sort((a, b) => {
    const indexA = priorityOrder.indexOf(Object.keys(LABELS).find(key => LABELS[key] === a.name));
    const indexB = priorityOrder.indexOf(Object.keys(LABELS).find(key => LABELS[key] === b.name));
    return indexA - indexB;
  });

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip formatter={(value) => [value, 'Tasks']} />
        <Bar dataKey="value">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PriorityChart;