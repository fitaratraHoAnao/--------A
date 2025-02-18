// Fonction pour obtenir ou générer un UID unique
function getUID() {
    let uid = localStorage.getItem("uid");

    // Si aucun UID n'existe, on en génère un nouveau
    if (!uid) {
        uid = Math.random().toString(36).substr(2, 9); // Générer un UID unique
        localStorage.setItem("uid", uid); // Stocker l'UID dans localStorage
    }

    return uid;
}

// Event Listener pour le bouton 1
document.getElementById("getButton1").addEventListener("click", () => {
    const uid = getUID(); // Récupérer ou générer un UID
    window.location.href = `/hello?question=Hello&uid=${encodeURIComponent(uid)}`;
});

// Event Listener pour le bouton 2
document.getElementById("getButton2").addEventListener("click", () => {
    const uid = getUID();
    window.location.href = `/bienvenu?question=Bienvenue&uid=${encodeURIComponent(uid)}`;
});

// Event Listener pour le bouton 3
document.getElementById("getButton3").addEventListener("click", () => {
    const uid = getUID();
    window.location.href = `/llama?question=Bonjour&uid=${encodeURIComponent(uid)}`;
});

// Event Listener pour le bouton 4
document.getElementById("getButton4").addEventListener("click", () => {
    const uid = getUID();
    window.location.href = `/deepseek?question=Bonjour&uid=${encodeURIComponent(uid)}`;
});

// Event Listener pour le bouton 5
document.getElementById("getButton5").addEventListener("click", () => {
    const uid = getUID();
    window.location.href = `/deepseek?question=Bonjour&uid=${encodeURIComponent(uid)}`;
});

// Event Listener pour le bouton 6
document.getElementById("getButton6").addEventListener("click", () => {
    const uid = getUID();
    window.location.href = `/llama11?question=Bonjour&uid=${encodeURIComponent(uid)}`;
});

document.getElementById("getButton7").addEventListener("click", () => {
    const uid = getUID();
    window.location.href = `/qwen-coder?q=Bonjour&uid=${encodeURIComponent(uid)}`;
});

document.getElementById("getButton8").addEventListener("click", () => {
    const uid = getUID();
    const prompt = "Bonjour"; // Le message à envoyer
    const imageUrl = document.getElementById("imageUrlInput").value; // Récupère l'URL de l'image entrée

    // Si une URL d'image est fournie, on l'ajoute à l'URL de la requête
    if (imageUrl) {
        window.location.href = `/gemini?prompt=${encodeURIComponent(prompt)}&uid=${encodeURIComponent(uid)}&image=${encodeURIComponent(imageUrl)}`;
    } else {
        // Si aucune image n'est fournie, on envoie seulement le prompt et l'UID
        window.location.href = `/gemini?prompt=${encodeURIComponent(prompt)}&uid=${encodeURIComponent(uid)}`;
    }
});
