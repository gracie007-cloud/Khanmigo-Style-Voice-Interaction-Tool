# VoiceLearn - AI-Powered Voice Learning Assistant

A Khanmigo-style voice interaction tool with real-time speech-to-text transcription, high accuracy, and full accessibility support. Built with Next.js 15, React 19, and the Web Speech API.

## 🎯 Overview

VoiceLearn is an intelligent voice-based learning assistant that provides real-time speech recognition with instant transcription. Designed with accessibility in mind, it offers a seamless experience for voice-based interactions in educational contexts.

## ✨ Key Features

### Voice Recognition
- **Real-time Speech-to-Text**: Instant transcription with low latency streaming
- **High Accuracy**: Leverages the Web Speech API for precise recognition
- **Push-to-Talk Interface**: Hold Space bar or click the microphone button to speak
- **Continuous Listening**: Support for extended voice interactions

### User Experience
- **Voice Visualizer**: Visual feedback during voice capture
- **Session Management**: Organize transcripts into manageable sessions
- **Transcript History**: View and manage all your voice transcriptions
- **Confidence Scores**: See accuracy metrics for each transcription

### Accessibility
- **WCAG 2.1 Compliant**: Full accessibility support
- **Keyboard Navigation**: Complete keyboard control (Space bar for push-to-talk)
- **Screen Reader Support**: ARIA labels and live regions
- **Theme Support**: Light and dark mode with system preference detection
- **High Contrast**: Optimized for visibility

### Technical Features
- **GraphQL API**: Modern API with queries, mutations, and subscriptions
- **Session Persistence**: In-memory session management (extensible to database)
- **Real-time Updates**: Live transcript updates and status changes
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Graceful degradation and user-friendly error messages

## 🛠 Technology Stack

### Frontend
- **Next.js 15.2.4**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

### APIs & Services
- **Web Speech API**: Browser-native speech recognition
- **GraphQL**: Type-safe API layer
- **Vercel Analytics**: Performance monitoring

### UI Components
- **Custom Components**: 
  - Voice Visualizer
  - Transcript Display
  - Session Controls
  - Keyboard Shortcuts Dialog
  - Theme Toggle
  - Accessibility Announcer

## 📋 Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm
- Modern browser with Web Speech API support:
  - Chrome 25+
  - Edge 79+
  - Safari 14.1+
  - Opera 27+

> **Note**: Firefox does not currently support the Web Speech API.

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/johaankjis/Khanmigo-Style-Voice-Interaction-Tool.git
cd Khanmigo-Style-Voice-Interaction-Tool
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Run the development server**
```bash
pnpm dev
# or
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Basic Voice Interaction

1. **Start Recording**
   - Press and hold the Space bar, or
   - Click and hold the microphone button

2. **Speak Clearly**
   - The voice visualizer will show activity
   - Your speech is transcribed in real-time

3. **Stop Recording**
   - Release the Space bar or button
   - The final transcript appears with confidence score

4. **Manage Sessions**
   - View current session ID in the header
   - Clear transcripts with the session controls
   - Transcripts are saved automatically

### Keyboard Shortcuts

- **Space**: Press and hold to record
- **Esc**: Stop recording (if active)
- **?**: View keyboard shortcuts dialog

### Accessibility Features

- Full keyboard navigation support
- Screen reader announcements for state changes
- High contrast mode support
- Adjustable text sizes
- Focus indicators
- Skip to main content link

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── graphql/
│   │       └── route.ts          # GraphQL API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Home page
│
├── components/
│   ├── ui/                       # Reusable UI components
│   ├── accessibility-announcer.tsx
│   ├── keyboard-shortcuts-dialog.tsx
│   ├── session-controls.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   ├── transcript-display.tsx
│   ├── voice-interaction-interface.tsx  # Main interface
│   └── voice-visualizer.tsx
│
├── hooks/
│   ├── use-mobile.ts             # Mobile detection hook
│   ├── use-session-manager.ts    # Session management
│   ├── use-speech-recognition.ts # Speech API wrapper
│   └── use-toast.ts              # Toast notifications
│
├── lib/
│   └── graphql-client.ts         # GraphQL client utilities
│
├── public/                       # Static assets
├── styles/                       # Additional styles
│
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## 🔌 API Documentation

### GraphQL Schema

#### Types

```graphql
type Session {
  id: ID!
  createdAt: String!
  transcripts: [Transcript!]!
}

