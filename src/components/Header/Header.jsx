import React, { useContext } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../contexts/ThemeContext'


function Header() {
  // create variable for dark mode
  // const darkMode = true;

  // create state for dark mode
  // const [darkMode, setDarkMode] = React.useState(false)

  // change to use global state
  // NOTE: {} not []
  const {darkMode, setDarkMode} = useContext(ThemeContext)

  return (
    <div className={darkMode?"header-container header-dark":"header-container"}>
        <div>
            <Link to='/' style={ {marginRight:"10px"} }>Home</Link>
            <Link to='/about' style={ {marginRight:"10px"} }>About</Link>
            <Link to='/episodes' style={ {marginRight:"10px"} }>Episodes</Link>
        </div>
        <div>
          <Link to='/favorites'>My Favorites</Link>
          <button className= {darkMode?"theme-button theme-button-dark":"theme-button"}
          onClick={() => setDarkMode(!darkMode)} >
            {
              darkMode?"Light Mode" : "Dark Mode"
            }
          </button>
        </div>
    </div>
  )
}

export default Header