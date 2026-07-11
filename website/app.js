/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  Fitness Buddy AI — app.js
 *  IBM watsonx Orchestrate Frontend Application Logic
 * ═══════════════════════════════════════════════════════════════════════════
 */

"use strict";

/* ─────────────────────────────────────────────────────────────────
   1. DATA — Workout Plans (7-day split)
───────────────────────────────────────────────────────────────── */
const WORKOUT_PLANS = {
  0: [ // Monday
    {
      name: "Chest & Triceps",
      type: "strength",
      badge: "badge-strength",
      duration: "55 min",
      sets: "4 sets",
      exercises: [
        { name: "Bench Press",        detail: "4 × 10 @ 70% 1RM" },
        { name: "Incline DB Flyes",   detail: "3 × 12"           },
        { name: "Cable Crossover",    detail: "3 × 15"           },
        { name: "Tricep Pushdown",    detail: "4 × 12"           },
        { name: "Skull Crushers",     detail: "3 × 10"           },
      ]
    },
    {
      name: "Morning LISS Cardio",
      type: "cardio",
      badge: "badge-cardio",
      duration: "30 min",
      sets: "Low intensity",
      exercises: [
        { name: "Treadmill Walk",     detail: "30 min @ 5 km/h"  },
        { name: "Incline (5–8°)",     detail: "Heart rate zone 2"},
      ]
    },
  ],
  1: [ // Tuesday
    {
      name: "Back & Biceps",
      type: "strength",
      badge: "badge-strength",
      duration: "60 min",
      sets: "4 sets",
      exercises: [
        { name: "Pull-ups / Lat PD",  detail: "4 × 10"           },
        { name: "Bent-Over Row",      detail: "4 × 10 @ 65% 1RM" },
        { name: "Seated Cable Row",   detail: "3 × 12"           },
        { name: "Barbell Curl",       detail: "4 × 10"           },
        { name: "Hammer Curl",        detail: "3 × 12"           },
      ]
    },
  ],
  2: [ // Wednesday
    {
      name: "HIIT Conditioning",
      type: "hiit",
      badge: "badge-hiit",
      duration: "35 min",
      sets: "8 rounds",
      exercises: [
        { name: "Burpees",            detail: "40 sec on / 20 off"},
        { name: "Jump Squats",        detail: "40 sec on / 20 off"},
        { name: "Mountain Climbers",  detail: "40 sec on / 20 off"},
        { name: "High Knees",         detail: "40 sec on / 20 off"},
        { name: "Box Jumps",          detail: "40 sec on / 20 off"},
      ]
    },
    {
      name: "Core Finisher",
      type: "strength",
      badge: "badge-strength",
      duration: "15 min",
      sets: "3 rounds",
      exercises: [
        { name: "Plank",              detail: "3 × 60 sec"       },
        { name: "Russian Twists",     detail: "3 × 20 reps"      },
        { name: "Leg Raises",         detail: "3 × 15 reps"      },
      ]
    },
  ],
  3: [ // Thursday
    {
      name: "Shoulders & Traps",
      type: "strength",
      badge: "badge-strength",
      duration: "50 min",
      sets: "4 sets",
      exercises: [
        { name: "OHP (Barbell)",      detail: "4 × 8 @ 65% 1RM"  },
        { name: "Lateral Raises",     detail: "4 × 15"           },
        { name: "Front Raises",       detail: "3 × 12"           },
        { name: "Face Pulls",         detail: "3 × 15"           },
        { name: "Shrugs",             detail: "4 × 12"           },
      ]
    },
  ],
  4: [ // Friday
    {
      name: "Legs — Quad Focus",
      type: "strength",
      badge: "badge-strength",
      duration: "65 min",
      sets: "4–5 sets",
      exercises: [
        { name: "Barbell Squat",      detail: "5 × 8 @ 70% 1RM"  },
        { name: "Leg Press",          detail: "4 × 12"           },
        { name: "Walking Lunges",     detail: "3 × 16 reps"      },
        { name: "Leg Extension",      detail: "4 × 15"           },
        { name: "Calf Raises",        detail: "5 × 20"           },
      ]
    },
  ],
  5: [ // Saturday
    {
      name: "Yoga & Mobility",
      type: "yoga",
      badge: "badge-yoga",
      duration: "45 min",
      sets: "Flow",
      exercises: [
        { name: "Sun Salutation A",   detail: "5 rounds"         },
        { name: "Warrior I & II",     detail: "Hold 60 sec each" },
        { name: "Pigeon Pose",        detail: "2 min each side"  },
        { name: "Seated Forward Fold",detail: "90 sec"           },
        { name: "Savasana",           detail: "10 min"           },
      ]
    },
  ],
  6: [ // Sunday
    {
      name: "Active Rest Day",
      type: "rest",
      badge: "badge-rest",
      duration: "30 min walk",
      sets: "Recovery",
      exercises: [
        { name: "Light Walk",         detail: "20–30 min outdoors"},
        { name: "Foam Rolling",       detail: "Full body 10 min" },
        { name: "Meditation",         detail: "10–15 min"        },
      ]
    },
  ],
};

