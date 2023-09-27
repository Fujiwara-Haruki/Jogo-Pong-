//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;

//variáveis da raquete
let xRaquete = 585;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variáveis do oponente
let xRaqueteOponente = 5;
let yRaqueteOponente = 150;
let velYOponente

let colidiu = false;

let erro = 70;

//placar jogo
let meusPontos = 0;
let seusPontos = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
    trilha = loadSound("game_song.mp3");
    ponto = loadSound("point.mp3");
    raquetada = loadSound("raquetada.mp3");
}

//tela----------------------------------
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//desenhar--------------------------------------------
function draw() {
  background(0);
  
  mostraBolinha();
  movimentaBolinha();
  
  verificaColisaoBorda();
  
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  
  colisaoRaquete(xRaquete, yRaquete);
  
  //moverRaqueteOponenteMultiplayer();
  moverRaqueteOponenteMultiplayer();
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  
  incluiPlacar();
  marcaPonto();
  
  bolinhaNaoFicaPresa();
}

//funcões----------------------------------------------
//mostrar bolinha-------------------------------------
function mostraBolinha() {
  fill(color(75,0,130));
  circle(xBolinha, yBolinha, diametro);
}
  
//mover bolinha-----------------------------------------
function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
  
//colisão borda----------------------------------------
function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
   }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
   }
} 

//raquete---------------------------------------------------
function mostraRaquete(x,y) {
  fill(color(186,85,211));
  rect(x, y, comprimentoRaquete, alturaRaquete);
}
  
//mover minha raquete---------------------------------------
function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 8;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 8;
  }
  
  //não sair da tela
  yRaquete = constrain(yRaquete, 0, 310);
}

//colisão raquete---------------------------------------
/*function verificaColisaoRaquete(){
    if (xBolinha + raio > xRaquete + comprimentoRaquete/2 && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  }
}*/

//colisão com a raquete-------------------------------------
function colisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

//mover raquete oponente Multiplayer--------------------------
function moverRaqueteOponenteMultiplayer(){
    if (keyIsDown(87)){ //87 = w
    yRaqueteOponente -= 8;
  }
  if (keyIsDown(83)){ // 83 = s
    yRaqueteOponente += 8;
  }
  
  //não sair da tela
  yRaqueteOponente = constrain(yRaqueteOponente, 0, 310);
}

//mover raquete oponente singleplayer------------------====
function moverRaqueteOponente(){
    velYOponente = yBolinha -yRaqueteOponente - comprimentoRaquete / 2 - 30;

  yRaqueteOponente += velYOponente + erro;
  
  calculaChanceDeErrar()
  
  yRaqueteOponente = constrain(yRaqueteOponente, 0, 310);
}

//placar-----------------------------------------------------
function incluiPlacar(){
    stroke(255);
    textSize(16);
    textAlign(CENTER);
    
    fill(color(147,112,219));
    rect(150, 10, 40, 20);
    rect(450, 10, 40, 20);
    
    fill(255);
    text(meusPontos, 170, 26);
    text(seusPontos, 470, 26);
}

//marcar ponto------------------------------------------------
function marcaPonto(){
    if (xBolinha > 590){
      meusPontos +=1;
      ponto.play();
    }
    if (xBolinha < 10){
      seusPontos += 1;
      ponto.play();
    }
}

//calcular a chande de errar
function calculaChanceDeErrar(){
    if (seusPontos >= meusPontos) {
      erro += 1;
      
      if (erro >= 1){
        erro = 60
      }
    } else {
      erro -= 1;
      
      if (erro <=35){
        erro = 40;
      }
    }
}

//bolinha presa--------------------------------------------
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
  if (xBolinha + raio > 600){
    xBolinha = 587
    }
}