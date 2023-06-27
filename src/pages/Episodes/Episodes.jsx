import React from 'react'
import "./Episodes.css"
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard'

function Episodes() {
  // Create state for episode numbers
  const [options, setOptions] = React.useState([])
  const [selectedOption, setSelectedOption] = React.useState(1)
  const [selectedEpisode, setSelectedEpisode] = React.useState()
  const [characterList, setCharacterList] = React.useState()

  // when page loads I need to creat the dropdown UI
  // https://rickandmortyapi.com/api/episode

  React.useEffect(
    () => {
        //console.log('loaded')
        // make api call to find out how many episodes
        axios.get(`https://rickandmortyapi.com/api/episode`)
        .then(res => {
          //console.log(res.data.info.count)
          // I need to create an array of numbers
          const newOptions = []
          for (let i = 1; i <= res.data.info.count; i++) {
            newOptions.push(i)
            //console.log(newOptions)
            // Store this in state
            setOptions(newOptions)
          }
        })
    }, []
  )

  // Function to call when select episode
  const handleSelectChange = (e) => {
    console.log(e.target.value)
    //save this value in state
    setSelectedOption(e.target.value)
    //do the work to get the data
  }

  React.useEffect(
    () => {
        console.log(selectedOption)
        //need to get data from this episode
        // https://rickandmortyapi.com/api/episode/28
        //but need to make api call for each character in the episode
        //use async
        //async function returns a promise
        const fetchEpisodeData = async () => {
          try{
            //get specific episode data
            const res = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedOption}`)

            //console.log(res.data)
            //store in state
            setSelectedEpisode(res.data)

            //res.data.characters is array with all endpoints for characters in this episode
            //selectedEpisode.characters.map

            const episodeCharacters = await Promise.all(
              res.data.characters.map(url => {
                return axios.get(url).then(res => res.data)
              })
            )
            console.log(episodeCharacters)
            //store in state
            setCharacterList(episodeCharacters)
          }
          catch(err) {
            console.log(err)
          }
        }

        //remember to call the function
        fetchEpisodeData()


    }, [selectedOption]
  )
  return (
    <div className='episodes-container'>
      <div>
        <label>Select an episode:</label>
        <select id='select-episode'
                onChange={handleSelectChange}>
          {
            options.map(item => <option key={item} value={item}>{`Episode ${item}`}</option>)
          }
        </select>
      </div>
      <div>
          <div className='episode-info'>
            <p>Episode Name: {selectedEpisode?.name}</p>
            <p>Air Date: {selectedEpisode?.air_date}</p>
          </div>
          <div className='character-container'>
            {
              characterList.map(item => <CharacterCard 
                key={item?.id}
                character={item} />)
                // chaaracters.map(item => <p>{item.name}</p>)
            }
          </div>
      </div>
    </div>
  )
}

export default Episodes