'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import Heading, { Level } from '@tiptap/extension-heading';

import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Italic from '@tiptap/extension-italic';
import Paragraph from '@tiptap/extension-paragraph';
import StarterKit from '@tiptap/starter-kit';
import Text from '@tiptap/extension-text';
import { useEffect } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}
// const TiptapEditor = () => {
// const TiptapEditor = ({ onChange }: { onChange: (html: string) => void }) => {
const TiptapEditor = ({ value, onChange }: Props) => {
  // const editor = useEditor({
  //   extensions: [StarterKit],
  //   content: '<p>Hello World! 🌎️</p>',
  // });
  // Heading 확장 커스터마이징
  const CustomHeading = Heading.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        class: {
          default: null,
          rendered: false,
          parseHTML: () => ({}),
          renderHTML: ({ node }) => {
            const level = node.attrs.level;
            return {
              class: `heading-level-${level}`, // level에 따라 class 다르게 부여
            };
          },
        },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: 'my-custom-paragraph',
        },
      }),
      // Heading.configure({
      //   HTMLAttributes: {
      //     class: 'my-custom-heading',
      //   },
      // }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: {
          class: 'my-custom-heading', // 모든 heading 공통 클래스
        },
      }),
      // CustomHeading.configure({
      //   levels: [1, 2, 3, 4, 5, 6],
      // }),
      // CustomHeading.configure({
      //   levels: [1, 2, 3, 4, 5, 6],
      // }),
      Text,
      Bold,
      Italic,
      // Underline,
    ],
    // content: `
    //   <h1>This is a heading</h1>
    //   <p>This is a paragraph</p>
    // `,
    content: value || '', // 초기값
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange(html); // 값 변경 시 부모에 전달
    },
  });
  const headingLevels: Level[] = [1, 2, 3, 4, 5, 6];

  // useEffect(() => {
  //   if (!editor) return;
  //   const update = () => {
  //     const html = editor.getHTML();
  //     onChange(html);
  //   };
  //   editor.on('update', update);
  //   return () => {
  //     editor.off('update', update);
  //   };
  // }, [editor, onChange]);

  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {headingLevels.map((level) => (
          <button
            key={level}
            onClick={() => editor?.chain().focus().toggleHeading({ level }).run()}
            className={`border px-2 py-1 rounded ${editor?.isActive('heading', { level }) ? 'bg-blue-500 text-white' : ''}`}
          >
            H{level}
          </button>
        ))}
      </div>
      {/* Toolbar */}
      <div className="flex gap-2">
        <button onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive('bold') ? 'font-bold text-blue-600' : ''}>
          Bold
        </button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive('italic') ? 'italic text-blue-600' : ''}>
          Italic
        </button>
        {/* <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className={editor?.isActive('underline') ? 'underline text-blue-600' : ''}>
          Underline
        </button> */}
        {/* editor.chain().toggleHeading({ level : 1 }).focus().run()
editor.chain().toggleHeading({ level : 2 }).focus().run()
editor.chain().toggleHeading({ level : 6 }).focus().run() */}
        {/* <button onClick={() => editor?.chain().toggleHeading({ level: 6 }).focus().run()} className={editor?.isActive('underline') ? 'underline text-blue-600' : ''}>
          6
        </button> */}
      </div>
      {/* <EditorContent editor={editor} /> */}
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  );
};

export default TiptapEditor;
