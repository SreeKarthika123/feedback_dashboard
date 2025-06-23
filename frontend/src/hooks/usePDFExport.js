// src/hooks/usePDFExport.js

import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Custom hook for exporting a part of the DOM to PDF.
 * 
 * Usage:
 * const [pdfRef, exportPDF] = usePDFExport("myfile.pdf");
 * 
 * <div ref={pdfRef}> ... </div>
 * <button onClick={exportPDF}>Export PDF</button>
 */
export default function usePDFExport(filename = "document.pdf") {
  const pdfRef = useRef();

  const exportPDF = () => {
    const input = pdfRef.current;
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);
    });
  };

  return [pdfRef, exportPDF];
}
