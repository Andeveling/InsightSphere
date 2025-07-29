# InsightSphere HIGH5

A comprehensive team activity platform for exploring and analyzing individual and team strengths using the HIGH5 assessment methodology.

## Overview

InsightSphere HIGH5 is a Next.js application designed to help teams discover their collective strengths through the official HIGH5 strengths methodology. The platform provides interactive assessment tools, team analytics, and insight generation to foster better team collaboration and understanding.

### Key Features

- **Individual Strength Assessments**: Complete HIGH5 evaluations with 20 research-backed strengths
- **Team Analytics Dashboard**: Visualize team composition and strength distributions
- **Interactive Team Building**: Collaborative activities based on strength profiles
- **Secure Authentication**: Protected user sessions and data privacy
- **Responsive Design**: Modern UI built with Tailwind CSS and shadcn/ui components

## Technology Stack

- **Framework**: Next.js 15.4.4 with App Router
- **Authentication**: NextAuth.js v5 (Beta)
- **Database**: SQLite with Prisma ORM 6.12.0
- **UI Components**: shadcn/ui with Tailwind CSS 4
- **Language**: TypeScript with strict mode
- **AI Integration**: Vercel AI SDK (ready for future features)
- **Security**: bcryptjs for password hashing

## HIGH5 Strengths System

The HIGH5 methodology identifies 20 core strengths organized across 4 domains:

### Thinking Domain
- **Deliverer**: Reliable execution and follow-through
- **Disciplined**: Structured approach and routine adherence
- **Strategic**: Long-term planning and vision
- **Analytical**: Data-driven decision making
- **Brainstormer**: Creative ideation and innovation

### Doing Domain
- **Catalyst**: Change initiation and momentum building
- **Commander**: Leadership and direction setting
- **Empathizer**: Understanding and supporting others
- **Charismatic**: Inspiring and motivating presence
- **Problem Solver**: Solution-oriented thinking

### Feeling Domain
- **Optimist**: Positive outlook and energy
- **Coach**: Development and mentoring focus
- **Believer**: Values-driven consistency
- **Peace Keeper**: Harmony and conflict resolution
- **Self-Believer**: Confidence and self-assurance

### Motivating Domain
- **Competitor**: Achievement and winning orientation
- **Philomath**: Continuous learning and growth
- **Focus Expert**: Deep concentration and attention
- **Time Keeper**: Efficiency and time management
- **Winner**: Success-driven mindset

## Project Structure

```
insight-sphere/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes and handlers
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Protected dashboard area
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout with auth provider
│   │   └── page.tsx           # Login page (root)
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui base components
│   │   └── auth/             # Authentication-specific components
│   ├── lib/                  # Utilities and configurations
│   │   ├── auth.ts           # NextAuth.js configuration
│   │   ├── db.ts             # Database connection
│   │   └── utils.ts          # Helper utilities
│   └── types/                # TypeScript type definitions
├── prisma/
│   ├── schema.prisma         # Database schema
│   ├── seed.ts              # Database seeding with HIGH5 data
│   └── dev.db               # SQLite database file
├── public/                   # Static assets
└── .vscode/
    └── tasks.json           # VS Code development tasks
```

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd insight-sphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables in `.env.local`:
   ```
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   DATABASE_URL="file:./dev.db"
   ```

4. **Initialize the database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with HIGH5 data
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset database and reseed

## Development Workflow

### VS Code Tasks

The project includes pre-configured VS Code tasks accessible via `Ctrl+Shift+P` → "Tasks: Run Task":

- **Development Tasks**
  - Start Development Server
  - Build Production
  - Run Tests
  - Lint Code

- **Database Tasks**
  - Generate Prisma Client
  - Push Database Schema
  - Seed Database
  - Reset Database
  - Open Prisma Studio

- **Utility Tasks**
  - Install Dependencies
  - Clean Build
  - Type Check

### Authentication System

The application uses NextAuth.js v5 with a credentials provider:

- **Login Flow**: Email/password authentication with bcrypt hashing
- **Session Management**: Secure session handling with JWT
- **Route Protection**: Middleware-based route protection
- **User Persistence**: Database-stored user profiles

### Database Schema

The Prisma schema includes:

- **User**: Authentication and profile data
- **Strength**: HIGH5 strength definitions (20 strengths)
- **Domain**: HIGH5 domains (4 domains)
- **Assessment**: User strength assessments and results
- **Team**: Team organization and management

## Testing

### Test Users

The database is seeded with 6 test users for development:

- **john.doe@example.com** / password123
- **jane.smith@example.com** / password123
- **mike.johnson@example.com** / password123
- **sarah.williams@example.com** / password123
- **david.brown@example.com** / password123
- **lisa.davis@example.com** / password123

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write descriptive commit messages
- Include tests for new features

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform supporting Node.js:

- Netlify
- Railway
- Digital Ocean App Platform
- AWS, Google Cloud, or Azure

## Roadmap

### Phase 1: Foundation ✅
- Dependencies and project setup
- Database schema and seeding
- Authentication system

### Phase 2: Data Layer ✅
- HIGH5 strengths and domains
- User and assessment models
- Database relationships

### Phase 3: Authentication 🔄
- User registration and login
- Session management
- Route protection

### Phase 4: UI Components (Planned)
- Design system implementation
- Assessment forms and workflows
- Dashboard components

### Phase 5: Testing & Polish (Planned)
- Unit and integration tests
- Performance optimization
- Documentation completion

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions, issues, or contributions, please:

1. Check the existing GitHub issues
2. Create a new issue with detailed information
3. Follow the contributing guidelines

## Acknowledgments

- HIGH5 methodology and research
- Next.js and Vercel teams
- shadcn/ui component library
- Open source community contributors
