const yourShip = document.querySelector('#player-shooter');
const playArea = document.querySelector('.main-play-area');
const start = document.querySelector('.start');
const tiro = document.querySelector('.tiro');
const instrucao = document.querySelector('.instrucao');
let up = 300;
let disparo = 0;
let comecou = false;
let moverProjetil;
let criarInimigo, moverInimigo, confirmarColisao;
let pontos = document.querySelector('.pontos');
let totalPontos = 0;
let moving = false;
let shooting = false;

start.addEventListener('click', ()=>{
    start.style.display = 'none';
    yourShip.style.display = 'block';
    instrucao.style.display = 'none';

    comecou = true;
    enemy();
    moverInimigo = setInterval(()=>{
        moveEnemy();
        collision();
    }, 5);
    pontos.innerHTML = totalPontos;
    teclas();
    verificarTiros();
})

// document.addEventListener('keydown', (e)=>{
//     if( e.key === 'ArrowUp' && up > 25){
//         up -= 10;
//         yourShip.style.top = `${up}px`;
//     }
    
//     if( e.key === 'ArrowDown' && up < 670){
//         up += 10;
//         yourShip.style.top = `${up}px`;
//     }

//     if( e.key === ' ' && disparo >= 0 && disparo <= 2 && comecou === true){
//         disparo++;
//         shoot(up);
//     }
// })


document.addEventListener('keydown', (e)=>{
    if( e.key == 'ArrowUp'){
       moving = e.key;
    }

    if( e.key == 'ArrowDown'){
        moving = e.key;
    }

    if( e.key == ' '){
        shooting = true;
    }
})

document.addEventListener('keyup', (e)=>{
    if( e.key == 'ArrowUp'){
        moving = false;
    }

    if( e.key == 'ArrowDown'){
         moving = false;
    }

    if( e.key == ' '){
         shooting = false;
    }
})

function teclas(){
    let conferir = setInterval(()=>{
        if( moving != false){
            moveShip(moving);
        }
    }, 20)
}

function verificarTiros(){
    let atirando = setInterval(()=>{
        if( shooting == true){
            shoot(up);
        }

    }, 200);
}

function moveShip(key){    
    moving = key;
    if( key === 'ArrowUp' && up > 25){
        up -= 10;
        yourShip.style.top = `${up}px`;
    }
    
    if( key === 'ArrowDown' && up < 670){
        up += 10;
        yourShip.style.top = `${up}px`;
    }
}

//criar shoot
function shoot(up){
    if( disparo >= 0 && disparo <= 2 && comecou === true){
        shooting = true;
        disparo++;
        let projetil = document.createElement('img');
        projetil.src = '../img/shoot.png';
        projetil.classList.add('shoot');
        projetil.style.top = up+'px';
        projetil.style.left = '100px';
        playArea.appendChild(projetil);
        let totalShoot = document.querySelectorAll('.shoot');
        moveShoot(totalShoot);
    }
}

// mover shoot
function moveShoot(projeteis){
    moverProjetil = setInterval(()=>{
        projeteis.forEach((obj)=>{
            let trajeto = parseInt(obj.style.left) + 10; 
            obj.style.left = `${trajeto}px`;
            if( trajeto === 1400){
                obj.remove();
                if( disparo > 0)
                    disparo--;
                // clearInterval(moverProjetil);
            }
        })
    }, 10);
}

// criar inimigo
function enemy(){
    criarInimigo = setInterval(()=>{
        let altura = (Math.random() * (650 - 30) + 30).toFixed();
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
                alert(' Você perdeu :-(  total de pontos: '+totalPontos);
                location.reload();
            }
        })
    }
}

//colisao
function collision(){
    let inimigo = document.querySelectorAll('.inimigo');
    let rajada = document.querySelectorAll('.shoot');
    let deadTime = 0;
    if( inimigo && rajada){
        rajada.forEach((obj)=>{
            inimigo.forEach( (alien)=>{
                let posicaoRajada = parseInt(obj.style.left);
                let posicaoAlien = parseInt( alien.style.left);
                let alturaAlien = parseInt( alien.style.top);
                let alturaRajada = parseInt( obj.style.top);
                if( posicaoRajada >= posicaoAlien){
                    if(alturaRajada >= alturaAlien - 25 && alturaRajada <= alturaAlien + 25 ){
                        alien.src = '../img/explosion.png';
                        alien.classList.remove('inimigo');
                        alien.classList.add('dead');
                        totalPontos += 100;
                        pontos.innerHTML = totalPontos; 
                        setTimeout(()=>{
                            alien.remove();
                        }, 1000);
                    }                    
                }
            })

        })
        
    }
}
