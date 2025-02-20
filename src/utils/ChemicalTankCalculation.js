// Helper function to ensure a number is not NaN, replacing with 0 if it is
const ensureNumber = (value) => {
    const num = isNaN(value) ? 0 : value;
    console.log("Ensured number:", num);
    return num;
};

// Constants for height and length
export const TANK_HEIGHT = 3;
export const TANK_LENGTH = 3;

// Volume and breath calculation functions
export const calculateFlowRate = (capacity) => {
    return capacity / 20; // Example calculation
};

export function calculateBarScreenVolume(flowRate, peakFlow) {
    const volume = (flowRate * 0.04167) * peakFlow;
    console.log('Bar Screen Volume:', { flowRate, peakFlow, volume });
    return Math.max(0, volume);
}

export function calculateBarScreenBreath(barScreenVolume) {
    const breath = barScreenVolume / (TANK_HEIGHT * TANK_LENGTH);
    console.log("Bar Screen Breath:", breath);
    return breath;
}

export function calculateOilGreaseVolume(flowRate, peakFlow) {
    const volume = (flowRate * peakFlow * 20)/ 60;
    console.log('Oil Grease Volume:', { flowRate, peakFlow, volume });
    return Math.max(0, volume);
}

export function calculateOilGreaseBreath(oilGreaseVolume) {
    const breath = oilGreaseVolume / (TANK_HEIGHT * TANK_LENGTH);
    console.log("Oil Grease Breath:", breath);
    return breath;
}

export function calculateEqualizationTankVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 10; // Adjust multiplier as needed
    console.log("Equalization Tank Volume:", volume);
    return volume;
}

export function calculateEqualizationTankBreath(equalizationTankVolume) {
    const breath = equalizationTankVolume / (TANK_HEIGHT * TANK_LENGTH);
    console.log("Equalization Tank Breath:", breath);
    return breath;
}

export function calculatePHNeutralizationTankVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 0.3333;
    console.log("PH Neutralization Tank Volume:", volume);
    return volume;
}
 
export function calculatePHNeutralizationTankBreath(phNeutralizationTankVolume) {
    const breath = phNeutralizationTankVolume / (TANK_HEIGHT * TANK_LENGTH);
    console.log("PH Neutralization Tank Breath:", breath);
    return breath;
}

export function calculateCoagulantsTankVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 0.3333;
    console.log("Coagulants Tank Volume:", volume);
    return volume;
}

export function calculateCoagulantsTankBreath(coagulantsTankVolume) {
    const breath = coagulantsTankVolume / (TANK_HEIGHT * TANK_LENGTH);
    console.log("Coagulants Tank Breath:", breath);
    return breath;
}

export function calculateFlocculantTankVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 0.3333;
    console.log("Flocculant Tank Volume:", volume);
    return volume;
}

export function calculateFlocculantTankBreath(flocculantTankVolume) {
    const breath = flocculantTankVolume / (TANK_HEIGHT * TANK_LENGTH);
    console.log("Flocculant Tank Breath:", breath);
    return breath;
}

export function calculateTubeSettleVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 2.5; // Adjust multiplier as needed
    console.log("Tube Settle Volume:", volume);
    return volume;
}

export function calculateTubeSettleBreath(tubeSettleVolume) {
    const breath = tubeSettleVolume / (TANK_HEIGHT * TANK_LENGTH);
    console.log("Tube Settle Breath:", breath);
    return breath;
}

export function calculateFilterFeedTankVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 2.5; // Adjust multiplier as needed
    console.log("Filter Feed Tank Volume:", volume);
    return volume;
}

export function calculateFilterFeedTankBreath(filterFeedTankVolume) {
    const breath = filterFeedTankVolume / (TANK_HEIGHT * TANK_LENGTH);
    console.log("Filter Feed Tank Breath:", breath);
    return breath;
}

export function calculateTreatedWaterTankVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 6; // Adjust multiplier as needed
    console.log("Treated Water Tank Volume:", volume);
    return volume;
}

export function calculateTreatedWaterTankBreath(treatedWaterTankVolume) {
    const breath = treatedWaterTankVolume / (TANK_HEIGHT * TANK_LENGTH);
    console.log("Treated Water Tank Breath:", breath);
    return breath;
}

export function calculateUFWaterTankVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 2; // Adjust multiplier as needed
    console.log("UF Water Tank Volume:", volume);
    return volume;
}

export function calculateUFWaterTankBreath(ufWaterTankVolume) {
    const breath = ufWaterTankVolume / (TANK_HEIGHT * TANK_LENGTH);
    console.log("UF Water Tank Breath:", breath);
    return breath;
}

export function calculateSludgeHoldingTankVolume(plantCapacity, BOD, TSS) {
    const sludgeHolder = (plantCapacity * (BOD * 0.15 + TSS * 0.6)) / 100000;
    const volume = sludgeHolder * 4;
    console.log('Sludge Holding Tank Volume:', { plantCapacity, BOD, TSS, volume });
    return Math.max(0, volume);
}

export function calculateSludgeHoldingTankBreath(sludgeHoldingTankVolume) {
    const breath = sludgeHoldingTankVolume / (TANK_HEIGHT * TANK_LENGTH);
    console.log("Sludge Holding Tank Breath:", breath);
    return breath;
}

// Add this new function to calculate breath
export function calculateBreath(volume) {
    return volume / (TANK_HEIGHT * TANK_LENGTH);
}

// Ensure this function is defined
export const calculateTubeSettlerVolume = (flowRate) => {
    const volume = ensureNumber(flowRate) * 2.5; // Adjust multiplier as needed
    console.log("Tube Settler Volume:", volume);
    return volume;
};