type Transcript {
  id: ID!
  text: String!
  confidence: Float!
  timestamp: String!
  isFinal: Boolean!
}
```

#### Queries

```graphql
# Get a specific session
session(id: ID!): Session

# Get all sessions
sessions: [Session!]!
```

#### Mutations

```graphql
# Create a new session
createSession: Session!

# Add transcript to session
addTranscript(
  sessionId: ID!
  text: String!
  confidence: Float!
): Transcript!

# Delete a session
deleteSession(id: ID!): Boolean!
```

#### Subscriptions

```graphql
# Subscribe to new transcripts
transcriptAdded(sessionId: ID!): Transcript!
```

### REST Endpoint

**POST** `/api/graphql`
```json
{
  "query": "mutation { createSession { id createdAt } }",
  "variables": {}
}
```

**GET** `/api/graphql`
Returns API documentation and schema.

## 🎨 Theming

The application supports light and dark themes with automatic system preference detection.

### Theme Toggle
- Click the theme toggle button in the header
- System preference is detected automatically
- Preference is saved to localStorage

### Custom Theme
Modify `app/globals.css` to customize colors and styling.

## ♿ Accessibility

VoiceLearn is built with accessibility as a priority:

- **WCAG 2.1 Level AA Compliance**
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Live Regions**: Screen reader announcements for dynamic content
- **Focus Management**: Logical focus order and visible indicators
- **Keyboard Support**: Full functionality without a mouse
- **Color Contrast**: Meets WCAG contrast requirements
- **Reduced Motion**: Respects prefers-reduced-motion

## 🏗 Development

### Available Scripts

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Development Guidelines

1. **Code Style**
   - Use TypeScript for type safety
   - Follow the existing component structure
   - Use functional components with hooks
   - Keep components focused and reusable

2. **Accessibility**
   - Add ARIA labels to all interactive elements
   - Test with keyboard navigation
   - Verify screen reader compatibility
   - Ensure proper color contrast

3. **Testing**
   - Test speech recognition in supported browsers
   - Verify keyboard shortcuts work correctly
   - Check responsive design on various screen sizes
   - Test with screen readers

4. **Performance**
   - Optimize component re-renders
   - Use React.memo for expensive components
   - Minimize bundle size
   - Implement code splitting where appropriate

## 🔒 Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 25+ | ✅ Full |
| Edge | 79+ | ✅ Full |
| Safari | 14.1+ | ✅ Full |
| Opera | 27+ | ✅ Full |
| Firefox | Any | ❌ Not supported* |

*Firefox does not implement the Web Speech API

## 🚧 Known Limitations

- Speech recognition requires an active internet connection
- Recognition accuracy depends on microphone quality and ambient noise
- Some browsers may require HTTPS for microphone access
- Session data is stored in memory (not persisted on server restart)

## 🗺 Roadmap

- [ ] Add database persistence for sessions
- [ ] Implement user authentication
- [ ] Support multiple languages
- [ ] Add custom vocabulary and training
- [ ] Export transcripts (PDF, TXT, DOCX)
- [ ] Real-time collaboration features
- [ ] Advanced analytics and insights
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by Khan Academy's Khanmigo AI assistant
- Built with [v0.dev](https://v0.dev) - AI-powered UI generation
- Icons by [Lucide](https://lucide.dev)
- UI components from [Radix UI](https://www.radix-ui.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the [Web Speech API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

**Built with ❤️ by the VoiceLearn Team**
