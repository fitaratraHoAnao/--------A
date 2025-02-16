document.getElementById("getButton1").addEventListener("click", async () => {
    try {
        const response = await fetch("/hello?question=Hello");
        const data = await response.json();
        document.getElementById("response1").innerText = data.response;
    } catch (error) {
        console.error("Erreur lors de la requête à Hello :", error);
        document.getElementById("response1").innerText = "Erreur de connexion.";
    }
});

document.getElementById("getButton2").addEventListener("click", async () => {
    try {
        const response = await fetch("/bienvenu?question=Bienvenue");
        const data = await response.json();
        document.getElementById("response2").innerText = data.response;
    } catch (error) {
        console.error("Erreur lors de la requête à Bienvenu :", error);
        document.getElementById("response2").innerText = "Erreur de connexion.";
    }
});

document.getElementById("getButton3").addEventListener("click", async () => {
    try {
        const response = await fetch("/llama?question=Quel est l'importance des modèles de langage rapides ?");
        const data = await response.json();
        document.getElementById("response3").innerText = data.response;
    } catch (error) {
        console.error("Erreur lors de la requête à Llama :", error);
        document.getElementById("response3").innerText = "Erreur de connexion.";
    }
});
