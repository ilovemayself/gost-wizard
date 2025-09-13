import { useState } from 'react';
import { FastenerForm } from '@/components/FastenerForm';
import { FastenerDetails } from '@/components/FastenerDetails';
import { FastenerData } from '@/types/fastener';
import { Settings, Database } from 'lucide-react';

const Index = () => {
  const [fastenerData, setFastenerData] = useState<FastenerData | null>(null);

  const handleParse = (data: FastenerData) => {
    setFastenerData(data);
  };

  const handleUpdate = (data: FastenerData) => {
    setFastenerData(data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-tech-dark text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Database className="w-8 h-8 text-tech-blue" />
              <div>
                <h1 className="text-2xl font-bold">Анализатор крепежных изделий</h1>
                <p className="text-gray-300 text-sm">Автоматическое заполнение характеристик по ГОСТ и ОСТ</p>
              </div>
            </div>
            <Settings className="w-6 h-6 text-gray-300" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        <FastenerForm onParse={handleParse} />
        
        {fastenerData && (
          <FastenerDetails 
            data={fastenerData} 
            onUpdate={handleUpdate}
          />
        )}

        {!fastenerData && (
          <div className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-tech-dark mb-4">
                Добро пожаловать в анализатор крепежных изделий
              </h2>
              <p className="text-tech-dark/70 mb-6">
                Введите полное наименование крепежного изделия для автоматического анализа и заполнения 
                технических характеристик согласно нормативным документам.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-tech-light p-4 rounded-lg border border-tech-border">
                  <h3 className="font-semibold text-tech-dark mb-2">Распознавание типа</h3>
                  <p className="text-tech-dark/70">Автоматическое определение типа крепежа (гайка, шайба, болт)</p>
                </div>
                <div className="bg-tech-light p-4 rounded-lg border border-tech-border">
                  <h3 className="font-semibold text-tech-dark mb-2">Парсинг параметров</h3>
                  <p className="text-tech-dark/70">Извлечение размеров, материала и класса точности</p>
                </div>
                <div className="bg-tech-light p-4 rounded-lg border border-tech-border">
                  <h3 className="font-semibold text-tech-dark mb-2">База стандартов</h3>
                  <p className="text-tech-dark/70">Соответствие ГОСТ и ОСТ требованиям</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
