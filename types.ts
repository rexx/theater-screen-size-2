export type Region = 'North' | 'Central' | 'South' | 'East' | 'Historical';

export interface CinemaScreen {
  id: string;
  name: string;
  type: string;
  audio: string;
  width: number;
  height: number;
  area: number;
  location: string;
  region: Region;
}

export type SortOption = 'area' | 'width' | 'height';
export type ViewMode = 'visual' | 'table';
