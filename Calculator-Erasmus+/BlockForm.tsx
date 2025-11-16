import { Block } from '@/data/blocks';
import { ItemScore } from '@/types/project';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';

interface BlockFormProps {
  block: Block;
  scores: ItemScore[];
  onScoresChange: (scores: ItemScore[]) => void;
}

export default function BlockForm({ block, scores, onScoresChange }: BlockFormProps) {
  const { language, t } = useLanguage();
  const [localScores, setLocalScores] = useState<ItemScore[]>(scores);

  useEffect(() => {
    setLocalScores(scores);
  }, [scores]);

  const handlePointsChange = (itemId: string, value: string) => {
    const points = value === '' ? 0 : parseInt(value) || 0;
    const item = block.items.find(i => i.id === itemId);
    const maxPoints = item?.points || 0;
    
    // Validar que no exceda el máximo
    const validPoints = Math.min(Math.max(0, points), maxPoints);
    
    const newScores = [...localScores];
    const existingIndex = newScores.findIndex(s => s.itemId === itemId);
    
    if (existingIndex >= 0) {
      newScores[existingIndex] = { ...newScores[existingIndex], points: validPoints };
    } else {
      newScores.push({ itemId, points: validPoints });
    }
    
    setLocalScores(newScores);
    onScoresChange(newScores);
  };

  const handleNotesChange = (itemId: string, notes: string) => {
    const newScores = [...localScores];
    const existingIndex = newScores.findIndex(s => s.itemId === itemId);
    
    if (existingIndex >= 0) {
      newScores[existingIndex] = { ...newScores[existingIndex], notes };
    } else {
      newScores.push({ itemId, points: 0, notes });
    }
    
    setLocalScores(newScores);
    onScoresChange(newScores);
  };

  const getItemScore = (itemId: string): ItemScore => {
    return localScores.find(s => s.itemId === itemId) || { itemId, points: 0 };
  };

  const calculateSubtotal = (): number => {
    return localScores.reduce((sum, score) => sum + score.points, 0);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          {block.name[language]}
        </h2>
        <p className="text-sm text-blue-700">
          {t('maxPoints')}: <span className="font-semibold">{block.maxPoints}</span> {t('points')}
        </p>
      </div>

      <div className="space-y-4">
        {block.items.map((item) => {
          const itemScore = getItemScore(item.id);
          
          return (
            <Card key={item.id} className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-start justify-between gap-4">
                  <span className="flex-1">{item.description[language]}</span>
                  <span className="text-blue-600 font-semibold whitespace-nowrap">
                    {t('maxPoints')}: {item.points}
                  </span>
                </CardTitle>
                <CardDescription className="text-xs">
                  {item.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor={`points-${item.id}`} className="text-sm font-medium">
                    {t('obtainedPoints')}
                  </Label>
                  <Input
                    id={`points-${item.id}`}
                    type="number"
                    min="0"
                    max={item.points}
                    value={itemScore.points || ''}
                    onChange={(e) => handlePointsChange(item.id, e.target.value)}
                    placeholder={t('enterPoints')}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`notes-${item.id}`} className="text-sm font-medium">
                    {t('notes')}
                  </Label>
                  <Textarea
                    id={`notes-${item.id}`}
                    value={itemScore.notes || ''}
                    onChange={(e) => handleNotesChange(item.id, e.target.value)}
                    placeholder={t('notesPlaceholder')}
                    className="mt-1 min-h-[60px]"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-blue-50 border-2 border-blue-300">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-lg font-bold">
            <span className="text-blue-900">{t('subtotal')} {t('block')} {block.id}:</span>
            <span className="text-blue-600">
              {calculateSubtotal()} / {block.maxPoints} {t('points')}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
