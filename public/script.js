// Garde ton script existant pour les boutons API
function callApi(apiName) {
    if (apiName === "hello") {
        window.location.href = "/hello?question=Hello";
    } else if (apiName === "bienvenu") {
        window.location.href = "/bienvenu?question=Bienvenue";
    } else if (apiName === "llama") {
        window.location.href = "/llama?question=Bonjour";
    }
}

// Ouvrir / Fermer le menu latéral
function toggleMenu() {
    let sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
    } else {
        sidebar.style.left = "0px";
    }
}

// Fonction de recherche
function searchFunction() {
    let query = document.getElementById("search-input").value;
    if (query.trim() !== "") {
        alert("Recherche : " + query);
    }
}

// Fonction pour afficher dynamiquement le contenu selon le bouton cliqué
function showContent(apiName) {
    let title = document.getElementById("apiTitle");
    let description = document.getElementById("apiDescription");
    let button = document.getElementById("getButton");

    if (apiName === "HELLO") {
        title.innerText = "HELLO";
        description.innerText = "Description : Ceci est une API de salutations.";
        button.setAttribute("onclick", "callApi('hello')");
    } else if (apiName === "BIENVENUE") {
        title.innerText = "BIENVENUE";
        description.innerText = "Description : Ceci est une API de bienvenue.";
        button.setAttribute("onclick", "callApi('bienvenu')");
    } else if (apiName === "LLAMA") {
        title.innerText = "LLAMA";
        description.innerText = "Description : Ceci est une API de réponse Llama.";
        button.setAttribute("onclick", "callApi('llama')");
    }
}
