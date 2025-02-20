// File: components/PlantInfo.tsx
"use client";

import React, { useState } from "react";
import { Box } from "lucide-react";
import { PlantData } from '../types/PlantData';

// 🚀 Industry Standards Data (Standard BOD, COD, etc. for each industry)
const industryStandards: Record<string, { BOD: number; COD: number; TSS: number; pH: [number, number]; OilGrease: number; Nitrogen: number }> = {
  "Chemical": { BOD: 30, COD: 250, TSS: 100, pH: [5, 9], OilGrease: 50, Nitrogen: 20 },
  "Food and Beverage": { BOD: 30, COD: 250, TSS: 150, pH: [5.5, 9], OilGrease: 10, Nitrogen: 25 },
  "Pharmaceutical": { BOD: 30, COD: 250, TSS: 100, pH: [6, 8.5], OilGrease: 10, Nitrogen: 100 },
  "Tannery Industry": { BOD: 20, COD: 250, TSS: 50, pH: [6, 9], OilGrease: 10, Nitrogen: 30 },
  "Textile Industry": { BOD: 30, COD: 250, TSS: 100, pH: [6, 9], OilGrease: 10, Nitrogen: 50 },
  "Paper Industry": { BOD: 30, COD: 250, TSS: 100, pH: [5.5, 9], OilGrease: 10, Nitrogen: 18 },
  "Steel Industry": { BOD: 30, COD: 250, TSS: 100, pH: [6, 8.5], OilGrease: 10, Nitrogen: 50 },
  "Automobile Industry": { BOD: 30, COD: 250, TSS: 100, pH: [6, 8.5], OilGrease: 10, Nitrogen: 10 },
  "Sugar Mill": { BOD: 30, COD: 250, TSS: 100, pH: [5.5, 8.5], OilGrease: 10, Nitrogen: 20 },
  "Electroplating Industry": { BOD: 30, COD: 250, TSS: 100, pH: [6, 9], OilGrease: 10, Nitrogen: 20 },
  "Hotel Industry": { BOD: 30, COD: 250, TSS: 50, pH: [5.5, 9], OilGrease: 10, Nitrogen: 100 },
  "Dairy Industry": { BOD: 30, COD: 250, TSS: 100, pH: [6.5, 8.5], OilGrease: 10, Nitrogen: 10 },
  "Petrol Oil Industry": { BOD: 15, COD: 125, TSS: 20, pH: [6, 8.5], OilGrease: 5, Nitrogen: 15 },
  "Thermal Power Plant": { BOD: 30, COD: 250, TSS: 20, pH: [6, 9], OilGrease: 5, Nitrogen: 10 },
  "Glass Industry": { BOD: 15, COD: 250, TSS: 100, pH: [6.5, 8.5], OilGrease: 10, Nitrogen: 15 },
};

// Add these constants after the industryStandards object
const suggestedChemicals: Record<string, string[]> = {
  "Chemical": ["Poly Aluminum Chloride", "Ferric Chloride", "Alum", "PolyDADMAC", "Polyacrylamide"],
  "Food and Beverage": ["Aluminum Sulfate", "Ferric Sulfate", "Cationic Polyacrylamide", "Polyamines"],
  "Pharmaceutical": ["Poly Aluminum Chloride", "Ferric Chloride", "PolyDADMAC", "Non-Ionic Polyacrylamide"],
  "Tannery Industry": ["Ferric Sulfate", "Aluminum Sulfate", "Anionic Polyacrylamide", "Polyamines"],
  "Textile Industry": ["Poly Aluminum Chloride", "Ferrous Sulfate", "Cationic Polyacrylamide", "PolyDADMAC"],
  "Paper Industry": ["Poly Aluminum Chloride", "Ferric Chloride", "Anionic Polyacrylamide", "Polyamines"],
  "Steel Industry": ["Ferric Chloride", "Poly Aluminum Chloride", "Cationic Polyacrylamide", "PolyDADMAC"],
  "Automobile Industry": ["Aluminum Sulfate", "Ferric Sulfate", "Anionic Polyacrylamide", "Polyamines"],
  "Sugar Mill": ["Poly Aluminum Chloride", "Ferric Chloride", "Cationic Polyacrylamide", "PolyDADMAC"],
  "Electroplating Industry": ["Ferric Sulfate", "Poly Aluminum Chloride", "Anionic Polyacrylamide", "Polyamines"],
  "Hotel Industry": ["Aluminum Sulfate", "Ferric Chloride", "Cationic Polyacrylamide", "PolyDADMAC"],
  "Dairy Industry": ["Poly Aluminum Chloride", "Sodium Aluminate", "Non-Ionic Polyacrylamide", "Polyamines"],
  "Petrol Oil Industry": ["Ferric Chloride", "Poly Aluminum Chloride", "Anionic Polyacrylamide", "PolyDADMAC"],
  "Thermal Power Plant": ["Poly Aluminum Chloride", "Ferric Sulfate", "Cationic Polyacrylamide", "Polyamines"],
  "Glass Industry": ["Ferric Chloride", "Aluminum Sulfate", "Anionic Polyacrylamide", "PolyDADMAC"]
};

