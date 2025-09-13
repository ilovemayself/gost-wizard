import { useState } from 'react';
import { ProductForm } from '@/components/ProductForm';
import { ProductDetails } from '@/components/ProductDetails';
import { ProductData } from '@/types/product';
import { Settings, Database, FileText, Circle } from 'lucide-react';

const Index = () => {
  const [productData, setProductData] = useState<ProductData | null>(null);

  const handleParse = (data: ProductData) => {
    setProductData(data);
  };

  const handleUpdate = (data: ProductData) => {
    setProductData(data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-tech-dark text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Circle className="w-8 h-8 text-tech-blue" />
              <div>
                <h1 className="text-2xl font-bold">Анализатор трубной продукции</h1>
                <p className="text-gray-300 text-sm">Автоматическое заполнение технических характеристик по ГОСТ</p>
              </div>
            </div>
            <Settings className="w-6 h-6 text-gray-300" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        <ProductForm onParse={handleParse} />
        
        {productData && (
          <ProductDetails 
            data={productData} 
            onUpdate={handleUpdate}
          />
        )}

        {!productData && (
          <div className="text-center py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-tech-dark mb-4">
                Добро пожаловать в анализатор трубной продукции
              </h2>
              <p className="text-tech-dark/70 mb-8">
                Введите полное наименование трубного изделия для автоматического анализа и заполнения 
                всех технических характеристик согласно нормативным документам ГОСТ.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div className="bg-tech-light p-6 rounded-lg border border-tech-border">
                  <Database className="w-8 h-8 text-tech-blue mb-3 mx-auto" />
                  <h3 className="font-semibold text-tech-dark mb-2">35+ параметров</h3>
                  <p className="text-tech-dark/70">Автоматическое заполнение всех технических характеристик</p>
                </div>
                
                <div className="bg-tech-light p-6 rounded-lg border border-tech-border">
                  <Circle className="w-8 h-8 text-tech-blue mb-3 mx-auto" />
                  <h3 className="font-semibold text-tech-dark mb-2">Трубная продукция</h3>
                  <p className="text-tech-dark/70">Специализация на бесшовных и сварных трубах</p>
                </div>
                
                <div className="bg-tech-light p-6 rounded-lg border border-tech-border">
                  <Settings className="w-8 h-8 text-tech-blue mb-3 mx-auto" />
                  <h3 className="font-semibold text-tech-dark mb-2">Расчёты</h3>
                  <p className="text-tech-dark/70">Автоматический расчет веса, размеров и характеристик</p>
                </div>
                
                <div className="bg-tech-light p-6 rounded-lg border border-tech-border">
                  <FileText className="w-8 h-8 text-tech-blue mb-3 mx-auto" />
                  <h3 className="font-semibold text-tech-dark mb-2">ГОСТ стандарты</h3>
                  <p className="text-tech-dark/70">Соответствие требованиям ГОСТ 9941-2022</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-tech-light/50 rounded-lg border border-tech-border">
                <h3 className="text-lg font-semibold text-tech-dark mb-4">Поддерживаемые характеристики:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-xs text-tech-dark/70">
                  <div>• Наименования (RU/EN)</div>
                  <div>• Геометрические размеры</div>
                  <div>• Марки стали</div>
                  <div>• Способы изготовления</div>
                  <div>• Классы прочности</div>
                  <div>• Испытания на вязкость</div>
                  <div>• Коррозионная стойкость</div>
                  <div>• Нормативные документы</div>
                  <div>• Расчёт веса</div>
                  <div>• Дополнительные свойства</div>
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
