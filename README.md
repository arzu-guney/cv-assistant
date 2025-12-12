# CV / Portfolio Chatbot Widget

A reusable, embeddable chatbot widget for personal CV/portfolio websites. Built with **Vite**, **React**, **TypeScript**, and **Tailwind CSS**.

## Features

- 🎯 **Floating Chat Widget** - Bottom-right corner button that opens a chat panel
- 💬 **AI-Powered Conversations** - Answers questions about your CV using Google Gemini 2.0 Flash (via OpenAI-compatible API)
- 🎭 **Demo Mode** - Works out of the box without any API key using local fallback responses
- ⚡ **Quick Actions** - Predefined topic buttons for common questions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Clean UI** - Modern, minimal design with Tailwind CSS
- 🔧 **Fully Configurable** - Easy to customize CV data, tone, and behavior

## Project Structure

```
cv-assistant/
├── src/
│   ├── components/
│   │   └── CvChatbot/
│   │       ├── CvChatbot.tsx     # Main chatbot component
│   │       ├── ChatWindow.tsx     # Chat panel wrapper
│   │       ├── MessageList.tsx   # Message bubbles
│   │       ├── MessageInput.tsx  # Input + send button
│   │       ├── QuickActions.tsx  # Quick action buttons
│   │       └── index.ts          # Exports
│   ├── config/
│   │   ├── cvData.ts             # CV data configuration
│   │   ├── systemPrompt.ts       # System prompt generator
│   │   └── quickActions.ts       # Quick action buttons config
│   ├── lib/
│   │   └── openai.ts             # Gemini API helper function (OpenAI-compatible)
│   ├── types/
│   │   ├── chat.ts               # Chat message types
│   │   └── cv.ts                 # CV data types
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── .env                          # Environment variables (create this)
├── .env.example                  # Example environment variables
├── index.html                    # HTML entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- **Node.js 18** or higher
- npm or yarn

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables (Optional)

The app works **out of the box in demo mode** without any configuration! You can skip this step if you just want to try it.

**Demo Mode (Default - No API Key Required):**
- The chatbot works immediately without any `.env` file
- Uses local fallback responder based on CV data
- No network calls, no API keys needed
- Perfect for testing and demos

**AI Mode (Optional - Requires API Key):**
If you want to use real AI responses from Google Gemini:

1. Create a `.env` file in the root directory (you can copy from `.env.example`)
2. Add the following:

```env
VITE_USE_LLM=true
VITE_GOOGLE_API_KEY=your-gemini-api-key-here
VITE_LLM_MODEL=gemini-2.0-flash
```

**Note:** 
- `VITE_USE_LLM` must be set to `"true"` (as a string) to enable AI mode
- `VITE_LLM_MODEL` is optional and defaults to `gemini-2.0-flash` if not provided
- If `VITE_USE_LLM` is not set or `"false"`, the app runs in demo mode regardless of API key

### 3. Run the Development Server

```bash
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000) (or another port if 3000 is busy).

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory. You can preview it with:

```bash
npm run preview
```

## Configuration

### Customizing CV Data

Edit `src/config/cvData.ts` to replace the example data with your own:

- **Personal Info**: `name`, `title`, `summary`
- **Experience**: Add your work history in `experiences[]`
- **Projects**: List your projects in `projects[]`
- **Skills**: Organize your technical skills in `skills`
- **Current Work**: What you're working on, learning, goals
- **Links**: Contact information and social links

### Adding Your Portrait Photo

To use your own photo in the hero section:

1. Place a file called `image.png` in the `public/` folder
2. The hero avatar will automatically use `/image.png`
3. Recommended size: Square image (e.g., 400x400px or larger) for best quality
4. The image will be displayed as a circular avatar with a blue border

Example:

```typescript
export const cvData: CvData = {
  name: 'Your Name',
  title: 'Your Title',
  summary: 'Your professional summary...',
  experiences: [
    {
      company: 'Company Name',
      position: 'Your Position',
      period: '2020 - Present',
      description: ['Achievement 1', 'Achievement 2'],
      technologies: ['React', 'TypeScript'],
    },
  ],
  // ... rest of your data
}
```

### Adjusting the System Prompt

Edit `src/config/systemPrompt.ts` to change the assistant's tone, behavior, or instructions. The function `createSystemPrompt(cvData)` generates the system message for the LLM.

You can modify:
- The tone (friendly, professional, casual, etc.)
- Response style (concise, detailed, etc.)
- Rules and constraints
- How the CV data is formatted in the prompt

### Customizing Quick Actions

Edit `src/config/quickActions.ts` to modify the quick action buttons:

