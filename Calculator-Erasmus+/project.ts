export interface ItemScore {
  itemId: string;
  points: number;
  notes?: string;
}

export interface BlockScore {
  blockId: number;
  items: ItemScore[];
}

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  blocks: BlockScore[];
}

export interface ProjectSummary {
  projectName: string;
  totalScore: number;
  maxScore: number;
  blockScores: {
    blockId: number;
    blockName: string;
    score: number;
    maxScore: number;
  }[];
  evaluation: 'excellent' | 'acceptable' | 'risk';
  date: string;
}
