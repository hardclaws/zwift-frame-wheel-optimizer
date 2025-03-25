// Configuration constants
export const DATA_URLS = {
  wheels: 'data/wheels.json',
  frames: 'data/frames.json'
};

export const conversion = {
  milesToKm: 1.60934,
  feetToM: 0.3048,
  lbToKg: 0.453592,
  inToCm: 2.54
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