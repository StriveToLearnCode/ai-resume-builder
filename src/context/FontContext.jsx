import React, { createContext, useState, useEffect, useRef } from "react";
import GlobalApi from "../../service/GlobalApi.js";
import { toast } from "sonner";

// eslint-disable-next-line react-refresh/only-export-components
export const FontContext = createContext({});

export function FontProvider({ children, resumeId, resumeInfo }) {
  const [fontClass, setFontClass] = useState("font-inter");
  const [titleSize, setTitleSize] = useState(20);
  const [subTitleSize, setSubTitleSize] = useState(16);
  const [baseSize, setBaseSize] = useState(13);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [margin, setMargin] = useState(0);

  const timerRef = useRef(null);

  // 同步后端数据到状态（只在 options 存在时）
  useEffect(() => {
    const options = resumeInfo?.options?.[0];
    if (!options) return;

    setFontClass(options.fontFamily || "font-inter");
    setTitleSize(options.TitleFontSize || 20);
    setSubTitleSize(options.SubTitleFontSize || 16);
    setBaseSize(options.baseFontSize || 13);
    setLineHeight(options.lineHeight || 1.2);
    setMargin(options.padding || 0);
  }, [resumeInfo]);

  // 自动同步到后端（只在 resumeId 和 options 完整时触发）
  useEffect(() => {
    if (!resumeId || !resumeInfo?.options?.[0]) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      const payload = {
        data: {
          options: [
            {
              fontFamily: fontClass || "font-inter",
              TitleFontSize: titleSize || 20,
              SubTitleFontSize: subTitleSize || 16,
              baseFontSize: baseSize || 13,
              lineHeight: lineHeight || 1.2,
              padding: margin || 0,
            },
          ],
        },
      };

      try {
        await GlobalApi.updateResumeDetail(resumeId, payload, "options");
        console.log("Font options 同步成功");
        toast("Font options 同步成功");
      } catch (err) {
        console.error("Font options 同步失败", err);
        toast.error("Font options 同步失败，请重试");
      }
    }, 300);

    return () => clearTimeout(timerRef.current);
  }, [fontClass, titleSize, subTitleSize, baseSize, lineHeight, margin, resumeId, resumeInfo]);

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
