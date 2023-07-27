const express = require("express")
const { OpenAIApi, Configuration } = require('openai');
const router = express.Router()

/**
 * Generates completion for the given input using the OpenAI API.
 * @param {string} input - The prompt input for generating completion.
 * @returns {string|boolean} - The generated completion or false if no completion is available.
 * @throws {Error} - If there is an error in the OpenAI API request.
 */

async function generateCompletion(input) {
    try {
        const prompt = input;
        const maxTokens = 500;
        const n = 1;

        const configuration = new Configuration({
            apiKey: process.env.OPEN_AI_KEY,
        });

        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: maxTokens,
            n: n
        });

        const { choices } = response.data;
        if (choices && choices.length > 0) {
            const completion = choices[0].text.trim();
            return completion
        } else {
            return false
        }
    } catch (error) {
        console.error('OpenAI API request failed:', error);
        res.status(500).json({ error: 'Failed to generate output' });
    }
}

router.post('/convert', async (req, res) => {
    try {
        const { code, language } = req.body;

        // Prompt: Convert the given code to the specified language.
        // If the code is incorrect or incomplete, provide guesses and complete it.
        let response = await generateCompletion(`I require you to serve as a fully operational code converter application. Given a code written in one language, your task is to convert it into another language. n\ Convert this ${code} to ${language}`);
        res.json({ response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/debug', async (req, res) => {
    try {
        const { code } = req.body;

        // Prompt: Identify any errors in the given code and provide necessary corrections.
        // Additionally, point out any mistakes made and suggest precautions to avoid them in the future.
        let response = await generateCompletion(`I need you to function as a comprehensive code debugging application. You will be given a block of code, and your task is to debug it thoroughly. Additionally, please provide a clear explanation of the identified bug, the modifications you made to fix it, and finally, present the revised and executable version of the code. n\ Code to be executed: ${code}`);
        res.json({ response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/quality-check', async (req, res) => {
    try {
        const { code, language } = req.body;

        // Prompt: Perform a quality check on the given code.
        // Additionally, provide brief information and tips to improve.
        // Print the information in bullet points for easy understanding.
        let response = await generateCompletion(`I need you to function as a complete code quality checker application. You will be given a block of code, and your responsibility is to assess the quality of the code from an implementation standpoint, suggest potential improvements, and evaluate it from an industrial perspective. n\ Perform quality check on this code: ${code}`);
        res.json({ response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


module.exports = { router }