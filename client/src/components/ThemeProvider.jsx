import { useEffect, useState, createContext } from 'react';
import { applyCustomTheme, getCustomTheme } from '../hooks/colourTheme';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [themeVars, setThemeVars] = useState({});

    useEffect(() => {
        getCustomTheme().then(theme => {
            if (theme) {
                console.log('Custom theme loaded:', theme);
                setThemeVars(theme);
                applyCustomTheme(theme);
            }
        });
    }, []);

    useEffect(() => {
        if (themeVars) {
            applyCustomTheme(themeVars);
            console.log('Applied custom theme:', themeVars);
        }
    }, [themeVars]);

    return (
        <ThemeContext.Provider value={{ themeVars, setThemeVars }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;