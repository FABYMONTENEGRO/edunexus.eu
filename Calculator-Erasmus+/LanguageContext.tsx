import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  es: {
    // General
    appTitle: "Calculadora de Proyectos Erasmus+",
    language: "Idioma",
    
    // Project info
    projectName: "Nombre del Proyecto",
    projectNamePlaceholder: "Ingrese el nombre de su proyecto Erasmus+",
    
    // Navigation
    previous: "Anterior",
    next: "Siguiente",
    saveProject: "Guardar Proyecto",
    downloadPDF: "Descargar PDF",
    newProject: "Nuevo Proyecto",
    loadProject: "Cargar Proyecto",
    
    // Blocks
    block: "Bloque",
    of: "de",
    maxPoints: "Puntos máximos",
    obtainedPoints: "Puntos obtenidos",
    subtotal: "Subtotal",
    total: "Total",
    
    // Scoring
    points: "puntos",
    enterPoints: "Ingrese puntos",
    notes: "Notas/Comentarios",
    notesPlaceholder: "Agregue notas o comentarios sobre este item (opcional)",
    
    // Results
    results: "Resultados",
    finalScore: "Puntuación Final",
    evaluation: "Evaluación",
    excellent: "Excelente - Alta probabilidad de éxito",
    acceptable: "Aceptable - Requiere refinamiento",
    risk: "Alto riesgo de rechazo",
    
    // Messages
    projectSaved: "Proyecto guardado exitosamente",
    projectLoaded: "Proyecto cargado",
    fillProjectName: "Por favor ingrese el nombre del proyecto",
    invalidPoints: "Los puntos deben estar entre 0 y el máximo permitido",
    
    // PDF
    pdfTitle: "Evaluación de Proyecto Erasmus+",
    pdfDate: "Fecha",
    pdfProject: "Proyecto",
    pdfSummary: "Resumen de Evaluación",
    
    // Storage
    savedProjects: "Proyectos Guardados",
    noProjects: "No hay proyectos guardados",
    deleteProject: "Eliminar",
    loadThisProject: "Cargar",
    confirmDelete: "¿Está seguro de eliminar este proyecto?",
  },
  en: {
    // General
    appTitle: "Erasmus+ Project Calculator",
    language: "Language",
    
    // Project info
    projectName: "Project Name",
    projectNamePlaceholder: "Enter your Erasmus+ project name",
    
    // Navigation
    previous: "Previous",
    next: "Next",
    saveProject: "Save Project",
    downloadPDF: "Download PDF",
    newProject: "New Project",
    loadProject: "Load Project",
    
    // Blocks
    block: "Block",
    of: "of",
    maxPoints: "Maximum points",
    obtainedPoints: "Obtained points",
    subtotal: "Subtotal",
    total: "Total",
    
    // Scoring
    points: "points",
    enterPoints: "Enter points",
    notes: "Notes/Comments",
    notesPlaceholder: "Add notes or comments about this item (optional)",
    
    // Results
    results: "Results",
    finalScore: "Final Score",
    evaluation: "Evaluation",
    excellent: "Excellent - High probability of success",
    acceptable: "Acceptable - Requires refinement",
    risk: "High risk of rejection",
    
    // Messages
    projectSaved: "Project saved successfully",
    projectLoaded: "Project loaded",
    fillProjectName: "Please enter the project name",
    invalidPoints: "Points must be between 0 and the maximum allowed",
    
    // PDF
    pdfTitle: "Erasmus+ Project Evaluation",
    pdfDate: "Date",
    pdfProject: "Project",
    pdfSummary: "Evaluation Summary",
    
    // Storage
    savedProjects: "Saved Projects",
    noProjects: "No saved projects",
    deleteProject: "Delete",
    loadThisProject: "Load",
    confirmDelete: "Are you sure you want to delete this project?",
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('erasmus-language');
    return (saved === 'en' || saved === 'es') ? saved : 'es';
  });

  useEffect(() => {
    localStorage.setItem('erasmus-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
