import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ProductData } from '@/types/product';
import { ProductParser } from '@/utils/productParser';

interface ProductFormProps {
  onParse: (data: ProductData) => void;
}

export const ProductForm = ({ onParse }: ProductFormProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const parsedData = ProductParser.parse(inputValue.trim());
      onParse(parsedData);
    }
  };

  const handleExample = (example: string) => {
    setInputValue(example);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto border-tech-border">
      <CardHeader className="bg-tech-light">
        <CardTitle className="text-tech-dark">Анализ наименования трубной продукции</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-name" className="text-tech-dark font-medium">
              Полное наименование изделия
            </Label>
            <Input
              id="product-name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Введите полное наименование трубной продукции..."
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
                onClick={() => handleExample('Труба бесшовная 18х2-08X18H10TГОСТ 9941-2022')}
                className="text-xs border-tech-border text-tech-dark hover:bg-tech-light"
              >
                Пример: 18х2
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleExample('Труба бесшовная 25х2,5-08Х18Н10ГОСТ 9941-2022')}
                className="text-xs border-tech-border text-tech-dark hover:bg-tech-light"
              >
                Пример: 25х2,5
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleExample('Труба бесшовная 32х3,5-12Х18Н10ТГОСТ 9941-2022')}
                className="text-xs border-tech-border text-tech-dark hover:bg-tech-light"
              >
                Пример: 32х3,5
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-6 p-4 bg-tech-light/50 rounded-lg border border-tech-border">
          <h3 className="text-sm font-semibold text-tech-dark mb-2">Поддерживаемые форматы:</h3>
          <ul className="text-xs text-tech-dark/70 space-y-1">
            <li>• Труба бесшовная [диаметр]х[толщина]-[марка стали][стандарт]</li>
            <li>• Автоматическое определение 35+ технических параметров</li>
            <li>• Поддержка стандартов ГОСТ 9941-2022 и аналогичных</li>
            <li>• Расчет веса, номинальных размеров и классификация материалов</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};