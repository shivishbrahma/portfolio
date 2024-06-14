import React from "react";

export const themes = {
    light: {
        base: "#302b27",
        primary: "#00374d",
        secondary: "#a50d12",
        tertiary: "#02642c",
        quaternary: "#fec601",
        baseBg: "#ffffff",
        primaryBg: "#e6f8ff"
    },
    dark: {
        base: "#f4f2f1",
        primary: "#00a8e8",
        secondary: "#f15156",
        tertiary: "#04f06a",
        quaternary: "#ffe066",
        baseBg: "#00171f",
        primaryBg: "#00394d"
    }
};

export function setCSSVariables(theme) {
    for (const value in theme) {
        document.documentElement.style.setProperty(`--${value}`, theme[value]);
    }
}

export const ThemeSelectorContext = React.createContext({
    themeName: "dark"
});
