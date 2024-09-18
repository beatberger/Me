// script.js
document.getElementById('superhero-quiz').addEventListener('submit', function(event) {
    event.preventDefault();

    // Antworten des Nutzers sammeln
    const power = document.getElementById('power').value;
    const moral = document.getElementById('moral').value;
    const city = document.getElementById('city').value;

    // Einfaches Mapping basierend auf den Antworten, um eine zufällige Superhelden-ID auszuwählen
    let heroId;
    if (power === 'strength' && moral === 'good') {
        heroId = 1; // Superman
    } else if (power === 'speed' && moral === 'good') {
        heroId = 2; // Flash
    } else if (power === 'intelligence' && moral === 'neutral') {
        heroId = 3; // Batman
    } else if (power === 'technology' && moral === 'neutral') {
        heroId = 4; // Iron Man
    } else if (power === 'strength' && moral === 'evil') {
        heroId = 5; // Thanos
    } else {
        heroId = 6; // Joker
    }

    // API-URL und Schlüssel
    const apiKey = 'd6ada0c4cf8b035ddd1810e4a21c4923';
    const apiUrl = `https://superheroapi.com/api/${apiKey}/${heroId}`;

    // API-Aufruf, um den Superhelden basierend auf der ID abzurufen
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `
                <h3>Du bist ${data.name}!</h3>
                <img src="${data.image.url}" alt="${data.name}" style="max-width: 200px;">
                <p><strong>Kraft:</strong> ${data.powerstats.strength}</p>
                <p><strong>Schnelligkeit:</strong> ${data.powerstats.speed}</p>
                <p><strong>Intelligenz:</strong> ${data.powerstats.intelligence}</p>
                <p><strong>Berühmtes Zitat:</strong> ${data.biography['full-name']}</p>
            `;
        })
        .catch(error => {
            console.error('Fehler bei der Superhero API-Anfrage:', error);
        });
});
