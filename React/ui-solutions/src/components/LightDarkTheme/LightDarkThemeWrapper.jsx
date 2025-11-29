import React, { useEffect, useState } from 'react'
import LightDarkTheme from './LightDarkTheme'
import './style.css';
import { ThemeProvider } from './context/ThemeProvider';

const THEME_TYPE = {
    DARK: 'DARK',
    LIGHT: 'LIGHT',
}

const THEME_CLASS = {
    [THEME_TYPE.DARK]: 'dark-theme',
    [THEME_TYPE.LIGHT]: 'light-theme',
}


const LightDarkThemeWrapper = () => {
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
            <div>
                <ThemeProvider value={{themeType, changeTheme}}>
                        <LightDarkTheme themeType={themeType} changeTheme={changeTheme} />
                </ThemeProvider>
            </div>
    )
}

export default LightDarkThemeWrapper