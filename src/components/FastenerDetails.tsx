import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { FastenerData } from '@/types/fastener';
import { Edit2, Save, X } from 'lucide-react';

interface FastenerDetailsProps {
  data: FastenerData;
  onUpdate: (data: FastenerData) => void;
}

export const FastenerDetails = ({ data, onUpdate }: FastenerDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<FastenerData>(data);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(data);
    setIsEditing(false);
  };

  const updateField = (field: keyof FastenerData, value: string | boolean) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-tech-border">
      <CardHeader className="bg-tech-light flex flex-row items-center justify-between">
        <CardTitle className="text-tech-dark">Технические характеристики</CardTitle>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Основная информация */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-tech-dark mb-3 pb-2 border-b border-tech-border">
              Основная информация
            </h3>
          </div>
          
          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Наименование</Label>
            {isEditing ? (
              <Input
                value={editData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="border-tech-border focus:border-tech-blue"
              />
            ) : (
              <p className="text-sm text-tech-dark bg-tech-light p-2 rounded border">{data.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Ед. изм.</Label>
            {isEditing ? (
              <Input
                value={editData.unit}
                onChange={(e) => updateField('unit', e.target.value)}
                className="border-tech-border focus:border-tech-blue"
              />
            ) : (
              <Badge variant="secondary" className="bg-tech-light text-tech-dark">{data.unit}</Badge>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Нормативный документ</Label>
            {isEditing ? (
              <Input
                value={editData.normativeDocument}
                onChange={(e) => updateField('normativeDocument', e.target.value)}
                className="border-tech-border focus:border-tech-blue"
              />
            ) : (
              <Badge variant="outline" className="border-tech-blue text-tech-blue">{data.normativeDocument}</Badge>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Вес МТР</Label>
            {isEditing ? (
              <Input
                value={editData.weight}
                onChange={(e) => updateField('weight', e.target.value)}
                className="border-tech-border focus:border-tech-blue"
              />
            ) : (
              <p className="text-sm text-tech-dark">{data.weight}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Класс</Label>
            {isEditing ? (
              <Input
                value={editData.class}
                onChange={(e) => updateField('class', e.target.value)}
                className="border-tech-border focus:border-tech-blue"
              />
            ) : (
              <Badge className="bg-tech-blue text-white">{data.class}</Badge>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Категория материала</Label>
            {isEditing ? (
              <Input
                value={editData.materialCategory}
                onChange={(e) => updateField('materialCategory', e.target.value)}
                className="border-tech-border focus:border-tech-blue"
              />
            ) : (
              <p className="text-sm text-tech-dark">{data.materialCategory}</p>
            )}
          </div>

          {/* Технические параметры */}
          <div className="lg:col-span-3 mt-6">
            <h3 className="text-lg font-semibold text-tech-dark mb-3 pb-2 border-b border-tech-border">
              Технические параметры
            </h3>
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Диаметр резьбы</Label>
            {isEditing ? (
              <Input
                value={editData.threadDiameter}
                onChange={(e) => updateField('threadDiameter', e.target.value)}
                className="border-tech-border focus:border-tech-blue"
              />
            ) : (
              <p className="text-sm text-tech-dark font-mono">{data.threadDiameter} мм</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Толщина</Label>
            {isEditing ? (
              <Input
                value={editData.thickness}
                onChange={(e) => updateField('thickness', e.target.value)}
                className="border-tech-border focus:border-tech-blue"
              />
            ) : (
              <p className="text-sm text-tech-dark">{data.thickness}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Материал</Label>
            {isEditing ? (
              <Input
                value={editData.material}
                onChange={(e) => updateField('material', e.target.value)}
                className="border-tech-border focus:border-tech-blue"
              />
            ) : (
              <p className="text-sm text-tech-dark font-mono">{data.material}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Марка стали</Label>
            {isEditing ? (
              <Input
                value={editData.steelGrade}
                onChange={(e) => updateField('steelGrade', e.target.value)}
                className="border-tech-border focus:border-tech-blue"
              />
            ) : (
              <p className="text-sm text-tech-dark">{data.steelGrade}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Класс точности</Label>
            {isEditing ? (
              <Input
                value={editData.accuracyClass}
                onChange={(e) => updateField('accuracyClass', e.target.value)}
                className="border-tech-border focus:border-tech-blue"
              />
            ) : (
              <Badge variant="outline" className="border-tech-border text-tech-dark">{data.accuracyClass}</Badge>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Твердость по Виккерсу</Label>
            {isEditing ? (
              <Input
                value={editData.vickersHardness}
                onChange={(e) => updateField('vickersHardness', e.target.value)}
                className="border-tech-border focus:border-tech-blue"
              />
            ) : (
              <p className="text-sm text-tech-dark">{data.vickersHardness}</p>
            )}
          </div>

          {/* Дополнительные характеристики */}
          <div className="lg:col-span-3 mt-6">
            <h3 className="text-lg font-semibold text-tech-dark mb-3 pb-2 border-b border-tech-border">
              Дополнительные характеристики
            </h3>
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Тип шайбы</Label>
            {isEditing ? (
              <Input
                value={editData.washerType}
                onChange={(e) => updateField('washerType', e.target.value)}
                className="border-tech-border focus:border-tech-blue"
              />
            ) : (
              <p className="text-sm text-tech-dark">{data.washerType}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Наличие фаски</Label>
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editData.hasChamfer}
                  onCheckedChange={(checked) => updateField('hasChamfer', checked)}
                />
                <span className="text-sm text-tech-dark">
                  {editData.hasChamfer ? 'Есть' : 'Нет'}
                </span>
              </div>
            ) : (
              <Badge 
                variant={data.hasChamfer ? "default" : "secondary"}
                className={data.hasChamfer ? "bg-tech-success text-white" : "bg-gray-200 text-gray-700"}
              >
                {data.hasChamfer ? 'Есть' : 'Нет'}
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-tech-dark font-medium">Наличие покрытия</Label>
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editData.hasCoating}
                  onCheckedChange={(checked) => updateField('hasCoating', checked)}
                />
                <span className="text-sm text-tech-dark">
                  {editData.hasCoating ? 'Есть' : 'Нет'}
                </span>
              </div>
            ) : (
              <Badge 
                variant={data.hasCoating ? "default" : "secondary"}
                className={data.hasCoating ? "bg-tech-warning text-white" : "bg-gray-200 text-gray-700"}
              >
                {data.hasCoating ? 'Есть' : 'Нет'}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};