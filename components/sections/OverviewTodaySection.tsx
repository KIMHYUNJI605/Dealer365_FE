import React from 'react';
import Card from '../common/Card';
import KpiBadge from '../common/KpiBadge';
import { KPIS, RECENT_ACTIVITIES, PIPELINE_DATA } from '../../constants';
import { Users, Car, DollarSign, Activity, Calendar, ArrowRight, MoreHorizontal, Search, Bell } from 'lucide-react';
import { Opportunity } from '../../types';

// Helper to map icon string to component
const IconMap = {
  users: Users,
  car: Car,
  dollar: DollarSign,
  activity: Activity,
};

const OverviewTodaySection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome & Global Search Area (Contextual to Dashboard) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ds-textMain">Welcome back, Yudha!</h1>
          <p className="text-ds-textMuted text-sm mt-1">Here's what's happening in your showroom today.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search customers, VINs, quotes..." 
                    className="pl-10 pr-4 py-2 border border-ds-border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-ds-primary/20 focus:border-ds-primary"
                />
            </div>
            <button className="bg-ds-primary hover:bg-ds-primaryDark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                + New Opportunity
            </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi, idx) => {
          const Icon = IconMap[kpi.icon];
          return (
            <Card key={idx} className="hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg bg-${kpi.color}-50 text-${kpi.color}-600`}>
                    {/* Tailwind requires full class names for tree shaking, using inline style for dynamic color mapping simulation or explicit classes */}
                   <Icon size={20} className={kpi.color === 'emerald' ? 'text-emerald-600' : kpi.color === 'blue' ? 'text-blue-600' : kpi.color === 'purple' ? 'text-purple-600' : 'text-orange-600'} />
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-ds-textMuted">{kpi.label}</p>
                <h2 className="text-2xl font-bold text-ds-textMain">{kpi.value}</h2>
              </div>
              <div className="mt-3">
                <KpiBadge trend={kpi.trend} label={kpi.trendLabel} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Split: Pipeline vs Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Sales Pipeline Preview (Kanban-like List) */}
        <div className="lg:col-span-2 space-y-6">
            <Card title="Hot Opportunities" action={<button className="text-xs font-medium text-ds-primary hover:text-ds-primaryDark flex items-center">View Pipeline <ArrowRight size={12} className="ml-1"/></button>}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-xs text-ds-textMuted border-b border-ds-border">
                                <th className="py-2 pl-2 font-medium">Customer</th>
                                <th className="py-2 font-medium">Model</th>
                                <th className="py-2 font-medium">Stage</th>
                                <th className="py-2 font-medium">Value</th>
                                <th className="py-2 font-medium">Prob.</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {PIPELINE_DATA.map((opp) => (
                                <tr key={opp.id} className="border-b border-ds-border last:border-0 hover:bg-gray-50 group transition-colors">
                                    <td className="py-3 pl-2 flex items-center gap-3">
                                        <img src={opp.avatarUrl} alt="" className="w-8 h-8 rounded-full bg-gray-200 object-cover" />
                                        <span className="font-medium text-ds-textMain">{opp.customerName}</span>
                                    </td>
                                    <td className="py-3 text-ds-textMuted">{opp.modelInterest}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                            ${opp.stage === 'Handover' ? 'bg-emerald-100 text-emerald-700' : 
                                              opp.stage === 'Negotiation' ? 'bg-blue-100 text-blue-700' : 
                                              opp.stage === 'Quotation' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {opp.stage}
                                        </span>
                                    </td>
                                    <td className="py-3 text-ds-textMain font-medium">{opp.value}</td>
                                    <td className="py-3">
                                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-ds-primary" style={{ width: `${opp.probability}%` }}></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Quick Actions / Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button className="p-4 bg-white border border-ds-border rounded-xl shadow-sm hover:border-ds-primary hover:ring-1 hover:ring-ds-primary/20 transition-all group text-left">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Car size={20} />
                    </div>
                    <h4 className="font-semibold text-ds-textMain">Car Configurator</h4>
                    <p className="text-xs text-ds-textMuted mt-1">Build and quote a new vehicle</p>
                </button>
                 <button className="p-4 bg-white border border-ds-border rounded-xl shadow-sm hover:border-ds-primary hover:ring-1 hover:ring-ds-primary/20 transition-all group text-left">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Calendar size={20} />
                    </div>
                    <h4 className="font-semibold text-ds-textMain">Schedule Test Drive</h4>
                    <p className="text-xs text-ds-textMuted mt-1">Book slots for customers</p>
                </button>
                 <button className="p-4 bg-white border border-ds-border rounded-xl shadow-sm hover:border-ds-primary hover:ring-1 hover:ring-ds-primary/20 transition-all group text-left">
                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Users size={20} />
                    </div>
                    <h4 className="font-semibold text-ds-textMain">Customer Check-in</h4>
                    <p className="text-xs text-ds-textMuted mt-1">Walk-in registration</p>
                </button>
            </div>
        </div>

        {/* Right Col: Feed & Calendar */}
        <div className="space-y-6">
            <Card title="Today's Activity" className="h-full">
                <div className="space-y-6 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                    {RECENT_ACTIVITIES.map((activity) => (
                        <div key={activity.id} className="relative pl-10 flex flex-col gap-0.5">
                            <div className={`absolute left-0 top-1 w-7 h-7 rounded-full border-2 border-white shadow-sm flex items-center justify-center z-10
                                ${activity.type === 'check-in' ? 'bg-emerald-100 text-emerald-600' : 
                                  activity.type === 'quotation' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                <Activity size={14} />
                            </div>
                            <p className="text-xs font-semibold text-ds-textMuted">{activity.time}</p>
                            <h4 className="text-sm font-medium text-ds-textMain">{activity.customer}</h4>
                            <p className="text-xs text-gray-500">{activity.detail}</p>
                        </div>
                    ))}
                    
                    <button className="w-full mt-4 py-2 text-xs text-center text-ds-textMuted hover:text-ds-primary hover:bg-gray-50 rounded-lg transition-colors border border-dashed border-gray-200">
                        View all activity
                    </button>
                </div>
            </Card>
        </div>

      </div>
    </div>
  );
};

export default OverviewTodaySection;