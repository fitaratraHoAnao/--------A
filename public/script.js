// Ouvrir / Fermer le menu burger
function toggleMenu() {
    let sidebar = document.getElementById("sidebar");
    if (sidebar.style.right === "0px") {
        sidebar.style.right = "-250px";
    } else {
        sidebar.style.right = "0px";
    }
}

// Barre de recherche pour filtrer les API
document.getElementById("searchInput").addEventListener("input", function () {
    let searchValue = this.value.toLowerCase();
    let apiBoxes = document.querySelectorAll(".api-box");

    apiBoxes.forEach(box => {
        let title = box.getAttribute("data-title").toLowerCase();
        if (title.includes(searchValue)) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    });
});

// Redirection des boutons GET
document.getElementById("getButton1").addEventListener("click", () => {
    window.location.href = "/hello?question=Hello";
});

document.getElementById("getButton2").addEventListener("click", () => {
    window.location.href = "/bienvenu?question=Bienvenue";
});

document.getElementById("getButton3").addEventListener("click", () => {
    window.location.href = "/llama?question=Bonjour";
});
