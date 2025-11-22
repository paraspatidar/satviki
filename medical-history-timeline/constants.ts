import { MedicalEvent, ChartDataPoint } from './types.ts';

export const MEDICAL_HISTORY: MedicalEvent[] = [
  {
    id: '1',
    dateStr: 'September 2023',
    date: new Date('2023-09-01'),
    title: 'Onset of Focal Seizures',
    category: 'symptom',
    points: [
      'First focal seizure episode observed.',
      'Frequency: ~2 times/month.',
      'Symptoms: Aura (burning smell), urge to vomit (no emesis), lip smacking.',
      'Duration: 1-2 minutes.'
    ],
    details: 'Family consulted Gastrologist, ENT, and Pediatrician but no diagnosis was found.'
  },
  {
    id: '2',
    dateStr: 'November 2023',
    date: new Date('2023-11-01'),
    title: 'Symptom Progression',
    category: 'symptom',
    points: [
      'Frequency increased to 1/week.',
      'New Symptoms: Left side lip twitching, broadening eyes.',
      'Persistent aura (burning smell) and vomiting urge.'
    ],
    details: 'Continued consulting pediatrics.'
  },
  {
    id: '3',
    dateStr: 'Late November 2023',
    date: new Date('2023-11-15'),
    title: 'Worsening Frequency & Speech Loss',
    category: 'symptom',
    points: [
      'Frequency increased to 1-2 times/week.',
      'Duration: 1-2 minutes.',
      'Added Symptom: Inability to talk (blabbering) during episode.',
      'Post-seizure nausea lasts for minutes.'
    ]
  },
  {
    id: '4',
    dateStr: 'January 2024',
    date: new Date('2024-01-01'),
    title: 'Neurology Consult & Diagnosis',
    category: 'finding',
    points: [
      'Neurologist consultation sought.',
      'MRI Performed.',
      'Finding: Lesion in midbrain-temporal lobe.'
    ]
  },
  {
    id: '5',
    dateStr: 'Jan - Feb 2024',
    date: new Date('2024-01-15'),
    title: 'Treatment Strategy & Medication',
    category: 'action',
    points: [
      'Neurosurgeon consultation.',
      'Strategy: Wait-Watch-Compare due to complex lesion location.',
      'Medication: Started Levetiracetam (Ineffective for seizure control).'
    ]
  },
  {
    id: '6',
    dateStr: 'February 2024',
    date: new Date('2024-02-01'),
    title: 'Neuro-Ophthalmology Eval',
    category: 'finding',
    points: [
      'Vision and Fundus: Normal.',
      'Perimetry: Right side homonymous hemianopia detected (impacted right visual field).'
    ]
  },
  {
    id: '7',
    dateStr: 'April 2024',
    date: new Date('2024-04-01'),
    title: 'Differential MRI Check',
    category: 'finding',
    points: [
      'Comparison with Jan 2024 MRI.',
      'Finding: Lesion appears static.',
      'Status: Seizures continuing.',
      'Surgeon Opinion: Biopsy vs Chemo vs Wait & Watch.'
    ]
  },
  {
    id: '8',
    dateStr: 'July 2024',
    date: new Date('2024-07-01'),
    title: 'MRI Follow-up',
    category: 'finding',
    points: [
      'Differential MRI shows no significant difference.',
      'Decision: Continue Wait & Watch.'
    ]
  },
  {
    id: '9',
    dateStr: 'August 2024',
    date: new Date('2024-08-01'),
    title: 'Seizure Control Achieved',
    category: 'action',
    points: [
      'Seizures controlled to zero.',
      'Medication Regimen:',
      '• Clobazam 5 mg (Once/day)',
      '• Carbamazepine 200 mg (Twice/day)'
    ]
  },
  {
    id: '10',
    dateStr: 'September 2024',
    date: new Date('2024-09-01'),
    title: 'Vision Degradation',
    category: 'symptom',
    points: [
      'Right side visual field still impacted.',
      'Eyesight vision degraded.',
      'Intermittent left eye squint.',
      'Repeated MRI: No significant change.',
      'Action: Spectacles started.'
    ]
  },
  {
    id: '11',
    dateStr: 'December 2024',
    date: new Date('2024-12-01'),
    title: 'Motor Skill Decline',
    category: 'symptom',
    points: [
      'Right hand fist usually kept closed.',
      'Degradation in handwriting.',
      'Repeated MRI: No significant change.'
    ]
  },
  {
    id: '12',
    dateStr: 'March 2025',
    date: new Date('2025-03-01'),
    title: 'Symptom Evolution',
    category: 'symptom',
    points: [
      'Less use of right hand.',
      'Seizure auras present, but no actual seizure.'
    ]
  },
  {
    id: '13',
    dateStr: 'April 2025',
    date: new Date('2025-04-01'),
    title: 'Surgical Intervention',
    category: 'surgery',
    points: [
      'Procedure: Left pterional craniotomy with microsurgical excision.',
      'Target: Mesial temporal space-occupying lesion (SOL).',
      'Outcome: ~20% removed, 80% remaining (near optical nerves).',
      'Post-op: Little relief in squint; right hand/vision issues persist.'
    ]
  },
  {
    id: '14',
    dateStr: 'July 2025',
    date: new Date('2025-07-01'),
    title: 'Oncology Reports',
    category: 'finding',
    points: [
      'IHC, FISH, MGMT: Negative.',
      'Tata NGS: Negative.',
      'Medgenome NGS: Positive for DBN1/BRAF fusion.'
    ]
  },
  {
    id: '15',
    dateStr: 'August 2025',
    date: new Date('2025-08-01'),
    title: 'Treatment Planning',
    category: 'action',
    points: [
      'Oncologist Consultations.',
      'Opinions vary: Targeted therapy vs Chemo (V+C).'
    ]
  }
];

// Estimated frequency for chart visualization
// 2/month = 2
// 1/week = ~4.3
// 1-2/week = ~6.5
// Controlled = 0
export const SEIZURE_DATA: ChartDataPoint[] = [
  { date: 'Sep 23', frequency: 2, label: 'Onset' },
  { date: 'Oct 23', frequency: 3, label: '' },
  { date: 'Nov 23', frequency: 4.3, label: '1/week' },
  { date: 'Dec 23', frequency: 6.5, label: 'Peak' },
  { date: 'Jan 24', frequency: 6.5, label: 'Meds Start' },
  { date: 'Feb 24', frequency: 6.0, label: '' },
  { date: 'Mar 24', frequency: 5.0, label: '' },
  { date: 'Apr 24', frequency: 4.0, label: '' },
  { date: 'May 24', frequency: 3.0, label: '' },
  { date: 'Jun 24', frequency: 2.0, label: '' },
  { date: 'Jul 24', frequency: 1.0, label: '' },
  { date: 'Aug 24', frequency: 0, label: 'Controlled' },
  { date: 'Sep 24', frequency: 0, label: '' },
  { date: 'Dec 24', frequency: 0, label: '' },
  { date: 'Mar 25', frequency: 0, label: 'Auras Only' },
  { date: 'Apr 25', frequency: 0, label: 'Surgery' },
  { date: 'Aug 25', frequency: 0, label: '' },
];