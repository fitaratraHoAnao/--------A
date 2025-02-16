document.getElementById('getButton').addEventListener('click', async () => {
    const baseUrl = window.location.origin; // URL actuelle du site
    const response = await fetch(`${baseUrl}/hello?question=Hello`);
    const data = await response.json();
    document.getElementById('response').textContent = "Réponse : " + data.response;
});
