import { getContrastRatio } from '@mui/material'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. Human: Hello, who are you? AI: I am an AI assistant here to help you. Human: What can you do for me? AI: I can help you with anything you need. Human: Can you help me write a story? AI: Of course! I would be happy to help you write a story. Human: Great! Let's write a story together. AI: Sounds good! What is the story about? Human: You tell me. AI: Okay, how about a story about a robot who learns to love? Human: That sounds interesting. Let's start writing the story."

export async function POST(req) 
{
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [
        {
            role: 'system',
            content: systemPrompt,
        },
        ...data,
        ],
        model: 'gpt-4.0-mini',
        stream: true,
        });

        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder()
                try{
                    for await (const chunk of completion) {
                        const content = chunk.choices[0]?.delta?.content
                        if (content){
                            const text = encoder.encode(content)
                            controller.enqueue(text)
                        }
                    }
                }
                catch (error) {
                    controller.error(err)
                }
                finally {
                    controller.close()
                }
            }
        })  
        return new NextResponse(stream)  
}