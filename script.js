document.getElementById('superhero-quiz').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Werte der Formulardaten holen
    const power = document.getElementById('power').value;
    const moral = document.getElementById('moral').value;
    const city = document.getElementById('city').value;

    // Funktion zum Abrufen einer zufälligen Superhelden-ID
    function getRandomHeroId() {
        return Math.floor(Math.random() * 731) + 1; // IDs sind zwischen 1 und 731
    }

    // Zufällige Superhelden-ID auswählen
    const heroId = getRandomHeroId();

    // API URL für die Superhelden-Daten
    const apiUrl = `https://superheroapi.com/api/access-token/${heroId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.name) {
                throw new Error('Kein Superheld gefunden');
            }

            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `
                <h3>Du bist ${data.name}!</h3>
                <img src="${data.image.url}" alt="${data.name}" style="max-width: 200px; border-radius: 10px;">
                <p>Alias: ${data.biography.aliases.join(', ')}</p>
                <p>Geburtsort: ${data.biography['place-of-birth']}</p>
                <p>Erstes Erscheinen: ${data.biography['first-appearance']}</p>
            `;
        })
        .catch(error => {
            console.error('Fehler beim Abrufen des Superhelden:', error);
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<p>Es gab ein Problem beim Abrufen deiner Superhelden-Identität. Bitte versuche es später noch einmal.</p>`;
        });
});