/* ─────────────────────────────────────────────────────────────────
   2. DATA — Indian Meal Plan (High-Protein Day)
───────────────────────────────────────────────────────────────── */
const INDIAN_MEALS = [
  {
    time: "6:30 AM — Pre-Workout",
    name: "Banana + Soaked Almonds",
    desc: "Quick energy from natural sugars + healthy fats",
    protein: "5g", carbs: "28g", fat: "9g", kcal: "210 kcal"
  },
  {
    time: "8:00 AM — Breakfast",
    name: "Moong Dal Chilla × 3",
    desc: "With paneer stuffing, mint chutney & curd",
    protein: "22g", carbs: "38g", fat: "10g", kcal: "330 kcal"
  },
  {
    time: "11:00 AM — Mid-Morning",
    name: "Masala Chai + Sprout Chaat",
    desc: "Mixed sprouts, onion, tomato, lemon, cumin",
    protein: "12g", carbs: "24g", fat: "4g", kcal: "185 kcal"
  },
  {
    time: "1:30 PM — Lunch",
    name: "Rajma + Brown Rice + Salad",
    desc: "2 katori rajma curry, 1 cup brown rice, cucumber-carrot salad",
    protein: "28g", carbs: "65g", fat: "8g", kcal: "450 kcal"
  },
  {
    time: "4:30 PM — Evening Snack",
    name: "Roasted Chana + Buttermilk",
    desc: "1 handful chana, 1 glass jeera buttermilk",
    protein: "14g", carbs: "22g", fat: "5g", kcal: "190 kcal"
  },
  {
    time: "7:30 PM — Dinner",
    name: "Grilled Fish / Tofu + 2 Roti + Dal",
    desc: "Tandoori-style protein, whole-wheat roti, yellow dal tadka",
    protein: "38g", carbs: "52g", fat: "12g", kcal: "475 kcal"
  },
  {
    time: "9:30 PM — Night Snack",
    name: "Low-Fat Paneer Bhurji",
    desc: "50g paneer, capsicum, tomato, minimal oil",
    protein: "14g", carbs: "6g", fat: "7g", kcal: "145 kcal"
  }
];

