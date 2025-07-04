//Le fichier JS pour la partie Météo

const info = document.createElement('div');
const cardMeteo = document.getElementsByClassName('cardMeteo')[0];
const button = cardMeteo.querySelector('button');

/*-------------------
Style de la div météo
-------------------*/
info.style.height="300px";
info.style.width="200px";
info.style.margin="16px 0";
info.style.border="3px solid grey";
info.style.padding="16px 12px 12px 24px";

/*---------------------------------
Insertion de la div avant le bouton
---------------------------------*/
cardMeteo.insertBefore(info, button);



/*-----------------------
Affichage des infos météo
-----------------------*/
function addInfo(data){
    info.replaceChildren();

    const pCondition = document.createElement("p");
    const pTemp = document.createElement("p");
    const pTmax = document.createElement("p");
    const pTmin = document.createElement("p");

    pCondition.textContent = "Condition actuelle : "+data.current_condition.condition;
    info.appendChild(pCondition);

    pTemp.textContent = "Température actuelle : "+ data.current_condition.tmp + " °C";
    info.appendChild(pTemp);

    pTmax.textContent = "Température maximum aujourd'hui : "+data.fcst_day_0.tmax + " °C";
    info.appendChild(pTmax);

    pTmin.textContent = "Température minimum aujourd'hui : "+data.fcst_day_0.tmin + " °C";
    info.appendChild(pTmin);
}

/*-------------------
Ajout class au bouton
-------------------*/
function bouton(){
    button.classList.add("button__cardMeteo");
}




/*-----------
EventListener
-----------*/
button.addEventListener('mousedown', ()=>{
    button.style.backgroundColor="orange";
});
document.addEventListener('mouseup', ()=>{
    button.style.backgroundColor="";
});
button.addEventListener('click', ()=>{
    fetch("https://prevision-meteo.ch/services/json/toulouse")
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            addInfo(data);
            bouton();
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données :", error);
        });
});

