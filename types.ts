export interface CinemaScreen {
  id: string;
  name: string;
  type: string;
  audio: string;
  width: number;
  height: number;
  area: number;
  location: string;
}

export type SortOption = 'area' | 'width' | 'height';
export type ViewMode = 'visual' | 'table';
