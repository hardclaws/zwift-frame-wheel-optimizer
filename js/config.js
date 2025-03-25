// Configuration constants
export const DATA_URLS = {
  // GitHub Pages path (must match your repo name exactly)
  wheels: '/zwift-wheel-optimizer/data/wheels.json',
  frames: '/zwift-wheel-optimizer/data/frames.json',
  
  // Local development paths
  localWheels: './data/wheels.json',
  localFrames: './data/frames.json',
  
  // Raw GitHub fallback
  rawWheels: 'https://raw.githubusercontent.com/hardclaws/zwift-wheel-optimizer/main/data/wheels.json',
  rawFrames: 'https://raw.githubusercontent.com/hardclaws/zwift-wheel-optimizer/main/data/frames.json'
};

export const DEFAULT_VALUES = {
  distance: 40,
  elevation: 1000,
  weight: 75,
  height: 175,
  power: 300,
  avgSpeed: 25,
  bikeType: 'carbon',
  frameLevel: 0
};

export const FRAME_SETTINGS = {
  levelOptions: [0, 5],
  defaultLevel: 0,
  courseTypes: {
    FLAT: 'tempus',
    HILLY: 'alpe',
    threshold: 0.02 // elevation/distance ratio threshold
  }
};

export const COURSE_TYPES = {
  FLAT: 'flat',
  HILLY: 'hilly',
  MIXED: 'mixed'
};
