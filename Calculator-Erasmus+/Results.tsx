import { blocks } from '@/data/blocks';
import { BlockScore } from '@/types/project';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface ResultsProps {
  blockScores: BlockScore[];
}

export default function Results({ blockScores }: ResultsProps) {
  const { language, t } = useLanguage();

  const calculateBlockTotal = (blockId: number): number => {
    const blockScore = blockScores.find(b => b.blockId === blockId);
    if (!blockScore) return 0;
    return blockScore.items.reduce((sum, item) => sum + item.points, 0);
  };

  const calculateTotalScore = (): number => {
    return blocks.reduce((sum, block) => sum + calculateBlockTotal(block.id), 0);
  };

  const getEvaluation = (score: number): { type: 'excellent' | 'acceptable' | 'risk', text: string, icon: React.ReactNode, color: string } => {
    if (score >= 90) {
      return {
        type: 'excellent',
        text: t('excellent'),
        icon: <CheckCircle2 className="h-8 w-8" />,
        color: 'text-green-600'
      };
    } else if (score >= 75) {
      return {
        type: 'acceptable',
        text: t('acceptable'),
        icon: <AlertTriangle className="h-8 w-8" />,
        color: 'text-yellow-600'
      };
    } else {
      return {
        type: 'risk',
        text: t('risk'),
        icon: <XCircle className="h-8 w-8" />,
        color: 'text-red-600'
      };
    }
  };

  const totalScore = calculateTotalScore();
  const maxScore = blocks.reduce((sum, block) => sum + block.maxPoints, 0);
  const evaluation = getEvaluation(totalScore);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4 text-center">{t('results')}</h2>
        
        <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-4">
          <div className="text-center">
            <p className="text-sm uppercase tracking-wide mb-2 opacity-90">{t('finalScore')}</p>
            <p className="text-6xl font-bold mb-2">
              {totalScore}
              <span className="text-3xl opacity-75"> / {maxScore}</span>
            </p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden mt-4">
              <div 
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${(totalScore / maxScore) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className={`bg-white rounded-lg p-6 ${evaluation.color}`}>
          <div className="flex items-center justify-center gap-3">
            {evaluation.icon}
            <div>
              <p className="text-sm font-medium opacity-75">{t('evaluation')}</p>
              <p className="text-xl font-bold">{evaluation.text}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">{t('block')} {t('subtotal')}</h3>
        {blocks.map((block) => {
          const blockTotal = calculateBlockTotal(block.id);
          const percentage = (blockTotal / block.maxPoints) * 100;
          
          return (
            <Card key={block.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{t('block')} {block.id}: {block.name[language]}</span>
                  <span className="text-blue-600 font-bold">
                    {blockTotal} / {block.maxPoints}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      percentage >= 80 ? 'bg-green-500' : 
                      percentage >= 60 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
