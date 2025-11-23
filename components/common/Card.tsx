import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  title?: string;
  action?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false, title, action }) => {
  return (
    <div className={`bg-ds-surface rounded-xl border border-ds-border shadow-ds-card overflow-hidden flex flex-col ${className}`}>
      {title && (
        <div className="px-5 py-4 border-b border-ds-border flex justify-between items-center bg-gray-50/50">
          <h3 className="text-sm font-semibold text-ds-textMain uppercase tracking-wide">{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-5'}>
        {children}
      </div>
    </div>
  );
};

export default Card;