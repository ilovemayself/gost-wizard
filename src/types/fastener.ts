export interface FastenerData {
  name: string;
  unit: string;
  normativeDocument: string;
  weight: string;
  class: string;
  materialCategory: string;
  threadDiameter: string;
  thickness: string;
  material: string;
  steelGrade: string;
  accuracyClass: string;
  vickersHardness: string;
  washerType: string;
  hasChamfer: boolean;
  hasCoating: boolean;
}

export interface ParsedComponents {
  type: string;
  application: string;
  diameter: string;
  accuracyClass: string;
  thickness?: string;
  material: string;
  steelGrade: string;
  standard: string;
}