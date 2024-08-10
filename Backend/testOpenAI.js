const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: 'your_own_key',
});

async function testOpenAI() {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'Hello, world!' }],
        });
        console.log('OpenAI Response:', response.choices[0].message.content);
    } catch (error) {
        console.error('Error with OpenAI:', error);
    }
}

testOpenAI();
