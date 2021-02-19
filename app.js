document.getElementById("searchBtn").addEventListener("click", function(){
    searchSong();
    
})
const searchSong = () =>{
    const searchText = document.getElementById("search-filed").value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log('data', data.data);
        displaySong(data.data);
    })
    .catch(error => displayError('Something went wrong! Please try again.'));
}

const displaySong = songs =>{
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = '';
    songs.forEach(song  => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <h5>Rank: ${song.rank}</h5>
            <audio controls src="${song.preview}"></audio>
            
        </div>
        
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv)
        console.log(song.preview);
    });
}

const getLyrics = (artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))
    
}

const displayLyrics = lyrics =>{
    const singleLyrics = document.getElementById("single-lyrics");
    singleLyrics.innerText = lyrics;
    console.log(lyrics);
}

const displayError = (error) =>{
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = error;
}