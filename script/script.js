const usersHuman = [{
        type: "humain",
        name: "John Doe",
        email: "j.smith@gmail.com",
        age: 25,
        avatar : './img/john.png',
        icon : './img/john_icon.png',
        latitude : 43.604429,
        longitude : 1.443812
    },
    {
        type: "humain",
        name: "Jane Smith",
        email: "ja.doe@sfr.fr",
        age: 5,
        avatar : './img/jane.png',
        icon : './img/jane_icon.png',
        latitude : 43.60792, 
        longitude : 1.44133
    },
    {
        type: "humain",
        name: "Le Vénérable",
        email: "levy@gmail.com",
        age: 500,
        avatar : './img/venerable.png',
        icon : './img/venerable_icon.png',
        latitude : 43.60053,
        longitude : 1.44590
    }
];

const usersPet = [{
        type: "animal de compagnie",
        espece: "chien",
        name: "Rox",
        age: 7,
        propriétaire: "John Doe",
        avatar : './img/chien.png',
        icon : './img/chien_icon.png',
        latitude : 43.60377,
        longitude : 1.43583
    },
    {
        type: "animal de compagnie",
        espece: "renard",
        name: "Roukie",
        age: 300,
        propriétaire: "Le Vénérable",
        avatar : './img/renard.jpg',
        icon : './img/renard_icon.png',
        latitude : 43.59602,
        longitude : 1.43692
    }
];

const usersXeno = [{
        type: "Xeno",
        espece: "Krogan",
        name: "Wrex",
        menace: "Rouge",
        age: 45,
        avatar : './img/wrex.png',
        icon : './img/wrex_icon.png',
        latitude : 43.59555,
        longitude : 1.45257
    },
    {
        type: "Xeno",
        espece: "Turien",
        name: "Garrus",
        menace: "Vert",
        age: 35,
        avatar : './img/garrus.png',
        icon : './img/garrus_icon.png',
        latitude : 43.61108,
        longitude : 1.45539
    },
    {
        type: "Xeno",
        espece: "Asari",
        name: "Liara",
        menace: "ULTRA Rouge",
        age: 25,
        avatar : './img/liara.png',
        icon : './img/liara_icon.png',
        latitude : 43.61183,
        longitude :  1.43222
    }
];

/*-------------------------
Mise en place tableau Users
-------------------------*/
const tabData = [];

for(const users of [usersHuman,usersPet,usersXeno]){
    tabData.push(users);
}

console.log(tabData);


/*----------------
Création des cards
----------------*/
function cardHuman(obj) {
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    h2.textContent = obj.name;
    const img = document.createElement('img');
    img.src = obj.avatar;
    img.alt = "Portrait de : " + obj.name;
    const p = document.createElement('p');
    p.textContent = obj.age + " ans - " + obj.email;
    article.appendChild(h2);
    article.appendChild(img);
    article.appendChild(p);
    article.classList.add('card');
    return article;
}

function cardPet(obj){
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    h2.textContent = obj.name;
    const img = document.createElement('img');
    img.src = obj.avatar;
    img.alt = "Portrait de : "+obj.name;
    const p = document.createElement('p');
    p.textContent = obj.age + " ans - " + obj.espece +" - Propriétaire : "+obj.propriétaire;
    article.appendChild(h2);
    article.appendChild(img);
    article.appendChild(p);
    article.classList.add('card');
    return article;
}

function cardXeno(obj){
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    h2.textContent = obj.name;
    const img = document.createElement('img');
    img.src = obj.avatar;
    img.alt = "Portrait de : "+obj.name;
    const p = document.createElement('p');
    p.textContent = obj.age + " ans - " + obj.espece +" - Menace : "+obj.menace;
    article.appendChild(h2);
    article.appendChild(img);
    article.appendChild(p);
    article.classList.add('card');
    return article;
}

/*----------------------
Récupération des profils
----------------------*/
function profil(arr){
    const cardList = [];
    for (const obj of arr){
        if (obj.type === "humain"){
            cardList.push(cardHuman(obj));
        } else if (obj.type === "animal de compagnie") {
            cardList.push(cardPet(obj));
        } else if (obj.type === "Xeno"){
            cardList.push(cardXeno(obj));
        } else {
            console.error("Type de Profil non Existant");
        }
    }
    return cardList;
}

/*----------------------
Affichage des profils
----------------------*/
function profilAll(arr){
    const profils = document.querySelector('.profils');
    for (const tab of arr){
        const cardTab = profil(tab);
        cardTab.forEach(card => profils.appendChild(card));
    }
}

profilAll(tabData);

/*---------
Map LeafLet
---------*/

/*-----------------
Affichage de la map
-----------------*/
const map = L.map('map').setView([43.604429, 1.443812], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/*----------------
Création du marker
----------------*/
function markerProfil(obj){
    const ICON = L.icon({
        iconUrl: obj.icon,
        iconSize: [50,83],
        iconAnchor: [25,83],
    });

    const marker = L.marker([obj.latitude, obj.longitude],{icon: ICON});

    marker.addTo(map).bindPopup(obj.name);
}

/*--------------------------------
Ajout du marker pour chaques Users
--------------------------------*/
for (const arr of tabData){
    for(const user of arr){
        markerProfil(user);
    }
}