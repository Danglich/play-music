

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const headApp = $('.play-music')
const musicList = $('.music-list')
const cdImg = $('.play-music__img')
const playBtn = $('.play-music__control-playing')
const audio = $('#audio')
const time = $('.play-music__time')
const loopBtn = $('.play-music__control-item.loop')
const nextBtn = $('.play-music__control-item.next')
const prevBtn = $('.play-music__control-item.prev')
const randomBtn = $('.play-music__control-item.random')



const animateCd = cdImg.animate([{transform: 'rotate(360deg)'}], {
    duration: 10000,
    iteration: Infinity
})

animateCd.pause()

function createApp (){
    const songs = [
        
        { 
            id: 12,
            name: "Stay",
            single: "The Kid LAROI ft. Justin Bieber",
            image: "./assets/img/song12.jpg",
            music : "./assets/musics/song12.mp3"
        },
        { 
            id: 11,
            name: "Dusk Till Dawn",
            single: "ZAYN ft. Sia",
            image: "./assets/img/song11.jpg",
            music : "./assets/musics/song11.mp3"
        },
        { 
            id: 13,
            name: "Mood",
            single: "Mood ft. Iann dior - Ro Ryon",
            image: "./assets/img/song13.jpg",
            music : "./assets/musics/song13.mp3"
        },
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

        
    ]
    const app = {
        isRandom : false,
        isPlaying : false,
        isLoop : false,
        currentIndex: 0,
    
        render : function() {
            var htmls = [];
            htmls = songs.map(function(song, index) {
                return `
                <li class="music-item" data-index = "${index}">
                    <div  style=" background-image: url('${song.image}')" class="music-item__img">
    
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
            })
    
            musicList.innerHTML = htmls.join('')
    
        },
    
        
        loadSongCurrent: function() {
            const song = songs[this.currentIndex]
            const nameNode = $('.play-music__header-name')
            const imageNode = $('.play-music__img')
            const songItems = $$('.music-item')
            const songItem = $(`li[data-index = "${this.currentIndex}"]`)
            
            songItems.forEach(function(songItem) {
                songItem.classList.remove('active')
            })
            songItem.classList.add('active')
            songItem.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
            
            nameNode.textContent = song.name
            imageNode.style.backgroundImage = `url('${song.image}')`
            audio.src = song.music
    
        },
    
        handleEvents: function() {
            const _this = this;
            //Khi kéo màn hình
            const cdHeight = cdImg.clientHeight;
            const cdWidth = cdImg.clientWidth;
            
            window.onscroll = function(){
                const scrollPx =  document.documentElement.scrollTop;
                var newHeight = cdHeight - scrollPx;
                if (newHeight < 0) {
                    newHeight = 0
                }
    
                cdImg.style.height = newHeight + 'px';
                cdImg.style.width = newHeight + 'px';
                cdImg.style.opacity = newHeight / cdWidth;
            }
    
            //Điều khiển nút Play
            playBtn.onclick = function() {
                _this.isPlaying = !_this.isPlaying;
    
                if(_this.isPlaying) {
                    audio.play()
                    
    
                }
                else {
                    
                    audio.pause()
                }
    
            }
    
            //Khi audio Chạy
            
            audio.onplaying = function() {
                playBtn.classList.remove('pause')
                playBtn.classList.add('playing')
                
                animateCd.play()
                const duration = audio.duration
                audio.ontimeupdate = function() {
                   
                    time.value = audio.currentTime / duration * 100;
                }
    
            }
    
    
            //Khi audio dừng
            audio.onpause = function() {
                animateCd.pause()
                playBtn.classList.remove('playing')
                playBtn.classList.add('pause')
            }
    
            //Khi audio kết thúc
            audio.onended = function() {
                if(_this.isLoop) {
                    playBtn.click()
                    playBtn.click()
                    
                }
                if(_this.isRandom && !_this.isLoop) {
    
                    do {
                        var randomIndex = Math.floor(Math.random() * songs.length)
    
                    }
                    while(randomIndex === _this.currentIndex);
                    _this.currentIndex = randomIndex
                    _this.loadSongCurrent()
                    audio.play()
    
                }
            }
    
            //Khi chỉnh sửa thời gian
    
            time.onchange = function() {
                const duration = audio.duration
                audio.currentTime = time.value * duration / 100;
                
            }
    
            //Khi ấn nút Lặp lại
    
            loopBtn.onclick = function() {
                _this.isLoop = !_this.isLoop;
                loopBtn.classList.toggle('active', _this.isLoop)
                
            }
    
    
            //Khi ấn nút next 
            nextBtn.onclick = function() {
                if(_this.isRandom) {
                    do {
                        var randomIndex = Math.floor(Math.random() * songs.length)
    
                    }
                    while(randomIndex === _this.currentIndex);
                    _this.currentIndex = randomIndex
    
                }
                else {
                    _this.currentIndex++
                    if(_this.currentIndex >= songs.length) {
                        _this.currentIndex = 0
                    }
    
                }
                _this.loadSongCurrent()
                audio.play()
            }
    
            //Khi ấn nút prev 
            prevBtn.onclick = function() {
                _this.currentIndex--;
                if(_this.currentIndex < 0) {
                    _this.currentIndex = songs.length - 1;
                }
                _this.loadSongCurrent()
                audio.play()
            }
    
            //Khi ấn nút random
            randomBtn.onclick = function() {
                _this.isRandom = !_this.isRandom
                if(_this.isRandom) {
                    randomBtn.classList.add('active')
                }
                else {
                    randomBtn.classList.remove('active')
                }
            }
    
            
    
            
        },
        //Khi click chọn bài hát
        handleClickItemSong : function() {
            const songLists = $$('.music-item')
            const _this = this
            for(let i = 0; i < songLists.length ; i++) {
                
                songLists[i].onclick = function(e) {
                    
                    if(!songLists[i].classList.value.includes('active') && (e.target.localName !== 'i')) {
                        
                        _this.currentIndex = i
                        _this.loadSongCurrent()
                        audio.play()
                    }
                }
            }
    
    
    
    
        },
    
    
        start: function() {
            this.render()
    
            this.handleEvents()
    
            this.loadSongCurrent()
    
            this.handleClickItemSong()
        }
    
    }

    return app

}


app.start()