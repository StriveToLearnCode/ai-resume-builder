import React, { createContext, useState, useEffect, useRef } from "react";
import GlobalApi from "../../service/GlobalApi.js";
import { toast } from "sonner";

// eslint-disable-next-line react-refresh/only-export-components
export const FontContext = createContext({});

export function FontProvider({ children, resumeId,resumeInfo }) {

  const [fontClass, setFontClass] = useState("font-inter");
  const [titleSize, setTitleSize] = useState(20);
  const [subTitleSize, setSubTitleSize] = useState(16);
  const [baseSize, setBaseSize] = useState(13);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [margin, setMargin] = useState(0);

  // 同步后端数据到状态
  useEffect(() => {
    if (!resumeInfo?.options?.[0]) return;

    const options = resumeInfo.options[0];
    setFontClass(options.fontFamily || "font-inter");
    setTitleSize(options.TitleFontSize || 20);
    setSubTitleSize(options.SubTitleFontSize || 16);
    setBaseSize(options.baseFontSize || 13);
    setLineHeight(options.lineHeight || 1.2);
    setMargin(options.padding || 0);
  }, [resumeInfo]);

  const timerRef = useRef(null);

  // useEffect 监听任意状态变化
  useEffect(() => {
    if (!resumeId) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {

      try {
        await GlobalApi.updateResumeDetail(resumeId, { data: { 
          options:[
            {
              fontFamily:fontClass,
              lineHeight,
              padding:margin,
              baseFontSize:baseSize,
              TitleFontSize:titleSize,
              SubTitleFontSize:subTitleSize
            }
          ]
        } }, "options");
        console.log("Font options 同步成功");
        toast("Font options 同步成功")
      } catch (err) {
        toast.error("Font options 同步成功")
        console.error("Font options 同步失败", err);
      }
    }, 300);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontClass, titleSize, subTitleSize, baseSize, lineHeight, margin]);

  return (
    <FontContext.Provider
      value={{
        fontClass, setFontClass,
        titleSize, setTitleSize,
        subTitleSize, setSubTitleSize,
        baseSize, setBaseSize,
        lineHeight, setLineHeight,
        margin, setMargin,
      }}
    >
      {children}
    </FontContext.Provider>
  );
}
