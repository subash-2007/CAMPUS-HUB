
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getVolunteersPerDepartment, getEventParticipationTrends, getVenueUsage } from '../../services/analyticsService';
import { events as mockEvents, registrations as mockRegistrations } from '../../services/mockData';

const AnalyticsPage: React.FC = () => {
  const volunteersPerDept = getVolunteersPerDepartment(mockRegistrations);
  const participationTrends = getEventParticipationTrends(mockRegistrations);
  const venueUsage = getVenueUsage(mockEvents);

  const ChartContainer = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-xl font-semibold text-gray-700">{title}</h2>
      <div style={{ width: '100%', height: 300 }}>
        {children}
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartContainer title="Volunteers per Department">
          <ResponsiveContainer>
            <BarChart data={volunteersPerDept}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#2563eb" name="Volunteers" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Venue Usage">
          <ResponsiveContainer>
            <BarChart data={venueUsage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#eab308" name="Events Held" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="lg:col-span-2">
            <ChartContainer title="Event Participation Trends">
            <ResponsiveContainer>
                <LineChart data={participationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#1d4ed8" name="Registrations" />
                </LineChart>
            </ResponsiveContainer>
            </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
