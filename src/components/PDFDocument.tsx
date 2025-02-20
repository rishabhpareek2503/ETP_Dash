"use client";

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#2563eb',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#1e3a8a',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#1e3a8a',
    marginBottom: 12,
    fontWeight: 'bold',
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: '40%',
    fontSize: 11,
    color: '#64748b',
  },
  value: {
    flex: 1,
    fontSize: 11,
    color: '#0f172a',
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderBottomColor: '#e2e8f0',
    borderBottomWidth: 1,
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#f1f5f9',
    borderBottomWidth: 1,
    padding: 8,
  },
  tableCell: {
    fontSize: 10,
    color: '#0f172a',
  },
  col1: { width: '40%' },
  col2: { width: '30%' },
  col3: { width: '30%' },
  totalSection: {
    marginTop: 20,
    borderTop: 2,
    borderTopColor: '#e2e8f0',
    paddingTop: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#1e3a8a',
    fontWeight: 'bold',
    marginRight: 20,
  },
  totalValue: {
    fontSize: 14,
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
    borderTop: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
  termsSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  termsText: {
    fontSize: 10,
    color: '#334155',
    marginBottom: 5,
    lineHeight: 1.4,
  },
  sectionSubtitle: {
    fontSize: 11,
    marginBottom: 5,
  },
  standardsSection: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  standardsTitle: {
    fontSize: 14,
    color: '#1e3a8a',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  chemicalSection: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
  },
  comparisonTable: {
    marginTop: 10,
  },
  comparisonRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    padding: 8,
  },
  parameterColumn: {
    width: '30%',
    fontSize: 10,
  },
  valueColumn: {
    width: '35%',
    fontSize: 10,
  },
  standardColumn: {
    width: '35%',
    fontSize: 10,
  },
  highlightedValue: {
    color: '#059669', // green color for values meeting standards
  },
  warningValue: {
    color: '#dc2626', // red color for values exceeding standards
  },
  costBreakdown: {
    marginTop: 10,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  costLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  costValue: {
    fontSize: 10,
    color: '#0f172a',
  },
});

interface PDFDocumentProps {
  userData: {
    name: string;
    company: string;
    email: string;
    phone: string;
  };
  plantData: {
    TSS: number;
    COD: number;
    BOD: number;
    type: string;
    capacity: number;
    pH: [number, number];
    OilGrease: number;
    Nitrogen: number;
  };
  tankData: any; // TODO: Add specific type
  equipmentData: any; // TODO: Add specific type
  totalCost: number;
  chemicalCost: number;
  industryStandards: any;
  chemicalData: any;
}

const FIXED_COSTS = {
  commissioning: { name: "Commissioning and Handover", price: 70000 },
  installation: { name: "Installation", price: 40000 },
  panel: { name: "Panel", price: 70000 },
  cable: { name: "Cable and Cable Tray", price: 35000 },
  piping: { name: "Piping and Fitting", price: 80000 }
};

