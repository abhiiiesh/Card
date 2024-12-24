
import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MSMEDigitalDashboard = () => {
  const [msmeData] = useState({
    businessInfo: {
      name: "Sample Digital MSME",
      type: "Small",
      sector: "Digital Services",
      vintage: "5 years"
    },
    scores: {
      totalScore: 725,
      financial: 70,
      business: 75,
      social: 78,
      digital: 72
    }
  });

  const pieData = [
    { name: 'Financial Score', value: 35, color: '#3B82F6' },
    { name: 'Business Health', value: 25, color: '#10B981' },
    { name: 'Social Impact', value: 25, color: '#F59E0B' },
    { name: 'Digital Presence', value: 15, color: '#8B5CF6' }
  ];

  const detailedScores = [
    { category: 'Financial Health', score: 72, weight: '15%', type: 'Financial' },
    { category: 'Revenue Growth', score: 68, weight: '10%', type: 'Financial' },
    { category: 'Working Capital', score: 70, weight: '10%', type: 'Financial' },
    { category: 'Market Presence', score: 75, weight: '15%', type: 'Business' },
    { category: 'Customer Base', score: 77, weight: '10%', type: 'Business' },
    { category: 'Employment Generation', score: 82, weight: '8%', type: 'Social' },
    { category: 'Skill Development', score: 78, weight: '7%', type: 'Social' },
    { category: 'Community Initiatives', score: 74, weight: '5%', type: 'Social' },
    { category: 'Digital Inclusion', score: 76, weight: '5%', type: 'Social' },
    { category: 'Online Reputation', score: 73, weight: '5%', type: 'Digital' },
    { category: 'Digital Adoption', score: 71, weight: '5%', type: 'Digital' },
    { category: 'Cybersecurity', score: 69, weight: '5%', type: 'Digital' }
  ];

  const getScoreColor = (score) => {
    if (score >= 750) return 'text-green-500';
    if (score >= 650) return 'text-blue-500';
    if (score >= 500) return 'text-yellow-500';
    return 'text-red-500';
  };

  const renderCustomLabel = (props) => {
    const { name, value } = props;
    return `${name} (${value}%)`;
  };



  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 shadow-lg rounded-lg border border-gray-200">
          <p className="text-gray-900 font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center md:text-left">
                Digital Business Social-Financial Score
              </h1>
              <p className="text-gray-600 text-lg text-center md:text-left">
                Type: <span className="font-medium">{msmeData.businessInfo.type}</span> | 
                Sector: <span className="font-medium">{msmeData.businessInfo.sector}</span>
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl px-8 py-6 shadow-inner">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(msmeData.scores.totalScore)}`}>
                {msmeData.scores.totalScore}
              </div>
              <div className="text-gray-600 font-medium text-lg">Final Score</div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Score Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={renderCustomLabel}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Component Scores</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={detailedScores} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="category" 
                    angle={-45} 
                    textAnchor="end" 
                    height={80} 
                    interval={0}
                    tick={{ fontSize: 12, fill: '#4B5563' }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fontSize: 12, fill: '#4B5563' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="score" 
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Financial & Business Metrics */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial & Business Metrics</h2>
            <div className="space-y-4">
              {detailedScores
                .filter(score => ['Financial', 'Business'].includes(score.type))
                .map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-lg text-gray-900">{item.category}</div>
                        <div className="text-sm text-gray-600">Weight: {item.weight}</div>
                      </div>
                      <div className="text-2xl font-bold text-blue-500">{item.score}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Social & Digital Impact */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Social & Digital Impact</h2>
            <div className="space-y-4">
              {detailedScores
                .filter(score => ['Social', 'Digital'].includes(score.type))
                .map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-lg text-gray-900">{item.category}</div>
                        <div className="text-sm text-gray-600">Weight: {item.weight}</div>
                      </div>
                      <div className="text-2xl font-bold text-blue-500">{item.score}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MSMEDigitalDashboard;