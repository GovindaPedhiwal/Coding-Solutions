import React, { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'

const THEME_TYPE = {
    DARK: 'DARK',
    LIGHT: 'LIGHT',
}

const THEME_CLASS = {
    [THEME_TYPE.DARK]: 'dark-theme',
    [THEME_TYPE.LIGHT]: 'light-theme',
}

export const ThemeProvider = ({children}) => {
    const [themeType, setThemeType] = useState(THEME_TYPE.DARK)
    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];
        const themeClass =  THEME_CLASS[themeType]
        addClassToNode(body, themeClass);
    }, []);

    const addClassToNode = (body, className) => {
        body.classList.add(className)
    }
    const removeClassFromNode = (body, className) => {
        body.classList.remove(className);
    }

    const changeTheme = () => {
        const newTheme = themeType == THEME_TYPE.DARK ? THEME_TYPE.LIGHT : THEME_TYPE.DARK;
        const body = document.getElementsByTagName('body')[0];
        const themeClass =  THEME_CLASS[newTheme];
        const oldThemeClass = THEME_CLASS[themeType];
        addClassToNode(body, themeClass);
        removeClassFromNode(body, oldThemeClass);
        setThemeType(newTheme);
    }

    return (
        <ThemeContext.Provider value={{themeType, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