const PDFDocument = ({ userData, plantData, tankData, equipmentData, totalCost, chemicalCost, industryStandards, chemicalData }: PDFDocumentProps) => {
  console.log('Chemical Data:', chemicalData);
  console.log('Plant Type:', plantData.type);
  console.log('Chemical Prices:', chemicalData?.[plantData.type]?.map((c: { name: string; price: number }) => ({
    name: c.name,
    price: c.price,
    priceType: typeof c.price
  })));
  
  console.log('Industry Standards:', industryStandards);

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Helper function to safely format numbers
  const formatNumber = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '0';
    return value.toLocaleString() || '0';
  };

  // Helper function to safely format currency
  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return '₹0';
    return `₹${price.toLocaleString()}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src="/HEEPL.png" style={{ width: 100, height: 'auto', marginBottom: 10 }} /> 
          <Text style={styles.title}>WATER TREATMENT SOLUTIONS</Text>
          <Text style={styles.subtitle}>Generated on {formatDate()}</Text>
        </View>

        {/* Client Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userData.name || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Company:</Text>
            <Text style={styles.value}>{userData.company || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userData.email || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{userData.phone || 'N/A'}</Text>
          </View>
        </View>

        {/* Plant Specifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plant Specifications</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Plant Type:</Text>
            <Text style={styles.value}>{plantData.type || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Capacity:</Text>
            <Text style={styles.value}>{plantData.capacity ? `${plantData.capacity} KLD` : 'N/A'}</Text>
          </View>
          <View style={[styles.row, { marginTop: 10 }]}>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={[styles.label, { width: '50%' }]}>BOD:</Text>
                <Text style={[styles.value, { flex: 0 }]}>{plantData.BOD ? `${plantData.BOD} mg/L` : 'N/A'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.label, { width: '50%' }]}>COD:</Text>
                <Text style={[styles.value, { flex: 0 }]}>{plantData.COD ? `${plantData.COD} mg/L` : 'N/A'}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={[styles.label, { width: '50%' }]}>TSS:</Text>
                <Text style={[styles.value, { flex: 0 }]}>{plantData.TSS ? `${plantData.TSS} mg/L` : 'N/A'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Industry Standards and Current Parameters Comparison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Industry Parameters</Text>
          <View style={styles.standardsSection}>
            <Text style={styles.standardsTitle}>{plantData?.type || 'N/A'} Industry Standards</Text>
            <View style={styles.comparisonTable}>
              <View style={[styles.comparisonRow, { backgroundColor: '#f1f5f9' }]}>
                <Text style={styles.parameterColumn}>Parameter</Text>
                <Text style={styles.valueColumn}>Current Value</Text>
                <Text style={styles.standardColumn}>Standard Limit</Text>
              </View>
              {industryStandards && plantData?.type && industryStandards[plantData.type] ? (
                <>
                  <View style={styles.comparisonRow}>
                    <Text style={styles.parameterColumn}>BOD</Text>
                    <Text style={[styles.valueColumn, 
                      plantData.BOD <= industryStandards[plantData.type].BOD 
                        ? styles.highlightedValue 
                        : styles.warningValue
                    ]}>
                      {plantData.BOD} mg/L
                    </Text>
                    <Text style={styles.standardColumn}>≤ {industryStandards[plantData.type].BOD} mg/L</Text>
                  </View>
                  <View style={styles.comparisonRow}>
                    <Text style={styles.parameterColumn}>COD</Text>
                    <Text style={[styles.valueColumn, 
                      plantData.COD <= industryStandards[plantData.type].COD 
                        ? styles.highlightedValue 
                        : styles.warningValue
                    ]}>
                      {plantData.COD} mg/L
                    </Text>
                    <Text style={styles.standardColumn}>≤ {industryStandards[plantData.type].COD} mg/L</Text>
                  </View>
                  <View style={styles.comparisonRow}>
                    <Text style={styles.parameterColumn}>TSS</Text>
                    <Text style={[styles.valueColumn, 
                      plantData.TSS <= industryStandards[plantData.type].TSS 
                        ? styles.highlightedValue 
                        : styles.warningValue
                    ]}>
                      {plantData.TSS} mg/L
                    </Text>
                    <Text style={styles.standardColumn}>≤ {industryStandards[plantData.type].TSS} mg/L</Text>
                  </View>
                  <View style={styles.comparisonRow}>
                    <Text style={styles.parameterColumn}>pH</Text>
                    <Text style={styles.valueColumn}>
                      {plantData.pH[0]} - {plantData.pH[1]}
                    </Text>
                    <Text style={styles.standardColumn}>
                      {industryStandards[plantData.type].pH[0]} - {industryStandards[plantData.type].pH[1]}
                    </Text>
                  </View>
                  <View style={styles.comparisonRow}>
                    <Text style={styles.parameterColumn}>Oil & Grease</Text>
                    <Text style={[styles.valueColumn, 
                      plantData.OilGrease <= industryStandards[plantData.type].OilGrease 
                        ? styles.highlightedValue 
                        : styles.warningValue
                    ]}>
                      {plantData.OilGrease} mg/L
                    </Text>
                    <Text style={styles.standardColumn}>≤ {industryStandards[plantData.type].OilGrease} mg/L</Text>
                  </View>
                  <View style={styles.comparisonRow}>
                    <Text style={styles.parameterColumn}>Nitrogen</Text>
                    <Text style={[styles.valueColumn, 
                      plantData.Nitrogen <= industryStandards[plantData.type].Nitrogen 
                        ? styles.highlightedValue 
                        : styles.warningValue
                    ]}>
                      {plantData.Nitrogen} mg/L
                    </Text>
                    <Text style={styles.standardColumn}>≤ {industryStandards[plantData.type].Nitrogen} mg/L</Text>
                  </View>
                </>
              ) : (
                <View style={styles.comparisonRow}>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    No standards available for {plantData?.type || 'selected industry'}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Recommended Chemicals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Chemicals</Text>
          <View style={styles.chemicalSection}>
            <Text style={styles.standardsTitle}>Industry-Specific Chemicals</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, styles.col1]}>Chemical Name</Text>
                <Text style={[styles.tableCell, styles.col2]}>Concentration</Text>
                <Text style={[styles.tableCell, styles.col3]}>Price (₹/kg)</Text>
              </View>
              {chemicalData && plantData.type && chemicalData[plantData.type] ? (
                chemicalData[plantData.type].map((chemical: any, index: number) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.col1]}>{chemical.name || 'N/A'}</Text>
                    <Text style={[styles.tableCell, styles.col2]}>
                      {chemical.concentration ? `${chemical.concentration} ppm` : 'N/A'}
                    </Text>
                    <Text style={[styles.tableCell, styles.col3]}>
                      {chemical.price ? formatPrice(Number(chemical.price)) : 'N/A'}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 1 }]}>No chemical data available</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Tank Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tank Details</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.col1]}>Tank Name</Text>
              <Text style={[styles.tableCell, styles.col2]}>Volume (m³)</Text>
              <Text style={[styles.tableCell, styles.col3]}>Breath(m)</Text>
            </View>
            {Object.entries(tankData || {}).map(([key, value]) => {
              if (typeof value === 'number' && key !== 'volume' && key !== 'length' && key !== 'height') {
                const breath = value / (tankData.height * tankData.length);
                return (
                  <View key={key} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.col1]}>
                      {key.replace(/([A-Z])/g, ' $1').trim() || 'N/A'}
                    </Text>
                    <Text style={[styles.tableCell, styles.col2]}>{value ? value.toFixed(2) : 'N/A'}</Text>
                    <Text style={[styles.tableCell, styles.col3]}>
                      {tankData.length && tankData.height ? `${tankData.length}×${breath.toFixed(2)}×${tankData.height}` : 'N/A'}
                    </Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
        </View>

        {/* Equipment Details - Now excluding fixed cost items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipment Details</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.col1]}>Equipment</Text>
              <Text style={[styles.tableCell, styles.col2]}>Quantity</Text>
              <Text style={[styles.tableCell, styles.col3]}>Price (₹)</Text>
            </View>
            {Object.entries(equipmentData || {}).map(([key, equipment]: [string, any]) => {
              // Skip fixed cost components
              if (['commissioning', 'installation', 'panel', 'cable', 'piping'].includes(key)) {
                return null;
              }
              return (
                <View key={key} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.col1]}>{equipment.name || 'N/A'}</Text>
                  <Text style={[styles.tableCell, styles.col2]}>{equipment.quantity || 0}</Text>
                  <Text style={[styles.tableCell, styles.col3]}>
                    {equipment.totalPrice ? formatPrice(equipment.totalPrice) : 'N/A'}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Fixed Costs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fixed Costs</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.col1]}>Item</Text>
              <Text style={[styles.tableCell, styles.col3]}>Price (₹)</Text>
            </View>
            {Object.entries(FIXED_COSTS).map(([key, item]) => (
              <View key={key} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.col1]}>{item.name}</Text>
                <Text style={[styles.tableCell, styles.col3]}>{formatPrice(item.price)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Total Cost */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cost Breakdown</Text>
          <View style={styles.costBreakdown}>
            {/* Existing fixed costs */}
            {Object.entries(FIXED_COSTS).map(([name, cost]) => (
              <View key={name} style={styles.costRow}>
                <Text style={styles.costLabel}>{name.replace(/-/g, ' ').charAt(0).toUpperCase() + name.slice(1)}</Text>
                <Text style={styles.costValue}>₹{formatPrice(cost.price)}</Text>
              </View>
            ))}
            
            {/* Equipment cost */}
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Equipment Cost</Text>
              <Text style={styles.costValue}>₹{formatPrice(totalCost - Object.values(FIXED_COSTS).reduce((sum, item) => sum + item.price, 0))}</Text>
            </View>

            {/* Chemical cost */}
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Chemical Cost</Text>
              <Text style={styles.costValue}>
                ₹{formatPrice(chemicalData?.[plantData.type]?.reduce((sum: number, chemical: { price: number }) => 
                   sum + (chemical.price ? Number(chemical.price) : 0), 0) || 'N/A')}
              </Text>
            </View>

            {/* Total cost */}
            <View style={[styles.costRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Cost</Text>
              <Text style={styles.totalValue}>₹{formatPrice(totalCost)}</Text>
            </View>
          </View>
        </View>

        {/* Treatment Process Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Treatment Process Summary</Text>
          <View style={styles.standardsSection}>
            <Text style={styles.subtitle}>Process Flow:</Text>
            <Text style={styles.value}>
              Collection Tank → Equalization Tank → Primary Treatment → 
              Secondary Treatment → Tertiary Treatment → Treated Water Tank
            </Text>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsSection}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          
          <Text style={[styles.sectionSubtitle, { marginTop: 10, color: '#1e3a8a', fontWeight: 'bold' }]}>
            PAYMENT TERMS:
          </Text>
          <Text style={styles.termsText}>
            (DD Payable to HITESH ENVIRO ENGINEERS PVT.LTD. DELHI)
          </Text>
          <Text style={styles.termsText}>• 50% advance along with the Purchase Order</Text>
          <Text style={styles.termsText}>• 40% against Performa Invoice before Dispatch</Text>
          <Text style={styles.termsText}>• 10% within one week of Erection and Commissioning of the plant</Text>

          <Text style={[styles.sectionSubtitle, { marginTop: 15, color: '#1e3a8a', fontWeight: 'bold' }]}>
            DELIVERY:
          </Text>
          <Text style={styles.termsText}>
            Within 6-8 Weeks from the date of receipt of technically and commercially correct purchase order.
          </Text>

          <Text style={[styles.sectionSubtitle, { marginTop: 15, color: '#1e3a8a', fontWeight: 'bold' }]}>
            TAXES, DUTIES & LEVIES:
          </Text>
          <Text style={styles.termsText}>• GST: @ 18% extra as applicable</Text>
          <Text style={styles.termsText}>• Octroi, Freight, loading/unloading and Transit Insurance shall be extra as per actual.</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          This is a computer-generated document. No signature is required.
        </Text>
      </Page>
    </Document>
  );
};

export default PDFDocument;

