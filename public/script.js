document.getElementById("getButton1").addEventListener("click", async () => {
    const apiUrl = "/hello?question=Hello";
    afficherReponse(apiUrl, "response1");
});

document.getElementById("getButton2").addEventListener("click", async () => {
    const apiUrl = "/bienvenue?question=Bienvenue";
    afficherReponse(apiUrl, "response2");
});

document.getElementById("getButton3").addEventListener("click", async () => {
    const apiUrl = "/llama?question=bonjour";
    afficherReponse(apiUrl, "response3");
});

async function afficherReponse(apiUrl, elementId) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        document.getElementById(elementId).innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        document.getElementById(elementId).innerText = "Erreur lors du chargement des données.";
    }
}
