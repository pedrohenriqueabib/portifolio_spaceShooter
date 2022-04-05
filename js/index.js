const yourShip = document.querySelector('#player-shooter');
const playArea = document.querySelector('.main-play-area');
const start = document.querySelector('.start');
const tiro = document.querySelector('.tiro');
let up = 300;
let disparo = 0;
let comecou = false;
let moverProjetil;
let criarInimigo, moverInimigo, confirmarColisao;


start.addEventListener('click', ()=>{
    start.style.display = 'none';
    yourShip.style.display = 'block';
    comecou = true;
    enemy();
    moverInimigo = setInterval(()=>{
        moveEnemy();
        collision();
    }, 5);
})

document.addEventListener('keydown', (e)=>{
    if( e.key === 'ArrowUp' && up > 0){
        up -= 10;
        yourShip.style.top = `${up}px`;
    }
    if( e.key === 'ArrowDown' && up < 670){
        up += 10;
        yourShip.style.top = `${up}px`;
    }
    if( e.key === ' ' && disparo == 0 && comecou === true){
        disparo = 1;
        shoot(up);
    }
})

//criar shoot
function shoot(up){
    let projetil = document.createElement('img');
    projetil.src = '../img/shoot.png';
    projetil.classList.add('shoot');
    projetil.style.top = up+'px';
    projetil.style.left = '100px';
    playArea.appendChild(projetil);
    moveShoot(projetil);
}

// mover shoot
function moveShoot(projetil){
    moverProjetil = setInterval(()=>{
        let trajeto = parseInt(projetil.style.left) + 10; 
        projetil.style.left = `${trajeto}px`;
        if( trajeto === 1400){
            projetil.remove();
            disparo = 0;
            clearInterval(moverProjetil);
        }
    }, 10);
}

// criar inimigo
function enemy(){
    criarInimigo = setInterval(()=>{
        let altura = (Math.random() * (650 - 10) + 10).toFixed();
        let inimigo = document.createElement('img');
        let kind = Math.random() * (3-1)+1;
        inimigo.src = `../img/monster-${kind.toFixed()}.png`;
        inimigo.classList.add('inimigo');
        inimigo.style.top = `${altura}px`;
        inimigo.style.left = '1440px';
        playArea.appendChild(inimigo);
    }, 2500)
}

//mover inimigo
function moveEnemy(){
    let inimigo = document.querySelectorAll('.inimigo');
    if( inimigo){
        inimigo.forEach( (alien) => {
            let enemyPosition = parseInt(alien.style.left) - 0.5;
            alien.style.left = `${enemyPosition}px`;
            if( enemyPosition <= 10){
                clearInterval(moverProjetil);
                clearInterval(criarInimigo);
                clearInterval(moverInimigo);
                alert(' Você perdeu');
                location.reload();
            }
        })
    }
}

//colisao
function collision(){
    let inimigo = document.querySelectorAll('.inimigo');
    let rajada = document.querySelector('.shoot');
    let deadTime = 0;
    if( inimigo && rajada){
        inimigo.forEach( (alien)=>{
            let posicaoRajada = parseInt(rajada.style.left);
            let posicaoAlien = parseInt( alien.style.left);
            let alturaAlien = parseInt( alien.style.top);
            let alturaRajada = parseInt( rajada.style.top);
            if( posicaoRajada >= posicaoAlien){// alturaRajada <= alturaAlien && alturaRajada >= alturaAlien){
                if(alturaRajada >= alturaAlien - 25 && alturaRajada <= alturaAlien + 25 ){
                    alien.src = '../img/explosion.png';
                    alien.classList.remove('inimigo');
                    alien.classList.add('dead');
                    setTimeout(()=>{
                        alien.remove();
                    }, 1000);
                }                    
            }
        })
    }
}
