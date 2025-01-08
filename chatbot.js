async function getResponse() {
    const userInput = document.getElementById("userInput").value;
    const responseElement = document.getElementById("response");

    if (!userInput.trim()) {
        responseElement.textContent = "Inserisci una domanda valida.";
        return;
    }

    responseElement.textContent = "Elaborazione in corso...";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer YOUR_API_KEY`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        responseElement.textContent = data.choices[0].message.content;
    } catch (error) {
        responseElement.textContent = "Errore nella comunicazione con il server.";
        console.error(error);
    }
}
