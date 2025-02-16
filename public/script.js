// Garde ton script existant
document.getElementById("getButton1").addEventListener("click", () => {
    window.location.href = "/hello?question=Hello";
});

document.getElementById("getButton2").addEventListener("click", () => {
    window.location.href = "/bienvenu?question=Bienvenue";
});

document.getElementById("getButton3").addEventListener("click", () => {
    window.location.href = "/llama?question=Bonjour";
});

// 🔽 AJOUT DES NOUVELLES FONCTIONNALITÉS 🔽

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
