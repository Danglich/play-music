
const $ = document.querySelector.bind(document);

const $$ = document.querySelectorAll.bind(document);

const musicList = $('.music-list')

const cdPlayHeader = $('.play-music')









const app = {
    
    songs : [
        { 
            id: 1,
            name: "Một phút",
            single: "Andiez",
            image: "./assets/img/song1.jpg",
            music : "./assets/musics/song1.mp3"
        },

        { 
            id: 2,
            name: "Phi hành gia",
            single: "Slow , Lil' Wuyn",
            image: "./assets/img/song2.jpg",
            music : "./assets/musics/song2.mp3"
        },

        { 
            id: 3,
            name: "Phút ban đầu",
            single: "Hoài Lâm",
            image: "./assets/img/song3.jpg",
            music : "./assets/musics/song3.mp3"
        },

        { 
            id: 4,
            name: "Mãi mãi là của nhau",
            single: "Bùi Anh Tuấn",
            image: "./assets/img/song4.jpg",
            music : "./assets/musics/song4.mp3"
        },

        { 
            id: 5,
            name: "Em là bà nội của anh",
            single: "Trọng Hiếu",
            image: "./assets/img/song5.jpg",
            music : "./assets/musics/song5.mp3"
        },

        { 
            id: 6,
            name: "Độ tộc 2",
            single: "Độ Mixi , Phúc Du",
            image: "./assets/img/song6.jpg",
            music : "./assets/musics/song6.mp3"
        },

        { 
            id: 7,
            name: "Có hẹn với thanh xuân",
            single: "MONSTAR",
            image: "./assets/img/song7.jpg",
            music : "./assets/musics/song7.mp3"
        },

        { 
            id: 8,
            name: "Chạy về nới phía anh",
            single: "Khắc Việt",
            image: "./assets/img/song8.jpg",
            music : "./assets/musics/song8.mp3"
        },

        { 
            id: 9,
            name: "Chạy về khóc với anh",
            single: "ERIK",
            image: "./assets/img/song9.jpg",
            music : "./assets/musics/song9.mp3"
        },

        { 
            id: 10,
            name: "Anh luôn là lí do",
            single: "ERIK",
            image: "./assets/img/song10.jpg",
            music : "./assets/musics/song10.mp3"
        },

        
    ],


    handlerLoadSongs: function() {
        var htmls = this.songs.map(song => {
            return `
            <li class="music-item" onclick="app.handlerSelection(${song.id})">
                <div style=" background-image: url('${song.image}')" class="music-item__img">

                </div>
                <div class="music-item__text">
                    <h3 class="music-item__name">${song.name}</h3>
                    <span class="music-item__single">${song.single}</span>
                </div>
                <div class="music-item__more">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </li>
            
            `
        });

        musicList.innerHTML = htmls.join('')

    },

    
    
    
    getSongById: function(id) {
        var song = this.songs.find(s => s.id === id);
        
        return song
        
    },


    
    handlerSelection: function(id) {
        var song = this.getSongById(id);
        
        cdPlayHeader.innerHTML = `
        <div class="play-music__header">
        <span class="play-music__header-title">Now playing: </span>
        <h2 class="play-music__header-name">${song.name}</h2>
        </div>
        
        <div style="background-image: url('${song.image}')" class="play-music__img">
        
        </div>
        
        <div class="play-music__control">
        
        <li class="play-music__control-item">
        <i class="play-music__control-icon fa-solid fa-rotate-right"></i>
        
        </li>
        
        <li class="play-music__control-item">
        <i class="play-music__control-icon fa-solid fa-backward-fast"></i>
        
        </li>
        
        <li onclick="app.controlPlaying()" class="play-music__control-item play-music__control-playing pause">
                    <i class="play-music__control-icon play-music__control-icon--pause fa-solid fa-play"></i>
                    <i class="play-music__control-icon play-music__control-icon--playing fa-solid fa-circle-pause"></i>
                    

        </li>
        
        
        
        <li class="play-music__control-item">
        <i class="play-music__control-icon fa-solid fa-forward-fast"></i>
        
        </li>
        
        <li class="play-music__control-item">
        <i class="play-music__control-icon fa-solid fa-shuffle"></i>
        </li>
        
        </div>
        
        
        <input type="range" name="" id="" class="play-music__time" step = 0.1 min=0 max=100 value = 0>
        
        <audio id="audio" src="${song.music}"></audio>
        
        `;

        

        this.handleScrollApp()

        


        
    },



    controlPlaying: function () {
        var btnControl = $('.play-music__control-playing')
        var isPlaying = $('.play-music__control-playing.playing')
        var audio = document.getElementById('audio')
        if (!isPlaying){
            btnControl.classList.remove('pause')
            btnControl.classList.add('playing')
            audio.play()
            

        }
        else{
            btnControl.classList.remove('playing')
            btnControl.classList.add('pause')
            audio.pause()
        }

        var duration = audio.duration;//chiều dài của audio

        var navTime = $('.play-music__time')
        
        
        audio.ontimeupdate = function(){
            //audio.currentTime = navTime.attributes['value'] / 100;
            navTime.setAttribute('value', (audio.currentTime / duration)*100)


        }

        
    },

    handleControlTime: function () {
        var audio = document.getElementById('audio')
        
    },



    handleScrollApp: function() {

        let cd = $('.play-music__img');
        const cdHeight = cd.clientHeight;
        const cdWidth = cd.clientWidth;

        window.onscroll = function(){
            const scrollPx =  document.documentElement.scrollTop;
            var newHeight = cdHeight - scrollPx;
            if (newHeight < 0) {
                newHeight = 0
            }

            cd.style.height = newHeight + 'px';
            cd.style.width = newHeight + 'px';
            cd.style.opacity = newHeight / cdWidth;

            
        }


    },
    
    start: function(){

        this.handlerSelection(1)

        this.handlerLoadSongs()
    
        this.handleScrollApp()

        this.handleControlTime()

        

       
    
        
    }
}




app.start()


// function getSongById(id) {
//     var song = app.songs.find(s => s.id === id);

//     return song

// }

// function handlerPlaying(id) {
//     var song = getSongById(id);
//     console.log(song)
// }
//Test

// $('#audio').play()








