import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function RiskTrendChart({ data }) {
  const riskToNumber = (level) => {
    if (level === 'high') return 3;
    if (level === 'medium') return 2;
    if (level === 'low') return 1;
    return 0;
  };
  
  const chartData = data
    .map(item => ({
      date: format(new Date(item.created_date), 'MMM d'),
      risk: riskToNumber(item.risk_level),
    }))
    .reverse();

  const riskLabels = { 1: 'Low', 2: 'Medium', 3: 'High' };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Trend (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis 
              ticks={[1, 2, 3]}
              tickFormatter={(value) => riskLabels[value]}
              domain={[0.5, 3.5]}
            />
            <Tooltip
              formatter={(value) => [riskLabels[value], 'Risk Level']}
            />
            <Area type="monotone" dataKey="risk" stroke="#0d9488" fillOpacity={1} fill="url(#colorRisk)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}