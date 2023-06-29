import React, {useContext} from 'react'
import './CharacterCard.css'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { FavoritesContext } from '../../contexts/FavoritesContext'


function CharacterCard({character}) {
  // change to use global state
  // NOTE: {} not []
  const {favorites, addCharacter, removeCharacter} = useContext(FavoritesContext)

  // create veriable to control heart icons
  // const isFavorite = false;
  // change to state
  const [isFavorite, setIsFavorite] = React.useState(false)

  // need to check if this character is in favorites anytime favorites changes
  React.useEffect (
    () => {
      // console.log('favorites changed')
      // is this chracter in favorites?
      setIsFavorite(favorites.find(item => item.id == character.id))

    }, [favorites]
  )

  return (
    <div className='character-card'>
        <img src={character?.image} />
        <p>{character?.name}</p>
        <Link to={`/details/${character?.id}`}>See Details</Link>
        {
          isFavorite?
          <FaHeart className='heart-icon' onClick={() => removeCharacter(character?.id)}/>
          :
          <FaRegHeart className='heart-icon' onClick={() => addCharacter(character)}/>
        }
    </div>
  )
}

export default CharacterCard