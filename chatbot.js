const apiKey = "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"; // Inserisci la tua chiave API qui

async function getResponse() {
    const userInput = document.getElementById("userInput").value;
    const responseElement = document.getElementById("response");

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