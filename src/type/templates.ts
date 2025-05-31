export type TemplatesData = {
  main: {
    main_img: string;
    main_title: string;
    main_title_size: number;
    main_groom_and_bride_name: string;
    intro_content_align: 'left' | 'center' | 'right';
    main_title_align: 'left' | 'center' | 'right';
    date: string;
    intro_content_size: number;
    main_text_type: 'groomAndBride' | 'groomDotBride' | 'groomAndBrideVertical';
    address: string;
    intro_content: string;
    main_img_tip: string;
    dot_divider: boolean;
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
  }[];
  address_detail: string;
  address: string;
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
};
