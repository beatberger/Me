document.getElementById('superhero-quiz').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const heroId = '1'; // Beispiel ID
    const corsProxy = 'https://thingproxy.freeboard.io/fetch/';
    const apiUrl = `${corsProxy}https://superheroapi.com/api/d6ada0c4cf8b035ddd1810e4a21c4923/${heroId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(data => {
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
