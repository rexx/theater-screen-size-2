export type Region = 'North' | 'Central' | 'South' | 'East' | 'Historical';
export type Language = 'zh' | 'en';

export interface CinemaScreen {
  id: string;
  name: string;      // Chinese Name (Default)
  nameEn: string;    // English Name
  type: string;      // Chinese Type (Default)
  typeEn: string;    // English Type
  audio: string;
  width: number;
  height: number;
  area: number;
  location: string;  // English Location key
  locationZh: string;// Chinese Location
  region: Region;
}

export type SortOption = 'area' | 'width' | 'height';
export type ViewMode = 'visual' | 'table';
