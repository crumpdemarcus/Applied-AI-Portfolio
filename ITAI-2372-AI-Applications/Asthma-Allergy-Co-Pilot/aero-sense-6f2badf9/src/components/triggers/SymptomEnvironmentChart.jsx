import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function SymptomEnvironmentChart({ data }) {
  const severityToNumber = (level) => {
    if (level === 'severe') return 3;
    if (level === 'moderate') return 2;
    if (level === 'mild') return 1;
    return 0;
  };

  const chartData = data
    .map(item => ({
      date: format(new Date(item.created_date), 'MMM d'),
      symptomSeverity: severityToNumber(item.severity_level),
      pollen: item.environmental_factors?.pollen_count || 0,
      aqi: item.environmental_factors?.air_quality_index || 0,
    }))
    .reverse();
    
  const severityLabels = { 1: 'Mild', 2: 'Moderate', 3: 'Severe' };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Symptom vs. Environment Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" stroke="#8884d8" label={{ value: 'Pollen / AQI', angle: -90, position: 'insideLeft' }} />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#82ca9d"
              ticks={[1, 2, 3]}
              tickFormatter={(value) => severityLabels[value]}
              domain={[0, 4]}
              label={{ value: 'Symptom Severity', angle: 90, position: 'insideRight' }}
            />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="pollen" stroke="#f59e0b" name="Pollen" />
            <Line yAxisId="left" type="monotone" dataKey="aqi" stroke="#ef4444" name="AQI" />
            <Line yAxisId="right" type="step" dataKey="symptomSeverity" stroke="#22c55e" name="Symptom Severity" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}