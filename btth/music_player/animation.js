import { songs } from './songs.js'
// const PLAYER_STORAGE_KEY = 'myPlayerStorageKey';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
//lay danh sach bai hat 
const playlist=$('.playlist')
console.log(playlist);
//lay dia nhac
const cd=$('.cd')
//tieu de dia
const heading =$('header h2')
//hinh anh trong dia
const cdThumb=$('.cd-thumb')
//audio trong dia
const audio=$('#audio')
//lay nut player
const playbtn=$('.btn-toggle-play')
//lay player
const player=$('.player')
//lay progress
const progress=$('#progress')
//lay nut next
const nextbtn=$('.btn-next')
//lay nut chuyen ve truoc
const prevbtn=$('.btn-prev')
//lay nut random
const random_btn=$('.btn-random')
//lay nut repeat
const repeat_btn=$('.btn-repeat')
// attribute and method of object 
const app={
  //lay bai duoc chon
  currentIndex:0,
  //bai hat co duoc play
  isplaying:false,
  israndom:false,
  isrepeat:false,
  
    songs:songs,
    render: function(){
            const htmls= this.songs.map((song,index)=>{
              return ` <div class="song ${index===this.currentIndex? 'active':''}" data-index="${index}">
                  <div class="thumb"
                      style="background-image: url('${song.image}')">
                  </div>
                  <div class="body">
                      <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                      <i class="fas fa-ellipsis-h"></i>
                  </div>
              </div>`
            })
            playlist.innerHTML=htmls.join('')
        },
        // settings: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)||{}),
   
        defineProperties: function(){
          Object.defineProperty(this,'currentSong',{
            get: function(){
              return this.songs[this.currentIndex]
            }
          })
        }
        ,
   
    start:function(){
      //Define attribute for object
      this.defineProperties()
        //change the size of song's picture when scrolling (event listener)
        this.handleEvent()
        //render list of songs 
        this.render()
      //Load the information of song into UI when running the app
       this.loadCurrentSong()
      
    },
    loadCurrentSong: function(){
      heading.textContent=this.currentSong.name
      cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`
      audio.src=this.currentSong.path
      
    }
    ,
    nextSong: function(){
      this.currentIndex++
      if(this.currentIndex>=this.songs.length){
        this.currentIndex=0
      }
      this.loadCurrentSong()
    },
    scrollToActivesong:function(){
      setTimeout(()=>{
        $('.song.active').scrollIntoView({
          behavior:'smooth',
          block:nearest
        })
      },300)
    }
    ,
    prevSong: function(){
      this.currentIndex--
      if(this.currentIndex<0){
        this.currentIndex=this.songs.length-1
      }
      this.loadCurrentSong()
    },
    playrandomsong: function(){
      let newIndex
          do{
            newIndex=Math.floor(Math.random()*this.songs.length)
          }  while(newIndex===this.currentIndex)
          // console.log(newIndex)
          this.currentIndex=newIndex
          this.loadCurrentSong()
    },
    //xu li cac su kien
    handleEvent: function(){
        
        const CdWidth=cd.offsetWidth
        document.onscroll=function(){
            const scrollTop=window.scrollY||document.documentElement.scrollTop
            const newCdWidth=CdWidth-scrollTop
            cd.style.width=newCdWidth>0 ? newCdWidth +'px':0
            cd.style.opacity=newCdWidth/CdWidth;
            
        }
        //handle event when cd is rotating or stop rotating
        const cdthumbanimate = cdThumb.animate([
          { transform: 'rotate(360deg)' }
      ], {
          duration: 2000,
          iterations: Infinity
      });
        //click playbtn
        playbtn.onclick=function(){
          
          if(app.isplaying){
            audio.pause()
          }
          else{
            audio.play()
          }
          //khi song play
          audio.onplay=function(){
            app.isplaying=true
            player.classList.add('playing')
            cdthumbanimate.play()
          }
          //khi song pause
          audio.onpause= function(){
            app.isplaying=false
            player.classList.remove('playing')
            cdthumbanimate.pause()
            
          }
          //khi tien do bai hat thay doi
          audio.ontimeupdate=function(){
            if(audio.duration){
            const progressPercent=Math.floor(audio.currentTime/audio.duration*100)
            progress.value=progressPercent
            
            }
            else{
              // console.log('no')
            }
          
          }
          //handle event when getting a fast forward or rewind
          progress.onchange=function(e){
            const seekTime=(audio.duration*e.target.value/100) 
            audio.currentTime=seekTime
            
          }
          //khi next song
          nextbtn.onclick=function(){
            if(app.israndom==false &&app.isrepeat==false){
              app.nextSong()
            }
            else if(app.israndom){
              app.playrandomsong()
            }
            app.render()
            audio.play()
          }
          //occurr event prev song
          prevbtn.onclick=function(){
            if(app.israndom==false &&app.isrepeat==false){
              app.prevSong()
            }
            else if(app.israndom ){
              app.playrandomsong()
            }
            app.render()
            audio.play()
          }
          //xu li random
          random_btn.onclick=function(e){
            var value1=app.israndom
            app.israndom=!value1

            random_btn.classList.toggle('active',app.israndom)
            
          }
          //xu li next song khi audio ended
          audio.onended=function(){
            
            if(app.isrepeat){
              audio.play()
            }
            else{
              nextbtn.click();
            }
            //lang nghe hanh vi click vao playlist
           
          }
          playlist.onclick=function(e){
            const songnode=e.target.closest('.song:not(.active)')
           if(songnode||e.target.closest('.option') ){
            //xu ly khi click vao song
            if(songnode){
              app.currentIndex=Number(songnode.dataset.index)
              console.log(app.currentIndex)
              app.loadCurrentSong()
              app.render()
              audio.play()
            }
            //xu li khi click vao song option
            if(e.target.closest('.option')){
              console.log(e.target)
            }
            
            
           }
           
          } 
          
          //handle event when repeating 
          repeat_btn.onclick=function(e){
            var repeat=app.isrepeat
            app.isrepeat=!repeat;
            repeat_btn.classList.toggle('active',app.isrepeat)
            // console.log(app.isrepeat)
          }
          
          
        }
    }
   
}
app.start();

