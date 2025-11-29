import { CinemaScreen, Region } from './types';

export const REGIONS: { id: Region; label: string }[] = [
  { id: 'North', label: '北區/宜蘭/桃竹苗' },
  { id: 'Central', label: '中區/彰化' },
  { id: 'South', label: '南區/高雄' },
  { id: 'East', label: '東區/外島' },
  { id: 'Historical', label: '歷史資料 (已歇業/改裝前)' },
];

export const SCREEN_DATA: CinemaScreen[] = [
  // --- North (Taipei, New Taipei, Keelung, Yilan, Taoyuan, Hsinchu) ---
  {
    id: 'n-01',
    name: '國立海洋科技博物館',
    type: '8K投影機*',
    audio: '-',
    width: 29.00,
    height: 22.00,
    area: 638,
    location: 'Keelung',
    region: 'North'
  },
  {
    id: 'n-02',
    name: '台北美麗華大直',
    type: 'IMAX(雷射)',
    audio: 'IMAX 12.1',
    width: 28.40,
    height: 21.20,
    area: 602.08,
    location: 'Taipei',
    region: 'North'
  },
  {
    id: 'n-03',
    name: '台北國賓大戲院',
    type: '鉅院廳(雷射)*',
    audio: 'Dolby Atmos',
    width: 22.00,
    height: 12.00,
    area: 264,
    location: 'Taipei',
    region: 'North'
  },
  {
    id: 'n-04',
    name: '台北松仁威秀',
    type: 'TITAN(雷射)*',
    audio: 'Dolby 7.1',
    width: 22.00,
    height: 12.00,
    area: 264,
    location: 'Taipei',
    region: 'North'
  },
  {
    id: 'n-05',
    name: '新北新店裕隆城威秀',
    type: 'IMAX(雷射)*',
    audio: '-',
    width: 21.40,
    height: 11.60,
    area: 248.24,
    location: 'New Taipei',
    region: 'North'
  },
  {
    id: 'n-06',
    name: '新北板橋大遠百威秀',
    type: 'IMAX(雷射)*',
    audio: '-',
    width: 21.30,
    height: 11.50,
    area: 244.95,
    location: 'New Taipei',
    region: 'North'
  },
  {
    id: 'n-07',
    name: '台北樂聲',
    type: '巨幕廳(雷射)',
    audio: 'Dolby 7.1',
    width: 20.00,
    height: 10.00,
    area: 200,
    location: 'Taipei',
    region: 'North'
  },
  {
    id: 'n-08',
    name: '台北西門in89',
    type: 'LUXE*',
    audio: 'Dolby 7.1',
    width: 19.30,
    height: 8.30,
    area: 160.19,
    location: 'Taipei',
    region: 'North'
  },
  {
    id: 'n-09',
    name: '台北美麗華大直',
    type: 'Dolby Cinema',
    audio: 'Dolby Atmos',
    width: 14.80,
    height: 7.00,
    area: 103.60,
    location: 'Taipei',
    region: 'North'
  },
  {
    id: 't-01',
    name: '桃園新光影城',
    type: 'Dolby Cinema*',
    audio: 'Dolby Atmos',
    width: 20.00,
    height: 10.00,
    area: 200.00,
    location: 'Taoyuan',
    region: 'North'
  },
  {
    id: 't-02',
    name: '桃園美麗新台茂',
    type: 'IMAX',
    audio: '-',
    width: 17.80,
    height: 9.80,
    area: 174.44,
    location: 'Taoyuan',
    region: 'North'
  },
  {
    id: 't-03',
    name: '新竹巨城威秀',
    type: 'IMAX',
    audio: '-',
    width: 17.80,
    height: 9.70,
    area: 172.66,
    location: 'Hsinchu',
    region: 'North'
  },
  {
    id: 't-04',
    name: '桃園新光影城',
    type: 'LUXE',
    audio: 'Dolby Atmos',
    width: 17.00,
    height: 7.00,
    area: 119.00,
    location: 'Taoyuan',
    region: 'North'
  },

  // --- Central (Taichung, Changhua) ---
  {
    id: 'c-01',
    name: '台中大遠百威秀',
    type: 'IMAX',
    audio: '-',
    width: 18.30,
    height: 9.40,
    area: 172.02,
    location: 'Taichung',
    region: 'Central'
  },
  {
    id: 'c-02',
    name: '台中文心秀泰',
    type: '11廳*',
    audio: 'Dolby Atmos',
    width: 14.00,
    height: 7.00,
    area: 98.00,
    location: 'Taichung',
    region: 'Central'
  },

  // --- South (Tainan, Chiayi, Kaohsiung) ---
  {
    id: 's-01',
    name: '台南南紡威秀',
    type: 'IMAX',
    audio: '-',
    width: 21.80,
    height: 12.20,
    area: 265.96,
    location: 'Tainan',
    region: 'South'
  },
  {
    id: 's-02',
    name: '嘉義in89豪華影城',
    type: 'IMAX(雷射)',
    audio: 'IMAX 12.1',
    width: 21.50,
    height: 12.30,
    area: 264.45,
    location: 'Chiayi',
    region: 'South'
  },
  {
    id: 's-03',
    name: '嘉義in89豪華影城',
    type: 'LUXE',
    audio: 'Dolby Atmos',
    width: 20.50,
    height: 10.50,
    area: 215.25,
    location: 'Chiayi',
    region: 'South'
  },
  {
    id: 's-04',
    name: '高雄義大國賓',
    type: '8廳',
    audio: 'Dolby 7.1',
    width: 20.00,
    height: 8.00,
    area: 160,
    location: 'Kaohsiung',
    region: 'South'
  },
  {
    id: 's-05',
    name: '高雄夢時代秀泰',
    type: '巨幕廳(雷射)',
    audio: 'Dolby 7.1',
    width: 19.00,
    height: 8.14,
    area: 154.71,
    location: 'Kaohsiung',
    region: 'South'
  },
  {
    id: 's-06',
    name: '高雄大遠百威秀',
    type: 'IMAX(雷射)*',
    audio: '-',
    width: 15.90,
    height: 8.20,
    area: 130.38,
    location: 'Kaohsiung',
    region: 'South'
  },
  {
    id: 's-07',
    name: '台南國賓',
    type: 'A廳',
    audio: 'Dolby 7.1',
    width: 15.50,
    height: 6.60,
    area: 102.3,
    location: 'Tainan',
    region: 'South'
  },

  // --- East / Islands ---
  {
    id: 'e-01',
    name: '花蓮新天堂樂園威秀',
    type: 'IMAX(雷射)*',
    audio: 'IMAX 12.1',
    width: 21.30,
    height: 12.00,
    area: 255.6,
    location: 'Hualien',
    region: 'East'
  },
  {
    id: 'e-02',
    name: '金門金獅',
    type: '4D+ 影廳(A廳)*',
    audio: 'Dolby Atmos',
    width: 22.20,
    height: 12.00,
    area: 264.4,
    location: 'Kinmen',
    region: 'East'
  },

  // --- Historical ---
  {
    id: 'h-01',
    name: '美麗新淡海(暫停營業)',
    type: '1廳(雷射)',
    audio: 'Dolby Atmos',
    width: 25.00,
    height: 13.50,
    area: 337.5,
    location: 'New Taipei',
    region: 'Historical'
  },
  {
    id: 'h-02',
    name: '國立海洋科技博物館(舊)',
    type: 'IMAX(已改裝)*',
    audio: '-',
    width: 28.40,
    height: 22.00,
    area: 624.8,
    location: 'Keelung',
    region: 'Historical'
  },
  {
    id: 'h-03',
    name: '台北日新威秀(已歇業)',
    type: 'IMAX',
    audio: '-',
    width: 21.10,
    height: 11.30,
    area: 238.43,
    location: 'Taipei',
    region: 'Historical'
  },
  {
    id: 'h-04',
    name: '台中老虎城威秀(舊)',
    type: 'IMAX(已改裝)',
    audio: '-',
    width: 15.40,
    height: 8.60,
    area: 132.44,
    location: 'Taichung',
    region: 'Historical'
  },
  {
    id: 'h-05',
    name: '台中新光(舊)',
    type: '1廳(已改裝)',
    audio: 'Dolby Atmos',
    width: 15.50,
    height: 6.60,
    area: 102.3,
    location: 'Taichung',
    region: 'Historical'
  },
  {
    id: 'h-06',
    name: '台中華威(已易主)',
    type: '1廳',
    audio: 'Dolby Atmos',
    width: 14.30,
    height: 6.25,
    area: 89.375,
    location: 'Taichung',
    region: 'Historical'
  },
  {
    id: 'h-07',
    name: '岡山秀泰(已改裝)',
    type: '巨幕廳(已改裝)',
    audio: 'Dolby 7.1',
    width: 20.00,
    height: 11.00,
    area: 220,
    location: 'Kaohsiung',
    region: 'Historical'
  },
  {
    id: 'h-08',
    name: '夢時代喜滿客(已易主)',
    type: 'CINE-X(雷射)*',
    audio: '-',
    width: 20.00,
    height: 8.20,
    area: 164,
    location: 'Kaohsiung',
    region: 'Historical'
  }
];

export const HUMAN_HEIGHT = 1.75;
