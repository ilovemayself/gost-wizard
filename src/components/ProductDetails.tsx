import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductData } from '@/types/product';
import { Edit2, Save, X, FileText, Settings, TestTube2 } from 'lucide-react';

interface ProductDetailsProps {
  data: ProductData;
  onUpdate: (data: ProductData) => void;
}

export const ProductDetails = ({ data, onUpdate }: ProductDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<ProductData>(data);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(data);
    setIsEditing(false);
  };

  const updateField = (field: keyof ProductData, value: string | boolean) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const renderField = (
    label: string,
    field: keyof ProductData,
    type: 'text' | 'boolean' = 'text',
    unit?: string
  ) => {
    const value = editData[field];
    
    return (
      <div className="space-y-2">
        <Label className="text-tech-dark font-medium text-sm">{label}</Label>
        {isEditing ? (
          type === 'boolean' ? (
            <div className="flex items-center space-x-2">
              <Switch
                checked={value as boolean}
                onCheckedChange={(checked) => updateField(field, checked)}
              />
              <span className="text-sm text-tech-dark">
                {value ? 'Да' : 'Нет'}
              </span>
            </div>
          ) : (
            <Input
              value={value as string}
              onChange={(e) => updateField(field, e.target.value)}
              className="border-tech-border focus:border-tech-blue text-sm"
            />
          )
        ) : (
          type === 'boolean' ? (
            <Badge 
              variant={value ? "default" : "secondary"}
              className={value ? "bg-tech-success text-white" : "bg-gray-200 text-gray-700"}
            >
              {value ? 'Да' : 'Нет'}
            </Badge>
          ) : (
            <p className="text-sm text-tech-dark bg-tech-light/50 p-2 rounded border">
              {value as string}{unit ? ` ${unit}` : ''}
            </p>
          )
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-6xl mx-auto border-tech-border">
      <CardHeader className="bg-tech-light flex flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-tech-blue" />
          <CardTitle className="text-tech-dark">Технические характеристики продукции</CardTitle>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button 
                size="sm" 
                onClick={handleSave}
                className="bg-tech-success hover:bg-tech-success/90 text-white"
              >
                <Save className="w-4 h-4 mr-1" />
                Сохранить
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleCancel}
                className="border-tech-border text-tech-dark hover:bg-tech-light"
              >
                <X className="w-4 h-4 mr-1" />
                Отмена
              </Button>
            </>
          ) : (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setIsEditing(true)}
              className="border-tech-border text-tech-dark hover:bg-tech-light"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Редактировать
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="basic" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Основное</span>
            </TabsTrigger>
            <TabsTrigger value="geometry" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Геометрия</span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Технические</span>
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center space-x-2">
              <TestTube2 className="w-4 h-4" />
              <span>Испытания</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderField('Полное наименование (RU)', 'fullNameRu')}
              {renderField('Полное наименование (EN)', 'fullNameEn')}
              {renderField('Краткое наименование (RU)', 'shortNameRu')}
              {renderField('Краткое наименование (EN)', 'shortNameEn')}
              {renderField('Ед. изм.', 'unit')}
              {renderField('Нормативный документ', 'normativeDocument')}
              {renderField('Вес МТР', 'weight', 'text', 'кг')}
              {renderField('Класс', 'class')}
              {renderField('Категория материала', 'materialCategory')}
              {renderField('Назначение', 'purpose')}
            </div>
          </TabsContent>

          <TabsContent value="geometry" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderField('Сечение', 'section')}
              {renderField('Диаметр наружный', 'outerDiameter', 'text', 'мм')}
              {renderField('Диаметр наружный (дюйм)', 'outerDiameterInch', 'text', '"')}
              {renderField('Диаметр номинальный', 'nominalDiameter', 'text', 'мм')}
              {renderField('Размер А', 'sizeA', 'text', 'мм')}
              {renderField('Размер В', 'sizeB', 'text', 'мм')}
              {renderField('Толщина стенки', 'wallThickness', 'text', 'мм')}
              {renderField('Длина', 'length', 'text', 'мм')}
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderField('Способ изготовления', 'manufacturingMethod')}
              {renderField('Конструкция', 'construction')}
              {renderField('Мерная длина', 'measuredLength')}
              {renderField('Точность изготовления', 'manufacturingAccuracy')}
              {renderField('Группа качества', 'qualityGroup')}
              {renderField('Марка стали', 'steelGrade')}
              {renderField('Степень раскисления', 'deoxidationDegree')}
              {renderField('Категория проката', 'rollingCategory')}
              {renderField('Класс прочности', 'strengthClass')}
              {renderField('Наличие резьбы', 'hasThreading', 'boolean')}
              {renderField('Наличие муфт', 'hasCouplings', 'boolean')}
              {renderField('Наличие покрытия', 'hasCoating', 'boolean')}
            </div>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderField('Испытание на старение', 'agingTest', 'boolean')}
                {renderField('Испытание на водородное растрескивание', 'hydrogenCrackingTest', 'boolean')}
                {renderField('Стойкость к МКК', 'iccResistance', 'boolean')}
              </div>
              
              <div className="border-t border-tech-border pt-6">
                <h3 className="text-lg font-semibold text-tech-dark mb-4">Ударная вязкость</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {renderField('KCU, t образца', 'kcuTestTemperature', 'text', '°C')}
                  {renderField('KCU, не менее', 'kcuMinValue', 'text', 'Дж/см²')}
                  {renderField('KCV, t образца', 'kcvTestTemperature', 'text', '°C')}
                  {renderField('KCV, не менее', 'kcvMinValue', 'text', 'Дж/см²')}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Сводка */}
        <div className="mt-8 p-4 bg-tech-light/30 rounded-lg border border-tech-border">
          <h3 className="text-sm font-semibold text-tech-dark mb-2">Сводка продукции:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="font-medium">Диаметр:</span> {data.outerDiameter} мм
            </div>
            <div>
              <span className="font-medium">Толщина:</span> {data.wallThickness} мм
            </div>
            <div>
              <span className="font-medium">Материал:</span> {data.steelGrade}
            </div>
            <div>
              <span className="font-medium">Вес:</span> {data.weight} кг/м
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};