const chemicalPricing: Record<string, number> = {
  "Poly Aluminum Chloride": 65,    // Average of ₹40-₹90
  "Ferric Chloride": 55,          // Average of ₹40-₹70
  "Aluminum Sulfate": 22.5,       // Average of ₹15-₹30
  "Ferric Sulfate": 45,           // Average of ₹30-₹60
  "Sodium Aluminate": 75,         // Average of ₹50-₹100
  "PolyDADMAC": 200,             // Average of ₹100-₹300
  "Anionic Polyacrylamide": 375,  // Average of ₹250-₹500
  "Cationic Polyacrylamide": 525, // Average of ₹350-₹700
  "Non-Ionic Polyacrylamide": 450,// Average of ₹300-₹600
  "Polyamines": 350,              // Average of ₹200-₹500
  "Ferrous Sulfate": 45           // Using similar range as Ferric Sulfate
};

// Define the structure for standard values

interface StandardValues {
  BOD: number;
  COD: number;
  TSS: number;
  pH: [number, number];
  OilGrease: number;
  Nitrogen: number;
}

interface PlantInfoProps {
  plantData: PlantData;
  onDataChange: (field: keyof PlantData, value: any) => void;
}

// Update the chemical data structure
const chemicalData: Record<string, {
  suggestedChemicals: Array<{
    name: string;
    defaultConcentration: number;
    price: number;
  }>;
}> = {
  "Chemical": {
    suggestedChemicals: [
      { name: "Poly Aluminum Chloride", defaultConcentration: 800, price: 65 },
      { name: "Ferric Chloride", defaultConcentration: 600, price: 55 },
      { name: "Alum", defaultConcentration: 500, price: 22.5 },
      { name: "PolyDADMAC", defaultConcentration: 300, price: 200 },
      { name: "Polyacrylamide", defaultConcentration: 200, price: 375 }
    ]
  },
  "Food and Beverage": {
    suggestedChemicals: [
      { name: "Aluminum Sulfate", defaultConcentration: 700, price: 22.5 },
      { name: "Ferric Sulfate", defaultConcentration: 500, price: 45 },
      { name: "Cationic Polyacrylamide", defaultConcentration: 200, price: 525 },
      { name: "Polyamines", defaultConcentration: 300, price: 350 }
    ]
  },
  "Pharmaceutical": {
    suggestedChemicals: [
      { name: "Poly Aluminum Chloride", defaultConcentration: 800, price: 65 },
      { name: "Ferric Chloride", defaultConcentration: 600, price: 55 },
      { name: "PolyDADMAC", defaultConcentration: 300, price: 200 },
      { name: "Non-Ionic Polyacrylamide", defaultConcentration: 200, price: 450 }
    ]
  },
  "Tannery Industry": {
    suggestedChemicals: [
      { name: "Ferric Sulfate", defaultConcentration: 600, price: 45 },
      { name: "Aluminum Sulfate", defaultConcentration: 500, price: 22.5 },
      { name: "Anionic Polyacrylamide", defaultConcentration: 200, price: 375 },
      { name: "Polyamines", defaultConcentration: 300, price: 350 }
    ]
  },
  "Textile Industry": {
    suggestedChemicals: [
      { name: "Poly Aluminum Chloride", defaultConcentration: 800, price: 65 },
      { name: "Ferrous Sulfate", defaultConcentration: 500, price: 45 },
      { name: "Cationic Polyacrylamide", defaultConcentration: 200, price: 525 },
      { name: "PolyDADMAC", defaultConcentration: 300, price: 200 }
    ]
  },
  "Paper Industry": {
    suggestedChemicals: [
      { name: "Poly Aluminum Chloride", defaultConcentration: 800, price: 65 },
      { name: "Ferric Chloride", defaultConcentration: 600, price: 55 },
      { name: "Anionic Polyacrylamide", defaultConcentration: 200, price: 375 },
      { name: "Polyamines", defaultConcentration: 300, price: 350 }
    ]
  },
  "Steel Industry": {
    suggestedChemicals: [
      { name: "Ferric Chloride", defaultConcentration: 600, price: 55 },
      { name: "Poly Aluminum Chloride", defaultConcentration: 800, price: 65 },
      { name: "Cationic Polyacrylamide", defaultConcentration: 200, price: 525 },
      { name: "PolyDADMAC", defaultConcentration: 300, price: 200 }
    ]
  },
  "Automobile Industry": {
    suggestedChemicals: [
      { name: "Aluminum Sulfate", defaultConcentration: 500, price: 22.5 },
      { name: "Ferric Sulfate", defaultConcentration: 600, price: 45 },
      { name: "Anionic Polyacrylamide", defaultConcentration: 200, price: 375 },
      { name: "Polyamines", defaultConcentration: 300, price: 350 }
    ]
  },
  "Sugar Mill": {
    suggestedChemicals: [
      { name: "Poly Aluminum Chloride", defaultConcentration: 800, price: 65 },
      { name: "Ferric Chloride", defaultConcentration: 600, price: 55 },
      { name: "Cationic Polyacrylamide", defaultConcentration: 200, price: 525 },
      { name: "PolyDADMAC", defaultConcentration: 300, price: 200 }
    ]
  },
  "Electroplating Industry": {
    suggestedChemicals: [
      { name: "Ferric Sulfate", defaultConcentration: 600, price: 45 },
      { name: "Poly Aluminum Chloride", defaultConcentration: 800, price: 65 },
      { name: "Anionic Polyacrylamide", defaultConcentration: 200, price: 375 },
      { name: "Polyamines", defaultConcentration: 300, price: 350 }
    ]
  },
  "Hotel Industry": {
    suggestedChemicals: [
      { name: "Aluminum Sulfate", defaultConcentration: 500, price: 22.5 },
      { name: "Ferric Chloride", defaultConcentration: 600, price: 55 },
      { name: "Cationic Polyacrylamide", defaultConcentration: 200, price: 525 },
      { name: "PolyDADMAC", defaultConcentration: 300, price: 200 }
    ]
  },
  "Dairy Industry": {
    suggestedChemicals: [
      { name: "Poly Aluminum Chloride", defaultConcentration: 800, price: 65 },
      { name: "Sodium Aluminate", defaultConcentration: 400, price: 75 },
      { name: "Non-Ionic Polyacrylamide", defaultConcentration: 200, price: 450 },
      { name: "Polyamines", defaultConcentration: 300, price: 350 }
    ]
  },
  "Petrol Oil Industry": {
    suggestedChemicals: [
      { name: "Ferric Chloride", defaultConcentration: 600, price: 55 },
      { name: "Poly Aluminum Chloride", defaultConcentration: 800, price: 65 },
      { name: "Anionic Polyacrylamide", defaultConcentration: 200, price: 375 },
      { name: "PolyDADMAC", defaultConcentration: 300, price: 200 }
    ]
  },
  "Thermal Power Plant": {
    suggestedChemicals: [
      { name: "Poly Aluminum Chloride", defaultConcentration: 800, price: 65 },
      { name: "Ferric Sulfate", defaultConcentration: 600, price: 45 },
      { name: "Cationic Polyacrylamide", defaultConcentration: 200, price: 525 },
      { name: "Polyamines", defaultConcentration: 300, price: 350 }
    ]
  },
  "Glass Industry": {
    suggestedChemicals: [
      { name: "Ferric Chloride", defaultConcentration: 600, price: 55 },
      { name: "Aluminum Sulfate", defaultConcentration: 500, price: 22.5 },
      { name: "Anionic Polyacrylamide", defaultConcentration: 200, price: 375 },
      { name: "PolyDADMAC", defaultConcentration: 300, price: 200 }
    ]
  }
};

