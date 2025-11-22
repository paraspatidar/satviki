import React, { useState } from 'react';
import { MEDICAL_HISTORY, SEIZURE_DATA } from './constants.ts';
import { TimelineItem } from './components/TimelineItem.tsx';
import { SeizureChart } from './components/SeizureChart.tsx';
import { EventCategory } from './types.ts';
import { Filter, Calendar, FileText, BrainCircuit } from 'lucide-react';

const App: React.FC = () => {
  const [filter, setFilter] = useState<EventCategory | 'all'>('all');

  const filteredEvents = MEDICAL_HISTORY.filter(
    (event) => filter === 'all' || event.category === filter
  );

  const categories: { value: EventCategory | 'all'; label: string; color: string }[] = [
    { value: 'all', label: 'All Events', color: 'bg-slate-800 text-white' },
    { value: 'symptom', label: 'Symptoms', color: 'bg-red-100 text-red-800' },
    { value: 'finding', label: 'Findings/MRI', color: 'bg-purple-100 text-purple-800' },
    { value: 'action', label: 'Actions/Meds', color: 'bg-blue-100 text-blue-800' },
    { value: 'surgery', label: 'Surgery', color: 'bg-orange-100 text-orange-800' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block">Patient Case Timeline</h1>
            <h1 className="text-xl font-bold text-slate-800 sm:hidden">Timeline</h1>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-sm text-slate-500 font-medium hidden sm:block">7-Year-Old Female Patient</span>
             <button className="p-2 hover:bg-slate-100 rounded-full transition-colors" title="Download Report">
                <FileText className="w-5 h-5 text-slate-600" />
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Summary & Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
             <SeizureChart data={SEIZURE_DATA} />
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Current Status Summary</h3>
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                        <p className="text-sm font-semibold text-slate-700">Seizure Control</p>
                        <p className="text-xs text-slate-500">Controlled (0 episodes) since Aug 2024 with Clobazam & Carbamazepine.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                        <p className="text-sm font-semibold text-slate-700">Neurological Deficits</p>
                        <p className="text-xs text-slate-500">Right homonymous hemianopia, right hand motor decline, squint.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                    <div>
                        <p className="text-sm font-semibold text-slate-700">Genetic Finding (July 2025)</p>
                        <p className="text-xs text-slate-500">DBN1/BRAF fusion detected.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 sticky top-20 z-20 bg-slate-50/95 p-4 rounded-xl backdrop-blur-sm border border-slate-200/50 lg:static lg:bg-transparent lg:border-none lg:p-0">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <Calendar className="w-5 h-5" />
            <span>Timeline Events</span>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
             <div className="flex items-center gap-2 mr-2 text-slate-400 sm:hidden">
                <Filter className="w-4 h-4" />
             </div>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  filter === cat.value
                    ? cat.color + ' shadow-md ring-2 ring-offset-1 ring-indigo-100'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-9 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-slate-200 to-slate-100"></div>

          <div className="space-y-2">
            {filteredEvents.map((event, index) => (
              <TimelineItem 
                key={event.id} 
                event={event} 
                isLeft={index % 2 === 0} // Alternating sides for desktop
              />
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                  <p>No events found for this filter.</p>
              </div>
          )}
        </div>
        
        <div className="mt-16 p-6 bg-slate-100 rounded-lg text-center text-slate-500 text-sm">
            <p>Disclaimer: This visualization is based on provided patient notes. Not for official medical diagnosis.</p>
        </div>

      </main>
    </div>
  );
};

export default App;