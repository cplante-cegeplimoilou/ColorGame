// Declare une function changement de couleur
function changeBgColor(){
    let colorDrawn = drawArrayElement(baseColors)

    //tant que la couleur pige est egal a la couleur courante du background
    while(colorDrawn === currentBgColor){
        colorDrawn = drawArrayElement(baseColors);
    }
    
    //retire la class css de la couleur courante
    document.body.classList.remove(currentBgColor);
    //ajoute le nouvelle couleur pige
    document.body.classList.add(colorDrawn);
    
    //On garde en memoire la derniere couleur pige
    currentBgColor = colorDrawn;
}

function changeBtnColor(){
    let colorDrawn = drawArrayElement(baseColors)

    //tant que la couleur pige est egal a la couleur courante du background
    while(colorDrawn === currentBtnColor){
        colorDrawn = drawArrayElement(baseColors);
    }
    
    //retire la class css de la couleur courante
    btnPlay.classList.remove(currentBtnColor);
    //ajoute le nouvelle couleur pige
    btnPlay.classList.add(colorDrawn);
    
    //On garde en memoire la derniere couleur pige
    currentBtnColor = colorDrawn;
}

function drawArrayElement(arrayToDrawIn){
    // pige un nombre en 0 et .99
    let randomNumber = Math.random();
    //On construit un index pour piger dans notre tableau de couleur
    let randomIndex = Math.floor(randomNumber * arrayToDrawIn.length);
    //On pige
    return arrayToDrawIn[randomIndex];
}

//Declare la function compare color
function compareColor(){
    //Si la couleur du background = la couleur du bouton
    if(currentBgColor === currentBtnColor){
        //incrememnte le score
        score++;
        //On met a jour le text de lelement html qui contient le score
        scoreHtml.textContent = 'Score: ' + score;

        if(score > topScore){
            topScore = score;
            topScoreHtml.textContent = 'Top score: ' + score;
        }

        clearInterval(intervalChangementDeCouleurID);
        intervalChangementDeCouleurID = setInterval(changeBgColor, 1000 - (score * 100));
    }
    else{
        //decrement le nombre de vie
        lifes--;
        //On met a jour le text de lelement html qui contient les vies
        lifesHtml.textContent = 'Lifes: ' + lifes;
    }
}

function btnPlayClickHandler(){
    if(state === 'not_started'){
        intervalChangementDeCouleurID = setInterval(changeBgColor, 1000 - (score * 100));
        btnPlay.textContent = '';
        state = 'started';
        return;
    } 

    compareColor();
    changeBtnColor();

    if(lifes <= 0){
        clearInterval(intervalChangementDeCouleurID);
        btnPlay.textContent = 'Commencer';

        score = 0;
        lifes = 3;

        scoreHtml.textContent = 'Score: ' + score;
        lifesHtml.textContent = 'Lifes: ' + lifes;

        state = 'not_started';
    }
}

//On declare le tableau qui contient tous les couleurs du jeu
const baseColors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];
//On decleare l'interval qui permet le changement de couleur
let intervalChangementDeCouleurID; 

//Block des selection des elements html que nous aurons besoin de mettre ou d'ecouter un evenement
const body = document.body;
const btnPlay = document.querySelector('.btn-play');
const scoreHtml = document.querySelector('.score-display');
const lifesHtml = document.querySelector('.lifes-display');
const topScoreHtml = document.querySelector('.top-score-display');

//Declaration des valeur de base de notre programme
let currentBgColor = 'color-1';
let currentBtnColor = 'color-2';
let score = 0;
let lifes = 3;
let topScore = 0;
let state = 'not_started'; 

//Ecoute de levenement click sur le bouton play
btnPlay.addEventListener('click', btnPlayClickHandler);



