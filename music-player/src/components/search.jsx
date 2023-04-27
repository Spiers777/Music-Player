import React, { useEffect, useState } from 'react';
import '../style/search.scss'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e60b2111c4msh60a4df39efb2393p1e83e7jsn36fa492d71a4',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

const Search = (props) => {
    const [searchResponse, setSearchResponse] = useState([]);
    const fetchSearch = () => {
        let searchVal = document.getElementById("search").value
        if(searchVal.length >= 2){
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${document.getElementById("search").value}`, options)
	    .then(response => response.json())
	    .then(response => {
            setSearchResponse(response)
        })
	    .catch(err => console.error(err));
        } else {
            fetch(`https://deezerdevs-deezer.p.rapidapi.com/playlist/2872124702`, options) //Top 100 Songs playlist
            .then(response => response.json())
            .then(response => {
                setSearchResponse(response.tracks)
            })
            .catch(err => console.error(err));
        }
    }
    const expandSearch = (state) => {
        if(state === true){
            document.querySelector(':root').style.setProperty("--searchPosition", 0)
        } else {
            document.querySelector(':root').style.setProperty("--searchPosition", 1)
        }
        console.log(state)
    }
    const handlePlay = (i) => {
        expandSearch(false)
        props.selectedAudio(searchResponse.data[i].id)
    }
    useEffect(() => {fetchSearch()}, [])
    return (
        <div className='searchContainer'>
            <input id="search" placeholder="Search For A Song" autocomplete="off" className='searchBox' onChange={fetchSearch} onFocus={() => expandSearch(true)} />
            <div className='results'>
                {searchResponse.data === undefined ? (<></>) : (<>
                    {Object.keys(searchResponse.data).map((obj, i) => (
                        <a className="result" href="#" onClick={() => handlePlay(i)}>
                            <img src={searchResponse.data[i].album.cover_medium}></img>
                            <div className="glass"></div>
                            <div className="titleBlock">
                                <p>{searchResponse.data[i].title}</p>
                                <p>By {searchResponse.data[i].artist.name}</p>
                            </div>
                        </a>
                    ))}
                </>)}
            </div>
        </div>
    )
}

export default Search;