import { NextRequest, NextResponse } from 'next/server'
import { pregnancyChatAgent } from '@/lib/chatAgent'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Debug environment variable
    console.log('OpenAI API Key exists:', !!process.env.NEXT_PUBLIC_OPENAI_API_KEY)
    console.log('OpenAI API Key length:', process.env.NEXT_PUBLIC_OPENAI_API_KEY?.length || 0)

    const context = {
      pregnancyWeek: 24,
      language: 'English',
      conversationHistory: []
    }

    const result = await pregnancyChatAgent.processMessage(message, context)
    
    return NextResponse.json({ 
      success: true, 
      response: result.response,
      isEmergency: result.isEmergency,
      requiresDoctor: result.requiresDoctor
    })
  } catch (error) {
    console.error('AI API Error:', error)
    return NextResponse.json({ 
      error: 'Failed to process message',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
