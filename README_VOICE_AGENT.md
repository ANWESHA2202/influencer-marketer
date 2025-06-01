# Voice Agent Setup Guide

This guide will help you set up and use the Voice Agent feature in your application.

## Prerequisites

1. **Eleven Labs Account**: You need an active Eleven Labs account
2. **Voice Agent ID**: Create a voice agent in the Eleven Labs dashboard and get your agent ID

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in your project root (if it doesn't exist) and add your voice agent ID:

```env
NEXT_PUBLIC_VOICE_AGENT_ID=your_voice_agent_id_here
```

**Important**: Replace `your_voice_agent_id_here` with your actual agent ID from Eleven Labs.

### 2. Getting Your Voice Agent ID

1. Go to [Eleven Labs Dashboard](https://elevenlabs.io/app)
2. Navigate to **Conversational AI** > **Agents**
3. Create a new agent or select an existing one
4. Copy the Agent ID from the agent details

### 3. Dependencies

The following dependencies are already installed:

- `@elevenlabs/react` - Eleven Labs React SDK
- `@mui/material` - Material-UI components
- `@mui/icons-material` - Material-UI icons

## Features

The Voice Agent UI includes:

- **Modern Interface**: Clean, professional design using Material-UI
- **Real-time Status**: Shows connection status and agent speaking state
- **Voice Controls**: Start/stop conversation and mute functionality
- **Error Handling**: Comprehensive error messages and user guidance
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Usage

1. Navigate to `/voice-agent` in your application
2. Click "Start Conversation" to begin
3. Allow microphone permissions when prompted
4. Speak naturally with the voice agent
5. Use the "End Call" button to stop the conversation

## Troubleshooting

### Common Issues

1. **"Voice Agent ID not found" error**

   - Ensure your `.env` file contains `NEXT_PUBLIC_VOICE_AGENT_ID`
   - Restart your development server after adding environment variables

2. **Microphone permission denied**

   - Check browser settings to allow microphone access
   - Try using HTTPS (required for microphone access in production)

3. **Connection issues**
   - Verify your agent ID is correct
   - Check your internet connection
   - Ensure the agent is active in Eleven Labs dashboard

### Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 14.3+)
- **Edge**: Full support

## Customization

You can customize the voice agent by:

1. **Styling**: Modify the Material-UI theme and component styles
2. **Agent Configuration**: Update agent settings in Eleven Labs dashboard
3. **UI Components**: Add or modify the interface components
4. **Error Messages**: Customize error handling and user feedback

## Security Notes

- Agent IDs are public and safe to include in client-side code
- For private agents, you'll need to implement server-side authentication
- Always use HTTPS in production for microphone access

## Support

For issues related to:

- **Eleven Labs SDK**: Check [Eleven Labs Documentation](https://elevenlabs.io/docs)
- **Voice Agent Configuration**: Visit [Eleven Labs Dashboard](https://elevenlabs.io/app)
- **UI Components**: Refer to [Material-UI Documentation](https://mui.com/)

## Next Steps

Consider adding:

- Conversation history display
- Custom voice settings
- Integration with your application's user system
- Analytics and usage tracking