```typescript
export const quickActions: QuickAction[] = [
  { label: 'Who is Arzu?', topic: 'profile' },
  { label: 'Experience', topic: 'experience' },
  { label: 'Projects', topic: 'projects' },
  // Add more actions...
]
```

The `topic` values are used to provide context-specific instructions to the LLM when a quick action is clicked.

### Changing UI Text

In `src/App.tsx`, customize the `CvChatbot` props:

```typescript
<CvChatbot
  cvData={cvData}
  quickActions={quickActions}
  title="CV Assistant"           // Change the chat window title
  placeholder="Ask me anything..." // Change input placeholder
  buttonLabel="CV Assistant"      // Change floating button label
/>
```

## How It Works

1. **Component Architecture**: The `CvChatbot` component manages the chat state and UI. It's completely decoupled from the LLM implementation.

2. **Response Generation**: The component calls `sendChatMessage()` from `src/lib/openai.ts`, which:
   - **Demo Mode** (default): Uses local fallback responder based on CV data (no API calls, no key required)
   - **AI Mode** (when `VITE_USE_LLM=true` and API key is set):
     - Builds a system prompt using your CV data
     - Formats the conversation history
     - Calls Google Gemini's OpenAI-compatible Chat Completions API
     - Returns the assistant's response

3. **Message Flow**:
   - User types a message or clicks a quick action
   - Message is added to local state
   - In demo mode: Local fallback responder generates response from CV data
   - In AI mode: Gemini API is called with conversation history
   - Assistant response is appended to messages

4. **First-Time Greeting**: When the chat opens for the first time, an automatic greeting message is displayed.

## Customization Tips

### Styling

All components use Tailwind CSS. You can customize colors, spacing, and layout by modifying the className props in:
- `src/components/CvChatbot/CvChatbot.tsx` (floating button)
- `src/components/CvChatbot/ChatWindow.tsx` (chat panel)
- `src/components/CvChatbot/MessageList.tsx` (message bubbles)
- `src/components/CvChatbot/MessageInput.tsx` (input area)

### Using a Different LLM Provider

To use a different LLM provider (e.g., OpenAI, Anthropic, local model), modify `src/lib/openai.ts`:

1. Replace the Gemini API endpoint with your provider's API
2. Adjust the request/response format as needed
3. Update environment variables accordingly

### Embedding in Other Projects

The chatbot widget is designed to be portable:

1. Copy the `src/components/CvChatbot/` directory
2. Copy the `src/types/` directory
3. Copy `src/lib/openai.ts` (or your custom LLM integration)
4. Copy `src/config/` directory and customize the files
5. Ensure your environment variables are set
6. Import and use: `<CvChatbot cvData={...} quickActions={...} />`

## Tech Stack

- **Vite 6** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **lucide-react** - Icon library
- **Google Gemini 2.0 Flash** - LLM integration via OpenAI-compatible API (configurable)

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_USE_LLM` | Enable AI mode (set to `"true"` to use Gemini API) | No | `"false"` (demo mode) |
| `VITE_GOOGLE_API_KEY` | Your Google Gemini API key | Only if `VITE_USE_LLM=true` | - |
| `VITE_LLM_MODEL` | Gemini model to use | No | `gemini-2.0-flash` |

**Important:** Since this uses Vite, all environment variables must be prefixed with `VITE_` to be accessible in the browser.

### Demo Mode vs AI Mode

**Demo Mode (Default):**
- No environment variables needed
- Works immediately after `npm install` and `npm run dev`
- Uses local fallback responder based on CV data
- No network calls, no API keys, no errors
- Perfect for testing, demos, and templates
- Shows "Demo Mode" badge in the chat header

**AI Mode (Optional):**
- Set `VITE_USE_LLM=true` in `.env`
- Set `VITE_GOOGLE_API_KEY` with your Gemini API key
- Makes real API calls to Google Gemini
- Falls back to demo mode if key is missing or invalid
- Shows "AI Mode" badge in the chat header

**Note on Model Selection:**
- `gemini-2.0-flash` may not be available on all plans (especially free tier)
- If you encounter quota/rate limit errors, try these alternatives:
  - `gemini-1.5-flash` (faster, widely available on free tier)
  - `gemini-1.5-pro` (more capable, available on free tier)
  - `gemini-pro` (older but widely available)
- Check model availability: https://ai.google.dev/gemini-api/docs/models
- Monitor your usage: https://ai.dev/usage?tab=rate-limit

## License

This project is designed to be turned into a commercial template. Customize and use as needed.

## Support

For issues or questions, please refer to the code comments or adjust the implementation to fit your needs.
