import { ProductData, ParsedComponents } from '@/types/product';

export class ProductParser {
  static parse(name: string): ProductData {
    const parsed = this.parseComponents(name);
    return this.mapToProductData(parsed, name);
  }

  private static parseComponents(name: string): ParsedComponents {
    const type = this.extractType(name);
    const outerDiameter = this.extractOuterDiameter(name);
    const wallThickness = this.extractWallThickness(name);
    const steelGrade = this.extractSteelGrade(name);
    const standard = this.extractStandard(name);
    const manufacturingMethod = this.extractManufacturingMethod(name);
    const construction = this.extractConstruction(name);

    return {
      type,
      outerDiameter,
      wallThickness,
      steelGrade,
      standard,
      manufacturingMethod,
      construction
    };
  }

  private static extractType(name: string): string {
    if (name.toLowerCase().includes('труба')) return 'Труба';
    if (name.toLowerCase().includes('pipe')) return 'Труба';
    return 'Неизвестно';
  }

  private static extractOuterDiameter(name: string): string {
    // Извлечение диаметра из названия типа "18х2" или "25х2,5"
    const match = name.match(/(\d+)х[\d,\.]+/);
    return match ? match[1] : '';
  }

  private static extractWallThickness(name: string): string {
    // Извлечение толщины стенки из названия типа "18х2" или "25х2,5"
    const match = name.match(/\d+х([\d,\.]+)/);
    return match ? match[1].replace(',', '.') : '';
  }

  private static extractSteelGrade(name: string): string {
    const patterns = [
      /08X18H10T/i,
      /08Х18Н10Т/i,
      /08Х18Н10/i,
      /12Х18Н10Т/i,
      /12X18H10T/i
    ];
    
    for (const pattern of patterns) {
      const match = name.match(pattern);
      if (match) return match[0];
    }
    return '';
  }

  private static extractStandard(name: string): string {
    const match = name.match(/(ГОСТ|ОСТ|GOST)\s*([\d\-\.]+)/i);
    return match ? `${match[1]} ${match[2]}` : '';
  }

  private static extractManufacturingMethod(name: string): string {
    if (name.toLowerCase().includes('бесшовная')) return 'холоднодеформированная';
    return 'горячедеформированная';
  }

  private static extractConstruction(name: string): string {
    if (name.toLowerCase().includes('бесшовная')) return 'бесшовная';
    return 'сварная';
  }

  private static mapToProductData(parsed: ParsedComponents, originalName: string): ProductData {
    const outerDiam = parseFloat(parsed.outerDiameter);
    const wallThick = parseFloat(parsed.wallThickness);
    
    return {
      // Наименования
      fullNameRu: originalName,
      fullNameEn: this.translateToEnglish(originalName),
      shortNameRu: this.generateShortName(originalName, 'ru'),
      shortNameEn: this.generateShortName(originalName, 'en'),
      
      // Основная информация
      unit: 'м',
      normativeDocument: parsed.standard,
      weight: this.calculateWeight(outerDiam, wallThick).toString(),
      class: this.determineClass(parsed.steelGrade),
      materialCategory: this.determineMaterialCategory(parsed.steelGrade),
      purpose: 'общего назначения',
      
      // Геометрические параметры
      section: 'круг',
      outerDiameter: parsed.outerDiameter,
      outerDiameterInch: this.convertToInches(outerDiam),
      nominalDiameter: this.calculateNominalDiameter(outerDiam, wallThick),
      sizeA: '',
      sizeB: '',
      wallThickness: parsed.wallThickness,
      length: '',
      
      // Технические характеристики
      manufacturingMethod: parsed.manufacturingMethod || 'холоднодеформированная',
      construction: parsed.construction || 'бесшовная',
      measuredLength: 'нет',
      manufacturingAccuracy: '',
      qualityGroup: '',
      steelGrade: parsed.steelGrade,
      deoxidationDegree: '',
      rollingCategory: '',
      strengthClass: '',
      
      // Дополнительные характеристики
      hasThreading: false,
      hasCouplings: false,
      hasCoating: false,
      agingTest: false,
      hydrogenCrackingTest: false,
      iccResistance: false,
      
      // Испытания на ударную вязкость
      kcuTestTemperature: '',
      kcuMinValue: '',
      kcvTestTemperature: '',
      kcvMinValue: ''
    };
  }

  private static translateToEnglish(nameRu: string): string {
    return nameRu
      .replace(/Труба бесшовная/gi, 'Pipe seamless')
      .replace(/ГОСТ/gi, 'GOST')
      .replace(/08Х18Н10Т/gi, '08X18H10T')
      .replace(/08Х18Н10/gi, '08X18H10')
      .replace(/12Х18Н10Т/gi, '12X18H10T');
  }

  private static generateShortName(fullName: string, lang: 'ru' | 'en'): string {
    if (lang === 'ru') {
      return fullName.replace(/ГОСТ\s*[\d\-\.]+/gi, 'ГОСТ').trim();
    } else {
      return this.translateToEnglish(fullName).replace(/GOST\s*[\d\-\.]+/gi, 'GOST').trim();
    }
  }

  private static calculateWeight(outerDiam: number, wallThick: number): number {
    if (isNaN(outerDiam) || isNaN(wallThick)) return 0;
    
    // Формула для расчета веса трубы: π * (D - S) * S * ρ / 1000
    // где D - наружный диаметр, S - толщина стенки, ρ - плотность стали (≈7850 кг/м³)
    const innerDiam = outerDiam - 2 * wallThick;
    const weight = Math.PI * (outerDiam - wallThick) * wallThick * 0.007850;
    return Math.round(weight * 1000) / 1000;
  }

  private static convertToInches(diamMm: number): string {
    if (isNaN(diamMm)) return '';
    const inches = diamMm / 25.4;
    return inches.toFixed(3);
  }

  private static calculateNominalDiameter(outerDiam: number, wallThick: number): string {
    if (isNaN(outerDiam) || isNaN(wallThick)) return '';
    
    // Номинальный диаметр обычно ближайший стандартный размер
    const nomDiam = outerDiam - 2 * wallThick;
    const standardSizes = [6, 8, 10, 15, 20, 25, 32, 40, 50, 65, 80, 100];
    
    const closest = standardSizes.reduce((prev, curr) => 
      Math.abs(curr - nomDiam) < Math.abs(prev - nomDiam) ? curr : prev
    );
    
    return closest.toString();
  }

  private static determineClass(steelGrade: string): string {
    if (steelGrade.includes('08Х18Н10Т') || steelGrade.includes('08X18H10T')) return 'К0401';
    if (steelGrade.includes('12Х18Н10Т') || steelGrade.includes('12X18H10T')) return 'К0401';
    if (steelGrade.includes('08Х18Н10')) return 'К0401';
    return 'К0401';
  }

  private static determineMaterialCategory(steelGrade: string): string {
    if (steelGrade.includes('Х18Н10') || steelGrade.includes('X18H10')) return '2';
    return '1';
  }
}