const PlantInfo: React.FC<PlantInfoProps> = ({ plantData, onDataChange }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [pumpFlow, setPumpFlow] = useState(0);
  const [chemicalDosing, setChemicalDosing] = useState({
    lime: 0,
    ferrous: 0,
    pca: 0,
    polyacrylamide: 0,
  });

  // Inside PlantInfo component, update the state
  const [chemicalInputs, setChemicalInputs] = useState<{
    [key: string]: {
      concentration: number;
      pumpFlow: number;
      operationHours: number;
    };
  }>({});

  const fields = [
    { name: "Capacity", key: "capacity", unit: "m³/day" },
    { name: "BOD", key: "BOD", unit: "mg/L" },
    { name: "COD", key: "COD", unit: "mg/L" },
    { name: "TSS", key: "TSS", unit: "mg/L" },
    { name: "pH", key: "pH", unit: "" },
    { name: "Oil & Grease", key: "OilGrease", unit: "mg/L" },
    { name: "Nitrogen", key: "Nitrogen", unit: "mg/L" },
    { name: "Peak Flow", key: "PeakFlow", unit: "" },
  ] as const;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : parseFloat(value);
    
    onDataChange(name as keyof PlantData, numValue);
  };

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedIndustry(selectedValue);
    onDataChange("industry", selectedValue);
  };

  const handleChemicalChange = (chemical: string, value: number) => {
    setChemicalDosing(prev => ({
      ...prev,
      [chemical.toLowerCase()]: value
    }));
  };

  const calculateDosing = () => {
    return Object.values(chemicalDosing).reduce((acc, curr) => acc + curr, 0);
  };

  const calculateCost = () => {
    return Object.entries(chemicalDosing).reduce((acc, [key, value]) => {
      return acc + (chemicalPricing[key] || 0) * value;
    }, 0);
  };

  // Get standard values based on selected industry
  const standardValues: StandardValues | undefined = selectedIndustry ? industryStandards[selectedIndustry as keyof typeof industryStandards] : undefined;

  // Add this function to calculate recommended dosages
  const calculateRecommendedDosages = () => {
    if (!selectedIndustry || !standardValues || !pumpFlow) return {};
    
    const recommendations: Record<string, number> = {};
    suggestedChemicals[selectedIndustry].forEach(chemical => {
      recommendations[chemical] = calculateChemicalDosage(
        chemical,
        pumpFlow,
        plantData,
        standardValues
      );
    });
    return recommendations;
  };

  // Add this calculation function inside the PlantInfo component
  const calculateChemicalDosage = (
    chemical: string,
    pumpFlow: number,
    currentParams: PlantData,
    standardValues: StandardValues
  ): number => {
    // Example calculation logic - adjust based on your specific requirements
    switch (chemical) {
      case "Lime":
        return (currentParams.pH < standardValues.pH[0]) 
          ? (pumpFlow * (standardValues.pH[0] - currentParams.pH) * 0.1)
          : 0;
      case "Ferrous Sulfate":
        return (currentParams.COD > standardValues.COD)
          ? (pumpFlow * (currentParams.COD - standardValues.COD) * 0.002)
          : 0;
      case "PAC":
        return (currentParams.TSS > standardValues.TSS)
          ? (pumpFlow * (currentParams.TSS - standardValues.TSS) * 0.001)
          : 0;
      case "Polyacrylamide":
        return (currentParams.TSS > standardValues.TSS)
          ? (pumpFlow * (currentParams.TSS - standardValues.TSS) * 0.0005)
          : 0;
      default:
        return 0;
    }
  };

  const calculateChemicalUsage = (
    concentration: number,  // ppm
    pumpFlow: number,      // ltr/hr
  ): number => {
    // Calculate kg/hr: (concentration * Dosing Flow) / 1000000
    return (concentration * pumpFlow) / 1000;
  };

  const calculateChemicalQuantity = (
    concentration: number,  // ppm
    pumpFlow: number,      // ltr/hr
    operationHours: number // hrs/day
  ): number => {
    const chemicalUse = calculateChemicalUsage(concentration, pumpFlow);
    return chemicalUse * operationHours; // kg/day
  };

  // Add this calculation function
  const calculateTotalSludge = (
    plantCapacity: number,
    currentTSS: number,
    standardTSS: number,
    totalChemicalConcentration: number
  ): number => {
    const tssComponent = (currentTSS - standardTSS) / 1000;
    const chemicalComponent = (totalChemicalConcentration * 0.3) / 1000;
    return plantCapacity * tssComponent + chemicalComponent;
  };

  // Add liquid sludge calculation function
  const calculateLiquidSludge = (totalSludge: number): number => {
    return (totalSludge * 100) / 3; // Convert to ltr/day
  };

  // Update the Chemical Detail Section JSX
  const renderChemicalSection = () => {
    if (!selectedIndustry || !chemicalData[selectedIndustry]) return null;

    // Calculate total chemical concentration - simple sum of concentrations
    const totalChemicalConcentration = Object.values(chemicalInputs).reduce(
      (total, values) => total + (values.concentration || 0),
      0
    );

    // Get standard TSS value for the selected industry
    const standardTSS = industryStandards[selectedIndustry]?.TSS || 0;

    // Calculate total sludge
    const totalSludge = calculateTotalSludge(
      plantData.capacity || 0,
      plantData.TSS || 0,
      standardTSS,
      totalChemicalConcentration
    );

    // Calculate liquid sludge
    const liquidSludge = calculateLiquidSludge(totalSludge);

    // Calculate total daily chemical quantity
    const totalDailyQuantity = Object.entries(chemicalInputs).reduce((total, [chemical, values]) => {
      if (!values.concentration || !values.pumpFlow || !values.operationHours) return total;
      return total + calculateChemicalQuantity(
        values.concentration,
        values.pumpFlow,
        values.operationHours
      );
    }, 0);

    // Calculate total daily cost
    const totalDailyCost = Object.entries(chemicalInputs).reduce((total, [chemical, values]) => {
      if (!values.concentration || !values.pumpFlow || !values.operationHours) return total;
      const quantity = calculateChemicalQuantity(
        values.concentration,
        values.pumpFlow,
        values.operationHours
      );
      const chemicalPrice = chemicalData[selectedIndustry].suggestedChemicals
        .find(c => c.name === chemical)?.price || 0;
      return total + (quantity * chemicalPrice);
    }, 0);

    return (
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Chemical Details</h3>
        
        {/* Suggested Chemicals */}
        <div className="space-y-6">
          {chemicalData[selectedIndustry].suggestedChemicals.map((chemical) => (
            <div key={chemical.name} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{chemical.name}</h4>
                <span className="text-blue-600 font-medium">
                  ₹{chemical.price}/kg
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Chemical Concentration Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Concentration (ppm)
                  </label>
                  <input
                    type="number"
                    value={chemicalInputs[chemical.name]?.concentration || ''}
                    onChange={(e) => setChemicalInputs(prev => ({
                      ...prev,
                      [chemical.name]: {
                        ...prev[chemical.name],
                        concentration: parseFloat(e.target.value) || 0
                      }
                    }))}
                    className="block w-full p-2 border rounded-lg"
                    placeholder={`Default: rupee{chemical.defaultConcentration} ppm`}
                  />
                </div>

                {/* Dosing Pump Flow Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pump Flow (Ltr/hr)
                  </label>
                  <input
                    type="number"
                    value={chemicalInputs[chemical.name]?.pumpFlow || ''}
                    onChange={(e) => setChemicalInputs(prev => ({
                      ...prev,
                      [chemical.name]: {
                        ...prev[chemical.name],
                        pumpFlow: parseFloat(e.target.value) || 0
                      }
                    }))}
                    className="block w-full p-2 border rounded-lg"
                    placeholder="Enter pump flow"
                  />
                </div>

                {/* Operation Hours Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Operation Hours (hrs/day)
                  </label>
                  <input
                    type="number"
                    value={chemicalInputs[chemical.name]?.operationHours || ''}
                    onChange={(e) => setChemicalInputs(prev => ({
                      ...prev,
                      [chemical.name]: {
                        ...prev[chemical.name],
                        operationHours: parseFloat(e.target.value) || 0
                      }
                    }))}
                    className="block w-full p-2 border rounded-lg"
                    placeholder="Enter operation hours"
                    max="24"
                  />
                </div>
              </div>

              {/* Calculation Results */}
              {chemicalInputs[chemical.name]?.concentration && 
               chemicalInputs[chemical.name]?.pumpFlow &&
               chemicalInputs[chemical.name]?.operationHours && (
                <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Chemical Use:</span>
                      <span className="ml-2 font-bold">
                        {calculateChemicalUsage(
                          chemicalInputs[chemical.name].concentration,
                          chemicalInputs[chemical.name].pumpFlow
                        ).toFixed(3)} kg/hr
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Daily Quantity:</span>
                      <span className="ml-2 font-bold">
                        {calculateChemicalQuantity(
                          chemicalInputs[chemical.name].concentration,
                          chemicalInputs[chemical.name].pumpFlow,
                          chemicalInputs[chemical.name].operationHours
                        ).toFixed(2)} kg/day
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Daily Cost:</span>
                      <span className="ml-2 font-bold">
                        ₹{(calculateChemicalQuantity(
                          chemicalInputs[chemical.name].concentration,
                          chemicalInputs[chemical.name].pumpFlow,
                          chemicalInputs[chemical.name].operationHours
                        ) * chemical.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Updated Total Daily Summary */}
        <div className="mt-6 bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Daily Totals</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-gray-600">Total Chemical Quantity:</span>
              <span className="ml-2 font-bold">
                {totalDailyQuantity.toFixed(2)} kg/day
              </span>
            </div>
            <div>
              <span className="text-gray-600">Total Chemical Cost:</span>
              <span className="ml-2 font-bold">
                ₹{totalDailyCost.toFixed(2)}/day
              </span>
            </div>
          </div>

          {/* Updated Sludge Calculation Details */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-semibold mb-2">Sludge Generation Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Plant Capacity:</span>
                <span className="ml-2 font-medium">{plantData.capacity} m³/day</span>
              </div>
              <div>
                <span className="text-gray-600">Current TSS:</span>
                <span className="ml-2 font-medium">{plantData.TSS} mg/L</span>
              </div>
              <div>
                <span className="text-gray-600">Standard TSS:</span>
                <span className="ml-2 font-medium">{standardTSS} mg/L</span>
              </div>
              <div>
                <span className="text-gray-600">Total Chemical Concentration:</span>
                <span className="ml-2 font-medium">{totalChemicalConcentration.toFixed(2)} ppm</span>
              </div>
            </div>

            {/* Sludge Results */}
            <div className="mt-4 space-y-4">
              {/* Total Sludge Result */}
              <div className="bg-blue-100 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total Sludge Generation:</span>
                  <span className="text-xl font-bold text-blue-800">
                    {totalSludge.toFixed(2)} kg/day
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Calculated based on plant capacity, TSS difference, and chemical concentration
                </p>
              </div>

              {/* Liquid Sludge Result */}
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Liquid Sludge Volume:</span>
                  <span className="text-xl font-bold text-green-800">
                    {liquidSludge.toFixed(2)} ltr/day
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Calculated as (Total Sludge × 100) ÷ 3
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl p-6 border border-gray-200">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">ETP Plant</h1>
          <span className="px-3 py-1 text-sm font-semibold text-emerald-700 bg-emerald-100 rounded-full">
            Effluent Treatment Plant
          </span>
        </div>
        <div className="h-1 w-20 bg-emerald-500 rounded"></div>
      </div>

    
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Industry
        </label>
        <select
          name="industry"
          value={selectedIndustry || ""}
          onChange={handleIndustryChange}
          className="block w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Industry</option>
          {Object.keys(industryStandards).map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      {/* Display Standard Values */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Standard Values</h3>
        {standardValues ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Parameter</th>
                <th className="border p-2">Standard Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(standardValues).map(([param, value]) => (
                <tr key={param}>
                  <td className="border p-2 font-medium">{param}</td>
                  <td className="border p-2 text-green-600">
                    {param === 'pH' 
                      ? `${value[0]} - ${value[1]}` // Display pH as a range
                      : value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-500">No standard values available.</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map(({ name, key, unit }) => (
          <div key={key} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Box className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                name={key}
                value={plantData[key] || ''}
                onChange={handleInputChange}
                className="block w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter ${name.toLowerCase()}`}
                min="0"
                step="any"
              />
              {unit && (
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {unit}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add the chemical section */}
      {selectedIndustry && renderChemicalSection()}
    </div>
  );
};

export default PlantInfo;