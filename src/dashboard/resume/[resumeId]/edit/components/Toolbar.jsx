import React, { useContext } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FontContext } from "@/context/FontContext";

const fonts = [
  { label: "Inter (Sans)", value: "font-inter" },
  { label: "Merriweather (Serif)", value: "font-merriweather" },
  { label: "Fira Code (Mono)", value: "font-firacode" },
];

const presetSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48];

function Toolbar() {
  const {
    fontClass, setFontClass,
    titleSize, setTitleSize,
    baseSize, setBaseSize,
    subTitleSize, setSubTitleSize,
    lineHeight, setLineHeight,
    margin, setMargin
  } = useContext(FontContext);

  return (
    <div className="bg-white p-3 flex flex-wrap items-center gap-6">
      {/* 字体选择 */}
      <Select value={fontClass} onValueChange={setFontClass}>
        <SelectTrigger className="w-44">{fonts.find(f => f.value === fontClass)?.label}</SelectTrigger>
        <SelectContent>
          {fonts.map(f => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
        </SelectContent>
      </Select>

      {/* 标题字号 */}
      <div className="flex items-center gap-2">
        <span className="text-sm w-16">标题</span>
        <Select value={titleSize} onValueChange={v => setTitleSize(Number(v))}>
          <SelectTrigger className="w-24">{titleSize}px</SelectTrigger>
          <SelectContent>
            {presetSizes.map(sz => <SelectItem key={sz} value={sz}>{sz}px</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* 正文字号 */}
      <div className="flex items-center gap-2">
        <span className="text-sm w-16">正文</span>
        <Select value={baseSize} onValueChange={v => setBaseSize(Number(v))}>
          <SelectTrigger className="w-24">{baseSize}px</SelectTrigger>
          <SelectContent>
            {presetSizes.map(sz => <SelectItem key={sz} value={sz}>{sz}px</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* 小标题字号 */}
      <div className="flex items-center gap-2">
        <span className="text-sm w-16">小标题</span>
        <Select value={subTitleSize} onValueChange={v => setSubTitleSize(Number(v))}>
          <SelectTrigger className="w-24">{subTitleSize}px</SelectTrigger>
          <SelectContent>
            {presetSizes.map(sz => <SelectItem key={sz} value={sz}>{sz}px</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* 行高 */}
      <div className="flex items-center gap-2">
        <span className="text-sm w-16">行高</span>
        <Slider
          value={[lineHeight]}
          min={1}
          max={3}
          step={0.1}
          onValueChange={([v]) => setLineHeight(v)}
          className="w-32"
        />
        <span className="w-8 text-sm text-right">{lineHeight?.toFixed(1)}</span>
      </div>

      {/* 边距 */}
      <div className="flex items-center gap-2">
        <span className="text-sm w-16">边距</span>
        <input
          type="number"
          value={margin}
          onChange={e => setMargin(Number(e.target.value))}
          className="w-20 border px-1 rounded"
        />
        <span className="text-sm">px</span>
      </div>
    </div>
  );
}

export default Toolbar;
