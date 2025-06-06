'use client';

import { EditorContent, useEditor } from '@tiptap/react';

import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Italic from '@tiptap/extension-italic';
import Paragraph from '@tiptap/extension-paragraph';
import StarterKit from '@tiptap/starter-kit';
import Text from '@tiptap/extension-text';

const TiptapEditor = () => {
  // const editor = useEditor({
  //   extensions: [StarterKit],
  //   content: '<p>Hello World! 🌎️</p>',
  // });

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: 'my-custom-paragraph',
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: 'my-custom-heading',
        },
      }),
      Text,
      Bold,
      Italic,
      // Underline,
    ],
    content: `
      <h1>This is a heading</h1>
      <p>This is a paragraph</p>
    `,
  });

  return (
    <div>
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
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
