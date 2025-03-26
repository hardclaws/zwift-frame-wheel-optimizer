const wheels = [
    {
        name: "Bontrager Aeolus5",
        brand: "Bontrager",
        type: "aero",
        performance: {
            road: { flat: 17.29, climb: -4.22 },
            tt: { flat: 19.66, climb: -3.34 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "CADEX 36",
        brand: "CADEX",
        type: "aero",
        performance: {
            road: { flat: 5.23, climb: 5.28 },
            tt: { flat: 5.99, climb: 5.81 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "CADEX 42",
        brand: "CADEX",
        type: "aero",
        performance: {
            road: { flat: 14.69, climb: 5.55 },
            tt: { flat: 16.15, climb: 6.37 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "CADEX 65",
        brand: "CADEX",
        type: "aero",
        performance: {
            road: { flat: 31.73, climb: 1.37 },
            tt: { flat: 35.91, climb: 2.19 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Campagnolo Bora Ultra 35",
        brand: "Campagnolo",
        type: "aero",
        performance: {
            road: { flat: -0.40, climb: 1.88 },
            tt: { flat: -0.03, climb: 2.51 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Campagnolo Bora Ultra 50",
        brand: "Campagnolo",
        type: "aero",
        performance: {
            road: { flat: 24.55, climb: 3.25 },
            tt: { flat: 27.29, climb: 4.02 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "DTSwiss ARC 1100 DICUT 62",
        brand: "DTSwiss",
        type: "aero",
        performance: {
            road: { flat: 39.24, climb: -1.13 },
            tt: { flat: 44.11, climb: -0.08 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "DTSwiss ARC 1100 DICUT DISC",
        brand: "DTSwiss",
        type: "aero",
        performance: {
            road: { flat: 48.16, climb: -24.87 },
            tt: { flat: 66.24, climb: -21.58 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Enve SES 2.2",
        brand: "Enve",
        type: "aero",
        performance: {
            road: { flat: 0.10, climb: 3.25 },
            tt: { flat: -0.01, climb: 2.83 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Enve SES 3.4",
        brand: "Enve",
        type: "aero",
        performance: {
            road: { flat: 24.16, climb: 4.89 },
            tt: { flat: 26.98, climb: 5.18 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Enve SES 6.7",
        brand: "Enve",
        type: "aero",
        performance: {
            road: { flat: 30.75, climb: 3.17 },
            tt: { flat: 34.28, climb: 3.70 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Enve SES 7.8",
        brand: "Enve",
        type: "aero",
        performance: {
            road: { flat: 45.07, climb: -1.84 },
            tt: { flat: 50.69, climb: -0.72 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Enve SES 8.9",
        brand: "Enve",
        type: "aero",
        performance: {
            road: { flat: 46.71, climb: -9.70 },
            tt: { flat: 52.46, climb: -8.60 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "FFWD RYOT55",
        brand: "FFWD",
        type: "aero",
        performance: {
            road: { flat: 23.16, climb: -8.57 },
            tt: { flat: 26.31, climb: -7.60 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Giant SLR 0",
        brand: "Giant",
        type: "aero",
        performance: {
            road: { flat: 20.78, climb: 5.08 },
            tt: { flat: 23.68, climb: 5.97 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "HED Vanquish RC6 Pro",
        brand: "HED",
        type: "aero",
        performance: {
            road: { flat: 14.23, climb: -4.22 },
            tt: { flat: 15.92, climb: -3.15 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Lightweight Meilenstein",
        brand: "Lightweight",
        type: "aero",
        performance: {
            road: { flat: 11.76, climb: 8.57 },
            tt: { flat: 12.75, climb: 9.12 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Mavic Comete Pro Carbon SL UST",
        brand: "Mavic",
        type: "aero",
        performance: {
            road: { flat: 24.09, climb: -4.69 },
            tt: { flat: 26.86, climb: -3.70 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Mavic Cosmic CXR60c",
        brand: "Mavic",
        type: "aero",
        performance: {
            road: { flat: 20.18, climb: -12.55 },
            tt: { flat: 22.54, climb: -10.91 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Mavic Cosmic Ultimate UST",
        brand: "Mavic",
        type: "aero",
        performance: {
            road: { flat: 17.79, climb: 5.08 },
            tt: { flat: 20.25, climb: 6.05 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Novatec R4",
        brand: "Novatec",
        type: "aero",
        performance: {
            road: { flat: 2.55, climb: -6.18 },
            tt: { flat: 2.57, climb: -5.22 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Roval Alpinist CLX",
        brand: "Roval",
        type: "aero",
        performance: {
            road: { flat: 11.45, climb: 8.17 },
            tt: { flat: 12.82, climb: 8.00 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Roval CLX64",
        brand: "Roval",
        type: "aero",
        performance: {
            road: { flat: 33.89, climb: 2.74 },
            tt: { flat: 38.35, climb: 3.50 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Roval Rapide CLX",
        brand: "Roval",
        type: "aero",
        performance: {
            road: { flat: 27.16, climb: 4.18 },
            tt: { flat: 30.76, climb: 5.53 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Shimano C40",
        brand: "Shimano",
        type: "aero",
        performance: {
            road: { flat: 9.80, climb: 1.45 },
            tt: { flat: 11.13, climb: 2.35 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Shimano C50",
        brand: "Shimano",
        type: "aero",
        performance: {
            road: { flat: 18.87, climb: -3.17 },
            tt: { flat: 21.37, climb: -1.95 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Shimano C60",
        brand: "Shimano",
        type: "aero",
        performance: {
            road: { flat: 25.36, climb: -5.51 },
            tt: { flat: 28.34, climb: -4.62 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zipp 202",
        brand: "Zipp",
        type: "aero",
        performance: {
            road: { flat: 3.73, climb: 1.96 },
            tt: { flat: 4.40, climb: 2.51 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zipp 353 NSW",
        brand: "Zipp",
        type: "aero",
        performance: {
            road: { flat: 27.35, climb: 8.64 },
            tt: { flat: 31.02, climb: 9.28 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zipp 404",
        brand: "Zipp",
        type: "aero",
        performance: {
            road: { flat: 30.21, climb: 0.20 },
            tt: { flat: 33.99, climb: 1.71 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zipp 454",
        brand: "Zipp",
        type: "aero",
        performance: {
            road: { flat: 34.00, climb: 7.31 },
            tt: { flat: 38.08, climb: 7.56 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zipp 808",
        brand: "Zipp",
        type: "aero",
        performance: {
            road: { flat: 35.86, climb: -3.36 },
            tt: { flat: 40.21, climb: -2.47 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zipp 808/Super9",
        brand: "Zipp",
        type: "aero",
        performance: {
            road: { flat: 44.64, climb: -22.72 },
            tt: { flat: 62.09, climb: -20.66 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zipp 858",
        brand: "Zipp",
        type: "aero",
        performance: {
            road: { flat: 39.59, climb: 0.70 },
            tt: { flat: 44.50, climb: 2.47 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zipp 858/Super9",
        brand: "Zipp",
        type: "aero",
        performance: {
            road: { flat: 48.52, climb: -20.49 },
            tt: { flat: 66.38, climb: -18.16 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zwift 32mm Carbon",
        brand: "Zwift",
        type: "aero",
        performance: {
            road: { flat: 0, climb: -1.13 },
            tt: { flat: 0, climb: 0 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zwift 50mm Carbon",
        brand: "Zwift",
        type: "aero",
        performance: {
            road: { flat: 11.42, climb: -3.32 },
            tt: { flat: 12.57, climb: -2.63 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zwift Atomic Cruiser 2024",
        brand: "Zwift",
        type: "aero",
        performance: {
            road: { flat: -1.48, climb: -21.78 },
            tt: { flat: -1.40, climb: -20.23 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zwift Buffalo Fahrrad",
        brand: "Zwift",
        type: "aero",
        performance: {
            road: { flat: -6.82, climb: -21.74 },
            tt: { flat: -7.50, climb: -21.22 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zwift Classic",
        brand: "Zwift",
        type: "aero",
        performance: {
            road: { flat: -6.16, climb: -12.55 },
            tt: { flat: -7.07, climb: -12.66 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zwift Groovy Time Trial",
        brand: "Zwift",
        type: "aero",
        performance: {
            road: { flat: 34.17, climb: -26.32 },
            tt: { flat: 38.56, climb: -24.80 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zwift Plain",
        brand: "Zwift",
        type: "aero",
        performance: {
            road: { flat: 23.73, climb: -6.34 },
            tt: { flat: 26.77, climb: -5.18 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zwift Safety",
        brand: "Zwift",
        type: "aero",
        performance: {
            road: { flat: -1.90, climb: -32.89 },
            tt: { flat: -2.09, climb: -32.49 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zwift Supersonic",
        brand: "Zwift",
        type: "aero",
        performance: {
            road: { flat: 3.60, climb: -0.82 },
            tt: { flat: 4.22, climb: 0.48 }
        },
        bikeType: ["road", "tt"]
    },
    {
        name: "Zwift Tri Spoke // Disc",
        brand: "Zwift",
        type: "aero",
        performance: {
            road: { flat: 28.73, climb: -25.26 },
            tt: { flat: 32.54, climb: -24.64 }
        },
        bikeType: ["road", "tt"]
    }
];

// Export the data if using ES6 modules
// export default wheelsData;

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = wheels; // For Node.js
} else {
    window.wheels = wheels; // For browser
}