import React, {useContext} from 'react'
import { FavoritesContext } from '../../contexts/FavoritesContext'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import './Favorites.css' 
import { ThemeContext } from '../../contexts/ThemeContext'

function Favorites() {
    // change to use global state
    // NOTE: {} not []
    const {darkMode, setDarkMode} = useContext(ThemeContext)

    // change to use global state
    // NOTE: {} not []
    const {favorites} = useContext(FavoritesContext)

    return (
        <div className={darkMode?"favorites-container favorites-dark":"favorites-container"}>
            <h1>My Favorite Characters</h1>
            <div className='favorite-characters'>
            {
                favorites.length > 0?
                favorites.map(item => <CharacterCard key={item.id}
                    character={item} />)
                :
                <p>No favorites selected</p>
            }
            </div>
        </div>
  )
}

export default Favorites