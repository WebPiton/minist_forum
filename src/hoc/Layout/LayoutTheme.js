import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "../../theme";

function LayoutTheme(props) {
    const [theme, setTheme] = useState("light");
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("theme") === null) {
            localStorage.setItem('theme', "light")
        }
        localStorage.getItem("theme") === "light" ? setTheme("light") : setTheme("dark")
        localStorage.getItem("theme") === "light" ? setChecked(false) : setChecked(true)
    }, [])

    const switchTheme = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
        theme === "light" ? setChecked(true) : setChecked(false);
        theme === "light" ? localStorage.setItem("theme", "dark") : localStorage.setItem('theme', "light")
    };

    const Button = () => {
        return (
            <React.Fragment>
                {document.location.pathname !== '/questions/' ?
                <label className="switch">
                    <input onChange={switchTheme} checked={checked} id="qwerty" type="checkbox" />
                    <span className="slider round"></span>
                </label> : null}
            </React.Fragment>
        )
    }

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyles />
            {/* <button className="theme" onClick={switchTheme}>{theme === "light" ? "Темная" : "Светлая"} тема</button> */}
            <Button />
            {props.children}
        </ThemeProvider>
    );
}
export default LayoutTheme;