/* ─────────────────────────────────────────────────────────────────
   3. DATA — AI Plan Templates
───────────────────────────────────────────────────────────────── */
const AI_PLAN_TEMPLATES = {
  weight_loss_beginner: `💪 AI-Generated Weight Loss Plan (Beginner)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 WEEKLY SPLIT (3 Days)

Day 1 — Full Body Strength
  • Goblet Squat — 3 × 12
  • Push-ups — 3 × 10
  • Dumbbell Row — 3 × 10 each
  • Plank — 3 × 30 sec

Day 2 — Cardio + Core
  • Brisk Walk / Cycling — 30 min
  • Bicycle Crunches — 3 × 20
  • Mountain Climbers — 3 × 30 sec

Day 3 — Full Body + Flexibility
  • Bodyweight Lunges — 3 × 12
  • Pike Push-ups — 3 × 8
  • Superman Hold — 3 × 12
  • Yoga Stretch — 15 min

🥗 NUTRITION POINTER
  • Target: ~1,600–1,800 kcal/day
  • High-protein Indian meals: dal, paneer, eggs, sprouts
  • Drink 2.5–3L water daily

⚡ Warm-up 5 min before each session. Rest 48h between strength days.
Stay consistent — results come in weeks, not days! 🙌`,

  muscle_gain_intermediate: `💪 AI-Generated Muscle Gain Plan (Intermediate)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 WEEKLY SPLIT (5 Days — PPL + Rest)

Day 1 — Push (Chest, Shoulders, Triceps)
  • Bench Press — 4 × 8 @ 70% 1RM
  • OHP — 3 × 10
  • Lateral Raises — 4 × 15
  • Tricep Pushdown — 3 × 12

Day 2 — Pull (Back, Biceps)
  • Deadlift — 4 × 6
  • Pull-ups — 4 × 8
  • Seated Cable Row — 3 × 12
  • Barbell Curl — 4 × 10

Day 3 — Legs
  • Barbell Squat — 5 × 5
  • Leg Press — 4 × 10
  • Romanian Deadlift — 3 × 10
  • Calf Raises — 5 × 20

Day 4–5 — Repeat Push/Pull with +2.5% load

🥗 NUTRITION
  • Calorie surplus: +250–350 kcal above TDEE
  • Protein: 2g per kg body weight
  • Include: paneer, chicken, dal, dahi, tofu

⚡ Progressive overload every week. Sleep 7–9 hours. 💪`,

  endurance_advanced: `💪 AI-Generated Endurance Plan (Advanced)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 WEEKLY SPLIT (6 Days)

Day 1 — Long Run (60–75 min @ Zone 2)
Day 2 — Interval Training (8 × 400m @ 5K pace)
Day 3 — Cycling Cross-Training (45 min)
Day 4 — Tempo Run (20 min @ lactate threshold)
Day 5 — Strength & Mobility (45 min)
Day 6 — Easy Recovery Jog (30 min)
Day 7 — REST & foam roll

🥗 NUTRITION (Endurance focus)
  • Carb-heavy: rice, banana, sweet potato, oats
  • Pre-race: banana + peanut butter roti
  • Post-run: protein shake or curd + fruit
  • Electrolytes: coconut water, nimbu paani

⚡ Zone 2 = 60–70% max HR. Don't skip rest — it's where adaptation happens! 🏃`,

  flexibility_beginner: `💪 AI-Generated Yoga & Flexibility Plan (Beginner)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 WEEKLY ROUTINE (4 Days)

Day 1 — Morning Yoga Flow
  • Surya Namaskar (Sun Salutation) × 6 rounds
  • Warrior I, II, III — 45 sec each
  • Child's Pose — 2 min

Day 2 — Hip & Hamstring Focus
  • Pigeon Pose — 2 min each side
  • Forward Fold — 90 sec
  • Butterfly Stretch — 2 min
  • Happy Baby Pose — 90 sec

Day 3 — Upper Body & Spine
  • Cat-Cow Flow — 2 min
  • Thread the Needle — 90 sec each
  • Seated Twist — 1 min each
  • Cobra → Upward Dog flow — 3 rounds

Day 4 — Restorative + Breathing
  • Legs-up-the-wall — 5 min
  • Pranayama (Anulom Vilom) — 10 min
  • Yoga Nidra / Savasana — 15 min

🥗 Light Indian diet: fruits, sprouts, curd, light khichdi
⚡ Practice on an empty stomach in the morning for best results. 🙏`,

  recomp_intermediate: `💪 AI-Generated Body Recomposition Plan (Intermediate)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 WEEKLY SPLIT (4 Days — Upper/Lower)

Day 1 — Upper Body Strength
  • Bench Press — 4 × 8
  • DB Row — 4 × 10
  • OHP — 3 × 10
  • Face Pulls — 3 × 15

Day 2 — Lower Body Power
  • Front Squat — 4 × 8
  • Hip Thrust — 4 × 12
  • Step-ups — 3 × 12 each
  • Nordic Curl — 3 × 6

Day 3 — HIIT (20 min) + Core
  • Tabata Protocol: 8 rounds
  • Plank variations — 10 min

Day 4 — Upper Body Hypertrophy + Mobility
  • Cable Flyes — 4 × 15
  • Lat Pulldown — 4 × 12
  • Isolation curls/extensions — 3 × 15 each
  • 15 min yoga cool-down

🥗 NUTRITION (Recomp)
  • Match calories to TDEE (±100 kcal)
  • Protein: 2–2.2g/kg body weight
  • Cycle carbs: higher on training days, lower on rest

⚡ Recomp takes time (3–6 months) — track with photos, not just scale weight! 📸`
};

