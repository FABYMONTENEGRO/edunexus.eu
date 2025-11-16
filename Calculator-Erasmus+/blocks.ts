export interface BlockItem {
  id: string;
  points: number;
  description: {
    es: string;
    en: string;
  };
}

export interface Block {
  id: number;
  name: {
    es: string;
    en: string;
  };
  maxPoints: number;
  items: BlockItem[];
}

export const blocks: Block[] = [
  {
    id: 1,
    name: {
      es: "ALINEAMIENTO ESTRATÉGICO",
      en: "STRATEGIC ALIGNMENT"
    },
    maxPoints: 25,
    items: [
      {
        id: "1.1",
        points: 6,
        description: {
          es: "El proyecto responde a al menos 2 prioridades horizontales 2024-2027: Transición verde/digital, Inclusión, Derechos humanos/democracia, ODS",
          en: "The project responds to at least 2 horizontal priorities 2024-2027: Green/digital transition, Inclusion, Human rights/democracy, SDGs"
        }
      },
      {
        id: "1.2",
        points: 4,
        description: {
          es: "Incluye explícitamente los Objetivos de la Unión Europea en Educación (European Strategy for Universities, Digital Education Action Plan)",
          en: "Explicitly includes European Union Education Objectives (European Strategy for Universities, Digital Education Action Plan)"
        }
      },
      {
        id: "1.3",
        points: 3,
        description: {
          es: "El título y resumen usan palabras clave estratégicas reconocibles por evaluadores (green skills, inclusive mobility, sustainable HE, SDG localization)",
          en: "Title and summary use strategic keywords recognizable by evaluators (green skills, inclusive mobility, sustainable HE, SDG localization)"
        }
      },
      {
        id: "1.4",
        points: 5,
        description: {
          es: "Hay una justificación clara y con datos de por qué se trabaja con Argentina/Latinoamérica - brechas de capacitación, sinergias temáticas, alineación con EU-LAC Roadmap 2023-2027",
          en: "Clear data-driven justification for working with Argentina/Latin America - training gaps, thematic synergies, alignment with EU-LAC Roadmap 2023-2027"
        }
      },
      {
        id: "1.5",
        points: 4,
        description: {
          es: "El proyecto se alinea con al menos una convocatoria específica 2025/2026 (KA2 Capacity Building HE, Jean Monnet Network, KA171-HED wave 2)",
          en: "Project aligns with at least one specific call 2025/2026 (KA2 Capacity Building HE, Jean Monnet Network, KA171-HED wave 2)"
        }
      },
      {
        id: "1.6",
        points: 3,
        description: {
          es: "Incluye indicadores SMART de impacto (no solo actividades)",
          en: "Includes SMART impact indicators (not just activities)"
        }
      }
    ]
  },
  {
    id: 2,
    name: {
      es: "CONSORCIO Y GOBERNANZA",
      en: "CONSORTIUM AND GOVERNANCE"
    },
    maxPoints: 20,
    items: [
      {
        id: "2.1",
        points: 4,
        description: {
          es: "Edunexus actúa como coordinador (ventaja clave al ser de país del programa)",
          en: "Edunexus acts as coordinator (key advantage being from program country)"
        }
      },
      {
        id: "2.2",
        points: 3,
        description: {
          es: "El consorcio tiene ≥1 socio argentino fuerte (UBA, UNR, UNTREF, Scalabrini Ortiz, ProYungas, RAMCC)",
          en: "Consortium has ≥1 strong Argentine partner (UBA, UNR, UNTREF, Scalabrini Ortiz, ProYungas, RAMCC)"
        }
      },
      {
        id: "2.3",
        points: 3,
        description: {
          es: "Presencia de ≥1 socio europeo recurrente (Sevilla, Tuscia, Lisboa, Lille, Perpignan) - demuestra confianza y capacidad",
          en: "Presence of ≥1 recurring European partner (Sevilla, Tuscia, Lisboa, Lille, Perpignan) - demonstrates trust and capacity"
        }
      },
      {
        id: "2.4",
        points: 3,
        description: {
          es: "Hay equilibrio geográfico y de roles: no un solo país dominando; roles claros (coordinador, liderazgo temático, evaluación, difusión)",
          en: "Geographic and role balance: no single country dominating; clear roles (coordinator, thematic leadership, evaluation, dissemination)"
        }
      },
      {
        id: "2.5",
        points: 3,
        description: {
          es: "Incluye al menos 1 socio no académico relevante (ONG, museo, fundación, empresa social)",
          en: "Includes at least 1 relevant non-academic partner (NGO, museum, foundation, social enterprise)"
        }
      },
      {
        id: "2.6",
        points: 2,
        description: {
          es: "Existe memorandum de entendimiento (MoU) o carta de intención firmada por todos los socios",
          en: "Memorandum of Understanding (MoU) or letter of intent signed by all partners exists"
        }
      },
      {
        id: "2.7",
        points: 2,
        description: {
          es: "Distribución equitativa de fondos (sin sobrecarga al coordinador ni subfinanciación de socios clave)",
          en: "Equitable distribution of funds (no overload to coordinator or underfunding of key partners)"
        }
      }
    ]
  },
  {
    id: 3,
    name: {
      es: "CALIDAD DE LA PROPUESTA",
      en: "PROPOSAL QUALITY"
    },
    maxPoints: 30,
    items: [
      {
        id: "3.1",
        points: 5,
        description: {
          es: "Las actividades son innovadoras, no solo repetición de buenas prácticas (metodologías mixtas presencial+VR, gamificación, co-creación)",
          en: "Activities are innovative, not just repetition of good practices (mixed in-person+VR methodologies, gamification, co-creation)"
        }
      },
      {
        id: "3.2",
        points: 6,
        description: {
          es: "Incluye transferencia de conocimiento sostenible (no solo eventos): MOOCs/OERs, guías descargables, políticas institucionales, redes post-proyecto",
          en: "Includes sustainable knowledge transfer (not just events): MOOCs/OERs, downloadable guides, institutional policies, post-project networks"
        }
      },
      {
        id: "3.3",
        points: 5,
        description: {
          es: "Tiene un plan de impacto claro: cómo se mide, quién se beneficia a largo plazo, y cómo se escalará (local → nacional → regional)",
          en: "Has clear impact plan: how it's measured, who benefits long-term, and how it will scale (local → national → regional)"
        }
      },
      {
        id: "3.4",
        points: 4,
        description: {
          es: "Movilidad bien diseñada (si aplica KA171-HED): duración razonable (3-12 meses), combinación física/virtual, apoyo lingüístico y tutorías",
          en: "Well-designed mobility (if KA171-HED applies): reasonable duration (3-12 months), physical/virtual combination, linguistic support and tutoring"
        }
      },
      {
        id: "3.5",
        points: 4,
        description: {
          es: "Incluye medidas de inclusión concretas: subvenciones adicionales para discapacidad, adaptaciones curriculares, participación de personas vulnerables",
          en: "Includes concrete inclusion measures: additional grants for disability, curricular adaptations, participation of vulnerable people"
        }
      },
      {
        id: "3.6",
        points: 4,
        description: {
          es: "Sostenibilidad post-proyecto: plan de ≥2 años con fuentes de financiamiento alternativas (fondos nacionales, autofinanciamiento, redes UE-LA)",
          en: "Post-project sustainability: ≥2 year plan with alternative funding sources (national funds, self-financing, EU-LA networks)"
        }
      },
      {
        id: "3.7",
        points: 2,
        description: {
          es: "Género transversal: no solo una actividad aislada, sino integrado en diseño, selección, monitoreo (equilibrio 50/50, enfoque interseccional)",
          en: "Mainstreamed gender: not just isolated activity, but integrated in design, selection, monitoring (50/50 balance, intersectional approach)"
        }
      }
    ]
  },
  {
    id: 4,
    name: {
      es: "GESTIÓN Y PRESUPUESTO",
      en: "MANAGEMENT AND BUDGET"
    },
    maxPoints: 15,
    items: [
      {
        id: "4.1",
        points: 4,
        description: {
          es: "Presupuesto realista y bien desglosado - sin gastos genéricos (otros) >5%",
          en: "Realistic and well-detailed budget - no generic expenses (others) >5%"
        }
      },
      {
        id: "4.2",
        points: 3,
        description: {
          es: "Costes de movilidad alineados con tablas oficiales de la UE (Irlanda→Argentina: viaje €1,300 + manutención €960/mes)",
          en: "Mobility costs aligned with official EU tables (Ireland→Argentina: travel €1,300 + subsistence €960/month)"
        }
      },
      {
        id: "4.3",
        points: 3,
        description: {
          es: "Incluye riesgos identificados + plan de mitigación (crisis política, pandemia, cambio de gobierno en socios)",
          en: "Includes identified risks + mitigation plan (political crisis, pandemic, government change in partners)"
        }
      },
      {
        id: "4.4",
        points: 3,
        description: {
          es: "Equipo de gestión con experiencia comprobable en Erasmus+ (CVs de coordinador con proyectos anteriores)",
          en: "Management team with verifiable Erasmus+ experience (coordinator CVs with previous projects)"
        }
      },
      {
        id: "4.5",
        points: 2,
        description: {
          es: "Sistema de monitoreo y evaluación participativa (no solo reportes finales): encuestas, focus groups, revisión intermedia",
          en: "Participatory monitoring and evaluation system (not just final reports): surveys, focus groups, mid-term review"
        }
      }
    ]
  },
  {
    id: 5,
    name: {
      es: "DIFUSIÓN Y VISIBILIDAD",
      en: "DISSEMINATION AND VISIBILITY"
    },
    maxPoints: 10,
    items: [
      {
        id: "5.1",
        points: 3,
        description: {
          es: "Estrategia de difusión multicanal: web, redes sociales, eventos presenciales en Argentina/Europa, Results Platform, publicaciones académicas",
          en: "Multi-channel dissemination strategy: web, social media, in-person events in Argentina/Europe, Results Platform, academic publications"
        }
      },
      {
        id: "5.2",
        points: 2,
        description: {
          es: "Uso obligatorio de logos oficiales de la UE en todo material (con guía de estilo adjunta)",
          en: "Mandatory use of official EU logos in all materials (with attached style guide)"
        }
      },
      {
        id: "5.3",
        points: 3,
        description: {
          es: "Plan para presentar resultados en eventos clave: conferencias Erasmus+, encuentros UE-LAC, foros nacionales de educación superior",
          en: "Plan to present results at key events: Erasmus+ conferences, EU-LAC meetings, national higher education forums"
        }
      },
      {
        id: "5.4",
        points: 2,
        description: {
          es: "Compromiso de publicar al menos 1 artículo en revista indexada o policy brief con resultados",
          en: "Commitment to publish at least 1 article in indexed journal or policy brief with results"
        }
      }
    ]
  }
];
