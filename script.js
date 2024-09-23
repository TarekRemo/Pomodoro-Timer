
//Variables nécessaires au traitement
let state = "off"; 
let timerID; 

//Variables correspondant aux élements HTML
let workElement = document.getElementById("work"); 
let breakElement = document.getElementById("break"); 
let minutesElement = document.getElementById("minutes"); 
let secondesElement = document.getElementById("seconds"); 
let startElement = document.getElementById("start"); 
let timeSetterElement = document.getElementById("timeSetter"); 
let setterEnablerElement = document.getElementById("setterEnabler"); 

//Initialisation du timer 
minutesElement.textContent = twoDigits(25); 
secondesElement.textContent = twoDigits(0);

//masqur le setter du timer
let timeSetterDispaly = (timeSetterElement.style.display); 
timeSetterElement.style.display = "none"; 

//Listener pour le bouton du setter
setterEnablerElement.addEventListener("click", ()=>onSetterEnabler()); 


//Listener pour le bouton start
startElement.addEventListener("click", ()=>onStart()); 



function onSetterEnabler(){
    //On affiche le setter du timer
    timeSetterElement.style.display = timeSetterDispaly; 
}

function onWork(){
    
    setActive(workElement); 
    minutesElement.textContent = twoDigits(25); 
    secondesElement.textContent = twoDigits(0);

}



function onBreak(){

    setActive(breakElement); 
    minutesElement.textContent = twoDigits(5); 
    secondesElement.textContent = twoDigits(0);

}


function setActive(spanElement){

    if(spanElement == workElement){

        breakElement.classList.remove("active");
        workElement.classList.add("active"); 

        //changement d'affichage
        document.body.classList.remove("resting"); 
        document.body.classList.add("working"); 
    

    }

    else if (spanElement == breakElement){
        workElement.classList.remove("active");
        breakElement.classList.add("active"); 

        //changement d'affichage
        document.body.classList.remove("working"); 
        document.body.classList.add("resting");

    }
}


function onStart(){

    //Si on veux commencer le timer
    if(state == "off"){
        startElement.textContent = "reinitialise"; 
        state = "on"; 
        onWork(); 
        timerID = setInterval(()=>timerCountDown(), 1000); 
    }

    //Si on veut réinitialiser le timer
    else{
        startElement.textContent = "start";
        state = "off"
        clearInterval(timerID); 
        onWork(); 

        //Changement d'affichage
        document.body.classList.remove("working");
        document.body.classList.remove("resting");
    }

}


function timerCountDown(){

    //Si secondes = 0
    if(secondesElement.textContent == 0){

        //Si c'est la dernière minute
        if(minutesElement.textContent == 0){
            
            //On passe à l'autre état 

            //Si c'est l'etat work, on passe à break
            if(workElement.classList.contains("active")){
                onBreak(); 
            }
            //Si c'est l'etat break, on passe à work
            else{
                onWork(); 
            }
        }

        //si ce n'est pas la dernière minute
        else{
            //On passe à la minute d'après 
            secondesElement.textContent = twoDigits(59); 
            minutesElement.textContent = twoDigits(minutesElement.textContent-1); 
        }
    }

    //si seondes != 0
    else{
        secondesElement.textContent = twoDigits(secondesElement.textContent-1); 
    }


}

function twoDigits(nb){
    return nb.toString().padStart(2, '0'); 
}






