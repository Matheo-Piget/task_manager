import React, { useState, useEffect } from 'react';
import {
  getCompletionTrends,
  getProductivityMetrics,
  getTaskDistribution,
  getCompletionRateByTags
} from '../api/analyticsService';
import CompletionTrendsChart from '../components/analytics/CompletionTrendsChart';
import ProductivityMetricsCard from '../components/analytics/ProductivityMetricsCard';
import DistributionChart from '../components/analytics/DistributionChart'; 
import TagCompletionChart from '../components/analytics/TagCompletionChart';


const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [distributionType, setDistributionType] = useState('status');
  const [completionTrends, setCompletionTrends] = useState([]);
  const [productivityMetrics, setProductivityMetrics] = useState({});
  const [distribution, setDistribution] = useState({});
  const [tagCompletion, setTagCompletion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        
        const [trendsData, metricsData, distData, tagData] = await Promise.all([
          getCompletionTrends(timeRange),
          getProductivityMetrics(),
          getTaskDistribution(distributionType),
          getCompletionRateByTags()
        ]);
        
        setCompletionTrends(trendsData);
        setProductivityMetrics(metricsData);
        setDistribution(distData);
        setTagCompletion(tagData);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [timeRange, distributionType]);
  
  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }
  
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }
  
  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };
  
  const handleDistributionTypeChange = (e) => {
    setDistributionType(e.target.value);
  };
  
  return (
    <div className="analytics-page">
      <h1>Productivity Analytics</h1>
      
      <div className="analytics-metrics">
        <ProductivityMetricsCard metrics={productivityMetrics} />
      </div>
      
      <div className="analytics-chart-container">
        <div className="chart-header">
          <h2>Task Completion Trends</h2>
          <select value={timeRange} onChange={handleTimeRangeChange}>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <CompletionTrendsChart data={completionTrends} />
      </div>
      
      <div className="analytics-chart-container">
        <div className="chart-header">
          <h2>Task Distribution</h2>
          <select value={distributionType} onChange={handleDistributionTypeChange}>
            <option value="status">By Status</option>
            <option value="priority">By Priority</option>
            <option value="project">By Project</option>
          </select>
        </div>
        <DistributionChart data={distribution} type={distributionType} />
      </div>
      
      <div className="analytics-chart-container">
        <h2>Completion Rate by Tags</h2>
        <TagCompletionChart data={tagCompletion} />
      </div>
    </div>
  );
};

export default Analytics;