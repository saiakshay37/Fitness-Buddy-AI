# 🏋️ Fitness Buddy AI

**An AI-powered fitness web application frontend** built with HTML, CSS, and JavaScript — integrated with **IBM watsonx Orchestrate** embedded web chat for real-time AI coaching.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Chat (watsonx Orchestrate)** | Embedded IBM watsonx agent for personalized fitness advice |
| 📊 **Fitness Dashboard** | KPI cards, weekly activity bar chart, live macro donut ring |
| 🏋️ **Workout Planner** | 7-day split plans with day selector + AI plan generator |
| 🥗 **Macro Calculator** | Mifflin-St Jeor BMR/TDEE with Indian diet suggestions |
| 🍛 **Indian Meal Planner** | High-protein Indian day plan with macro breakdowns |
| 👤 **User Profile** | Save personal stats, diet preference, and fitness goals |
| 🌙 **Dark / Light Mode** | Full theme toggle with persistent preference |
| 📱 **Mobile Responsive** | Bootstrap 5 grid, mobile-first design |
| ⚡ **Animations** | Intersection Observer scroll reveals, hero animations |
| 📝 **Agent Instructions** | Detailed documentation comment block for agent customization |

---

## 📁 Project Structure

```
fitness-buddy-ai/
├── index.html        ← Main app + watsonx embed snippet
├── styles.css        ← All custom styles (dark/light, components)
├── app.js            ← Application logic (charts, calculator, workouts)
└── README.md         ← This file
```

---

## 🚀 Local Deployment & Preview

### Option 1 — Direct File Open (Quickest)
1. Download / clone the project folder
2. Double-click **`index.html`** to open in your browser
3. The app loads immediately — no build step needed

> ⚠️ The IBM watsonx chat widget requires your **Integration ID** and **Service Instance ID** to be configured (see below). Everything else works offline.

---

### Option 2 — VS Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**
2. Install the **Live Server** extension (ritwickdey.LiveServer)
3. Right-click `index.html` → **"Open with Live Server"**
4. Browser auto-opens at `http://127.0.0.1:5500`

---

### Option 3 — Python HTTP Server
```bash
# Python 3
python -m http.server 8080

# Then open: http://localhost:8080
```

---

### Option 4 — Node.js (serve package)
```bash
npm install -g serve
serve .
# Opens at http://localhost:3000
```

---

### Option 5 — Netlify Drop (Zero config deploy)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the project folder
3. Get a live HTTPS URL instantly — shareable link!

---

## 🤖 Connecting IBM watsonx Orchestrate

### Step 1 — Get Your Embed Snippet
1. Log in to [IBM watsonx Orchestrate](https://www.ibm.com/products/watsonx-orchestrate)
2. Navigate to your **Agent** → **Deploy** → **Embed**
3. Select **"Web Chat"** and copy your embed snippet

### Step 2 — Update `index.html`
Find the `watsonAssistantChatOptions` block near the bottom of `index.html`:

```js
window.watsonAssistantChatOptions = {
  integrationID:     "YOUR_INTEGRATION_ID",        // ← Replace this
  region:            "us-south",                    // ← Replace with your region
  serviceInstanceID: "YOUR_SERVICE_INSTANCE_ID",   // ← Replace this
  // ...
};
```

Replace the three placeholder values with your actual credentials from the Orchestrate embed page.

### Step 3 — Region Codes
| Region | Code |
|---|---|
| US South (Dallas) | `us-south` |
| Europe (Frankfurt) | `eu-de` |
| UK South (London) | `eu-gb` |
| Asia Pacific (Tokyo) | `jp-tok` |
| Sydney | `au-syd` |

### Step 4 — Test
Reload the page — the IBM watsonx chat bubble will appear in the bottom-right corner. Click **"Ask AI"** in the navbar to open it programmatically.

---

## 🧠 Agent Instructions & Customization

The `index.html` file contains a large `AGENT INSTRUCTIONS` documentation block (HTML comment) that describes:

- **System prompt / persona** for the fitness coach
- **Fitness specializations** (strength, HIIT, yoga, etc.)
- **Indian food & diet preferences**
- **Workout plan generation rules**
- **Calorie & macro analysis rules**
- **Safety rules** (non-negotiable guardrails)
- **Response format guidelines**
- **Step-by-step instructions** for updating the agent in Orchestrate

### How to Apply Agent Instructions in Orchestrate
1. Open `index.html` and find the comment block at the top of `<body>`
2. Copy the text from `SYSTEM PROMPT / PERSONA` section
3. In Orchestrate: **Agent Builder → Your Agent → System Prompt**
4. Paste the instructions and customize as needed
5. Save and republish your agent
6. Update the embed snippet in `index.html`

---

## 🧮 Macro Calculator — How It Works

The client-side calculator uses the **Mifflin-St Jeor equation**:

```
Male:   BMR = (10 × weight_kg) + (6.25 × height_cm) − (5 × age) + 5
Female: BMR = (10 × weight_kg) + (6.25 × height_cm) − (5 × age) − 161

TDEE = BMR × Activity Factor

Target Calories:
  Maintain: TDEE
  Cut:      TDEE − 500 kcal
  Bulk:     TDEE + 300 kcal

Macro Split (default):
  Protein: 30% of calories ÷ 4 = grams
  Carbs:   40% of calories ÷ 4 = grams
  Fat:     30% of calories ÷ 9 = grams
```

**Safety floors**: 1,500 kcal/day (men) · 1,200 kcal/day (women)

---

## 🍛 Indian Diet Integration

The app prioritises Indian food choices throughout:
- **Macro Calculator** suggests Indian foods based on your goal (cut/bulk/maintain)
- **Meal Planner** shows a complete high-protein Indian day plan with timing and macros
- **AI Agent** (via Orchestrate instructions) recommends dal, paneer, rajma, sprouts, etc.

---

## 🎨 Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure |
| CSS3 + Custom Properties | Design tokens, dark/light mode |
| Bootstrap 5.3 | Responsive grid, components |
| Bootstrap Icons 1.11 | Icon library |
| Chart.js 4.4 | Bar chart + donut ring |
| Google Fonts (Inter) | Typography |
| IBM watsonx Orchestrate | Embedded AI chat agent |
| Vanilla JavaScript (ES6+) | App logic, no frameworks |

---

## ⚙️ Browser Support

| Browser | Status |
|---|---|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Edge 90+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Mobile Chrome/Safari | ✅ Responsive |

---

## 🔒 Privacy & Disclaimer

- **No data leaves your browser** — profile and preferences are stored in `localStorage` only
- The macro calculator is for informational purposes only
- Always consult a certified nutritionist or physician for medical dietary advice
- The AI agent responses are generated by IBM watsonx — review critical health advice with a professional

---

## 📈 Roadmap (Future Enhancements)

- [ ] Progress photo upload and comparison
- [ ] Workout timer with rest intervals
- [ ] Shareable workout plan cards
- [ ] Integration with food API (Open Food Facts)
- [ ] PWA (Progressive Web App) support
- [ ] Export macro plan to PDF

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<div align="center">
  <strong>Built with ❤️ + IBM watsonx Orchestrate</strong><br/>
  <sub>Fitness Buddy AI — Your intelligent wellness companion</sub>
</div>
