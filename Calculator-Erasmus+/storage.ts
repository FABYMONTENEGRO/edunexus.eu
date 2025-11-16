import { Project } from '@/types/project';

const STORAGE_KEY = 'erasmus-projects';

export function saveProject(project: Project): void {
  const projects = getAllProjects();
  const existingIndex = projects.findIndex(p => p.id === project.id);
  
  if (existingIndex >= 0) {
    projects[existingIndex] = project;
  } else {
    projects.push(project);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getAllProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getProject(id: string): Project | null {
  const projects = getAllProjects();
  return projects.find(p => p.id === id) || null;
}

export function deleteProject(id: string): void {
  const projects = getAllProjects();
  const filtered = projects.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function generateProjectId(): string {
  return `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
