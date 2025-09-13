import { FastenerData, ParsedComponents } from '@/types/fastener';

export class FastenerParser {
  static parse(name: string): FastenerData {
    const parsed = this.parseComponents(name);
    return this.mapToFastenerData(parsed, name);
  }

  private static parseComponents(name: string): ParsedComponents {
    // Парсинг типа крепежа
    const type = this.extractType(name);
    
    // Парсинг диаметра (М10 или просто 10)
    const diameter = this.extractDiameter(name);
    
    // Парсинг класса точности (7H, 08)
    const accuracyClass = this.extractAccuracyClass(name);
    
    // Парсинг толщины (для шайб)
    const thickness = this.extractThickness(name);
    
    // Парсинг материала (12Х18Н10Т)
    const material = this.extractMaterial(name);
    
    // Парсинг марки стали
    const steelGrade = this.extractSteelGrade(material);
    
    // Парсинг стандарта (ОСТ 26-2041-96)
    const standard = this.extractStandard(name);
    
    // Определение применения
    const application = this.extractApplication(name);

    return {
      type,
      application,
      diameter,
      accuracyClass,
      thickness,
      material,
      steelGrade,
      standard
    };
  }

  private static extractType(name: string): string {
    if (name.toLowerCase().includes('гайка')) return 'Гайка';
    if (name.toLowerCase().includes('шайба')) return 'Шайба';
    if (name.toLowerCase().includes('болт')) return 'Болт';
    if (name.toLowerCase().includes('винт')) return 'Винт';
    return 'Неизвестно';
  }

  private static extractDiameter(name: string): string {
    const match = name.match(/М?(\d+(?:\.\d+)?)/);
    return match ? match[1] : '';
  }

  private static extractAccuracyClass(name: string): string {
    const match = name.match(/(\d+[HГ]|\.\d+)/);
    return match ? match[1] : '';
  }

  private static extractThickness(name: string): string {
    // Для шайб толщина обычно идет после диаметра через точку
    const match = name.match(/\d+\.(\d+)/);
    return match ? match[1] : '';
  }

  private static extractMaterial(name: string): string {
    const match = name.match(/(\d+[ХНТ]+\d*[ХНТ]*\d*)/);
    return match ? match[1] : '';
  }

  private static extractSteelGrade(material: string): string {
    // Определение класса стали по маркировке
    if (material.includes('12Х18Н10Т')) return 'Аустенитная нержавеющая сталь';
    if (material.includes('08Х18Н10Т')) return 'Аустенитная нержавеющая сталь';
    return 'Легированная сталь';
  }

  private static extractStandard(name: string): string {
    const match = name.match(/(ОСТ|ГОСТ)\s*([\d\-\.]+)/);
    return match ? `${match[1]} ${match[2]}` : '';
  }

  private static extractApplication(name: string): string {
    if (name.includes('фланцевых соединений')) return 'Фланцевые соединения';
    return 'Общего назначения';
  }

  private static mapToFastenerData(parsed: ParsedComponents, originalName: string): FastenerData {
    return {
      name: originalName,
      unit: 'шт',
      normativeDocument: parsed.standard,
      weight: this.calculateWeight(parsed),
      class: this.determineClass(parsed),
      materialCategory: this.determineMaterialCategory(parsed.material),
      threadDiameter: parsed.diameter,
      thickness: parsed.thickness || 'Не указано',
      material: parsed.material,
      steelGrade: parsed.steelGrade,
      accuracyClass: parsed.accuracyClass,
      vickersHardness: this.determineHardness(parsed.material),
      washerType: this.determineWasherType(parsed),
      hasChamfer: this.hasChamfer(parsed),
      hasCoating: this.hasCoating(parsed)
    };
  }

  private static calculateWeight(parsed: ParsedComponents): string {
    // Примерный расчет веса на основе диаметра и типа
    const diameter = parseFloat(parsed.diameter);
    if (isNaN(diameter)) return 'Не указано';

    if (parsed.type === 'Гайка') {
      return (diameter * diameter * 0.01).toFixed(3) + ' кг';
    } else if (parsed.type === 'Шайба') {
      return (diameter * diameter * 0.005).toFixed(3) + ' кг';
    }
    return 'Не указано';
  }

  private static determineClass(parsed: ParsedComponents): string {
    if (parsed.material.includes('12Х18Н10Т')) return 'А2';
    if (parsed.material.includes('08Х18Н10Т')) return 'А1';
    return 'Стандартный';
  }

  private static determineMaterialCategory(material: string): string {
    if (material.includes('Х18Н10Т')) return 'Нержавеющая сталь';
    return 'Углеродистая сталь';
  }

  private static determineHardness(material: string): string {
    if (material.includes('12Х18Н10Т')) return '200-250 HV';
    if (material.includes('08Х18Н10Т')) return '180-230 HV';
    return 'Не указано';
  }

  private static determineWasherType(parsed: ParsedComponents): string {
    if (parsed.type === 'Шайба') {
      if (parsed.application.includes('фланцевых')) return 'Плоская усиленная';
      return 'Плоская обычная';
    }
    return 'Не применимо';
  }

  private static hasChamfer(parsed: ParsedComponents): boolean {
    // По умолчанию у гаек есть фаска
    return parsed.type === 'Гайка';
  }

  private static hasCoating(parsed: ParsedComponents): boolean {
    // Нержавеющая сталь обычно не требует покрытия
    return !parsed.material.includes('Х18Н10Т');
  }
}