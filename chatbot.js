// Carica la chiave dinamicamente dal file config.js
async function getApiKey() {
    const response = await fetch("config.js");
    const scriptContent = await response.text();
    const match = scriptContent.match(/window\.OPENAI_API_KEY='(.*)';/);
    return match ? match[1] : null;
}

async function getResponse() {
    const apiKey = await getApiKey();
    const userInput = document.getElementById("userInput").value;
    const responseElement = document.getElementById("response");

    if (!apiKey) {
        responseElement.textContent = "Errore: Impossibile caricare l'API Key.";
        return;
    }

    if (userInput.trim() === "") {
        responseElement.textContent = "Per favore, inserisci una domanda valida.";
        return;
    }

    responseElement.textContent = "Sto elaborando la tua richiesta...";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        responseElement.textContent = data.choices[0].message.content;
    } catch (error) {
        responseElement.textContent = "Si è verificato un errore. Per favore riprova.";
        console.error("Errore:", error);
    }
}
