import { useLanguage } from '@/contexts/LanguageContext';
import { APP_LOGO, EU_LOGO } from '@/const';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img 
              src={APP_LOGO} 
              alt="Edunexus" 
              className="h-12 object-contain"
            />
            <img 
              src={EU_LOGO} 
              alt="European Commission" 
              className="h-12 object-contain"
            />
          </div>
          
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-blue-900">
              {t('appTitle')}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              {language.toUpperCase()}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
