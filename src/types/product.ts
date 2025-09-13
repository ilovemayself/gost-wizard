export interface ProductData {
  // Наименования
  fullNameRu: string;
  fullNameEn: string;
  shortNameRu: string;
  shortNameEn: string;
  
  // Основная информация
  unit: string;
  normativeDocument: string;
  weight: string;
  class: string;
  materialCategory: string;
  purpose: string;
  
  // Геометрические параметры
  section: string;
  outerDiameter: string;
  outerDiameterInch: string;
  nominalDiameter: string;
  sizeA: string;
  sizeB: string;
  wallThickness: string;
  length: string;
  
  // Технические характеристики
  manufacturingMethod: string;
  construction: string;
  measuredLength: string;
  manufacturingAccuracy: string;
  qualityGroup: string;
  steelGrade: string;
  deoxidationDegree: string;
  rollingCategory: string;
  strengthClass: string;
  
  // Дополнительные характеристики
  hasThreading: boolean;
  hasCouplings: boolean;
  hasCoating: boolean;
  agingTest: boolean;
  hydrogenCrackingTest: boolean;
  iccResistance: boolean;
  
  // Испытания на ударную вязкость
  kcuTestTemperature: string;
  kcuMinValue: string;
  kcvTestTemperature: string;
  kcvMinValue: string;
}

export interface ParsedComponents {
  type: string;
  outerDiameter: string;
  wallThickness: string;
  steelGrade: string;
  standard: string;
  manufacturingMethod?: string;
  construction?: string;
}