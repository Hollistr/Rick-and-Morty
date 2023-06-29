import { useState, createContext, useEffect } from "react";
//use hook to create context
export const FavoritesContext = createContext()

export default function FavoritesContextProvider(props) {
    // create global state
    const [favorites, setFavorites] = useState([])

    useEffect (
        () => {
            // check local storage for intial value
            const storedFavorites = localStorage.getItem('favoritesList')
            // check if something is there
            if (storedFavorites) {
                //use this value to initialize state
                setFavorites(JSON.parse(storedFavorites))
            }

        }, [] // run once when component loads
    )

    useEffect (
        () => {
            //save current state to local storage when favorites changes
            localStorage.setItem('favoritesList', JSON.stringify(favorites))

        }, [favorites] // run once when component loads
    )

    const addCharacter = (charToAdd) => {
        console.log('adding', charToAdd)
        // add this object to favorites
        let newFavorites = [...favorites, charToAdd]
        console.log(newFavorites)
        setFavorites(newFavorites)
    }

    const removeCharacter = (charId) => {
        console.log('remove id', charId)
        // remove this object from favorites
        let newFavorites = favorites.filter(item => item.id != charId)
        setFavorites(newFavorites)
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addCharacter, removeCharacter }}>
            {props.children}
        </FavoritesContext.Provider>
    )
}