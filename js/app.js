import { DATA_URLS, DEFAULT_VALUES } from './config.js';

// Global variables with multiple fallback options
let wheels = [];
let frames = [];
let referenceSpeeds = {};
let isMetric = true;

// 1. SUPER ROBUST DATA LOADER
async function loadEquipmentData() {
  const loadAttempts = [
    // Attempt 1: GitHub Pages paths
    async () => {
      const [w, f] = await Promise.all([
        fetch(DATA_URLS.wheels),
        fetch(DATA_URLS.frames)
      ]);
      return { wheels: await w.json(), framesData: await f.json() };
    },
    
    // Attempt 2: Local development paths
    async () => {
      const [w, f] = await Promise.all([
        fetch(DATA_URLS.localWheels),
        fetch(DATA_URLS.localFrames)
      ]);
      return { wheels: await w.json(), framesData: await f.json() };
    },
    
    // Attempt 3: Raw GitHub fallback
    async () => {
      const [w, f] = await Promise.all([
        fetch(DATA_URLS.rawWheels),
        fetch(DATA_URLS.rawFrames)
      ]);
      return { wheels: await w.json(), framesData: await f.json() };
    }
  ];

  for (const attempt of loadAttempts) {
    try {
      const { wheels: w, framesData: f } = await attempt();
      if (w && f?.frames && f?.referenceSpeeds) {
        wheels = w;
        frames = f.frames;
        referenceSpeeds = f.referenceSpeeds;
        console.log('Data loaded successfully');
        return true;
      }
    } catch (e) {
      console.warn('Load attempt failed:', e.message);
    }
  }

  // Ultimate fallback if all attempts fail
  wheels = [{
    name: "Zwift 32mm Carbon",
    brand: "Zwift",
    type: "allround",
    flat: 0,
    climb: 0,
    bikeType: "carbon",
    power: 300
  }];

  frames = [{
    name: "Zwift Carbon",
    type: "road",
    wheels: "Zwift 32mm Carbon",
    flatTest: { stage0: { speed: 24.5, timeGap: 0 } },
    climbTest: { stage0: { speed: 9.2, timeGap: 0 } },
    power: 300
  }];

  referenceSpeeds = {
    tempus: { power300: 24.5877, power150: 18.9856 },
    alpe: { power300: 9.2049, power150: 4.7855 }
  };

  return false;
}

// 2. INITIALIZATION
async function init() {
  // Show loading state
  document.getElementById('loading').style.display = 'flex';
  
  try {
    const dataLoaded = await loadEquipmentData();
    
    if (!dataLoaded) {
      console.warn("Using fallback data - some features may be limited");
    }

    // Initialize rest of app
    setupEventListeners();
    populateDropdowns();
    calculate();
    
  } catch (error) {
    console.error("Initialization failed:", error);
    alert("App failed to initialize. Please check console for details.");
  } finally {
    document.getElementById('loading').style.display = 'none';
  }
}

// 3. CORE FUNCTIONS
function calculate() {
  const inputs = getInputs();
  
  // Wheel calculations
  const wheelResults = calculateWheelPerformance(inputs);
  
  // Frame calculations
  const frameLevel = parseInt(document.getElementById('frameLevel').value) || 0;
  const frameResults = frames
    .filter(f => f.power === inputs.power)
    .map(f => ({
      ...f,
      performance: calculateFramePerformance(f, inputs.distance, inputs.elevation, inputs.power, frameLevel)
    }))
    .filter(f => f.performance)
    .sort((a, b) => b.performance.timeGap - a.performance.timeGap);

  updateUI(wheelResults, frameResults);
}

function getInputs() {
  return {
    distance: parseFloat(document.getElementById('distance').value) || DEFAULT_VALUES.distance,
    elevation: parseFloat(document.getElementById('elevation').value) || DEFAULT_VALUES.elevation,
    weight: parseFloat(document.getElementById('weight').value) || DEFAULT_VALUES.weight,
    height: isMetric ? 
      (parseFloat(document.getElementById('height').value) || DEFAULT_VALUES.height :
      ((parseFloat(document.getElementById('heightFeet').value || 0) * 12 + 
       (parseFloat(document.getElementById('heightInches').value || 0)) * 2.54,
    power: parseFloat(document.getElementById('power').value) || DEFAULT_VALUES.power,
    avgSpeed: parseFloat(document.getElementById('avgSpeed').value) || DEFAULT_VALUES.avgSpeed,
    bikeType: document.getElementById('bikeType').value || DEFAULT_VALUES.bikeType
  };
}

// 4. START THE APP
document.addEventListener('DOMContentLoaded', init);

// Public API
window.calculate = calculate;
window.toggleUnits = toggleUnits;
