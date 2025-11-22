const MEDICAL_HISTORY = [
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
const SEIZURE_DATA = [
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

    // Basic category labels
    const CATEGORY_LABELS = {
      symptom: "Symptom",
      action: "Action / Treatment",
      finding: "Investigation / Finding",
      surgery: "Surgery",
      general: "General"
    };

    const CATEGORY_COLORS = {
      symptom: getComputedStyle(document.documentElement).getPropertyValue("--symptom"),
      action: getComputedStyle(document.documentElement).getPropertyValue("--action"),
      finding: getComputedStyle(document.documentElement).getPropertyValue("--finding"),
      surgery: getComputedStyle(document.documentElement).getPropertyValue("--surgery"),
      general: getComputedStyle(document.documentElement).getPropertyValue("--general")
    };

    const FILTERS = [
      { value: "all", label: "All events" },
      { value: "symptom", label: "Symptoms" },
      { value: "action", label: "Actions / Treatment" },
      { value: "finding", label: "Findings" },
      { value: "surgery", label: "Surgery" },
      { value: "general", label: "General" },
    ];

    let currentFilter = "all";

    function buildFilters() {
      const bar = document.getElementById("filterBar");
      bar.innerHTML = "";
      FILTERS.forEach(f => {
        const btn = document.createElement("button");
        btn.className = "filter-btn" + (currentFilter === f.value ? " active" : "");
        const dot = document.createElement("span");
        dot.className = "filter-dot" + (f.value !== "all" ? " " + f.value : "");
        btn.appendChild(dot);
        const label = document.createElement("span");
        label.textContent = f.label;
        btn.appendChild(label);
        btn.addEventListener("click", () => {
          currentFilter = f.value;
          buildFilters();
          renderTimeline();
        });
        bar.appendChild(btn);
      });
    }

    function formatMonth(date) {
      const d = new Date(date);
      return d.toLocaleString("default", { month: "short", year: "numeric" });
    }

    function renderTimeline() {
      const container = document.getElementById("timeline");
      const noEvents = document.getElementById("noEvents");
      container.innerHTML = "";

      const events = MEDICAL_HISTORY
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .filter(ev => currentFilter === "all" || ev.category === currentFilter);

      if (events.length === 0) {
        noEvents.style.display = "block";
        return;
      } else {
        noEvents.style.display = "none";
      }

      events.forEach((ev, index) => {
        const isLeft = window.innerWidth >= 720 ? index % 2 === 0 : true;

        const wrapper = document.createElement("div");
        wrapper.className = "timeline-item";

        const dot = document.createElement("div");
        dot.className = "timeline-dot";
        wrapper.appendChild(dot);

        const left = document.createElement("div");
        const right = document.createElement("div");
        left.className = "timeline-item-inner";
        right.className = "timeline-item-inner right";

        const card = document.createElement("div");
        card.className = "event-card";

        const badge = document.createElement("div");
        badge.className = "event-badge";
        const badgeDot = document.createElement("span");
        badgeDot.className = "badge-pill " + ev.category;
        const badgeText = document.createElement("span");
        badgeText.textContent = (CATEGORY_LABELS[ev.category] || ev.category).toUpperCase();
        badge.appendChild(badgeDot);
        badge.appendChild(badgeText);

        const title = document.createElement("h3");
        title.className = "event-title";
        title.textContent = ev.title;

        const meta = document.createElement("div");
        meta.className = "event-meta";
        const dateSpan = document.createElement("span");
        dateSpan.textContent = "📅 " + (ev.dateStr || formatMonth(ev.date));
        const catSpan = document.createElement("span");
        catSpan.textContent = "🏷 " + (CATEGORY_LABELS[ev.category] || ev.category);
        meta.appendChild(dateSpan);
        meta.appendChild(catSpan);

        const ul = document.createElement("ul");
        ul.className = "event-points";
        (ev.points || []).forEach(p => {
          const li = document.createElement("li");
          li.textContent = p;
          ul.appendChild(li);
        });

        card.appendChild(badge);
        card.appendChild(title);
        card.appendChild(meta);
        card.appendChild(ul);

        if (ev.details) {
          const details = document.createElement("div");
          details.className = "event-details";
          details.textContent = ev.details;
          card.appendChild(details);
        }

        if (isLeft) {
          left.appendChild(card);
        } else {
          right.appendChild(card);
        }

        wrapper.appendChild(left);
        wrapper.appendChild(right);
        container.appendChild(wrapper);
      });
    }

    function drawSeizureChart() {
      const canvas = document.getElementById("seizureChart");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const devicePixelRatio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const padding = { top: 20, right: 20, bottom: 36, left: 32 };
      const width = rect.width;
      const height = rect.height;
      const usableWidth = width - padding.left - padding.right;
      const usableHeight = height - padding.top - padding.bottom;

      ctx.clearRect(0, 0, width, height);

      const data = SEIZURE_DATA || [];
      if (!data.length) return;

      const maxFreq = Math.max(...data.map(d => d.frequency), 1);

      const xFor = (i) => padding.left + (i / Math.max(data.length - 1, 1)) * usableWidth;
      const yFor = (freq) => padding.top + (1 - freq / maxFreq) * usableHeight;

      // Grid lines
      ctx.strokeStyle = "rgba(51, 65, 85, 0.8)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      const gridSteps = Math.min(5, Math.floor(maxFreq));
      for (let i = 0; i <= gridSteps; i++) {
        const v = (maxFreq / gridSteps) * i;
        const y = yFor(v);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();

        ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
        ctx.font = "10px system-ui";
        ctx.fillText(v.toFixed(1), 4, y + 3);
      }
      ctx.setLineDash([]);

      // Area under curve
      ctx.beginPath();
      ctx.moveTo(xFor(0), yFor(0));
      data.forEach((d, i) => {
        ctx.lineTo(xFor(i), yFor(d.frequency));
      });
      ctx.lineTo(xFor(data.length - 1), yFor(0));
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      gradient.addColorStop(0, "rgba(239,68,68,0.75)");
      gradient.addColorStop(1, "rgba(15,23,42,0.1)");
      ctx.fillStyle = gradient;
      ctx.fill();

      // Line
      ctx.beginPath();
      data.forEach((d, i) => {
        const x = xFor(i);
        const y = yFor(d.frequency);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = "#f97316";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Points & labels
      data.forEach((d, i) => {
        const x = xFor(i);
        const y = yFor(d.frequency);

        // point
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#f97316";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(248, 250, 252, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // special label on x-axis if label is present
        if (d.label) {
          ctx.fillStyle = "#22c55e";
          ctx.font = "10px system-ui";
          ctx.textAlign = "center";
          ctx.fillText(d.label, x, padding.top + usableHeight + 18);
        }
      });

      // X-axis ticks (dates)
      ctx.fillStyle = "rgba(148, 163, 184, 0.85)";
      ctx.font = "9px system-ui";
      ctx.textAlign = "center";
      const step = Math.max(1, Math.floor(data.length / 6));
      data.forEach((d, i) => {
        if (i % step === 0 || i === data.length - 1) {
          const x = xFor(i);
          const y = padding.top + usableHeight + 28;
          ctx.fillText(d.date, x, y);
        }
      });
    }

    function init() {
      buildFilters();
      renderTimeline();
      drawSeizureChart();
      window.addEventListener("resize", () => {
        renderTimeline();
        drawSeizureChart();
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }