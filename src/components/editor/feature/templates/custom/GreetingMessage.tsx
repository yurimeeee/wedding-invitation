import React from 'react';
import { TemplatesData } from '@type/templates';

type GreetingMessageProps = {
  main_title: TemplatesData['main']['main_title'];
  main_title_align: TemplatesData['main']['main_title_align'];
  intro_content: TemplatesData['main']['intro_content'];
  intro_content_size?: TemplatesData['main']['intro_content_size'];
  intro_content_align: TemplatesData['main']['intro_content_align'];
  intro_name_display?: TemplatesData['main']['intro_name_display'];
  name_display_order?: TemplatesData['name_display_order'];
  groom_first_name: TemplatesData['groom_first_name'];
  groom_last_name: TemplatesData['groom_last_name'];
  bride_first_name: TemplatesData['bride_first_name'];
  bride_last_name: TemplatesData['bride_last_name'];
};

const GreetingMessage = React.memo(
  ({
    main_title,
    main_title_align,
    intro_content,
    intro_content_size,
    intro_content_align,
    intro_name_display,
    name_display_order,
    groom_first_name,
    groom_last_name,
    bride_first_name,
    bride_last_name,
  }: GreetingMessageProps) => {
    return (
      <div className="font-chosun my-6 px-8">
        {/* 모시는 글 */}
        {main_title && <p className={`text-xl text-${main_title_align} leading-8 tracking-wider mb-4`}>{main_title}</p>}
        <div className={`text-[${intro_content_size}] text-${intro_content_align} leading-[24px] tracking-wide `}>
          {intro_content?.split('\n').map((line: string, index: number) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>

        {/* 글 하단 신랑 · 신부 이름 표기 */}
        {intro_name_display && (
          <div className="flex justify-center mt-8">
            {name_display_order === 'groomFirst' ? (
              <div className="flex">
                <p className="text-base">
                  신랑 {groom_first_name}
                  {groom_last_name || '철수'}
                </p>
                <p className="text-base px-2">·</p>
                <p className="text-base">
                  신부 {bride_first_name}
                  {bride_last_name || '영희'}
                </p>
              </div>
            ) : (
              <div className="flex">
                <p className="text-base">
                  신부 {bride_first_name}
                  {bride_last_name || '영희'}
                </p>
                <p className="text-base px-2">·</p>
                <p className="text-base">
                  신랑 {groom_first_name}
                  {groom_last_name || '철수'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default GreetingMessage;
