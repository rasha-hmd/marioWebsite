let platform=document.getElementById('platform-1')
let hills=document.getElementById('hills-1')
let background=document.getElementById('background-1')
let platformSmallTall=document.getElementById('platformSmallTall-1')
let spriteRunLeft=document.getElementById('spriteRunLeft-1')
let spriteRunRight=document.getElementById('spriteRunRight-1')
let spriteStandLeft=document.getElementById('spriteStandLeft-1')
let spriteStandRight=document.getElementById('spriteStandRight-1')
let castle=document.getElementById('castle-1')
const resultText=document.getElementById("resultText")
const popup=document.getElementById("popup")



const canvas=document.querySelector('canvas');
const c=canvas.getContext('2d')

canvas.width=1024
canvas.height=576
const gravity=1.5

class Player{
    constructor()
    {
        this.speed=10
        this.position=
        {
            x:100,
            y:100
        }
        this.height=150
        this.width=66
        this.velocity=
        {
            x:0,
            y:0
        }
        this.image=createImage(spriteStandRight)
        this.frames=0
        this.sprites={
            stand:{
                right:createImage(spriteStandRight),
                left:createImage(spriteStandLeft),
                cropWidth:177,
                width:66
            },
            run:{
                right:createImage(spriteRunRight),
                left:createImage(spriteRunLeft),
                cropWidth:341,
                width:127.875
            }
        }
        this.currentSprite=this.sprites.stand.right
        this.currentCropWidth=177
    }

draw() {
    c.drawImage(this.currentSprite,this.currentCropWidth*this.frames,0,this.currentCropWidth,400,this.position.x,this.position.y,this.width,this.height)
}
update() {
    this.frames++
    if(this.frames>59 && (this.currentSprite==this.sprites.stand.right || this.currentSprite==this.sprites.stand.left)) this.frames=0
    else if(this.frames>29 && (this.currentSprite==this.sprites.run.right || this.currentSprite==this.sprites.run.left)) this.frames=0
    this.draw()
    this.position.x+=this.velocity.x
    this.position.y+=this.velocity.y
    if(this.velocity.y+this.height+this.position.y<=canvas.height)
    this.velocity.y+=gravity
    
    
}
}

class Platform {
    constructor({ x, y,image }) {
        this.position= {
            x,
            y
        }
        this.image=image
        this.height=image.height
        this.width=image.width
    }

    draw() {
        
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}

class GenericObject {
    constructor({ x, y,image }) {
        this.position= {
            x,
            y
        }
        this.image=image
        this.height=image.height
        this.width=image.width
    }

    draw() {
        
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}

function createImage(imageSrc){
    const image=new Image()
    image.src=imageSrc.src
    return image
}
let player=new Player()
let platforms = []

let genericObjects=[]

let lastKey

const keys = {
    right:{
        pressed:false
    },
    left:{
        pressed:false
    }
}

let scrollOffset = 0

function init(){

 player=new Player()
 platforms = [new Platform({ x: createImage(platform).width*4+300-2 +createImage(platform).width-createImage(platformSmallTall).width, y:270,image:createImage(platformSmallTall)}),
    new Platform({ x: -1, y: 470,image:createImage(platform) }), 
    new Platform({ x: createImage(platform).width-3, y:470,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*2+130, y:470,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*3+300, y:470,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*4+300-2, y:470,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*5+700, y:470,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*5+1300, y:270,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*6+1700, y:470,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*7+1700, y:170,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*9+1500, y:250,image:createImage(platformSmallTall)}),
    new Platform({ x: createImage(platform).width*9+2030, y:200,image:createImage(platformSmallTall)}),
    new Platform({ x: createImage(platform).width*10+2030, y:150,image:createImage(platformSmallTall)}),
    new Platform({ x: createImage(platform).width*11+2150, y:470,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*12+2150-2, y:470,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*12+2350-2, y:345,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*12+2930-4, y:243,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*13+3500, y:400,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*15+3200, y:400,image:createImage(platformSmallTall)}),
    new Platform({ x: createImage(platform).width*16+3200, y:470,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*17+3200-2, y:345,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*19+3200-2, y:270,image:createImage(platformSmallTall)}),
    new Platform({ x: createImage(platform).width*19+3200-2, y:470,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*20+3200-4, y:470,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*22+3200, y:470,image:createImage(platform)}),
    new Platform({ x: createImage(platform).width*23+3200-2, y:470,image:createImage(platform)})
]

 genericObjects=[
    new GenericObject({
        x:-1,
        y:-1,
        image: createImage(background)
    } ),
    new GenericObject({
        x:-1,
        y:-1,
        image: createImage(hills)
    } ),
    new GenericObject({
        x:createImage(platform).width*19,
        y:-140,
        image: createImage(castle)
    } )
]



 scrollOffset = 0
}
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle='white'
    c.fillRect(0,0,canvas.width,canvas.height)

