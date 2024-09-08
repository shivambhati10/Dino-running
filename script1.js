score = 0;
cross = true;

// for music
audio = new audio('music.mp3');
audiogo = new audio('gameover.mp3');
setTimeout(()=>{
  audio.play();
},1000);

document.onkeydown = function (e) {
    console.log("key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        //ab ek class add krdo animateDino
        dino.classList.add('animateDino') //iss class ki help se dino ko animate krenge
        //or iske baad m nahi chahta ye animation dino ke paas hmesha se rahe
        //mtlb jab kood kar aaye to ye class hath jaaye.
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700); //agr isko hata denge to ye dino koodta hee rhega mere key press ka farak hee nahi pdega 
        //animation lgane ke liye aapko keyframes lgane pdte h css m




    }
    if (e.keyCode == 39) {  //agr right button dabaya h to
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left')); //dino ki left ki computed value kya h
        dino.style.left = dinoX + 112 + "px";//dino ki left ki value ko thoda sa aage badha kr set krdiya
        //ab agr hum right click krenge to dino aage badhta chala jaayega, ab isko wapas laane ke liye left key set krni pdegi , peeche laane ke liye

    }
    if (e.keyCode == 37) {  //agr left button dabaya h to, or dino ko peeche laane chahte h to, bss neeche subtract krna pdega style.left m
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left')); //dino ki left ki computed value kya h
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    //agr dino ki left se value and dragon ki left  se value x axis pr and y axis par same h to m collisio  detect kr skta hu
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));  //dino ki computed left value dera h, animation ki help se dino ki left value ko change krra hu
    //kisi bhi ek moment pr current left value kya h vo humko dx ki help se mil jaayegi
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top')); //top ki current value kya h dino ki
    //ab obstacle ki left and top value iss se niklegi
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    //absolute differenc=ab dino and obstacle ki x se kitni dooori h vo nikal lunga and y se kitni doori h vo nika lunga
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    // GAMEOVER
    if (offsetX < 73 && offsetY < 52) { //agr aap takrate h to gameover 
        gameOver.innerHTML = "Game Over - Reload to play again" //jaise hee dino and obstacle ki duriyan kam ho  gameover visible ho jaaye
        obstacle.classList.remove('obstacleAni')
        //agr game over hora h to audio ko play krdunga
        audiogo.play();
        setTimeout(() => {
            audiogo.pause(); //audio ko rokne ke liye
            audio.pause();
        }, 1000);

    }
    else if (offsetX < 145 && cross) {//agr hum nahi takrate h to score ko update krdenge
        score += 1; //agr cross h tabhi score ko badhao
        updateScore(score);
        cross = false;
        setTimeout(() => {//ek baar maine cross ko true krdiya, score ko update krne ke baad cross ko false krdunga, fir 1 sec baad cross ko true krdunga
            cross = true;
        }, 1000); // 1 sec baad apne cross ko wapas se true bna dunga, update hone layak ban jaayega iss se vo
        //cross krte waqt hmara obstacle jhatka na khaye, uske liye hum settimeout use krenge, fir vo aage jaakr jhatka khayega
        setTimeout(() => {
            //ab obstacle ki speed ko badhane ke liye, animation duration ko kam krdunga
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's'; //s for seconds m laane ke liye


        }, 500);

    }


}, 10);//ye har sec baad check krta rhega ki kya aap takra rahe h

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}