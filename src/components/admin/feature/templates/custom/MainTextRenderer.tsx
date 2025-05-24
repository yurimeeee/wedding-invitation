import { TemplatesData } from '@type/templates';
import styled from '@emotion/styled';

type MainTextRendererProps = {
  type: string;
  data: TemplatesData;
};
type GroomAndBrideProps = {
  bride?: string;
  groom?: string;
  name?: string;
  data?: TemplatesData;
};

const GroomAndBride = ({ bride, groom, name, data }: GroomAndBrideProps) => {
  return (
    <div className="flex flex-col items-center font-chosun">
      <p className="text-sm mb-1">{data?.main?.date || '2025년 6월 24일 토요일 오후 2시'}</p>
      <p className="text-sm mb-8">{data?.main?.address || '컨벤션웨딩홀 베일리홀'}</p>
      <p className="text-base leading-8 tracking-wider">{name || '철수와 영희'}</p>
      <p className="text-base leading-8 tracking-wider">저희 둘</p>
      <p className="text-xl tracking-wider mt-2">결혼합니다.</p>
    </div>
  );
};
const GroomDotBride = ({ bride, groom, data }: GroomAndBrideProps) => {
  return (
    <div className="flex flex-col items-center font-chosun">
      <p className="text-2xl leading-8 tracking-widest mb-6">
        {data?.groom_last_name && data?.bride_last_name
          ? `${data?.groom_first_name + data?.groom_last_name}  ·  ${data?.bride_first_name + data?.bride_last_name}`
          : '김철수  ·  이영희'}
      </p>
      <p className="text-4xl tracking-widest">우리 결혼합니다</p>
    </div>
  );
};
const GroomAndBrideVertical = ({ bride, groom, name, data }: GroomAndBrideProps) => {
  return (
    <div className="flex flex-col items-center font-chosun">
      <p className="text-xl leading-8 tracking-wider">{data?.groom_last_name || '철수'}</p>
      <p className="text-sm leading-8 tracking-wider">그리고</p>
      <p className="text-xl leading-8 tracking-wider">{data?.bride_last_name || '영희'}</p>
    </div>
  );
};

const MainTextRenderer = ({ type, data }: MainTextRendererProps) => {
  const { bride_first_name, bride_last_name, groom_first_name, groom_last_name } = data;
  //type_1 : "groomAndBride"
  //type_2 : "groomDotBride"
  //type_3 : "groomAndBrideVertival"
  //type_4 : "groomDotBride"
  const renderComponentByType = () => {
    switch (type) {
      case 'groomAndBride':
        return <GroomAndBride name={data.main.main_groom_and_bride_name} data={data} />;
      case 'groomDotBride':
        return <GroomDotBride name={data.main.main_groom_and_bride_name} data={data} />;
      case 'groomAndBrideVertical':
        return <GroomAndBrideVertical name={data.main.main_groom_and_bride_name} data={data} />;
      default:
        return null;
    }
  };

  //   {
  //     "main_title_align": "center",
  //     "main_text_type": "groomAndBride",
  //     "address": "",
  //     "main_img": "",
  //     "date": "",
  //     "intro_content_size": 16,
  //     "main_title_size": 20,
  //     "intro_content_align": "left",
  //     "main_img_tip": "w:250px이상, h: 362px이상",
  //     "main_title": "결혼합니다",
  //     "main_groom_and_bride_name": "철수와 영희",
  //     "intro_content": "평생을 같이하고 싶은 사람을 만났습니다.\n서로 아껴주고 이해하며\n사랑 베풀며 살고 싶습니다.\n저희 약속위에 따듯한 격려로 축복해주셔서\n힘찬 출발의 디딤이 되어 주십시오."
  // }

  const renderIntro = () => {
    return (
      <div className="font-chosun mt-10 mb-8">
        {data?.main?.main_title && <p className={`text-xl text-${data?.main?.intro_content_align} leading-8 tracking-wider mb-4`}>{data?.main?.main_title}</p>}

        <div className={`text-[${data?.main?.intro_content_size}] text-${data?.main?.intro_content_align} leading-[24px] tracking-wide `}>
          {data?.main?.intro_content?.split('\n').map((line: string, index: number) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderComponentByType()}
      {data?.main?.dot_divider && (
        <div className="text-center mt-3 text-gray-400">
          <p className="text-base ">·</p>
          <p className="text-base ">·</p>
          <p className="text-base ">·</p>
        </div>
      )}
      {renderIntro()}
    </>
  );
};

export default MainTextRenderer;
