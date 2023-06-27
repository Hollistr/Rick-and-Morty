import { useState, createContext, useEffect } from "react";
//use hook to create context
export const ThemeContext = createContext()

export default function ThemeContextProvider(props) {
    // create state
    const [darkMode, setDarkMode] = useState(false)

    useEffect (
        () => {
            // check local storage for intial value
            const storedDarkMode = localStorage.getItem('darkMode')
            console.log('darkMode is', storedDarkMode)
            // check if something is there
            if (storedDarkMode) {
                //use this value to initialize state
                setDarkMode(JSON.parse(storedDarkMode))
            }

        }, [] // run once when component loads
    )

    useEffect (
        () => {
            console.log('darkMode changed')
            //save current state to local storage
            localStorage.setItem('darkMode', JSON.stringify(darkMode))

        }, [darkMode] // run once when component loads
    )


    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode}}>
            {props.children}
        </ThemeContext.Provider>
    )
}