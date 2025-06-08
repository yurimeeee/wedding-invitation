import { TemplatesData } from '@type/templates';

type GreetingMessageProps = {
  data: TemplatesData;
};

const GreetingMessage = ({ data }: GreetingMessageProps) => {
  return (
    <div className="font-chosun my-6 px-8">
      {/* 모시는 글 */}
      {/* {data?.main?.main_title && <p className={`text-xl text-${data?.main?.main_title_align} leading-8 tracking-wider mb-4`}>{data?.main?.main_title}</p>}
      <div dangerouslySetInnerHTML={{ __html: data?.main?.intro_content }} /> */}
      {data?.main?.main_title && <p className={`text-xl text-${data?.main?.main_title_align} leading-8 tracking-wider mb-4`}>{data?.main?.main_title}</p>}
      <div className={`text-[${data?.main?.intro_content_size}] text-${data?.main?.intro_content_align} leading-[24px] tracking-wide `}>
        {data?.main?.intro_content?.split('\n').map((line: string, index: number) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </div>

      {/* 글 하단 신랑 · 신부 이름 표기 */}
      {data?.main?.intro_name_display && (
        <div className="flex justify-center mt-8">
          {data?.name_display_order === 'groomFirst' ? (
            <div className="flex">
              <p className="text-base">
                신랑 {data?.groom_first_name}
                {data?.groom_last_name || '철수'}
              </p>
              <p className="text-base px-2">·</p>
              <p className="text-base">
                신부 {data?.bride_first_name}
                {data?.bride_last_name || '영희'}
              </p>
            </div>
          ) : (
            <div className="flex">
              <p className="text-base">
                신부 {data?.bride_first_name}
                {data?.bride_last_name || '영희'}
              </p>
              <p className="text-base px-2">·</p>
              <p className="text-base">
                신랑 {data?.groom_first_name}
                {data?.groom_last_name || '철수'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GreetingMessage;
