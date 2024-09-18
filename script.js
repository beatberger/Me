document.getElementById('superhero-quiz').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const power = document.getElementById('power').value;
    const moral = document.getElementById('moral').value;
    const city = document.getElementById('city').value;
    
    // Beispielhafte ID basierend auf Antworten
    // Normalerweise sollte die ID aus den Antworten ermittelt werden
    const heroId = '1'; // Ersetze dies mit der dynamischen ID

    // Verwende CORS-Proxy
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `${corsProxy}https://superheroapi.com/api/d6ada0c4cf8b035ddd1810e4a21c4923/${heroId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.response === "error") {
                throw new Error(data.error || 'Unbekannter Fehler');
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