/* ─────────────────────────────────────────────────────────────────
   4. UTILITY FUNCTIONS
───────────────────────────────────────────────────────────────── */
function showToast(message, type = "success") {
  const existing = document.querySelector(".toast-notify");
  if (existing) existing.remove();

  const icon = type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill";
  const toast = document.createElement("div");
  toast.className = `toast-notify${type === "error" ? " error" : ""}`;
  toast.innerHTML = `<i class="bi ${icon}"></i><span>${message}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3400);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function animateCounters() {
  document.querySelectorAll(".stat-num").forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 24);
  });
}

function observeCards() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = (parseInt(e.target.dataset.delay) || 0);
        setTimeout(() => e.target.classList.add("visible"), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".animate-card").forEach(el => io.observe(el));
}

/* ─────────────────────────────────────────────────────────────────
   5. THEME TOGGLE
───────────────────────────────────────────────────────────────── */
function initTheme() {
  const btn  = document.getElementById("themeToggle");
  const html = document.documentElement;
  const saved = localStorage.getItem("fb_theme") || "dark";
  html.dataset.theme = saved;
  updateThemeIcon(saved);

  btn.addEventListener("click", () => {
    const next = html.dataset.theme === "dark" ? "light" : "dark";
    html.dataset.theme = next;
    localStorage.setItem("fb_theme", next);
    updateThemeIcon(next);
    redrawCharts();
  });
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("themeToggle");
  btn.innerHTML = theme === "dark"
    ? '<i class="bi bi-sun-fill"></i>'
    : '<i class="bi bi-moon-stars-fill"></i>';
}

/* ─────────────────────────────────────────────────────────────────
   6. CHARTS
───────────────────────────────────────────────────────────────── */
let weeklyChartInst = null;
let macroRingInst   = null;

function getChartColors() {
  const isDark = document.documentElement.dataset.theme !== "light";
  return {
    grid:  isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
    label: isDark ? "#8892a4" : "#5a6478",
    bg:    isDark ? "#1a1e2b" : "#ffffff",
  };
}

function buildWeeklyChart() {
  const ctx = document.getElementById("weeklyChart");
  if (!ctx) return;
  const c = getChartColors();
  const labels  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const calories = [1840, 1620, 2100, 1780, 2050, 900, 600];
  const steps    = [84, 72, 91, 68, 88, 45, 30];

  if (weeklyChartInst) { weeklyChartInst.destroy(); weeklyChartInst = null; }

  weeklyChartInst = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Calories Burned",
          data: calories,
          backgroundColor: "rgba(255,123,75,0.75)",
          borderColor:     "#ff7b4b",
          borderWidth: 1.5,
          borderRadius: 6,
          yAxisID: "y",
        },
        {
          label: "Steps (×100)",
          data: steps,
          type: "line",
          borderColor: "#3b9eff",
          backgroundColor: "rgba(59,158,255,0.10)",
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#3b9eff",
          pointRadius: 4,
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(15,18,28,0.95)",
          titleColor: "#e8eaf0",
          bodyColor: "#8892a4",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 10,
        },
      },
      scales: {
        x: {
          grid: { color: c.grid },
          ticks: { color: c.label, font: { size: 12 } },
        },
        y: {
          grid: { color: c.grid },
          ticks: { color: c.label, font: { size: 12 } },
          position: "left",
        },
        y1: {
          grid: { drawOnChartArea: false },
          ticks: { color: c.label, font: { size: 12 } },
          position: "right",
        },
      },
    },
  });
}

function buildMacroRing() {
  const ctx = document.getElementById("macroRing");
  if (!ctx) return;
  if (macroRingInst) { macroRingInst.destroy(); macroRingInst = null; }

  macroRingInst = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Protein", "Carbs", "Fat"],
      datasets: [{
        data: [140, 210, 58],
        backgroundColor: ["#6c63ff", "#ff7b4b", "#ffd166"],
        borderColor: "transparent",
        borderWidth: 0,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: false,
      cutout: "72%",
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(15,18,28,0.95)",
          titleColor: "#e8eaf0",
          bodyColor: "#8892a4",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.raw}g`
          }
        },
      },
    },
  });
}

