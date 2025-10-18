import { NextRequest, NextResponse } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Test simple OpenAI call
    const model = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY,
    })

    const response = await model.invoke([
      {
        role: 'user',
        content: `Answer this pregnancy question briefly: ${message}`
      }
    ])

    return NextResponse.json({ 
      success: true, 
      response: response.content
    })
  } catch (error) {
    console.error('Simple AI API Error:', error)
    return NextResponse.json({ 
      error: 'Failed to process message',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
