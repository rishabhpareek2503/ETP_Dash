// File: components/Dashboard.tsx
"use client"

import React, { useState, useEffect } from "react"
import UserInfo from "./UserInfo"
import PlantInfo from "./PlantInfo"
import TankInfo from "./TankInfo"
import EquipmentList from "./EquipmentList"
import TotalCost from "./TotalCost"
import Sidebar from "./Sidebar"
import {updateDynamicCapacities } from "../utils/calculations"
import { TankData as BiologicalTankData } from "../types/BiologicalTankData"
import * as TankCalculation from "../utils/BiologicalTankCalculation"
import { TankData as ChemicalTankData } from "../types/ChemicalTankData"
import * as ChemicalTankCalculation from "../utils/ChemicalTankCalculation"
import { PlantData } from "../types/PlantData"
import equipmentInitialState from '../data/equipmentInitialState'
import { Button } from "@/components/ui/button"

interface Equipment {
  id: string
  name: string
  basePrice: number
  quantity: number
  totalPrice: number
  type: string
}

// Define fixed cost components
const FIXED_COST_COMPONENTS = ['commissioning', 'installation', 'panel', 'cable', 'piping'];

// Define the TreatmentType
type TreatmentType = "Biological" | "Chemical";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  })

  const [plantData, setPlantData] = useState<PlantData>({
    type: "ETP",
    industry: "",
    capacity: 0,
    BOD: 0,
    COD: 0,
    TSS: 0,
    pH: 0,
    OilGrease: 0,
    Nitrogen: 0,
    PeakFlow: 0,
  });

  const [selectedTreatmentType, setSelectedTreatmentType] = useState<'Biological' | 'Chemical'>('Biological');

  const [BiologicalTankData, setBiologicalTankData] = useState<BiologicalTankData>({
    type: "ETP",
    BarScreen: 0,
    OilGreaseTank: 0,
    EqualizationTank: 0,
    PHNeutralizationTank: 0,
    CoagulantsTank: 0,
    FlocculantTank: 0,
    TubeSettle1: 0,
    AnoxicTank: 0,
    MBBRTank: 0,
    TubeSettle2: 0,
    FilterFeedTank: 0,
    TreatedWaterTank: 0,
    UFWaterTank: 0,
    SludgeHoldingTank: 0,
    volume: 0,
    length: 3,
    height: 3,
    breath: {
      barScreen: 0,
      oilGrease: 0,
      equalization: 0,
      phNeutralization: 0,
      coagulants: 0,
      flocculant: 0,
      tubeSettle1: 0,
      anoxic: 0,
      mbbr: 0,
      tubeSettle2: 0,
      filterFeed: 0,
      treatedWater: 0,
      uf: 0,
      sludge: 0,
    },
  })
  const [ChemicalTankData, setChemicalTankData] = useState<ChemicalTankData>({
    type: "ETP",
    BarScreen: 0,
    OilGreaseTank: 0,
    EqualizationTank: 0,
    PHNeutralizationTank: 0,
    CoagulantsTank: 0,
    FlocculantTank: 0,
    TubeSettle1: 0,
    TubeSettle2: 0,
    AnoxicTank: 0,
    MBBRTank: 0,
    FilterFeedTank: 0,
    TreatedWaterTank: 0,
    UFWaterTank: 0,
    SludgeHoldingTank: 0,
    volume: 0,
    length: 3,
    height: 3,
    breath: {
      barScreen: 0,
      oilGrease: 0,
      equalization: 0,
      phNeutralization: 0,
      coagulants: 0,
      flocculant: 0,
      tubeSettle1: 0,
      tubeSettle2: 0,
      anoxic: 0,
      mbbr: 0,
      filterFeed: 0,
      treatedWater: 0,
      uf: 0,
      sludge: 0,
    },
  })
  const [equipmentData, setEquipmentData] = useState<Record<string, Equipment>>(equipmentInitialState)
  const [totalCost, setTotalCost] = useState(0);

  const isSTP = plantData.type === "STP"

  // Update equipment data when plant data changes
  useEffect(() => {
    const updatedEquipment = updateDynamicCapacities(plantData, equipmentData)
    setEquipmentData(updatedEquipment)
  }, [plantData])

  // Update tank data based on selected treatment type
  useEffect(() => {
    if (selectedTreatmentType === 'Biological') {
      // Logic to calculate and set biological tank data
      const flowRate = TankCalculation.calculateFlowRate(plantData.capacity)
      const peakFlow = plantData.PeakFlow || flowRate * 1.5

      const updatedBiologicalTankData: BiologicalTankData = {
        ...BiologicalTankData,
        BarScreen: TankCalculation.calculateBarScreenVolume(flowRate, peakFlow),
        OilGreaseTank: TankCalculation.calculateOilGreaseVolume(flowRate, peakFlow),
        EqualizationTank: TankCalculation.calculateEqualizationTankVolume(flowRate),
        PHNeutralizationTank: TankCalculation.calculatePHNeutralizationTankVolume(flowRate),
        CoagulantsTank: TankCalculation.calculateCoagulantsTankVolume(flowRate),
        FlocculantTank: TankCalculation.calculateFlocculantTankVolume(flowRate),
        TubeSettle1: TankCalculation.calculateTubeSettle1Volume(flowRate),
        AnoxicTank: TankCalculation.calculateAnoxicTankVolume(flowRate),
        MBBRTank: TankCalculation.calculateMBBRTankVolume(plantData.capacity, plantData.BOD),
        TubeSettle2: TankCalculation.calculateTubeSettle2Volume(flowRate),
        FilterFeedTank: TankCalculation.calculateFilterFeedTankVolume(flowRate),
        TreatedWaterTank: TankCalculation.calculateTreatedWaterTankVolume(flowRate),
        UFWaterTank: TankCalculation.calculateUFWaterTankVolume(flowRate),
        SludgeHoldingTank: TankCalculation.calculateSludgeHoldingTankVolume(plantData.capacity, plantData.BOD, plantData.TSS)
      }

      setBiologicalTankData(updatedBiologicalTankData)
      updateEquipmentPrices(updatedBiologicalTankData)
    } else if (selectedTreatmentType === 'Chemical') {
      // Logic to calculate and set chemical tank data
      const flowRate = ChemicalTankCalculation.calculateFlowRate(plantData.capacity)
      const peakFlow = plantData.PeakFlow || flowRate * 1.5

      const updatedChemicalTankData: ChemicalTankData = {
        ...ChemicalTankData,
        BarScreen: ChemicalTankCalculation.calculateBarScreenVolume(flowRate, peakFlow),
        OilGreaseTank: ChemicalTankCalculation.calculateOilGreaseVolume(flowRate, peakFlow),
        EqualizationTank: ChemicalTankCalculation.calculateEqualizationTankVolume(flowRate),
        PHNeutralizationTank: ChemicalTankCalculation.calculatePHNeutralizationTankVolume(flowRate),
        CoagulantsTank: ChemicalTankCalculation.calculateCoagulantsTankVolume(flowRate),
        FlocculantTank: ChemicalTankCalculation.calculateFlocculantTankVolume(flowRate),
        TubeSettle1: ChemicalTankCalculation.calculateTubeSettleVolume(flowRate),
        FilterFeedTank: ChemicalTankCalculation.calculateFilterFeedTankVolume(flowRate),
        TreatedWaterTank: ChemicalTankCalculation.calculateTreatedWaterTankVolume(flowRate),
        UFWaterTank: ChemicalTankCalculation.calculateUFWaterTankVolume(flowRate),
        SludgeHoldingTank: ChemicalTankCalculation.calculateSludgeHoldingTankVolume(plantData.capacity, plantData.BOD, plantData.TSS),
      }

      setChemicalTankData(updatedChemicalTankData)
      updateEquipmentPrices(updatedChemicalTankData)
    }
  }, [selectedTreatmentType, plantData])

  const updateEquipmentPrices = (updatedTankData: BiologicalTankData | ChemicalTankData) => {
    const updatedEquipment = updateDynamicCapacities(plantData, equipmentData)
    setEquipmentData(updatedEquipment)
    const newTotalCost = Object.values(updatedEquipment).reduce((sum: number, item) => {
      const equipment = item as { basePrice?: number; quantity?: number };
      return sum + (equipment.basePrice || 0) * (equipment.quantity || 1);
    }, 0);
    setTotalCost(newTotalCost);
  }

  const handleUserDataChange = (newData: Partial<typeof userData>) => {
    setUserData(prev => ({ ...prev, ...newData }))
  }

  const handlePlantDataChange = (newPlantData: any) => {
    setPlantData(newPlantData);
    
    // Update equipment data with new calculations
    const updatedEquipmentData = updateDynamicCapacities(newPlantData, equipmentData);
    setEquipmentData(updatedEquipmentData);
  
    // Update total cost
    const newTotalCost = Object.values(updatedEquipmentData).reduce((sum: number, item) => {
      const equipment = item as { basePrice?: number; quantity?: number };
      return sum + (equipment.basePrice || 0) * (equipment.quantity || 1);
    }, 0);
    setTotalCost(newTotalCost);
  };

  const handleEquipmentDataChange = (id: string, quantity: number) => {
    // Don't update quantity for fixed cost components
    if (FIXED_COST_COMPONENTS.includes(id)) {
      return;
    }

    // Create a copy of the current equipment data
    const updatedEquipmentData = { ...equipmentData };
    
    // Update the quantity and recalculate total price for non-fixed components
    if (updatedEquipmentData[id]) {
      updatedEquipmentData[id] = {
        ...updatedEquipmentData[id],
        quantity: quantity,
        totalPrice: updatedEquipmentData[id].basePrice * quantity
      };
    }
    
    // Update the state with new equipment data
    setEquipmentData(updatedEquipmentData);

    // Calculate total cost excluding fixed components
    const newTotalCost = Object.entries(updatedEquipmentData).reduce((sum, [key, item]) => {
      if (!FIXED_COST_COMPONENTS.includes(key)) {
        return sum + (item.totalPrice || 0);
      }
      return sum;
    }, 0);
    
    setTotalCost(newTotalCost);
  };

  // Update equipment data when plant data changes
  useEffect(() => {
    if (plantData.capacity <= 0) return;

    // Update equipment with new calculations
    const updatedEquipment = updateDynamicCapacities(plantData, equipmentData);
    
    // Preserve quantities while updating prices
    const equipmentWithPreservedQuantities = Object.entries(updatedEquipment).reduce<Record<string, Equipment>>((acc, [key, item]) => {
      const currentQuantity = equipmentData[key]?.quantity || 1;

      // Ensure item is treated as an Equipment object
      const equipmentItem = item as Equipment; // Type assertion

      return {
        ...acc,
        [key]: {
          ...equipmentItem, // Spread the equipmentItem
          quantity: currentQuantity,
          totalPrice: (equipmentItem.basePrice || 0) * currentQuantity
        }
      };
    }, {});

    setEquipmentData(equipmentWithPreservedQuantities);

    // Update total cost
    const newTotalCost = Object.values(equipmentWithPreservedQuantities).reduce((sum, item) => {
      return sum + (item.totalPrice || 0);
    }, 0);
    
    setTotalCost(newTotalCost);
  }, [plantData]);

  // Clear all localStorage on mount
  useEffect(() => {
    localStorage.clear(); // Clear all stored data
    resetDashboard();
  }, []);

  const resetDashboard = () => {
    // Reset to initial states
    setPlantData({
      type: 'ETP', // Add missing required type field
      industry: "",
      capacity: 0,
      PeakFlow: 0,
      BOD: 0,
      COD: 0,
      TSS: 0,
      pH: 0,
      OilGrease: 0,
      Nitrogen: 0,
    });
    // Reset equipment data to clean initial state
    const cleanEquipmentData = Object.entries(equipmentData).reduce<Record<string, any>>((acc, [key, item]: [string, any]) => {
      acc[key] = {
        name: item.name,
        quantity: 1,
        basePrice: 0,
        totalPrice: item.totalPrice || 0,
        ...(item.capacity !== undefined && { capacity: item.capacity }),
        ...(item.Volume !== undefined && { Volume: item.Volume }),
        ...(item.diameter !== undefined && { diameter: item.diameter }),
      };
      return acc;
    }, {});
    
    setEquipmentData(cleanEquipmentData);
    setTotalCost(0);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 text-gray-900">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
            <h1 className="text-3xl font-bold">Plant Price Calculator</h1>
            <p className="mt-2">Compare standard vs actual industry parameter values.</p>
          </div>

          <UserInfo userData={userData} onDataChange={handleUserDataChange} />
          <PlantInfo 
            plantData={plantData} 
            onDataChange={(field, value) => setPlantData(prev => ({ ...prev, [field]: value }))} 
          />
          
          {/* Dropdown to select treatment type */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Select Treatment Type:</label>
            <select
              value={selectedTreatmentType}
              onChange={(e) => setSelectedTreatmentType(e.target.value as 'Biological' | 'Chemical')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 bg-white p-2"
            >
              <option value="Biological">Biological with Chemical Treatment</option>
              <option value="Chemical">Chemical Treatment</option>
            </select>
          </div>

          {selectedTreatmentType === 'Biological' && (
            <>
              <TankInfo tankData={BiologicalTankData} treatmentType={selectedTreatmentType} />
              <EquipmentList
                equipmentData={equipmentData}
                plantData={plantData}
                onDataChange={handleEquipmentDataChange}
              />
              <TotalCost
                totalCost={totalCost} 
                userData={userData} 
                plantData={plantData} 
                equipmentData={equipmentData}
                tankData={BiologicalTankData}
              />
            </>
          )}

          {selectedTreatmentType === 'Chemical' && (
            <>
              <TankInfo tankData={ChemicalTankData} treatmentType={selectedTreatmentType} />
              <EquipmentList
                equipmentData={equipmentData}
                plantData={plantData}
                onDataChange={handleEquipmentDataChange}
              />
              <TotalCost
                totalCost={totalCost} 
                userData={userData} 
                plantData={plantData} 
                equipmentData={equipmentData}
                tankData={ChemicalTankData}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard