//Use this for running in a browser environment
// If you are using a browser, you can use the following line to import the AutoTokenizer
// directly from a CDN. This is the recommended way to use the Hugging Face Transformers library
// in a web application without needing to set up a build system or package manager.
import { AutoTokenizer } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.1";

// If you are using Node.js, you can use the following line instead: 
//import { AutoTokenizer } from "@huggingface/transformers";

// Wait for DOM to load
window.addEventListener("DOMContentLoaded", async () => {
    let tokenizer;
    let modelName = document.getElementById("model-select").value;

    // Load tokenizer for the selected model
    tokenizer = await AutoTokenizer.from_pretrained(modelName);

    // Display model info
    document.querySelector(".model-used").textContent = `Model used: ${modelName.toUpperCase()}`;
    document.querySelector(".model-max-text-length").textContent = `Model's max text length: ${tokenizer.model_max_length}`;

    // Handle model change
    document.getElementById("model-select").addEventListener("change", async function() {
        modelName = this.value;
        tokenizer = await AutoTokenizer.from_pretrained(modelName);
        document.querySelector(".model-used").textContent = `Model used: ${modelName.toUpperCase()}`;
        document.querySelector(".model-max-text-length").textContent = `Model's max context length of tokens: ${tokenizer.model_max_length}`;
        // Clear outputs
        document.querySelector(".encoded-text").textContent = "Tokenized";
        document.querySelector(".encoded-text").textContent = "Encoded";
        document.querySelector(".decoded-tokens").textContent = "Decoded";
    });

    //Basic Tokenization (Text to Tokens)


    // Encode (Tokens to IDs)
    document.getElementById("tokenize-btn").addEventListener("click", async () => {
        const text = document.getElementById("encode-text").value;
        if (!text) {
            alert("Please enter text to encode.");
            return;
        }

        // Check if the text exceeds the model's max length
        if (text.length > 100) {
            alert(`Text exceeds the sample input maximum length defined. Enter a smaller text.`);
            return;
        }

        // Tokenize the input text (Text to Tokens)
        const tokens = await tokenizer.tokenize(text);
        document.querySelector(".text-to-tokens").textContent = `Tokenized: ${tokens.join(", ")}`;
        // Encode - Tokens to IDs
        const encoded = await tokenizer.encode(text);
        document.querySelector(".encoded-text").textContent = `Encoded: ${encoded}`;
    });

    // Decode (IDs to Text)
    document.getElementById("decode-btn").addEventListener("click", async () => {
        const tokensStr = document.getElementById("decode-tokens").value;

        if (!tokensStr) {
            alert("Please enter token IDs to decode.");
            return;
        }
        // Convert comma-separated string to array of numbers
        const tokens = tokensStr.split(",").map(t => parseInt(t.trim())).filter(n => !isNaN(n));
        const decoded = await tokenizer.decode(tokens);
        document.querySelector(".decoded-tokens").textContent = `Decoded: ${decoded}`;
    });    
});