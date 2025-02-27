import OpenAI from 'openai'
import { gptCritiquePrompt } from './consants'
import { LLMPayload } from './generateLLMPayload'

export async function getChatGPTCritique(payload: LLMPayload) {
    try {
        const openai = new OpenAI()
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: gptCritiquePrompt,
                },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: `
                            Critique this web page based on the screenshot. Focus on both technical design aspects and user experience.
                            `,
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: payload.screenshot.base64,
                            },
                        },
                    ],
                },
            ],
        })

        try {
            if (response.choices[0].message.content)
                return JSON.parse(response.choices[0].message.content)
            else console.log('issue with LLM response')
        } catch (e) {
            console.error('Failed to parse JSON:', e)
            return { error: 'Invalid JSON format from AI' }
        }
    } catch (error) {
        console.error('ChatGPT analysis failed:', error)
        return { error: 'Analysis failed' }
    }
}
