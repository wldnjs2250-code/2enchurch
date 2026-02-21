import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WorshipTime {
  id: string;
  name: string;
  time: string;
}

export interface ChurchInfo {
  name: string;
  slogan: string;
  address: string;
  phone: string;
  youtube: string;
  instagram: string;
  kakao: string;
  worshipTimes: WorshipTime[];
}

export interface ChurchIntro {
  greetingTitle: string;
  pastorName: string;
  greetingText: string;
  pastorImageUrl: string;
  visionTitle: string;
  visionSlogan: string;
  visionText: string;
}

export interface Sermon {
  id: string;
  title: string;
  pastor: string;
  date: string;
  passage: string;
  youtubeUrl: string;
  imageUrl?: string;
  isPinned: boolean;
}

export interface News {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
  isPinned: boolean;
}

interface AppState {
  info: ChurchInfo;
  intro: ChurchIntro;
  sermons: Sermon[];
  news: News[];
  adminPassword: string;
  setInfo: (info: ChurchInfo) => void;
  setIntro: (intro: ChurchIntro) => void;
  setSermons: (sermons: Sermon[]) => void;
  setNews: (news: News[]) => void;
  setAdminPassword: (password: string) => void;
}

const defaultInfo: ChurchInfo = {
  name: '산전온누리교회',
  slogan: '하나님을 기쁘시게, 세상을 아름답게 하는 제자 공동체',
  address: '울산광역시 중구 산전길 103 (동동 162-4)',
  phone: '052-296-3550',
  youtube: 'https://youtube.com',
  instagram: 'https://instagram.com',
  kakao: 'https://pf.kakao.com',
  worshipTimes: [
    { id: '1', name: '주일 1부 예배', time: '오전 11:00' },
    { id: '2', name: '주일 2부 예배', time: '오후 01:30' },
    { id: '3', name: '수요 기도회', time: '오후 08:00' },
    { id: '4', name: '금요 기도회', time: '오후 08:00' },
  ],
};

const defaultIntro: ChurchIntro = {
  greetingTitle: '환영합니다',
  pastorName: '이일우 담임목사',
  greetingText: '"하나님의 사랑이 가득한 산전온누리교회에 오신 것을 진심으로 환영합니다."',
  pastorImageUrl: 'https://picsum.photos/seed/pastor/400/400',
  visionTitle: '우리의 비전',
  visionSlogan: '"하나님을 기쁘시게, 세상을 아름답게 하는 제자 공동체"',
  visionText: '산전온누리교회는 하나님의 영광이 가득하며, 모든 성도가 주님의 제자로 성장하는 공동체입니다. 우리는 성경의 권위를 인정하며 복음의 능력을 믿습니다.',
};

const defaultSermons: Sermon[] = [
  {
    id: '1',
    title: '부르심, 보내심, 그리고 승리',
    pastor: '이일우 목사',
    date: '2026-02-08',
    passage: '사도행전 13 : 1 - 12',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://picsum.photos/seed/sermon1/800/400',
    isPinned: true,
  },
  {
    id: '2',
    title: '내가 누구이기에',
    pastor: '이일우 목사',
    date: '2026-01-18',
    passage: '사도행전 11 : 1 - 18',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://picsum.photos/seed/sermon2/800/400',
    isPinned: false,
  },
  {
    id: '3',
    title: '비시디아 안디옥에서 전도하다',
    pastor: '이일우 목사',
    date: '2025-02-15',
    passage: '사도행전 13 : 42 - 52',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://picsum.photos/seed/sermon3/800/400',
    isPinned: false,
  },
];

const defaultNews: News[] = [
  {
    id: '1',
    title: 'ㅂㅈㄷㅂㅈㄷ',
    date: '2026-02-20',
    content: 'ㅁㄴㅇㅁㄴㅇ',
    isPinned: true,
  },
  {
    id: '2',
    title: '2024 전교인 체육대회 안내',
    date: '2024-05-15',
    content: '오는 6월 1일(토) 오전 10시부터 운동장에서 전교인 체육대회가 열립니다.',
    imageUrl: 'https://picsum.photos/seed/news1/800/400',
    isPinned: false,
  },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      info: defaultInfo,
      intro: defaultIntro,
      sermons: defaultSermons,
      news: defaultNews,
      adminPassword: '1234',
      setInfo: (info) => set({ info }),
      setIntro: (intro) => set({ intro }),
      setSermons: (sermons) => set({ sermons }),
      setNews: (news) => set({ news }),
      setAdminPassword: (adminPassword) => set({ adminPassword }),
    }),
    {
      name: 'church-storage',
    }
  )
);
