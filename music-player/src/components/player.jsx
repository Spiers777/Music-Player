import React, { useEffect, useState } from 'react';
import '../style/player.scss';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e60b2111c4msh60a4df39efb2393p1e83e7jsn36fa492d71a4',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

const Player = ({audioID}) => {
    const [audioData, setAudioData] = useState([]);
    const [playing, setPlaying] = useState(false);
    const[time, setTime] = useState([]);
    const fetchSong = () => {
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${audioID}`, options)
	    .then(response => response.json())
	    .then(response => {
            setAudioData(response)
        })
	    .catch(err => console.error(err));
    }
    const handlePause = () => {
        if(!playing){document.getElementById("audioPlayer").play();setPlaying(true);}
        else if(playing){document.getElementById("audioPlayer").pause();setPlaying(false);}
    }
    const handleAutoStart = () => {
        document.getElementById("audioPlayer").play();setPlaying(true);
    }
    const handleTime = () => {
        let seconds = Math.trunc(document.getElementById("audioPlayer").currentTime)
        let minutes = ~~(seconds / 60);
        let extraSeconds = seconds % 60;
        if(extraSeconds < 10){extraSeconds = "0" + extraSeconds}
        setTime(`${minutes.toString()}:${extraSeconds.toString()}`);
    }
    const handleVolume = () => {
        console.log(document.getElementById("volumeSlider").value)
        document.getElementById("audioPlayer").volume = document.getElementById("volumeSlider").value/100
    }
    useEffect(() => {
        fetchSong();
        setPlaying(false);
    }, [audioID]);

    if (audioData.album === undefined) {
        return (
            <div id="player" className="playerCont">
            </div>
        )
    } else{
        return (
            <div id="player" className="playerCont">
                <audio src={audioData.preview} onCanPlay={handleAutoStart} onTimeUpdate={handleTime} id="audioPlayer">
                    Your browser does not support the audio tag!
                </audio>
                <div className="albumCover" style={{"--background-url": `url("${audioData.album.cover_small}")`}}>
                    <img src={audioData.album.cover_medium} alt="Album Cover" />
                </div>
                <div className="audioDetails">
                    <h1 className="audioTitle">{audioData.title}</h1>
                    <h2 className="audioArtist">{audioData.artist.name}</h2>
                    <span className="progress"><span>{time}</span>/<span>0:29</span></span>
                    <button className="playPause" onClick={handlePause}>{playing ? (<p>Pause</p>) : (<p>Play</p>)}</button>
                    <input id="volumeSlider" type="range" onChange={handleVolume}></input>
                </div>
            </div>
        );
    }
};

export default Player;