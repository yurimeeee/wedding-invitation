import { TemplatesData } from '@type/templates';

type GreetingMessageProps = {
  data: TemplatesData;
};

const GreetingMessage = ({ data }: GreetingMessageProps) => {
  return (
    <div className="font-chosun my-6 px-8">
      <div dangerouslySetInnerHTML={{ __html: data?.main?.intro_content }} />
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

export default GreetingMessage;
