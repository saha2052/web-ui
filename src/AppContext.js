import React, {
    useContext,
    createContext,
    useState,
} from 'react';

const appContext = createContext({
    darkMode: false,
    setDarkMode: () => {
    },
});

export const useAppContext = () => {
    return useContext(appContext);
}

export const ProvideAppContext = ({children}) => {
    const auth = useProvideAppContext();
    return (
        <appContext.Provider value={auth}>
            {children}
        </appContext.Provider>
    );
}

const useProvideAppContext = () => {
    const [darkMode, setDarkMode] = useState(false);

    return {
        darkMode,
        setDarkMode,
    };
}