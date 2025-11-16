import { jsPDF } from 'jspdf';
import { blocks } from '@/data/blocks';
import { Project } from '@/types/project';
import { Language } from '@/contexts/LanguageContext';

interface PDFTranslations {
  pdfTitle: string;
  pdfDate: string;
  pdfProject: string;
  pdfSummary: string;
  block: string;
  maxPoints: string;
  obtainedPoints: string;
  total: string;
  evaluation: string;
  excellent: string;
  acceptable: string;
  risk: string;
  points: string;
}

export async function generateProjectPDF(
  project: Project,
  language: Language,
  translations: PDFTranslations
) {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper function to add text with word wrap
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.4);
  };

  // Header with logos (simulated as text since we can't easily embed images)
  pdf.setFontSize(20);
  pdf.setTextColor(0, 51, 153); // Blue
  pdf.text(translations.pdfTitle, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Date
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  const currentDate = new Date().toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  pdf.text(`${translations.pdfDate}: ${currentDate}`, 20, yPosition);
  yPosition += 10;

  // Project name
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`${translations.pdfProject}:`, 20, yPosition);
  yPosition += 7;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  yPosition = addText(project.name, 20, yPosition, pageWidth - 40, 12);
  yPosition += 10;

  // Summary section
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 51, 153);
  pdf.text(translations.pdfSummary, 20, yPosition);
  yPosition += 10;

  // Calculate totals
  const calculateBlockTotal = (blockId: number): number => {
    const blockScore = project.blocks.find(b => b.blockId === blockId);
    if (!blockScore) return 0;
    return blockScore.items.reduce((sum, item) => sum + item.points, 0);
  };

  const totalScore = blocks.reduce((sum, block) => sum + calculateBlockTotal(block.id), 0);
  const maxScore = blocks.reduce((sum, block) => sum + block.maxPoints, 0);

  // Overall score box
  pdf.setFillColor(240, 248, 255);
  pdf.rect(20, yPosition, pageWidth - 40, 25, 'F');
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`${translations.total}: ${totalScore} / ${maxScore} ${translations.points}`, 25, yPosition + 10);
  
  // Evaluation
  const getEvaluationText = (score: number): string => {
    if (score >= 90) return translations.excellent;
    if (score >= 75) return translations.acceptable;
    return translations.risk;
  };
  
  const evaluationText = getEvaluationText(totalScore);
  pdf.setFontSize(12);
  const evalColor = totalScore >= 90 ? [34, 197, 94] : totalScore >= 75 ? [234, 179, 8] : [239, 68, 68];
  pdf.setTextColor(evalColor[0], evalColor[1], evalColor[2]);
  pdf.text(`${translations.evaluation}: ${evaluationText}`, 25, yPosition + 18);
  yPosition += 35;

  // Block details
  pdf.setTextColor(0, 0, 0);
  
  for (const block of blocks) {
    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 20;
    }

    const blockTotal = calculateBlockTotal(block.id);
    const blockName = block.name[language];

    // Block header
    pdf.setFillColor(230, 240, 255);
    pdf.rect(20, yPosition, pageWidth - 40, 10, 'F');
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${translations.block} ${block.id}: ${blockName}`, 25, yPosition + 7);
    yPosition += 12;

    // Block score
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${translations.obtainedPoints}: ${blockTotal} / ${block.maxPoints} ${translations.points}`, 25, yPosition);
    yPosition += 8;

    // Items with scores
    const blockScore = project.blocks.find(b => b.blockId === block.id);
    if (blockScore) {
      pdf.setFontSize(9);
      for (const item of block.items) {
        const itemScore = blockScore.items.find(i => i.itemId === item.id);
        const points = itemScore?.points || 0;
        
        // Check if we need a new page
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }

        // Item description (truncated if too long)
        const description = item.description[language];
        const truncatedDesc = description.length > 80 
          ? description.substring(0, 77) + '...' 
          : description;
        
        pdf.text(`  • ${item.id}: ${truncatedDesc}`, 25, yPosition);
        pdf.text(`${points}/${item.points}`, pageWidth - 35, yPosition);
        yPosition += 5;

        // Notes if present
        if (itemScore?.notes && itemScore.notes.trim()) {
          pdf.setTextColor(100, 100, 100);
          pdf.setFontSize(8);
          const notesText = itemScore.notes.length > 100 
            ? itemScore.notes.substring(0, 97) + '...' 
            : itemScore.notes;
          yPosition = addText(`    ${notesText}`, 25, yPosition, pageWidth - 50, 8);
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(9);
        }
      }
    }

    yPosition += 5;
  }

  // Footer
  const pageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      `Erasmus+ Project Evaluator - Edunexus`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
    pdf.text(
      `${i} / ${pageCount}`,
      pageWidth - 20,
      pageHeight - 10,
      { align: 'right' }
    );
  }

  // Save the PDF
  const fileName = `${project.name.replace(/[^a-z0-9]/gi, '_')}_evaluation.pdf`;
  pdf.save(fileName);
}
