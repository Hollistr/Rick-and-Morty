import React from 'react'
import './Search.css'
import axios from 'axios'

function Search({setCharacters}) {
    // I need to get the input from the textbox
    // Where will I put it? create state
    const [query, setQuery] = React.useState('')

    // https://rickandmortyapi.com/api/character/?name=beth

    const handleSubmit = (e) => {
        // Stop the page from refreshing
        e.preventDefault();
        console.log('search for', query)

        // Make API call to get matching characters
        axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
        .then(res => {
            console.log(res.data.results)
            // What needs to happen to show data on Homepage?
            // Change chacters to this data
            setCharacters(res.data.results)
        })
        .catch(err => {
            // Check for not found
            if(err.response.status === 404) {
                alert(`No characters named ${query}`)
            } else {
                console.log(err)
            }

        })

        // Clear textbox
        setQuery('')
    }

  return (
    <form className='search-container' onSubmit={handleSubmit}>
        <input onChange={ (e) => setQuery(e.target.value) }
        value={query}
        type='text' placeholder='Search all characters' />
    </form>
  )
}

export default Search