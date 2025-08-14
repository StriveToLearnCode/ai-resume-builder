export default {
  name: '黄馨雅',
  phone: '(123)-456-7890',
  email: 'exmaple@gmail.com',
  themeColor: "#5b71a8",
  github: "https://github.com/StriveToLearnCode",
  blog: "https://xinyahunag.top",
  selfEvaluation: "熟练使用 Vue 技术栈，参与过大型且规范化的企业级项目开发，对项目开发的具体流程较为了解",
  experience: [
    {
      id: 1,
      title: '前端实习生',
      companyName: 'Amazon',
      startDate: 'Jan 2021',
      endDate: '',
      currentlyWorking: true,
      details: ''
    },
    {
      id: 2,
      title: '前端实习生',
      companyName: 'Google',
      startDate: 'May 2019',
      endDate: 'Jan 2021',
      currentlyWorking: false,
      details: ''
    }
  ],
  education: [
    {
      id: 1,
      universityName: '厦门工学院',
      startDate: '2022.09',
      endDate: '2026.06',
      degree: '本科',
      major: '软件工程',
      awards: [
        {
          title: "第十六届蓝桥杯",
          level: "全国",
          prize: "三等奖"
        },
        {
          title: "奖学金",
          level: "全国",
          prize: "二等奖"
        }
      ],
    },
    {
      id: 2,
      universityName: '厦门工学院',
      startDate: '2022.09',
      endDate: '2026.06',
      degree: '本科',
      major: '软件工程',
    }
  ],
  skills: [
    {
      id: 1,
      text: '有良好的计算机基础知识，熟悉基本数据结构与算法，了解计算机网络',
    },
    {
      id: 2,
      text: '熟悉 HTML、CSS，有扎实的原生 JavaScript 编程能力，熟悉 ES2015+ 新特性，了解浏览器渲染机制',
    },
    {
      id: 3,
      text: '熟悉 Vue 技术栈，具有多个企业级项目开发经验，同时对 Vue 源码有一定的理解',
    },
    {
      id: 4,
      text: '熟悉小程序开发，对原生小程序开发框架有实战开发经验',
    }
  ],
  projectExperience: [
    {
      title: "Versakit UI",
      details: [
        "项目描述：Versakit UI 是一个基于 TypeScript、Vue3、VitePress、Vite 和 Vitest 构建的 Vue3 组件库，旨在为 Vue3 项目提供一套高质量、易用且具有良好扩展性的 UI 组件，涵盖按钮、输入框、表格、弹窗等，提升开发效率并保证项目一致性与美观性",
        "技术栈：Vue + TypeScript + VitePress + Vitest + Sass",
        "独立完成组件超 10 个（Table、图片懒加载、数据懒加载、Collapse、Button、Alert、Tooltip、渐变文字等）",
        "参与项目技术选型讨论，解决和完善多个内部议题（全局主题切换方案、项目架构优化提案等）",
        "使用 Monorepo 进行项目管理，简化代码协作、版本控制、构建和部署等复杂性",
        "自定义 VitePress 主题，提升文档网站美观性与实用性",
        "基于 IntersectionObserver 完成数据懒加载与图片懒加载指令",
        "基于 Vitest 实现自动化测试，测试覆盖率 85%"
      ]
    },
    {
      title: "Markdown 解析器",
      link: "https://versakit.github.io/Versakit-markdown/",
      details: [
        "项目描述：高性能 Markdown 语法解析器 + 渲染器 + 编辑器，提供 Markdown 输入/输出一站式解决方案",
        "技术栈：TypeScript + Rollup + Pnpm + Vue",
        "从 0 到 1 搭建 Monorepo 项目结构，使用 Pnpm 完成多包管理，并集成 ESLint、Prettier 等工具",
        "优化 Markdown 解析器算法，实现复杂表格结构精准解析与空值智能处理",
        "首创基于 WebWorker 的并行解析方案，提升 Markdown 大文本处理性能 35%",
        "基于 VitePress 搭建项目文档，配置 GitHub Actions 实现文档自动部署至 GitHub Pages"
      ]
    }
  ]
}