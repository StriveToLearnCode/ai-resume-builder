import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  ListOrdered,
  List,
  ChevronDown
} from 'lucide-react';

const COLORS = [
  '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
  '#FFA500', '#800080', '#00FFFF', '#FFC0CB', '#808080',
];

function RichTextEditor({ expValue, onRichEditorChange }) {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    content: expValue || '',
    onUpdate: ({ editor }) => onRichEditorChange?.(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && expValue) editor.commands.setContent(expValue);
  }, [expValue, editor]);

  return (
    <div className="border rounded p-2">
      {/* 工具栏 */}
      <div className="flex gap-2 mb-2 items-center flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-blue-100' : ''}
        >
          <Bold size={16} />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-blue-100' : ''}
        >
          <Italic size={16} />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'bg-blue-100' : ''}
        >
          <Underline size={16} />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'bg-blue-100' : ''}
        >
          <Strikethrough size={16} />
        </Button>

        {/* 字体颜色选择 */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <span className="w-4 h-4 rounded-sm border inline-block bg-black"></span>
              <ChevronDown size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="grid grid-cols-5 gap-2 p-2">
            {COLORS.map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded-sm border"
                style={{ backgroundColor: color }}
                onClick={() => editor.chain().focus().setColor(color).run()}
              />
            ))}
          </PopoverContent>
        </Popover>

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-blue-100' : ''}
        >
          <List size={16} />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-blue-100' : ''}
        >
          <ListOrdered size={16} />
        </Button>
      </div>

      {/* 编辑器 */}
      <EditorContent editor={editor} className="tiptap prose  p-2" />
    </div>
  );
}


export default RichTextEditor