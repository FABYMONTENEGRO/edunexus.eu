import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { blocks } from '@/data/blocks';
import { Project, BlockScore } from '@/types/project';
import { saveProject, generateProjectId, getAllProjects, deleteProject } from '@/lib/storage';
import Header from '@/components/Header';
import BlockForm from '@/components/BlockForm';
import Results from '@/components/Results';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Save, FileDown, FolderOpen, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { generateProjectPDF } from '@/lib/pdfGenerator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [blockScores, setBlockScores] = useState<BlockScore[]>([]);
  const [savedProjects, setSavedProjects] = useState<Project[]>([]);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);

  useEffect(() => {
    loadSavedProjects();
  }, []);

  const loadSavedProjects = () => {
    setSavedProjects(getAllProjects());
  };

  const initializeNewProject = () => {
    const newProject: Project = {
      id: generateProjectId(),
      name: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      blocks: blocks.map(block => ({
        blockId: block.id,
        items: []
      }))
    };
    setCurrentProject(newProject);
    setBlockScores(newProject.blocks);
    setProjectName('');
    setCurrentStep(0);
  };

  useEffect(() => {
    if (!currentProject) {
      initializeNewProject();
    }
  }, []);

  const handleBlockScoresChange = (blockId: number, scores: any[]) => {
    const newBlockScores = [...blockScores];
    const blockIndex = newBlockScores.findIndex(b => b.blockId === blockId);
    
    if (blockIndex >= 0) {
      newBlockScores[blockIndex] = { blockId, items: scores };
    } else {
      newBlockScores.push({ blockId, items: scores });
    }
    
    setBlockScores(newBlockScores);
    
    if (currentProject) {
      setCurrentProject({
        ...currentProject,
        blocks: newBlockScores,
        updatedAt: new Date().toISOString()
      });
    }
  };

  const handleSaveProject = () => {
    if (!projectName.trim()) {
      toast.error(t('fillProjectName'));
      return;
    }

    if (currentProject) {
      const updatedProject: Project = {
        ...currentProject,
        name: projectName,
        blocks: blockScores,
        updatedAt: new Date().toISOString()
      };
      
      saveProject(updatedProject);
      setCurrentProject(updatedProject);
      toast.success(t('projectSaved'));
      loadSavedProjects();
    }
  };

  const handleLoadProject = (project: Project) => {
    setCurrentProject(project);
    setProjectName(project.name);
    setBlockScores(project.blocks);
    setCurrentStep(0);
    setLoadDialogOpen(false);
    toast.success(t('projectLoaded'));
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm(t('confirmDelete'))) {
      deleteProject(projectId);
      loadSavedProjects();
      toast.success('Proyecto eliminado');
    }
  };

  const handleNewProject = () => {
    if (confirm('¿Crear un nuevo proyecto? Los cambios no guardados se perderán.')) {
      initializeNewProject();
    }
  };

  const handleDownloadPDF = async () => {
    if (!projectName.trim()) {
      toast.error(t('fillProjectName'));
      return;
    }

    if (!currentProject) return;

    try {
      toast.info('Generando PDF...', { duration: 1000 });
      
      const translations = {
        pdfTitle: t('pdfTitle'),
        pdfDate: t('pdfDate'),
        pdfProject: t('pdfProject'),
        pdfSummary: t('pdfSummary'),
        block: t('block'),
        maxPoints: t('maxPoints'),
        obtainedPoints: t('obtainedPoints'),
        total: t('total'),
        evaluation: t('evaluation'),
        excellent: t('excellent'),
        acceptable: t('acceptable'),
        risk: t('risk'),
        points: t('points')
      };

      await generateProjectPDF(
        { ...currentProject, name: projectName },
        language,
        translations
      );
      
      toast.success('PDF generado exitosamente');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error al generar el PDF');
    }
  };

  const totalSteps = blocks.length + 1; // bloques + resultados

  const handleNext = () => {
    if (currentStep === 0 && !projectName.trim()) {
      toast.error(t('fillProjectName'));
      return;
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentBlockScores = (blockId: number) => {
    const blockScore = blockScores.find(b => b.blockId === blockId);
    return blockScore?.items || [];
  };

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t('projectName')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName" className="text-base">
                  {t('projectName')}
                </Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder={t('projectNamePlaceholder')}
                  className="mt-2 text-lg"
                />
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">
                  Esta calculadora evalúa proyectos Erasmus+ en 5 bloques principales:
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  {blocks.map(block => (
                    <li key={block.id} className="flex justify-between">
                      <span>• {block.name.es}</span>
                      <span className="font-semibold text-blue-600">{block.maxPoints} pts</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-semibold text-blue-900 mt-3">
                  Total: 100 puntos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    } else if (currentStep <= blocks.length) {
      const block = blocks[currentStep - 1];
      return (
        <BlockForm
          block={block}
          scores={getCurrentBlockScores(block.id)}
          onScoresChange={(scores) => handleBlockScoresChange(block.id, scores)}
        />
      );
    } else {
      return <Results blockScores={blockScores} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {currentStep === 0 
                ? t('projectName')
                : currentStep <= blocks.length
                ? `${t('block')} ${currentStep} ${t('of')} ${blocks.length}`
                : t('results')
              }
            </span>
            <span className="text-sm text-gray-500">
              {currentStep + 1} / {totalSteps}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewProject}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            {t('newProject')}
          </Button>
          
          <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <FolderOpen className="h-4 w-4" />
                {t('loadProject')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t('savedProjects')}</DialogTitle>
                <DialogDescription>
                  Seleccione un proyecto para cargar
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                {savedProjects.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">{t('noProjects')}</p>
                ) : (
                  savedProjects.map((project) => (
                    <Card key={project.id} className="hover:bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold">{project.name}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(project.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleLoadProject(project)}
                            >
                              {t('loadThisProject')}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveProject}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {t('saveProject')}
          </Button>

          {currentStep === totalSteps - 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPDF}
              className="gap-2"
            >
              <FileDown className="h-4 w-4" />
              {t('downloadPDF')}
            </Button>
          )}
        </div>

        {/* Main content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {t('previous')}
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
            className="gap-2"
          >
            {t('next')}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
