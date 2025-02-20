"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { jsPDF } from 'jspdf'
import 'jspdf-autotable'

// Add this to extend jsPDF type with autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface PDFDownloadButtonProps {
  userData: any
  plantData: any
  equipmentData: any
  tankData: any
  totalCost: number
  chemicalCost: number
  industryStandards: any
  chemicalData: any
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  userData,
  plantData,
  equipmentData,
  tankData,
  totalCost,
  chemicalCost,
  industryStandards,
  chemicalData,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const generatePDF = async () => {
    setIsLoading(true)
    try {
      // Dynamically import jspdf and jspdf-autotable
      const jsPDF = (await import("jspdf")).default
      await import("jspdf-autotable")

      const doc = new jsPDF()

      // Add content to the PDF
      doc.setFontSize(18)
      doc.text("Plant Price Calculator Report", 105, 15, { align: "center" })

      doc.setFontSize(12)
      doc.text(`User: ${userData.name}`, 20, 30)
      doc.text(`Plant Type: ${plantData.type}`, 20, 40)
      doc.text(`Capacity: ${plantData.capacity} KLD`, 20, 50)
      doc.text(`Total Cost: ₹${totalCost.toLocaleString()}`, 20, 60)

      // Add equipment table
      const equipmentBody = Object.entries(equipmentData).map(([key, value]: [string, any]) => [
        value.name,
        value.quantity,
        `₹${value.totalPrice.toLocaleString()}`,
      ])

      doc.autoTable({
        startY: 70,
        head: [["Equipment", "Quantity", "Price"]],
        body: equipmentBody,
      })

      // Save the PDF
      doc.save("plant_price_calculator_report.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={generatePDF} disabled={isLoading}>
      {isLoading ? "Generating PDF..." : "Download PDF Report"}
    </Button>
  )
}

export default PDFDownloadButton