function redrawCharts() {
  setTimeout(() => { buildWeeklyChart(); buildMacroRing(); }, 80);
}

/* ─────────────────────────────────────────────────────────────────
   7. WORKOUT CARDS RENDERER
───────────────────────────────────────────────────────────────── */
function renderWorkoutCards(dayIndex) {
  const container = document.getElementById("workoutCardsRow");
  const plans = WORKOUT_PLANS[dayIndex] || [];
  container.innerHTML = "";

  if (!plans.length) {
    container.innerHTML = `<div class="col-12 text-center text-muted py-4">No workouts for this day.</div>`;
    return;
  }

  plans.forEach((plan, i) => {
    const items = plan.exercises.map(e =>
      `<li>${e.name}<span>${e.detail}</span></li>`
    ).join("");

    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4";
    card.innerHTML = `
      <div class="workout-card">
        <span class="workout-badge ${plan.badge}">${plan.type}</span>
        <div class="workout-name">${plan.name}</div>
        <div class="workout-meta">
          <span><i class="bi bi-clock me-1"></i>${plan.duration}</span>
          <span><i class="bi bi-layers me-1"></i>${plan.sets}</span>
        </div>
        <ul class="workout-exercise-list">${items}</ul>
        <button class="btn-start-workout" onclick="startWorkout('${plan.name}')">
          <i class="bi bi-play-fill me-1"></i>Start Workout
        </button>
      </div>`;
    container.appendChild(card);
  });
}

function startWorkout(name) {
  showToast(`🏋️ Starting: ${name} — Let's go!`);
}

function initDaySelector() {
  const buttons = document.querySelectorAll(".day-btn");
  const today   = new Date().getDay();          // 0=Sun … 6=Sat
  const mapped  = today === 0 ? 6 : today - 1; // Map to Mon=0…Sun=6

  buttons.forEach(btn => {
    if (parseInt(btn.dataset.day) === mapped) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderWorkoutCards(parseInt(btn.dataset.day));
    });
  });

  renderWorkoutCards(mapped);
}

