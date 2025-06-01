# 🚀 Influency - AI-Powered Influencer Marketing Platform

A comprehensive Next.js application that connects brands with creators through intelligent matching, automated negotiations, and streamlined campaign management.

## 🌟 Key Features

### 1. **Dual Registration System**

- **Join as Creator**: Content creators can register with their social media profiles and showcase their work
- **Join as Brand**: Businesses can create accounts to launch marketing campaigns and discover influencers
- Seamless onboarding flow with role-based authentication

### 2. **AI-Powered Influencer Discovery Dashboard**

- **Smart Search**: AI-powered search using natural language prompts to find perfect creator matches
- **Advanced Filtering**: Filter by category, follower count, engagement rate, location, age, and gender
- **Real-time Analytics**: View creator statistics, engagement rates, and audience demographics
- **Match Scoring**: AI calculates compatibility scores between brands and creators

### 3. **Intelligent Invitation System**

- **One-Click Invitations**: Send campaign invitations directly to creators from the dashboard
- **Automated Email Notifications**: Creators receive detailed campaign briefs via email
- **Campaign Details**: Include budget, deliverables, timeline, and brand requirements

### 4. **AI Voice Agent Negotiations**

- **Conversational AI**: Powered by ElevenLabs voice technology for natural negotiations
- **Real-time Updates**: Campaign status updates based on voice conversations
- **Negotiation Tracking**: Monitor offer amounts, counter-offers, and final agreements
- **Agent Summaries**: AI-generated summaries of negotiation conversations

### 5. **Secure Payment Processing**

- **Stripe Integration**: Secure payment processing for campaign transactions
- **Milestone-based Payments**: Release payments based on deliverable completion
- **Payment Protection**: Built-in escrow system for both parties
- **Automated Invoicing**: Generate invoices and payment receipts

### 6. **Campaign Management & Milestone Tracking**

- **Progress Monitoring**: Track deliverable completion in real-time
- **Status Updates**: Monitor campaign phases from invitation to completion
- **Performance Metrics**: Engagement rates, reach, and ROI tracking
- **Comparison Tools**: Side-by-side analysis of multiple creator negotiations

### 7. **Analytics & Reporting**

- **Campaign Analytics**: Detailed performance reports with charts and insights
- **Creator Performance**: Track individual creator success metrics
- **ROI Analysis**: Calculate return on investment for marketing campaigns
- **Export Capabilities**: Download reports in various formats

## 🛠 Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Framework**: Material-UI (MUI) with custom theming
- **Data Visualization**: Recharts for analytics dashboards
- **Voice AI**: ElevenLabs React SDK for voice agent functionality
- **Payments**: Stripe for secure payment processing
- **Data Management**: TanStack Query for API state management
- **Authentication**: Firebase Authentication
- **Styling**: Tailwind CSS with custom animations
- **Data Tables**: AG Grid for advanced table functionality

## 📁 Project Structure

```
influencer-marketer/
├── app/                          # Next.js App Router
│   ├── campaigns/               # Campaign management pages
│   ├── dashboard/               # Brand dashboard
│   ├── login/                   # Authentication pages
│   ├── signup/                  # Registration pages
│   ├── voice-agent/             # AI voice negotiation
│   ├── reports/                 # Analytics and reporting
│   └── influencers-management/  # Creator management
├── components/                   # Reusable UI components
│   ├── campaigns/               # Campaign-specific components
│   ├── home/                    # Creator discovery components
│   ├── payments/                # Payment processing components
│   ├── common/                  # Shared UI components
│   └── creator-register/        # Creator onboarding
├── lib/                         # Utility functions and constants
├── hooks/                       # Custom React hooks
└── context/                     # React context providers
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Stripe account for payments
- ElevenLabs API key for voice agent
- Firebase project for authentication

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd influencer-marketer
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=your_backend_api_url
   NEXT_PUBLIC_VOICE_AGENT_ID=your_elevenlabs_agent_id
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 User Journey

### For Brands:

1. **Sign Up** → Create brand account with company details
2. **Dashboard Access** → Browse AI-curated creator recommendations
3. **Search & Filter** → Use AI prompts or traditional filters to find creators
4. **Send Invitations** → Invite creators with campaign details
5. **Voice Negotiations** → Engage with AI agent for price negotiations
6. **Contract Signing** → Finalize agreements digitally
7. **Payment Processing** → Secure payments through Stripe
8. **Campaign Tracking** → Monitor milestones and deliverables
9. **Analytics Review** → Access detailed performance reports

### For Creators:

1. **Sign Up** → Register with social media profiles and portfolio
2. **Profile Setup** → Complete creator profile with rates and specialties
3. **Receive Invitations** → Get campaign invites via email notifications
4. **Voice Negotiations** → Negotiate terms through AI voice agent
5. **Accept Campaigns** → Digitally sign contracts
6. **Content Creation** → Deliver content according to milestones
7. **Get Paid** → Receive payments upon milestone completion
8. **Performance Tracking** → View campaign success metrics

## 🔧 Key Components

### AI Search & Filtering (`components/home/SearchFilters.tsx`)

- Natural language AI search for creator discovery
- Advanced filtering with real-time updates
- Smart matching algorithm integration

### Voice Agent Integration (`app/voice-agent/page.tsx`)

- ElevenLabs voice AI for natural conversations
- Real-time negotiation status updates
- Conversation summaries and insights

### Campaign Management (`components/campaigns/`)

- Comprehensive campaign tracking
- Milestone-based progress monitoring
- Negotiation comparison tools

### Payment Processing (`components/payments/PaymentForm.jsx`)

- Stripe-powered secure payments
- Milestone-based payment releases
- Automated invoice generation

### Analytics Dashboard (`components/campaigns/NegotiationComparison.tsx`)

- Interactive charts and visualizations
- Performance metrics tracking
- ROI analysis and reporting

## 📊 Features in Detail

### AI-Powered Matching

- Semantic search using natural language
- Creator-brand compatibility scoring
- Audience overlap analysis
- Performance prediction algorithms

### Negotiation Management

- Real-time status tracking
- Offer/counter-offer history
- AI-mediated conversations
- Automated agreement generation

### Payment & Contracts

- Escrow-based payment system
- Digital contract signing
- Milestone-based releases
- Automated tax documentation

### Analytics & Insights

- Campaign performance metrics
- Creator success tracking
- ROI calculation and reporting
- Predictive analytics for future campaigns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

**Built with ❤️ using Next.js, AI, and modern web technologies**
