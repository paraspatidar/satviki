export type EventCategory = 'symptom' | 'action' | 'finding' | 'surgery' | 'general';

export interface MedicalEvent {
  id: string;
  dateStr: string;
  date: Date;
  title: string;
  category: EventCategory;
  points: string[];
  details?: string;
}

export interface ChartDataPoint {
  date: string;
  frequency: number; // Seizures per month (estimated)
  label: string;
}
