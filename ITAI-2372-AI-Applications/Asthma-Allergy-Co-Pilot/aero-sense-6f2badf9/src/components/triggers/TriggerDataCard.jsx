import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function TriggerDataCard({ icon: Icon, label, value, unit, level }) {
  const getLevelColor = (level) => {
    switch (level) {
      case 'High':
      case 'Unhealthy':
        return 'bg-red-100 text-red-800';
      case 'Medium':
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
      case 'Good':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <Card className="text-center">
      <CardContent className="p-6">
        <Icon className="w-10 h-10 mx-auto text-slate-500 mb-4" />
        <p className="text-sm font-medium text-slate-600 mb-2">{label}</p>
        <p className="text-4xl font-bold text-slate-900">
          {value}
          {unit && <span className="text-2xl text-slate-500">{unit}</span>}
        </p>
        {level && (
          <div className={`mt-4 inline-block px-3 py-1 text-xs font-semibold rounded-full ${getLevelColor(level)}`}>
            {level}
          </div>
        )}
      </CardContent>
    </Card>
  );
}