import { CinemaScreen } from './types';

export const SCREEN_DATA: CinemaScreen[] = [
  {
    id: '1',
    name: '國立海洋科技博物館',
    type: '8K投影機*',
    audio: '-',
    width: 29.00,
    height: 22.00,
    area: 638,
    location: 'Keelung'
  },
  {
    id: '2',
    name: '台北美麗華大直',
    type: 'IMAX(雷射)',
    audio: 'IMAX 12.1',
    width: 28.40,
    height: 21.20,
    area: 602.08,
    location: 'Taipei'
  },
  {
    id: '3',
    name: '台北國賓大戲院',
    type: '鉅院廳(雷射)*',
    audio: 'Dolby Atmos',
    width: 22.00,
    height: 12.00,
    area: 264,
    location: 'Taipei'
  },
  {
    id: '4',
    name: '台北松仁威秀',
    type: 'TITAN(雷射)*',
    audio: 'Dolby 7.1',
    width: 22.00,
    height: 12.00,
    area: 264,
    location: 'Taipei'
  },
  {
    id: '5',
    name: '新北新店裕隆城威秀',
    type: 'IMAX(雷射)*',
    audio: '-',
    width: 21.40,
    height: 11.60,
    area: 248.24,
    location: 'New Taipei'
  },
  {
    id: '6',
    name: '新北板橋大遠百威秀',
    type: 'IMAX(雷射)*',
    audio: '-',
    width: 21.30,
    height: 11.50,
    area: 244.95,
    location: 'New Taipei'
  },
  {
    id: '7',
    name: '台北樂聲',
    type: '巨幕廳(雷射)',
    audio: 'Dolby 7.1',
    width: 20.00,
    height: 10.00,
    area: 200,
    location: 'Taipei'
  },
  {
    id: '8',
    name: '台北西門in89',
    type: 'LUXE*',
    audio: 'Dolby 7.1',
    width: 19.30,
    height: 8.30,
    area: 160.19,
    location: 'Taipei'
  },
  {
    id: '9',
    name: '台北美麗華大直',
    type: 'Dolby Cinema',
    audio: 'Dolby Atmos',
    width: 14.80,
    height: 7.00,
    area: 103.60,
    location: 'Taipei'
  }
];

// Human reference size (average height approx 1.7m)
export const HUMAN_HEIGHT = 1.75;
