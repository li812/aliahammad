import React, { useState, useEffect } from 'react';
import {
  FaUsers,
  FaEnvelope,
  FaEye,
  FaDownload,
  FaChartLine,
  FaCalendarAlt,
  FaGlobe,
  FaMobile,
  FaDesktop,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const Stats = () => {
  const [stats, setStats] = useState({
    totalVisitors: 12450,
    totalInquiries: 234,
    portfolioViews: 8760,
    cvDownloads: 156,
    visitorGrowth: 12.5,
    inquiryGrowth: -3.2,
    viewGrowth: 8.7,
    downloadGrowth: 15.3
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'inquiry',
      message: 'New contact form submission from John Doe',
      timestamp: '2 minutes ago',
      icon: <FaEnvelope />
    },
    {
      id: 2,
      type: 'view',
      message: 'Portfolio viewed from United States',
      timestamp: '5 minutes ago',
      icon: <FaEye />
    },
    {
      id: 3,
      type: 'download',
      message: 'CV downloaded by visitor',
      timestamp: '12 minutes ago',
      icon: <FaDownload />
    },
    {
      id: 4,
      type: 'view',
      message: 'Portfolio viewed from India',
      timestamp: '18 minutes ago',
      icon: <FaEye />
    },
    {
      id: 5,
      type: 'inquiry',
      message: 'New contact form submission from Sarah Smith',
      timestamp: '25 minutes ago',
      icon: <FaEnvelope />
    }
  ]);

  const [deviceStats, setDeviceStats] = useState([
    { device: 'Desktop', percentage: 65, count: 8092 },
    { device: 'Mobile', percentage: 28, count: 3486 },
    { device: 'Tablet', percentage: 7, count: 872 }
  ]);

  const [topPages, setTopPages] = useState([
    { page: 'Home', views: 3245, percentage: 37 },
    { page: 'Projects', views: 2156, percentage: 25 },
    { page: 'About', views: 1834, percentage: 21 },
    { page: 'Contact', views: 987, percentage: 11 },
    { page: 'Experience', views: 538, percentage: 6 }
  ]);

  const statCards = [
    {
      title: 'Total Visitors',
      value: stats.totalVisitors.toLocaleString(),
      change: stats.visitorGrowth,
      icon: <FaUsers />,
      color: '#00d9ff',
      colorDark: '#0ea5e9'
    },
    {
      title: 'Inquiries',
      value: stats.totalInquiries.toLocaleString(),
      change: stats.inquiryGrowth,
      icon: <FaEnvelope />,
      color: '#9333ea',
      colorDark: '#7c3aed'
    },
    {
      title: 'Portfolio Views',
      value: stats.portfolioViews.toLocaleString(),
      change: stats.viewGrowth,
      icon: <FaEye />,
      color: '#10b981',
      colorDark: '#059669'
    },
    {
      title: 'CV Downloads',
      value: stats.cvDownloads.toLocaleString(),
      change: stats.downloadGrowth,
      icon: <FaDownload />,
      color: '#f59e0b',
      colorDark: '#d97706'
    }
  ];

  const formatChange = (change) => {
    const isPositive = change > 0;
    const isNegative = change < 0;
    
    return {
      value: Math.abs(change),
      isPositive,
      isNegative,
      className: isPositive ? 'positive' : isNegative ? 'negative' : 'neutral'
    };
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards Grid */}
      <div className="stats-grid">
        {statCards.map((stat, index) => {
          const change = formatChange(stat.change);
          return (
            <div
              key={index}
              className="stat-card"
              style={{
                '--stat-color': stat.color,
                '--stat-color-dark': stat.colorDark
              }}
            >
              <div className="stat-header">
                <div className="stat-title">{stat.title}</div>
                <div className="stat-icon">{stat.icon}</div>
              </div>
              
              <div className="stat-value">{stat.value}</div>
              
              <div className={`stat-change ${change.className}`}>
                {change.isPositive && <FaArrowUp />}
                {change.isNegative && <FaArrowDown />}
                <span>{change.value}% from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
          </div>
          <div className="card-body p-0">
            <div className="space-y-0">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Device Breakdown</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {deviceStats.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {device.device === 'Desktop' && <FaDesktop size={14} />}
                      {device.device === 'Mobile' && <FaMobile size={14} />}
                      {device.device === 'Tablet' && <FaDesktop size={14} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{device.device}</p>
                      <p className="text-xs text-gray-500">{device.count.toLocaleString()} visits</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{device.percentage}%</p>
                    <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3 className="card-title">Top Pages</h3>
        </div>
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Views</th>
                  <th>Percentage</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-2">
                        <FaGlobe className="text-gray-400" size={14} />
                        <span className="font-medium">{page.page}</span>
                      </div>
                    </td>
                    <td>{page.views.toLocaleString()}</td>
                    <td>{page.percentage}%</td>
                    <td>
                      <div className="w-full max-w-[100px]">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${page.percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="action-btn primary flex items-center justify-center gap-2 p-4">
              <FaChartLine />
              <span>View Analytics</span>
            </button>
            <button className="action-btn primary flex items-center justify-center gap-2 p-4">
              <FaEnvelope />
              <span>Check Inquiries</span>
            </button>
            <button className="action-btn primary flex items-center justify-center gap-2 p-4">
              <FaDownload />
              <span>Export Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;