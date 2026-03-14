import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function FactorsList({ factors, recommendations }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-yellow-700 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Contributing Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {factors.map((factor, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500" />
                <span className="text-slate-700">{factor}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-green-700 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            Educational Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                <span className="text-slate-700">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}