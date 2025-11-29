import React from 'react'
import './style.css'
import { useTheme } from './context/useTheme'

const LightDarkTheme = ({themeType, changeTheme}) => {
    console.log('lightdarktheme')
    return (
        <div>
            <h1>
                LightDarkTheme
            </h1>
            <A themeType={themeType} changeTheme={changeTheme}/>
        </div>
    )
}

const A = ({themeType, changeTheme}) => {
    console.log('A')
    return <B themeType={themeType} changeTheme={changeTheme} />
}
const B = () => {
    console.log('B')
    const {themeType, changeTheme } = useTheme();
    return <div>
        <h1>Current Theme Type: {themeType}</h1>
        <button onClick={changeTheme}>Change Theme!</button>
    </div>
}


export default LightDarkTheme