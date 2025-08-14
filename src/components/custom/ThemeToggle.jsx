import { Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function ThemeToggle() {
  const [theme,setTheme] = useState(localStorage.getItem("theme") || 'light')

  const toggleTheme = () => {
    theme === 'light' ?  setTheme('dark') : setTheme("light")
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }
    useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div onClick={toggleTheme} >
      { theme === 'light' ? <Sun className='w-5 h-5' /> : <Moon  className='w-5 h-5'/> }
    </div>
  )
}

export default ThemeToggle