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
