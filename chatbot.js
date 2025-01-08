async function getResponse() {
    const responseElement = document.getElementById("response");
    const userInput = document.getElementById("userInput").value;

    if (!userInput.trim()) {
        responseElement.textContent = "Per favore, inserisci una domanda valida.";
        return;
    }

    responseElement.textContent = "Sto elaborando la tua richiesta...";

    try {
        const apiKey = await fetch("config.js").then(res => res.text()).then(text => {
            const match = text.match(/window\.OPENAI_API_KEY='(.*)';/);
            return match ? match[1] : null;
        });

        if (!apiKey) {
            responseElement.textContent = "Errore: Impossibile caricare l'API Key.";
            return;
        }

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
        responseElement.textContent = "Errore durante la richiesta. Riprova.";
        console.error(error);
    }
}
