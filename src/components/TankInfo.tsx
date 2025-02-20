import { Box } from "lucide-react";
import { TankData as BiologicalTankData } from "../types/BiologicalTankData";
import { TankData as ChemicalTankData } from "../types/ChemicalTankData";
import { 
  TANK_HEIGHT as BIO_TANK_HEIGHT, 
  TANK_LENGTH as BIO_TANK_LENGTH, 
  calculateBreath as calculateBioBreath 
} from "../utils/BiologicalTankCalculation";

import { 
  TANK_HEIGHT as CHEM_TANK_HEIGHT, 
  TANK_LENGTH as CHEM_TANK_LENGTH, 
  calculateBreath as calculateChemBreath 
} from "../utils/ChemicalTankCalculation";

// Define tank items for both treatments
const biologicalTanks: { name: string; key: keyof BiologicalTankData }[] = [
  { name: "Bar Screen", key: "BarScreen" },
  { name: "Oil Grease Tank", key: "OilGreaseTank" },
  { name: "Equalization Tank", key: "EqualizationTank" },
  { name: "PH Neutralization Tank", key: "PHNeutralizationTank" },
  { name: "Coagulants Tank", key: "CoagulantsTank" },
  { name: "Flocculant Tank", key: "FlocculantTank" },
  { name: "Tube Settle 1", key: "TubeSettle1" },
  { name: "Anoxic Tank", key: "AnoxicTank" },
  { name: "MBBR Tank", key: "MBBRTank" },
  { name: "Tube Settle 2", key: "TubeSettle2" },
  { name: "Filter Feed Tank", key: "FilterFeedTank" },
  { name: "Treated Water Tank", key: "TreatedWaterTank" },
  { name: "UF Water Tank", key: "UFWaterTank" },
  { name: "Sludge Holding Tank", key: "SludgeHoldingTank" },
];

const chemicalTanks: { name: string; key: keyof ChemicalTankData }[] = [
  { name: "Bar Screen", key: "BarScreen" },
  { name: "Oil Grease Tank", key: "OilGreaseTank" },
  { name: "Equalization Tank", key: "EqualizationTank" },
  { name: "PH Neutralization Tank", key: "PHNeutralizationTank" },
  { name: "Coagulants Tank", key: "CoagulantsTank" },
  { name: "Flocculant Tank", key: "FlocculantTank" },
  { name: "Tube Settle 1", key: "TubeSettle1" },
  { name: "Filter Feed Tank", key: "FilterFeedTank" },
  { name: "Treated Water Tank", key: "TreatedWaterTank" },
  { name: "UF Water Tank", key: "UFWaterTank" },
  { name: "Sludge Holding Tank", key: "SludgeHoldingTank" },
];

// Define the props type
interface TankInfoProps {
  treatmentType: "Biological" | "Chemical";
  tankData: BiologicalTankData | ChemicalTankData;
}

const TankInfo = ({ treatmentType, tankData }: TankInfoProps) => {
  // Select tank list & calculations based on treatment type
  const isBiological = treatmentType === "Biological";
  const tanks = isBiological ? biologicalTanks : chemicalTanks;
  const calculateBreath = isBiological ? calculateBioBreath : calculateChemBreath;
  const TANK_HEIGHT = isBiological ? BIO_TANK_HEIGHT : CHEM_TANK_HEIGHT;
  const TANK_LENGTH = isBiological ? BIO_TANK_LENGTH : CHEM_TANK_LENGTH;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{treatmentType} Tank Details</h2>
      
      {tanks.map(({ name, key }) => {
        const volume = treatmentType === "Biological" 
          ? (tankData as BiologicalTankData)[key] 
          : (tankData as ChemicalTankData)[key] || 0;
        const breath = calculateBreath(volume);

        return (
          <div key={key} className="mb-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Box className="h-5 w-5 text-blue-600" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Volume (m³)</label>
              <input
                type="text"
                value={(volume as number).toFixed(2)}
                readOnly
                className="block w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Breadth (m)</label>
              <input
                type="text"
                value={breath.toFixed(2)}
                readOnly
                className="block w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Length (m)</label>
              <input
                type="text"
                value={TANK_LENGTH.toFixed(2)}
                readOnly
                className="block w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (m)</label>
              <input
                type="text"
                value={TANK_HEIGHT.toFixed(2)}
                readOnly
                className="block w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TankInfo;
