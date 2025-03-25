import { DATA_URLS, conversion, DEFAULT_VALUES, FRAME_SETTINGS, COURSE_TYPES } from './config.js';

// Global variables
let wheels = [];
let frames = [];
let isMetric = true;
let wheelChart = null;
let frameChart = null;
let comparisonChart = null;
let referenceSpeeds = {};

// DOM Elements
const domElements = {
  loading: document.getElementById('loading'),
  frameLevel: document.getElementById('frameLevel'),
  compareFrameLevel: document.getElementById('compareFrameLevel'),
  compareFrame1: document.getElementById('compareFrame1'),
  frameChart: document.getElementById('frameChart').getContext('2d'),
  frameResults: document.getElementById('frameResults')
};

// Data Loading
async function loadData() {
  showLoading();
  try {
    const [wheelsResponse, framesResponse] = await Promise.all([
      fetch(DATA_URLS.wheels),
      fetch(DATA_URLS.frames)
    ]);
    
    if (!wheelsResponse.ok || !framesResponse.ok) {
      throw new Error('Failed to load data');
    }
    
    const framesData = await framesResponse.json();
    wheels = await wheelsResponse.json();
    frames = framesData.frames;
    referenceSpeeds = framesData.referenceSpeeds;
    
    loadCustomWheels();
    return true;
  } catch (error) {
    console.error("Error loading data:", error);
    return false;
  } finally {
    hideLoading();
  }
}

// UI Functions
function showLoading() {
  domElements.loading.style.display = 'flex';
}

function hideLoading() {
  domElements.loading.style.display = 'none';
}

function resetInputs() {
  document.getElementById('distance').value = DEFAULT_VALUES.distance;
  document.getElementById('elevation').value = DEFAULT_VALUES.elevation;
  document.getElementById('weight').value = DEFAULT_VALUES.weight;
  document.getElementById('height').value = DEFAULT_VALUES.height;
  document.getElementById('power').value = DEFAULT_VALUES.power;
  document.getElementById('avgSpeed').value = DEFAULT_VALUES.avgSpeed;
  document.getElementById('bikeType').value = DEFAULT_VALUES.bikeType;
  domElements.frameLevel.value = DEFAULT_VALUES.frameLevel;
  
  if (!isMetric) toggleUnits();
}

// Frame Functions
function getCourseType(distance, elevation) {
  const ratio = elevation / distance;
  return ratio > FRAME_SETTINGS.courseTypes.threshold ? COURSE_TYPES.HILLY : COURSE_TYPES.FLAT;
}

function calculateFramePerformance(frame, distance, elevation, power, level = 0) {
  const courseType = getCourseType(distance, elevation);
  const isClimbing = courseType === COURSE_TYPES.HILLY;
  const refSpeeds = isClimbing ? referenceSpeeds.alpe : referenceSpeeds.tempus;
  const refSpeed = refSpeeds[`power${power}`];
  
  const testType = isClimbing ? 'climbTest' : 'flatTest';
  const stageKey = `stage${level}`;
  
  if (!frame[testType] || !frame[testType][stageKey]) {
    console.warn(`Missing performance data for ${frame.name} at level ${level}`);
    return null;
  }
  
  const frameData = frame[testType][stageKey];
  const frameSpeed = frameData.speed;
  const timeGap = frameData.timeGap;
  
  return {
    speed: frameSpeed,
    timeGap: timeGap,
    percentageGap: ((frameSpeed - refSpeed) / refSpeed) * 100,
    courseType: courseType,
    refSpeed: refSpeed
  };
}

function populateFrameDropdowns() {
  const uniqueFrames = [...new Set(frames.map(f => f.name))];
  const selectors = ['compareFrame1', 'compareFrame2', 'compareFrame3'];
  
  selectors.forEach(selector => {
    const select = document.getElementById(selector);
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

function compareFrames() {
  const selectedFrames = [
    domElements.compareFrame1.value,
    document.getElementById('compareFrame2')?.value,
    document.getElementById('compareFrame3')?.value
  ].filter(name => name);
  
  if (selectedFrames.length < 2) {
    alert("Please select at least 2 frames to compare");
    return;
  }
  
  const level = parseInt(domElements.compareFrameLevel.value);
  const inputs = getInputs();
  
  const frameData = selectedFrames.map(name => {
    const frame = frames.find(f => f.name === name && f.power === inputs.power);
    if (!frame) return null;
    
    const performance = calculateFramePerformance(frame, inputs.distance, inputs.elevation, inputs.power, level);
    return performance ? { ...frame, performance } : null;
  }).filter(Boolean);
  
  updateFrameComparison(frameData);
}

function updateFrameComparison(frameData) {
  // Update chart
  if (window.frameChart) window.frameChart.destroy();
  
  window.frameChart = new Chart(domElements.frameChart, {
    type: 'bar',
    data: {
      labels: frameData.map(f => f.name),
      datasets: [
        {
          label: 'Speed (km/h)',
          data: frameData.map(f => f.performance.speed),
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Time Gap (s)',
          data: frameData.map(f => f.performance.timeGap),
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: { 
          beginAtZero: false,
          title: {
            display: true,
            text: 'Performance Metrics'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const frame = frameData[context.dataIndex];
              let label = context.dataset.label;
              let value = context.raw;
              
              if (label === 'Speed (km/h)') {
                return `${label}: ${value.toFixed(2)} (Ref: ${frame.performance.refSpeed.toFixed(2)})`;
              }
              return `${label}: ${value.toFixed(1)}`;
            }
          }
        }
      }
    }
  });
  
  // Update cards
  domElements.frameResults.innerHTML = '';
  
  frameData.forEach(frame => {
    const card = document.createElement('div');
    card.className = 'frame-card';
    card.innerHTML = `
      <h4>${frame.name} (${frame.brand})</h4>
      <p>Type: ${frame.type} | Wheels: ${frame.wheels} | Level: ${domElements.compareFrameLevel.value}</p>
      <p>Course Type: ${frame.performance.courseType === COURSE_TYPES.HILLY ? 'Hilly' : 'Flat'}</p>
      
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
        <div class="frame-stat">
          <strong>Power:</strong> ${frame.power}W
        </div>
      </div>
    `;
    domElements.frameResults.appendChild(card);
  });
}

function clearFrameComparison() {
  ['compareFrame1', 'compareFrame2', 'compareFrame3'].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.value = '';
  });
  domElements.frameResults.innerHTML = '';
  if (window.frameChart) {
    window.frameChart.destroy();
    window.frameChart = null;
  }
}

// Tab Management
function openComparisonTab(tabName) {
  document.querySelectorAll('.comparison-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  document.querySelectorAll('.comparison-tab-button').forEach(button => {
    button.classList.remove('active');
  });
  
  document.getElementById(`${tabName}-comparison`).classList.add('active');
  document.querySelector(`.comparison-tab-button[onclick="openComparisonTab('${tabName}')"]`).classList.add('active');
}

// Initialize application
async function init() {
  const dataLoaded = await loadData();
  if (!dataLoaded) {
    alert("Failed to load equipment data. Some features may not work.");
  }
  
  loadSavedConfigurations();
  updateUnitDisplay();
  populateBrandFilters();
  populateComparisonDropdowns();
  populateFrameDropdowns();
  calculate();
  
  // Set default frame level
  domElements.frameLevel.value = DEFAULT_VALUES.frameLevel;
  domElements.compareFrameLevel.value = DEFAULT_VALUES.frameLevel;
}

window.onload = init;
window.openComparisonTab = openComparisonTab;
window.compareFrames = compareFrames;
window.clearFrameComparison = clearFrameComparison;

// Your existing functions (calculateWheelPerformance, etc.) go here
// ...