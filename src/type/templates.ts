import { Timestamp } from "firebase/firestore";

export type TemplatesData = {
  main: {
    main_img: string;
    main_title: string;
    main_title_size: number;
    main_groom_and_bride_name: string;
    intro_content_align: 'left' | 'center' | 'right';
    main_title_align: 'left' | 'center' | 'right';
    date: string;
    time: string;
    intro_content_size: number;
    main_text_type: 'groomAndBride' | 'groomDotBride' | 'groomAndBrideVertical';
    address: string;
    intro_content: string;
    main_img_tip: string;
    dot_divider: boolean;
    // 새로 추가
    intro_name_display?: boolean //글 하단 신랑 · 신부 이름 표기
  };
  directions_desc: {
    type: '지하철' | '버스' | '주차' | string;
    desc: string[];
  }[];
  bride_last_name: string;
  bride_first_name: string;
  bride_dad: string;
  bride_mom: string;
  bride_phone: string;
  bride_account: {
    name: string;
    account: string;
    bank: string;
    kakao: string;
  }[];
  groom_last_name: string;
  groom_first_name: string;
  groom_dad: string;
  groom_mom: string;
  groom_phone: string;
  groom_account: {
    name: string;
    account: string;
    bank: string;
    kakao: string;
  }[];
  address_detail: string;
  address: string;
  address_name: string;
  wedding_day: string;
  hall_phone: string;
  isFirstSon: boolean;
  isFirstDaughter: boolean
  gallery: string[];
  thumbnail: string;
  type: string;
  id?: string;
  // 새로 추가
  name_display_order?: 'groomFirst' | 'brideFirst';
  full_name_display: boolean;
  // 혼주 정보
  bride_parents?: {
    dad: { name: string, isDeceased: boolean, isDeceased_mark?: string }, // 'text' | 'icon'
    mom: { name: string, isDeceased: boolean, isDeceased_mark?: string },
  },
  groom_parents?: {
    dad: { name: string, isDeceased: boolean, isDeceased_mark?: string },
    mom: { name: string, isDeceased: boolean, isDeceased_mark?: string },
  },
  account_title?: string // 마음 전하실 곳
  account_desc?: string // 참석이 어려우신 분들을 위해 기재했습니다 너그러운 마음으로 양해 부탁드립니다
  account_layout?: string // 'tab' | 'align'
  account_design?: string //'row' | 'col'  계좌 노출 디자인
  is_account_open?: boolean // 계좌 정보 가려두기
  is_kakao_account?: boolean // 카카오페이 송금 연결하기

  share_kakao_img?: string
  share_kakao_title?: string
  share_kakao_desc?: string
  share_link_img?: string
  share_link_title?: string
  share_link_desc?: string

  calendar_display?: boolean
  countdown_display?: boolean
  d_day_display?: boolean

  family_display_type?: string  //'row' | 'center' | 'brief'  // 가족 표시

  groom_dad_phone: string
  groom_mom_phone: string
  bride_dad_phone: string
  bride_mom_phone: string
  guestbook_display?: boolean
  guestbook_title: string
  guestbook_desc: string
  guestbook_password: string

  attendance_display?: boolean
  attendance_title?: string
  attendance_desc?: string
  attendees_eat_or_not?: boolean
  attendees_number?: boolean

  bgm_display?: boolean
  bgm_url?: string
  bgm_auto_play?: boolean

  uploadedAt: any,
  isDraft?: boolean,

};


export type GuestMessageData = {
  name: string
  password: string
  contents: string
  createdAt?: Timestamp
  id?: string
};
export type AttendeeInfoData = {
  whose_guest: string
  attendance: boolean
  eat_or_not: boolean
  name: string
  number_of_accompany?: any
  memo?: string
  id?: string
};
