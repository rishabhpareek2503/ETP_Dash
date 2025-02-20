export interface TankData {
    type: "ETP" | "STP";
    BarScreen: number;
    OilGreaseTank: number;
    EqualizationTank: number;
    PHNeutralizationTank: number;
    CoagulantsTank: number;
    FlocculantTank: number;
    TubeSettle1: number;
    AnoxicTank: number;
    MBBRTank: number;
    TubeSettle2: number;
    FilterFeedTank: number;
    TreatedWaterTank: number;
    UFWaterTank: number;
    SludgeHoldingTank: number;
    volume: number;
    length: number;  // Will be constant 3
    height: number;  // Will be constant 3
    breath: {
        barScreen: number;
        oilGrease: number;
        equalization: number;
        phNeutralization: number;
        coagulants: number;
        flocculant: number;
        tubeSettle1: number;
        anoxic: number;
        mbbr: number;
        tubeSettle2: number;
        filterFeed: number;
        treatedWater: number;
        uf: number;
        sludge: number;
    };
}