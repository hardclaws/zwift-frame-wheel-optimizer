import { DATA_URLS, conversion, DEFAULT_VALUES, FRAME_SETTINGS, COURSE_TYPES } from './config.js';

// Global Variables
let wheels = [];
let frames = [];
let referenceSpeeds = {};
let isMetric = true;
let wheelChart = null;
let frameChart = null;
let comparisonChart = null;

// DOM Elements
const domElements = {
  loading: document.getElementById('loading'),
  frameLevel: document.getElementById('frameLevel'),
  compareFrameLevel: document.getElementById('compareFrameLevel'),
  compareFrame1: document.getElementById('compareFrame1'),
  compareFrame2: document.getElementById('compareFrame2'),
  compareFrame3: document.getElementById('compareFrame3'),
  frameChart: document.getElementById('frameChart')?.getContext('2d'),
  frameResults: document.getElementById('frameResults'),
  wheelChart: document.getElementById('wheelChart')?.getContext('2d'),
  resultsTable: document.getElementById('results'),
  summaryTable: document.getElementById('summary')
};

// 1. Data Loading Functions
async function loadData() {
  showLoading();
  try {
    // Try multiple path configurations
    const wheelsData = await tryFetchPaths([
      DATA_URLS.wheels,
      '/data/wheels.json',
      './data/wheels.json'
    ]);
    
    const framesData = await tryFetchPaths([
      DATA_URLS.frames,
      '/data/frames.json',
      './data/frames.json'
    ]);

    wheels = wheelsData || [];
    frames = framesData?.frames || [];
    referenceSpeeds = framesData?.referenceSpeeds || {
      tempus: { power300: 24.5877, power150: 18.9856 },
      alpe: { power300: 9.2049, power150: 4.7855 }
    };

    loadCustomWheels();
    return true;
  } catch (error) {
    console.error("Data loading error:", error);
    return false;
  } finally {
    hideLoading();
  }
}

async function tryFetchPaths(paths) {
  for (const path of paths) {
    try {
      const response = await fetch(path);
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn(`Failed to load from ${path}`, e);
    }
  }
  throw new Error("All data load attempts failed");
}

// 2. Core Calculation Functions
function calculate() {
  const inputs = getInputs();
  const wheelResults = calculateWheelPerformance(inputs);
  const frameResults = calculateFramePerformanceAll(inputs);
  
  updateWheelResults(wheelResults);
  updateFrameResults(frameResults);
}

function getInputs() {
  return {
    distance: parseFloat(document.getElementById('distance').value) || DEFAULT_VALUES.distance,
    elevation: parseFloat(document.getElementById('elevation').value) || DEFAULT_VALUES.elevation,
    weight: parseFloat(document.getElementById('weight').value) || DEFAULT_VALUES.weight,
    height: isMetric ? 
      (parseFloat(document.getElementById('height').value) || DEFAULT_VALUES.height :
      ((parseFloat(document.getElementById('heightFeet').value || 0) * 12 + 
       (parseFloat(document.getElementById('heightInches').value || 0)) * conversion.inToCm,
    power: parseFloat(document.getElementById('power').value) || DEFAULT_VALUES.power,
    avgSpeed: parseFloat(document.getElementById('avgSpeed').value) || DEFAULT_VALUES.avgSpeed,
    bikeType: document.getElementById('bikeType').value || DEFAULT_VALUES.bikeType,
    frameLevel: parseInt(domElements.frameLevel.value) || DEFAULT_VALUES.frameLevel
  };
}

// 3. Wheel Calculations
function calculateWheelPerformance(inputs) {
  if (!wheels.length) return [];

  const climbingRatio = Math.min(Math.max(
    (inputs.elevation / 1000) / (inputs.distance / 40) * (inputs.weight / 75),
    0, 1
  );

  const referencePower = inputs.power >= 225 ? 300 : 150;
  let relevantWheels = wheels.filter(wheel => 
    wheel.bikeType === inputs.bikeType && 
    wheel.power === referencePower
  );

  relevantWheels = applyActiveFilters(relevantWheels);

  return relevantWheels.map(wheel => {
    const distanceFactor = inputs.distance / 40;
    const weightFactor = inputs.weight / 75;
    const heightFactor = 1 + (inputs.height - 175) * 0.002;

    const flatSavings = wheel.flat * distanceFactor * weightFactor * heightFactor;
    const climbSavings = wheel.climb * distanceFactor * weightFactor * heightFactor;
    const totalSavings = (flatSavings * (1 - climbingRatio)) + (climbSavings * climbingRatio);

    return {
      ...wheel,
      flatSavings,
      climbSavings,
      totalSavings
    };
  }).sort((a, b) => b.totalSavings - a.totalSavings);
}

// 4. Frame Calculations
function calculateFramePerformanceAll(inputs) {
  if (!frames.length) return [];

  return frames
    .filter(frame => frame.power === inputs.power)
    .map(frame => {
      const performance = calculateFramePerformance(
        frame, 
        inputs.distance, 
        inputs.elevation, 
        inputs.power, 
        inputs.frameLevel
      );
      return performance ? { ...frame, performance } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.performance.timeGap - a.performance.timeGap);
}

function calculateFramePerformance(frame, distance, elevation, power, level = 0) {
  const courseType = getCourseType(distance, elevation);
  const isClimbing = courseType === COURSE_TYPES.HILLY;
  const refSpeeds = isClimbing ? referenceSpeeds.alpe : referenceSpeeds.tempus;
  const refSpeed = refSpeeds[`power${power}`];

  if (!refSpeed) return null;

  const testType = isClimbing ? 'climbTest' : 'flatTest';
  const stageKey = `stage${level}`;
  const frameData = frame[testType]?.[stageKey];

  if (!frameData) return null;

  return {
    speed: frameData.speed,
    timeGap: frameData.timeGap,
    percentageGap: ((frameData.speed - refSpeed) / refSpeed) * 100,
    courseType,
    refSpeed
  };
}

// 5. UI Update Functions
function updateWheelResults(results) {
  if (!domElements.wheelChart || !domElements.resultsTable) return;

  // Update Wheel Chart
  if (wheelChart) wheelChart.destroy();
  
  wheelChart = new Chart(domElements.wheelChart, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Wheel Performance',
        data: results.map(wheel => ({
          x: wheel.flatSavings,
          y: wheel.climbSavings,
          name: wheel.name
        })),
        backgroundColor: results.map(wheel => 
          wheel.totalSavings === Math.max(...results.map(r => r.totalSavings)) 
            ? 'rgba(33, 150, 243, 0.8)' 
            : 'rgba(200, 200, 200, 0.6)'
      }]
    },
    options: {
      scales: {
        x: { title: { text: 'Flat Savings (seconds)' } },
        y: { title: { text: 'Climb Savings (seconds)' } }
      }
    }
  });

  // Update Results Table
  const baseTime = (getInputs().distance / getInputs().avgSpeed) * 3600;
  domElements.resultsTable.innerHTML = `
    <tr>
      <th>Wheel</th><th>Brand</th><th>Total Savings</th>
      <th>Flat Savings</th><th>Climb Savings</th>
      <th>Est. Time</th><th>% Gain</th>
    </tr>
    ${results.map((wheel, index) => {
      const totalTime = baseTime - wheel.totalSavings;
      const percentageGain = (wheel.totalSavings / baseTime) * 100;
      return `
        <tr ${index === 0 ? 'class="best"' : ''}>
          <td>${wheel.name}</td><td>${wheel.brand || '-'}</td>
          <td>${wheel.totalSavings.toFixed(1)}s</td>
          <td>${wheel.flatSavings.toFixed(1)}s</td>
          <td>${wheel.climbSavings.toFixed(1)}s</td>
          <td>${formatTime(totalTime)}</td>
          <td>${percentageGain.toFixed(2)}%</td>
        </tr>
      `;
    }).join('')}
  `;
}

function updateFrameResults(results) {
  if (!domElements.frameChart || !domElements.frameResults) return;

  // Update Frame Chart
  if (frameChart) frameChart.destroy();
  
  if (results.length > 0) {
    frameChart = new Chart(domElements.frameChart, {
      type: 'bar',
      data: {
        labels: results.map(f => f.name),
        datasets: [
          {
            label: 'Speed (km/h)',
            data: results.map(f => f.performance.speed),
            backgroundColor: 'rgba(54, 162, 235, 0.7)'
          },
          {
            label: 'Time Gap (s)',
            data: results.map(f => f.performance.timeGap),
            backgroundColor: 'rgba(255, 99, 132, 0.7)'
          }
        ]
      }
    });

    // Update Frame Results Cards
    domElements.frameResults.innerHTML = results.map(frame => `
      <div class="frame-card">
        <h4>${frame.name} (${frame.brand})</h4>
        <p>Type: ${frame.type} | Wheels: ${frame.wheels} | Level: ${getInputs().frameLevel}</p>
        <div class="frame-stats">
          <div class="frame-stat ${frame.performance.timeGap > 0 ? 'good' : 'bad'}">
            <strong>Time Gap:</strong> ${frame.performance.timeGap > 0 ? '+' : ''}${frame.performance.timeGap.toFixed(1)}s
          </div>
          <div class="frame-stat">
            <strong>Speed:</strong> ${frame.performance.speed.toFixed(2)}km/h
          </div>
          <div class="frame-stat">
            <strong>Reference:</strong> ${frame.performance.refSpeed.toFixed(2)}km/h
          </div>
        </div>
      </div>
    `).join('');
  }
}

// 6. Helper Functions
function getCourseType(distance, elevation) {
  return (elevation / distance) > FRAME_SETTINGS.courseTypes.threshold 
    ? COURSE_TYPES.HILLY 
    : COURSE_TYPES.FLAT;
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours}h ${minutes}m ${secs}s`;
}

function showLoading() {
  if (domElements.loading) domElements.loading.style.display = 'flex';
}

function hideLoading() {
  if (domElements.loading) domElements.loading.style.display = 'none';
}

// 7. Initialization
async function init() {
  const dataLoaded = await loadData();
  if (!dataLoaded) {
    alert("Failed to load equipment data. Some features may not work.");
  }

  setupEventListeners();
  populateDropdowns();
  calculate();
}

function setupEventListeners() {
  document.getElementById('unitSlider')?.addEventListener('click', toggleUnits);
  document.getElementById('frameLevel')?.addEventListener('change', calculate);
  // Add other event listeners as needed
}

function populateDropdowns() {
  // Populate frame dropdowns
  const uniqueFrames = [...new Set(frames.map(f => f.name))];
  ['compareFrame1', 'compareFrame2', 'compareFrame3'].forEach(id => {
    const select = document.getElementById(id);
    if (select) {
      select.innerHTML = '<option value="">Select a frame</option>';
      uniqueFrames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
      });
    }
  });
}

// Start the application
window.addEventListener('DOMContentLoaded', init);

// Public API
window.calculate = calculate;
window.compareFrames = compareFrames;
window.openComparisonTab = openComparisonTab;
window.toggleUnits = toggleUnits;
