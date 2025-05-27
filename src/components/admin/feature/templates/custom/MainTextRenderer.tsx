import { TemplatesData } from '@type/templates';

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

const GroomAndBride = ({ name, data }: GroomAndBrideProps) => {
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
const GroomDotBride = ({ data }: GroomAndBrideProps) => {
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
const GroomAndBrideVertical = ({ data }: GroomAndBrideProps) => {
  return (
    <div className="flex flex-col items-center font-chosun">
      <p className="text-xl leading-8 tracking-wider">{data?.groom_last_name || '철수'}</p>
      <p className="text-sm leading-8 tracking-wider">그리고</p>
      <p className="text-xl leading-8 tracking-wider">{data?.bride_last_name || '영희'}</p>
    </div>
  );
};

const MainTextRenderer = ({ type, data }: MainTextRendererProps) => {
  console.log('type', type);
  //type_1 : "groomAndBride"
  //type_2 : "groomDotBride"
  //type_3 : "groomAndBrideVertical"
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