/* ─────────────────────────────────────────────────────────────────
   8. AI PLAN GENERATOR
───────────────────────────────────────────────────────────────── */
function initAIPlanGenerator() {
  document.getElementById("generatePlanBtn").addEventListener("click", () => {
    const goal  = document.getElementById("aiGoal").value;
    const level = document.getElementById("aiLevel").value;
    const btn   = document.getElementById("generatePlanBtn");
    const result = document.getElementById("aiPlanResult");

    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Generating...`;
    btn.disabled  = true;

    setTimeout(() => {
      const key = `${goal}_${level}`;
      const plan = AI_PLAN_TEMPLATES[key] ||
        AI_PLAN_TEMPLATES[`${goal}_intermediate`] ||
        AI_PLAN_TEMPLATES["weight_loss_beginner"];

      result.classList.remove("d-none");
      result.textContent = plan;
      result.scrollIntoView({ behavior: "smooth", block: "nearest" });

      btn.innerHTML = `<i class="bi bi-lightning-charge-fill me-2"></i>Generate AI Plan`;
      btn.disabled  = false;

      showToast("AI plan generated! 🎉 Ask the Buddy AI chat for more customization.");
    }, 1600);
  });
}

/* ─────────────────────────────────────────────────────────────────
   9. MACRO CALCULATOR (Mifflin-St Jeor)
───────────────────────────────────────────────────────────────── */
let selectedGoal = "maintain";

function initMacroCalculator() {
  // Goal pills
  document.querySelectorAll(".goal-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".goal-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      selectedGoal = pill.dataset.goal;
    });
  });

  document.getElementById("calcBtn").addEventListener("click", calculateMacros);
}

function calculateMacros() {
  const age      = parseInt(document.getElementById("calcAge").value);
  const gender   = document.getElementById("calcGender").value;
  const weight   = parseFloat(document.getElementById("calcWeight").value);
  const height   = parseFloat(document.getElementById("calcHeight").value);
  const activity = parseFloat(document.getElementById("calcActivity").value);

  if (!age || !weight || !height || age < 10 || weight < 30 || height < 100) {
    showToast("Please fill in all fields correctly.", "error");
    return;
  }

  // Mifflin-St Jeor BMR
  let bmr = gender === "male"
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;

  const tdee = Math.round(bmr * activity);

  let targetCals = tdee;
  if (selectedGoal === "cut")  targetCals -= 500;
  if (selectedGoal === "bulk") targetCals += 300;

  // Safety floor
  const minCals = gender === "male" ? 1500 : 1200;
  if (targetCals < minCals) {
    targetCals = minCals;
    showToast(`Minimum safe calories set to ${minCals} kcal. Consult a dietitian.`, "error");
  }

  // Macros (30P / 40C / 30F)
  const protein = Math.round((targetCals * 0.30) / 4);
  const carbs   = Math.round((targetCals * 0.40) / 4);
  const fat     = Math.round((targetCals * 0.30) / 9);

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  const bmiClass = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";

  // Render
  document.getElementById("resBMR").textContent   = `${Math.round(bmr)} kcal`;
  document.getElementById("resTDEE").textContent  = `${tdee} kcal`;
  document.getElementById("resTarget").textContent= `${targetCals} kcal`;
  document.getElementById("resBMI").textContent   = `${bmi} (${bmiClass})`;

  const barsHtml = `
    <div class="macro-bar-item">
      <div class="mb-label"><span>🔵 Protein</span><span>${protein}g · ${Math.round(targetCals*0.30)} kcal</span></div>
      <div class="mb-bar"><div class="mb-fill protein" style="width:30%"></div></div>
    </div>
    <div class="macro-bar-item">
      <div class="mb-label"><span>🟠 Carbohydrates</span><span>${carbs}g · ${Math.round(targetCals*0.40)} kcal</span></div>
      <div class="mb-bar"><div class="mb-fill carbs" style="width:40%"></div></div>
    </div>
    <div class="macro-bar-item">
      <div class="mb-label"><span>🟡 Fat</span><span>${fat}g · ${Math.round(targetCals*0.30)} kcal</span></div>
      <div class="mb-bar"><div class="mb-fill fat" style="width:30%"></div></div>
    </div>`;

  document.getElementById("macroBars").innerHTML = barsHtml;

  // Indian food suggestions by goal
  const indianFoods = {
    maintain: ["Moong Dal (1 katori)", "Paneer (100g)", "Brown Rice (1 cup)", "Curd (1 katori)", "Roti × 2"],
    cut:      ["Grilled Fish (150g)", "Sprout Salad", "Khichdi (½ cup)", "Buttermilk", "Fruits"],
    bulk:     ["Rajma-Chawal", "Paneer Paratha × 2", "Banana Shake", "Mixed Dals", "Peanut Chikki"],
  };

  const tags = (indianFoods[selectedGoal] || indianFoods.maintain)
    .map(f => `<span class="meal-tag">${f}</span>`).join("");

  document.getElementById("indianMeals").innerHTML =
    `<h6>🥗 Suggested Indian Foods (${selectedGoal})</h6>${tags}`;

  document.getElementById("macroResults").classList.remove("d-none");
  document.getElementById("resultPlaceholder").classList.add("d-none");

  // Update dashboard macro ring live
  updateDashboardMacros(protein, carbs, fat);
  showToast("Macros calculated! 🎯");
}

function updateDashboardMacros(p, c, f) {
  document.getElementById("macroProtein").textContent = `${p}g`;
  document.getElementById("macroCarbs").textContent   = `${c}g`;
  document.getElementById("macroFat").textContent     = `${f}g`;
  if (macroRingInst) {
    macroRingInst.data.datasets[0].data = [p, c, f];
    macroRingInst.update();
  }
}

/* ─────────────────────────────────────────────────────────────────
   10. MEAL CARDS RENDERER
───────────────────────────────────────────────────────────────── */
function renderIndianMealCards() {
  const container = document.getElementById("indianMealCards");
  container.innerHTML = "";

  INDIAN_MEALS.forEach(meal => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4 col-xl-3";
    col.innerHTML = `
      <div class="meal-item-card">
        <div class="meal-time">${meal.time}</div>
        <div class="meal-name">${meal.name}</div>
        <div class="meal-desc">${meal.desc}</div>
        <div class="meal-macros">
          <span class="mm p">P: ${meal.protein}</span>
          <span class="mm c">C: ${meal.carbs}</span>
          <span class="mm f">F: ${meal.fat}</span>
          <span class="mm k">${meal.kcal}</span>
        </div>
      </div>`;
    container.appendChild(col);
  });
}

/* ─────────────────────────────────────────────────────────────────
   11. USER PROFILE
───────────────────────────────────────────────────────────────── */
const PROFILE_KEY = "fb_profile";

function loadProfile() {
  const saved = localStorage.getItem(PROFILE_KEY);
  if (!saved) return;
  const p = JSON.parse(saved);

  if (p.name)       document.getElementById("profileName").value    = p.name;
  if (p.email)      document.getElementById("profileEmail").value   = p.email;
  if (p.age)        document.getElementById("profileAge").value     = p.age;
  if (p.weight)     document.getElementById("profileWeight").value  = p.weight;
  if (p.height)     document.getElementById("profileHeight").value  = p.height;
  if (p.diet)       document.getElementById("profileDiet").value    = p.diet;
  if (p.goal)       document.getElementById("profileGoal").value    = p.goal;
  if (p.conditions) document.getElementById("profileConditions").value = p.conditions;

  refreshProfileDisplay(p);
}

function refreshProfileDisplay(p) {
  if (p.name) {
    const initials = p.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    document.getElementById("profileAvatarDisplay").textContent  = initials;
    document.getElementById("profileDisplayName").textContent    = p.name;
  }
  if (p.weight) document.getElementById("pdWeight").textContent = `${p.weight}kg`;
  if (p.height) document.getElementById("pdHeight").textContent = `${p.height}cm`;
  if (p.weight && p.height) {
    const bmi = (p.weight / ((p.height / 100) ** 2)).toFixed(1);
    document.getElementById("pdBMI").textContent = bmi;
  }
}

function initProfile() {
  loadProfile();

  document.getElementById("saveProfileBtn").addEventListener("click", () => {
    const p = {
      name:       document.getElementById("profileName").value.trim(),
      email:      document.getElementById("profileEmail").value.trim(),
      age:        document.getElementById("profileAge").value,
      weight:     document.getElementById("profileWeight").value,
      height:     document.getElementById("profileHeight").value,
      diet:       document.getElementById("profileDiet").value,
      goal:       document.getElementById("profileGoal").value,
      conditions: document.getElementById("profileConditions").value.trim(),
    };

    if (!p.name) { showToast("Please enter your name.", "error"); return; }

    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    refreshProfileDisplay(p);
    showToast("Profile saved! 👤");
  });
}

/* ─────────────────────────────────────────────────────────────────
   12. NAVBAR SCROLL HIGHLIGHT
───────────────────────────────────────────────────────────────── */
function initNavHighlight() {
  const sections = ["dashboard", "workouts", "nutrition", "profile"];
  const navLinks  = document.querySelectorAll(".nav-pill");

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

/* ─────────────────────────────────────────────────────────────────
   13. WATSONX CHAT TRIGGER BUTTONS
───────────────────────────────────────────────────────────────── */
function initChatButtons() {
  const openButtons = ["openChatBtn", "heroStartBtn", "quickAskBtn"];
  openButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("click", () => {
      // Trigger watsonx Orchestrate embedded chat
      // wxo embed: try the launcher button injected by wxoLoader
      const chatBtn = document.querySelector(
        "[class*='wxo-launcher'], [id*='wxo-launcher'], " +
        "[class*='WACLauncher'] button, .IBMChatLauncher"
      );
      if (chatBtn) {
        chatBtn.click();
      } else if (window.wxoLoader && typeof wxoLoader.open === "function") {
        wxoLoader.open();
      } else {
        showToast("Opening AI coach — look for the chat bubble at the bottom-right! 💬");
      }
    });
  });

  document.getElementById("quickCalcBtn").addEventListener("click", () => {
    scrollToSection("nutrition");
    setTimeout(() => document.getElementById("calcAge").focus(), 500);
  });
}

/* ─────────────────────────────────────────────────────────────────
   14. LIVE KPI PULSE (simulated updates)
───────────────────────────────────────────────────────────────── */
function startKpiPulse() {
  const stepsEl = document.getElementById("kpiSteps");
  let steps = 8420;
  setInterval(() => {
    const increment = Math.floor(Math.random() * 15);
    steps += increment;
    stepsEl.textContent = steps.toLocaleString("en-IN");
  }, 4000);
}

/* ─────────────────────────────────────────────────────────────────
   15. BOOTSTRAP NAVBAR ACTIVE LINK SMOOTH CLOSE
───────────────────────────────────────────────────────────────── */
function initNavLinks() {
  document.querySelectorAll(".nav-pill[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
      // Close mobile menu
      const toggler = document.querySelector(".navbar-collapse");
      if (toggler && toggler.classList.contains("show")) {
        new bootstrap.Collapse(toggler).hide();
      }
    });
  });
}

/* ─────────────────────────────────────────────────────────────────
   16. BOOTSTRAP TOOLTIPS
───────────────────────────────────────────────────────────────── */
function initTooltips() {
  const els = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  els.forEach(el => new bootstrap.Tooltip(el));
}

/* ─────────────────────────────────────────────────────────────────
   17. INIT — Entry Point
───────────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  buildWeeklyChart();
  buildMacroRing();
  initDaySelector();
  initAIPlanGenerator();
  initMacroCalculator();
  renderIndianMealCards();
  initProfile();
  initNavHighlight();
  initChatButtons();
  initNavLinks();
  initTooltips();
  observeCards();
  animateCounters();
  startKpiPulse();

  // Welcome toast on first visit
  if (!localStorage.getItem("fb_welcomed")) {
    setTimeout(() => {
      showToast("Welcome to Fitness Buddy AI! 💪 Ask the AI coach anything.");
      localStorage.setItem("fb_welcomed", "1");
    }, 1800);
  }
});
