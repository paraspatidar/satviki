import React from 'react';
import { MedicalEvent, EventCategory } from '../types.ts';
import { 
  Activity, 
  Stethoscope, 
  ScanEye, 
  Scissors, 
  AlertCircle,
  Pill
} from 'lucide-react';

interface TimelineItemProps {
  event: MedicalEvent;
  isLeft: boolean;
}

const getIcon = (category: EventCategory) => {
  switch (category) {
    case 'symptom': return <AlertCircle className="w-6 h-6 text-red-500" />;
    case 'action': return <Pill className="w-6 h-6 text-blue-500" />;
    case 'finding': return <ScanEye className="w-6 h-6 text-purple-500" />;
    case 'surgery': return <Scissors className="w-6 h-6 text-orange-500" />;
    default: return <Activity className="w-6 h-6 text-gray-500" />;
  }
};

const getColorClass = (category: EventCategory) => {
  switch (category) {
    case 'symptom': return 'border-red-200 bg-red-50/50';
    case 'action': return 'border-blue-200 bg-blue-50/50';
    case 'finding': return 'border-purple-200 bg-purple-50/50';
    case 'surgery': return 'border-orange-200 bg-orange-50/50';
    default: return 'border-gray-200 bg-gray-50/50';
  }
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ event, isLeft }) => {
  return (
    <div className={`flex items-center justify-between w-full mb-8 ${isLeft ? 'flex-row-reverse' : ''}`}>
      {/* Empty space for the other side */}
      <div className="hidden md:block w-5/12" />

      {/* Center Line Node */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <div className={`w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center bg-white z-10`}>
          {getIcon(event.category)}
        </div>
      </div>

      {/* Content Card */}
      <div className={`w-full pl-12 md:pl-0 md:w-5/12 ${isLeft ? 'md:pr-8 text-left' : 'md:pl-8 text-left'}`}>
        <div 
          className={`p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border ${getColorClass(event.category)} relative group`}
        >
          <div className="flex flex-col">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wide text-gray-500 uppercase bg-white rounded-full w-fit mb-2 border border-gray-100">
              {event.dateStr}
            </span>
            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-900 transition-colors">
              {event.title}
            </h3>
            <ul className="space-y-2">
              {event.points.map((point, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex items-start">
                  <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            {event.details && (
              <div className="mt-4 pt-3 border-t border-dashed border-gray-200 text-xs text-slate-500 italic">
                {event.details}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};