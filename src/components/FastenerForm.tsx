import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FastenerData } from '@/types/fastener';
import { FastenerParser } from '@/utils/fastenerParser';

interface FastenerFormProps {
  onParse: (data: FastenerData) => void;
}

export const FastenerForm = ({ onParse }: FastenerFormProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const parsedData = FastenerParser.parse(inputValue.trim());
      onParse(parsedData);
    }
  };

  const handleExample = (example: string) => {
    setInputValue(example);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-tech-border">
      <CardHeader className="bg-tech-light">
        <CardTitle className="text-tech-dark">Анализ наименования крепежных изделий</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fastener-name" className="text-tech-dark font-medium">
              Наименование изделия
            </Label>
            <Input
              id="fastener-name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Введите полное наименование крепежного изделия..."
              className="w-full border-tech-border focus:border-tech-blue"
            />
          </div>
          
          <div className="flex gap-3">
            <Button 
              type="submit" 
              className="bg-tech-blue hover:bg-tech-blue/90 text-white"
              disabled={!inputValue.trim()}
            >
              Анализировать
            </Button>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleExample('Гайка для фланцевых соединений М10.7H.12Х18Н10Т ОСТ 26-2041-96')}
                className="text-xs border-tech-border text-tech-dark hover:bg-tech-light"
              >
                Пример: Гайка
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleExample('Шайба для фланцевых соединений 10.08Х18Н10Т ОСТ 26-2042-96')}
                className="text-xs border-tech-border text-tech-dark hover:bg-tech-light"
              >
                Пример: Шайба
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};