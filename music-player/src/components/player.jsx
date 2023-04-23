import React, { useEffect, useState } from 'react';

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
    const handleTime = () => {
        let seconds = Math.trunc(document.getElementById("audioPlayer").currentTime)
        let minutes = ~~(seconds / 60);
        let extraSeconds = seconds % 60;
        if(extraSeconds < 10){extraSeconds = "0" + extraSeconds}
        setTime(`${minutes.toString()}:${extraSeconds.toString()}`);
    }
    useEffect(() => {
        fetchSong();
        setPlaying(false);
        if (audioData.album !== undefined) {
            handlePause();
        }
    }, [audioID]);

    if (audioData.album === undefined) {
        return <></>;
    }
    else{
        return (
            <div id="player">
                <audio src={audioData.preview} onTimeUpdate={handleTime} id="audioPlayer">
                    Your browser does not support the audio tag!
                </audio>
                <div>
                    <img src={audioData.album.cover_medium} alt="Album Cover" />
                </div>
                <div>
                    <h1>{audioData.title}</h1>
                    <h2>{audioData.artist.name}</h2>
                    <span>{time}</span>/<span>0:29</span>
                </div>
                <div>
                    <button onClick={handlePause}>{playing ? (<p>Pause</p>) : (<p>Play</p>)}</button>
                </div>
            </div>
        );
    }
};

export default Player;