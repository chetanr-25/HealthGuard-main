# AI Educational Chatbot for HealthGuard AI

## Overview

This document describes the AI educational chatbot system integrated into the HealthGuard AI Education page. The chatbot provides pregnancy-related education, nutrition advice, exercise guidance, and general wellness information using LangChain and OpenAI GPT-4.

## Features

### 🤖 AI Chatbot Capabilities
- **RAG (Retrieval Augmented Generation)**: Uses a comprehensive pregnancy knowledge base
- **Week-specific advice**: Provides tailored information based on user's pregnancy week
- **Multi-language support**: Responds in user's preferred language
- **Conversation context**: Maintains conversation history for better responses
- **Streaming responses**: Real-time response generation for better UX

### 🛡️ Safety Features
- **Emergency detection**: Automatically detects emergency keywords and situations
- **Medical disclaimers**: Always includes appropriate medical disclaimers
- **Doctor consultation prompts**: Suggests healthcare provider consultation when needed
- **Safety guardrails**: Multiple layers of safety checks and validations
- **Risk level assessment**: Categorizes responses by risk level (low, medium, high, critical)

### 💬 User Interface
- **Floating Ask AI button**: Bottom-right corner of Education page
- **Chat modal**: Full-featured chat interface with message bubbles
- **Typing indicator**: Shows when AI is processing
- **Suggested questions**: Dynamic question suggestions based on context
- **Feedback system**: Thumbs up/down for response quality
- **Share functionality**: Copy responses to clipboard
- **Clear chat**: Reset conversation history

## Architecture

### Core Components

#### 1. Chat Agent (`lib/chatAgent.ts`)
- **LangChain Integration**: Uses OpenAI GPT-4 with structured output
- **RAG Implementation**: Retrieves relevant knowledge from pregnancy database
- **Safety Integration**: Incorporates safety guardrails and emergency detection
- **Streaming Support**: Real-time response generation

#### 2. Safety Guardrails (`lib/safetyGuardrails.ts`)
- **Emergency Detection**: Identifies critical medical situations
- **Risk Assessment**: Categorizes message risk levels
- **Response Validation**: Ensures AI responses are safe and appropriate
- **Week-specific Checks**: Pregnancy week-based emergency thresholds

#### 3. Chat UI (`components/education/chat-modal.tsx`)
- **Message Display**: User and AI message bubbles
- **Interactive Features**: Feedback, sharing, suggested questions
- **Emergency Alerts**: Prominent emergency warnings
- **Responsive Design**: Works on all screen sizes

#### 4. Chat Hook (`lib/hooks/useChat.ts`)
- **State Management**: Manages chat state and conversation history
- **Streaming Integration**: Handles real-time response updates
- **Error Handling**: Graceful error management
- **User Integration**: Connects with user profile data

#### 5. Feedback System (`lib/feedback.ts`)
- **Response Rating**: Thumbs up/down feedback collection
- **Analytics Integration**: Tracks feedback for improvement
- **Local Storage**: Persists feedback data
- **Export/Import**: Backup and restore feedback data

### Knowledge Base

The pregnancy knowledge base includes:

#### Nutrition Guidelines
- **First Trimester (Weeks 1-12)**: Folic acid, iron-rich foods, nausea management
- **Second Trimester (Weeks 13-26)**: Protein, calcium, DHA, balanced nutrition
- **Third Trimester (Weeks 27-40)**: Weight monitoring, hydration, preparation

#### Common Symptoms
- **Back Pain**: Safe relief methods, when to consult doctor
- **Nausea**: Management strategies, warning signs
- **Fatigue**: Normal patterns, when to investigate
- **Swelling**: Normal vs. concerning swelling

#### Exercise Guidelines
- **Safe Activities**: Walking, swimming, prenatal yoga, light weights
- **Activities to Avoid**: Contact sports, high-risk activities
- **General Guidelines**: Duration, intensity, safety considerations

#### Emergency Signs
- **Immediate**: Severe pain, bleeding, breathing problems
- **Urgent**: Contractions, fluid leakage, high fever
- **Week-specific**: Different thresholds for different pregnancy stages

## Usage

### For Users

1. **Accessing the Chatbot**:
   - Navigate to the Education page
   - Click the floating "Ask AI" button (bottom-right)
   - Chat modal opens with welcome message

2. **Asking Questions**:
   - Type your question in the input field
   - Press Enter or click Send
   - AI responds with streaming text
   - Use suggested questions for quick starts

3. **Emergency Situations**:
   - If emergency keywords are detected, immediate alert appears
   - Follow emergency instructions (call 911, go to ER)
   - Use Emergency page for additional guidance

4. **Feedback**:
   - Rate responses with thumbs up/down
   - Share responses by clicking share button
   - Clear chat history with trash icon

### For Developers

#### Adding New Knowledge
```typescript
// In lib/chatAgent.ts, update PREGNANCY_KNOWLEDGE_BASE
const PREGNANCY_KNOWLEDGE_BASE = {
  "new_category": {
    "subcategory": "Knowledge content here..."
  }
}
```

#### Modifying Safety Rules
```typescript
// In lib/safetyGuardrails.ts, update keyword lists
const EMERGENCY_KEYWORDS = [
  'new emergency keyword',
  // ... existing keywords
]
```

#### Customizing UI
```typescript
// In components/education/chat-modal.tsx
// Modify message styling, layout, or features
```

## Configuration

### Environment Variables
```bash
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### Dependencies
```json
{
  "langchain": "^0.2.11",
  "@langchain/openai": "^0.0.33",
  "@langchain/core": "^0.2.15",
  "zod": "^3.23.8",
  "@radix-ui/react-scroll-area": "^1.0.5"
}
```

## Safety Considerations

### Medical Disclaimers
- All responses include medical disclaimers
- Users are reminded to consult healthcare providers
- Emergency situations trigger immediate alerts

### Data Privacy
- Chat history stored locally (not sent to external services)
- Feedback data anonymized
- No personal health data transmitted

### Content Moderation
- AI responses validated for safety
- Inappropriate content filtered
- Medical advice boundaries enforced

## Monitoring and Analytics

### Feedback Tracking
- Response helpfulness ratings
- User engagement metrics
- Common question patterns

### Error Monitoring
- API failures logged
- Safety violations tracked
- Performance metrics collected

### Continuous Improvement
- Feedback data analyzed for improvements
- Knowledge base updated regularly
- Safety rules refined based on usage

## Troubleshooting

### Common Issues

1. **Chat not loading**:
   - Check OpenAI API key configuration
   - Verify network connectivity
   - Check browser console for errors

2. **Responses not streaming**:
   - Verify LangChain streaming configuration
   - Check OpenAI API limits
   - Review error logs

3. **Safety alerts not triggering**:
   - Verify safety guardrails configuration
   - Check keyword lists
   - Test with emergency keywords

### Debug Mode
```typescript
// Enable debug logging
console.log('Chat debug:', { message, context, response })
```

## Future Enhancements

### Planned Features
- **Voice input/output**: Speech-to-text and text-to-speech
- **Image analysis**: Analyze pregnancy-related images
- **Multi-language support**: Full internationalization
- **Advanced RAG**: Vector database integration
- **Personalization**: User-specific recommendations

### Integration Opportunities
- **Calendar integration**: Appointment reminders
- **Health data sync**: Connect with monitoring devices
- **Provider communication**: Direct doctor messaging
- **Community features**: User-to-user support

## Support

For technical support or questions about the AI chatbot system:
- Check this documentation first
- Review error logs in browser console
- Contact development team for assistance

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: Production Ready