    genericObjects.forEach((genericObject)=>{
        genericObject.draw()
    })
    
    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if ((keys.left.pressed && player.position.x > 100)|| (keys.left.pressed && scrollOffset==0 && player.position.x>0) ){
        player.velocity.x = -player.speed
    }else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })   
            genericObjects.forEach(genericObject=>{
                genericObject.position.x-=player.speed*.66
            })
            
        } else if (keys.left.pressed && scrollOffset>0) {
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
            genericObjects.forEach(genericObject=>{
                genericObject.position.x+=player.speed*.66
            })
        }
    }


    //collision detection
    platforms.forEach((platform) => {
    if(player.position.y+player.height<=platform.position.y && player.position.y+player.height+player.velocity.y>=platform.position.y && player.position.x+player.width>=platform.position.x && player.position.x<=platform.position.x+platform.width){
        player.velocity.y=0
        }
    })

    //sprite switching
    if(keys.right.pressed &&
        lastKey=='right' && player.currentSprite!=player.sprites.run.right){
        player.frames=1
        player.currentSprite=player.sprites.run.right
        player.currentCropWidth=player.sprites.run.cropWidth
        player.width=player.sprites.run.width
    } else if (keys.left.pressed &&
        lastKey=='left' && player.currentSprite!=player.sprites.run.left) {
        player.currentSprite=player.sprites.run.left
        player.currentCropWidth=player.sprites.run.cropWidth
        player.width=player.sprites.run.width
    } else if (!keys.left.pressed &&
        lastKey=='left' && player.currentSprite!==player.sprites.stand.left) {
        player.currentSprite=player.sprites.stand.left
        player.currentCropWidth=player.sprites.stand.cropWidth
        player.width=player.sprites.stand.width
    } else if (!keys.right.pressed &&
        lastKey=='right' && player.currentSprite!==player.sprites.stand.right) {
        player.currentSprite=player.sprites.stand.right
        player.currentCropWidth=player.sprites.stand.cropWidth
        player.width=player.sprites.stand.width
    }

    

    let playerWins=false
    let playerLoses=false

    //win condition
    if (scrollOffset > createImage(platform).width*22+3200-2) {
        resultText.textContent="YOU WON!"
        playerWins=true
        player.speed=0
        player.velocity=0
    }

    //lose condition
    if(player.position.y>canvas.height){
        resultText.textContent="YOU LOST:("
        playerLoses=true
        player.speed=0
        player.velocity=0
    }

    function checkGameResult(){
        return playerWins||playerLoses
    }
    

    function showPopup(){
        if(checkGameResult()){
            popup.style.display="block"
            
        }
    }
    function closePopup(){
       document.getElementById("popup").style.display="none"

    }
    showPopup()
    


}

init()
animate()



window.addEventListener('keydown',({keyCode})=>{
    switch (keyCode) {
     case 38: 
         console.log('up')
         player.velocity.y-=20
         
         break;
    
     case 40:
         console.log('down')
         
         break;
 
     case 37:
         console.log('left')
         keys.left.pressed=true
         lastKey='left'
        
         
         break;
 
     case 39:
         console.log('right')
         keys.right.pressed=true
         lastKey='right'
        

         break;
    }

    console.log(keys.right.pressed)
 })

 window.addEventListener('keyup',({keyCode})=>{
    switch (keyCode) {
     case 38: 
         console.log('up')
        
         
         break;
    
     case 40:
         console.log('down')
         
         break;
 
     case 37:
         console.log('left')
         keys.left.pressed=false
 
         break;
 
     case 39:
         console.log('right')
         keys.right.pressed=false
         
         break;
    }
    console.log(keys.right.pressed)
 })