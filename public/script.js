// Fonction pour afficher/masquer le menu
function toggleMenu() {
    let menu = document.getElementById("menu-container");
    let content = document.getElementById("content");

    // Si le menu est caché, on l'affiche
    if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
    }
}

// Fonction pour afficher les informations et cacher le menu
function showContent(apiName) {
    let menu = document.getElementById("menu-container");
    let content = document.getElementById("content");
    let title = document.getElementById("apiTitle");
    let description = document.getElementById("apiDescription");
    let button = document.getElementById("getButton");

    // On met à jour le contenu selon l'API sélectionnée
    if (apiName === "HELLO") {
        title.innerText = "HELLO";
        description.innerText = "Description : Ceci est une API de salutations.";
        button.innerText = "Get HELLO";
        button.setAttribute("onclick", "callApi('hello')");
    } else if (apiName === "BIENVENUE") {
        title.innerText = "BIENVENUE";
        description.innerText = "Description : Ceci est une API de bienvenue.";
        button.innerText = "Get BIENVENUE";
        button.setAttribute("onclick", "callApi('bienvenu')");
    } else if (apiName === "LLAMA") {
        title.innerText = "LLAMA";
        description.innerText = "Description : Ceci est une API de réponse Llama.";
        button.innerText = "Get LLAMA";
        button.setAttribute("onclick", "callApi('llama')");
    }

    // On masque le menu et affiche le contenu
    menu.classList.add("hidden");
    content.classList.remove("hidden");
}

// Redirection vers l'API
function callApi(apiName) {
    window.location.href = "/" + apiName + "?question=" + apiName;
}
