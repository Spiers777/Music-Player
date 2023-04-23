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
            console.log(response);
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
        console.log(extraSeconds)
        setTime(`${minutes.toString()}:${extraSeconds.toString()}`);
    }

    useEffect(() => {
        fetchSong();
    }, []);
    return (
    <div id="player">
        <audio controls src={audioData.preview} onTimeUpdate={handleTime} id="audioPlayer">
            Your browser does not support the audio tag!
        </audio>
        Playing: {audioData.title}
        <button onClick={handlePause}>{playing ? (<p>Pause</p>) : (<p>Play</p>)}</button>
        {time}
    </div>
    );
};

export default Player;