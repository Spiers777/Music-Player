import React, { useState } from 'react';
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
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${document.getElementById("search").value}`, options)
	    .then(response => response.json())
	    .then(response => {
            console.log(response)
            setSearchResponse(response)
        })
	    .catch(err => console.error(err));
    }
    return (
        <div className='searchContainer'>
            <input id="search" placeholder="Search For A Song" className='searchBox' onChange={fetchSearch} />
            <div className='results'>
                {searchResponse.data === undefined ? (<></>) : (<>
                    {Object.keys(searchResponse.data).map((obj, i) => (
                        <a className="result" href="#" onClick={() => {props.selectedAudio(searchResponse.data[i].id)}}>
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