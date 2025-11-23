import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface KpiBadgeProps {
  trend: number;
  label?: string;
}

const KpiBadge: React.FC<KpiBadgeProps> = ({ trend, label }) => {
  const isPositive = trend > 0;
  const isNeutral = trend === 0;

  let colorClass = 'text-gray-500 bg-gray-100';
  let Icon = Minus;

  if (isPositive) {
    colorClass = 'text-emerald-700 bg-emerald-50';
    Icon = ArrowUpRight;
  } else if (!isNeutral) {
    colorClass = 'text-rose-700 bg-rose-50';
    Icon = ArrowDownRight;
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colorClass}`}>
        <Icon size={12} className="mr-1" />
        {Math.abs(trend)}%
      </span>
      {label && <span className="text-xs text-ds-textMuted">{label}</span>}
    </div>
  );
};

export default KpiBadge;