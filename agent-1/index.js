import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

const result = await openRouter.chat.send({
    chatRequest: {
        model: "nvidia/nemotron-3.5-lightning:free",
        messages: [
            {
                role: "user",
                content: "Hello, how are you?",
            },
        ],
        stream: true,
    },
});

for await (const chunk of result) {
    const content = chunk.choices[0]?.delta.content;
    if (content) {
        process.stdout.write(content);
    }
}
console.log();
