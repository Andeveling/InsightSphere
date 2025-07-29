# PRD: InsightSphere - High 5 Strengths Team Activity

## 1. Product overview

### 1.1 Document title and version

* PRD: InsightSphere - High 5 Strengths Team Activity
* Version: 1.0

### 1.2 Product summary

InsightSphere is a focused team activity application that helps team members identify, share, and analyze their High 5 strengths to improve collaboration and team dynamics. The application provides a simple authentication system, personal strength profiling, and AI-powered recommendations for personal development.

The platform facilitates team building by allowing members to complete their High 5 strength assessments, view their profiles, and discover how their strengths complement their teammates' abilities.

## 2. Goals

### 2.1 Business goals

* Improve team collaboration through strength awareness
* Identify communication strategies based on team dynamics
* Detect potential friction points and complementary strengths
* Provide personalized development recommendations
* Create a data-driven approach to team optimization

### 2.2 User goals

* Easily input their High 5 test results
* Understand their personal strength profile
* Receive personalized book, course, and activity recommendations
* See how their strengths align with team dynamics
* Access insights for better team collaboration

### 2.3 Non-goals

* User registration or self-service account creation
* Complex user management features
* External integrations beyond AI recommendations
* Mobile-first design (desktop focus for simplicity)
* Real-time collaboration features

## 3. User personas

### 3.1 Key user types

* Team members participating in the activity
* Activity facilitator/administrator

### 3.2 Basic persona details

* **Team Member**: Employees participating in the High 5 strengths activity who need to input their results and view recommendations
* **Facilitator**: Person running the team activity who has pre-created user accounts and monitors participation

### 3.3 Role-based access

* **Team Member**: Can log in, edit their profile, view their recommendations, and see basic team insights
* **Facilitator**: Has access to all user data and team analytics (handled through database/seeders)

## 4. Functional requirements

* **Authentication System** (Priority: High)
  * Simple login/logout functionality using Next.js 15
  * No user registration - accounts created via seeder
  * Session management and route protection
  * Automatic redirect to profile completion after login

* **User Profile Management** (Priority: High)
  * Form to select exactly 5 High 5 strengths from predefined list
  * Additional fields for age, career, and hobbies
  * Personal description field for context and game generation
  * Profile completion validation
  * Edit profile functionality

* **High 5 Strengths Data** (Priority: High)
  * Complete catalog of 20 strengths across 4 domains
  * Strength descriptions and domain associations
  * Validation to ensure exactly 5 strengths selected

* **AI Recommendations** (Priority: Medium)
  * Personalized book recommendations based on strengths and preferences
  * Course suggestions aligned with user profile
  * Activity recommendations for personal development
  * Integration with Vercel AI SDK

* **Team Analytics** (Priority: Medium)
  * Team strength distribution analysis
  * Common strengths identification
  * Complementary strengths mapping
  * Collaboration improvement suggestions

* **Gamified Team Building** (Priority: Medium)
  * "Guess Who" game based on team member profiles
  * AI-generated questions about strengths and personal traits
  * Drag and drop interface for ranking/matching team members
  * Real-time multiplayer game sessions
  * Scoring system and results revelation

## 5. User experience

### 5.1 Entry points & first-time user flow

* User accesses login page (only public route)
* After successful authentication, redirected to profile completion
* Intuitive strength selection with domain grouping
* Clear progress indicators for profile completion

### 5.2 Core experience

* **Profile Setup**: Clean, step-by-step form with strength selection and personal details
  * Ensures users can quickly input their High 5 results without confusion

* **Recommendations Dashboard**: Personalized content based on user's strength profile
  * Provides immediate value after profile completion

* **Team Insights**: Visual representation of team dynamics and collaboration opportunities
  * Helps users understand how they fit within the team context

* **Interactive Team Game**: "Guess Who" style game based on strengths and profiles
  * Promotes team bonding through fun, interactive challenges based on personal strengths

### 5.3 Advanced features & edge cases

* Validation for incomplete profiles
* Graceful handling of missing recommendation data
* Clear error messages for authentication issues
* Mobile-responsive design for accessibility

### 5.4 UI/UX highlights

* Minimal, clean interface focused on speed of completion
* Domain-based strength grouping for easier selection
* Visual strength indicators and domain colors
* Clear navigation between profile and recommendations

## 6. Narrative

Team members log into InsightSphere with their pre-created credentials and are immediately guided to complete their High 5 strength profile. The intuitive interface allows them to quickly select their 5 strengths from the organized domains and add personal context including age, career, hobbies, and a brief personal description. Once complete, they receive personalized recommendations for books, courses, and activities that align with their unique strength combination. 

After all team members complete their profiles, they can participate in an engaging "Guess Who" style game where AI generates questions based on individual strengths and personal descriptions. Players use drag-and-drop interfaces to rank teammates by likelihood for each question, creating an interactive team-building experience that deepens understanding of each other's strengths and personalities while having fun together.

## 7. Success metrics

### 7.1 User-centric metrics

* 100% profile completion rate by team members
* Time to complete profile (target: under 5 minutes)
* User satisfaction with recommendation relevance
* Engagement with recommended content
* Game participation rate and completion
* Player satisfaction with game experience

### 7.2 Business metrics

* Team collaboration insights generated
* Successful identification of complementary strengths
* Actionable recommendations delivered per user
* Activity completion within planned timeframe
* Game engagement metrics and team bonding outcomes

### 7.3 Technical metrics

* Authentication success rate
* Profile form completion without errors
* AI recommendation generation speed
* Database query performance
* Drag and drop interface responsiveness
* Game session synchronization performance

## 8. Technical considerations

### 8.1 Integration points

* Vercel AI SDK for recommendation generation and game question generation
* Prisma ORM with SQLite database
* Next.js 15 server actions for form handling
* Authentication middleware for route protection
* shadcn/ui components with Tailwind CSS 4 for rapid UI development
* @dnd-kit/core for drag and drop game functionality

### 8.2 Data storage & privacy

* Local SQLite database for simplicity
* Minimal personal data collection (name, email, age, career, hobbies)
* No external data sharing beyond AI API calls
* Temporary storage suitable for activity duration

### 8.3 Scalability & performance

* SQLite sufficient for small team sizes (up to 50-100 users)
* Server-side rendering for fast page loads
* Simple caching for strength/domain data
* Optimized for development speed over scale

### 8.4 Potential challenges

* AI recommendation quality and relevance
* User adoption and profile completion
* Data seeding and user management complexity
* Balancing simplicity with useful insights

## 9. Milestones & sequencing

### 9.1 Project estimate

* Medium: 2-3 weeks for complete implementation including game functionality

### 9.2 Team size & composition

* 1 Developer: Full-stack development with Next.js, Prisma, and AI integration

### 9.3 Suggested phases

* **Phase 1**: Core setup and authentication (2-3 days)
  * Next.js 15 project setup, authentication system, database schema
  * shadcn/ui setup with Tailwind CSS 4

* **Phase 2**: Profile management and strength data (2-3 days)
  * Strength/domain seeders, profile forms, validation
  * Personal description field and enhanced user profiles

* **Phase 3**: AI recommendations and team insights (2-3 days)
  * Vercel AI integration, recommendation algorithms, basic team analytics

* **Phase 4**: Gamified team building (3-4 days)
  * "Guess Who" game implementation with @dnd-kit
  * AI question generation and game logic
  * Real-time game sessions and scoring

* **Phase 5**: Polish and testing (1-2 days)
  * UI improvements, error handling, final testing

### 10. High 5 Strengths Reference Data 
```json
{
  "domains": [
    {
      "name": "Doing",
      "description": "Este dominio agrupa las fortalezas relacionadas con la acción, la ejecución y la forma en que las personas hacen las cosas y logran que se realicen."
    },
    {
      "name": "Feeling",
      "description": "Este dominio se centra en las fortalezas interpersonales, la conciencia emocional y la forma en que las personas se conectan y relacionan con los demás."
    },
    {
      "name": "Motivating",
      "description": "Este dominio incluye las fortalezas que ayudan a las personas a inspirar y persuadir a otros, a tomar la iniciativa y a impulsar a los equipos hacia adelante."
    },
    {
      "name": "Thinking",
      "description": "Este dominio abarca las fortalezas relacionadas con la cognición, la creatividad, la resolución de problemas y la forma en que las personas procesan la información."
    }
  ],
  "strengths": [
    {
      "name": "Analyst",
      "domain": "Thinking",
      "description": "Las personas con esta fortaleza se sienten energizadas al buscar la simplicidad y la claridad a través de una gran cantidad de datos. Se frustran cuando se les pide que sigan su corazón en lugar de la lógica y los hechos probados."
    },
    {
      "name": "Believer",
      "domain": "Feeling",
      "description": "Las acciones de estas personas están impulsadas por valores fundamentales y superiores que no pueden comprometerse a expensas del éxito. Se sienten agotados si sus creencias y valores son cuestionados o no están alineados con lo que tienen que hacer."
    },
    {
      "name": "Brainstormer",
      "domain": "Thinking",
      "description": "Estas personas se emocionan cuando se les pide que presenten nuevas ideas sin límites y que conecten cosas aparentemente inconexas. Se aburren rápidamente con las prácticas estándar o las personas de mente cerrada."
    },
    {
      "name": "Catalyst",
      "domain": "Motivating",
      "description": "Disfrutan de poner las cosas en marcha y de crear un impulso en un entorno estancado. No soportan esperar y perder el tiempo cuando podrían estar haciendo que las cosas despeguen."
    },
    {
      "name": "Chameleon",
      "domain": "Feeling",
      "description": "Obtienen entusiasmo de los entornos en constante cambio, las sorpresas, los desvíos inesperados y el trabajo 'sobre la marcha'. La previsibilidad y la rutina les aburren hasta las lágrimas."
    },
    {
      "name": "Coach",
      "domain": "Feeling",
      "description": "Disfrutan descubriendo el potencial de otras personas y apoyando su crecimiento personal. Les resulta difícil aceptar que este potencial se desperdicie."
    },
    {
      "name": "Commander",
      "domain": "Motivating",
      "description": "Les encanta estar a cargo, hablar y que se les pida una opinión directa. No evitan los conflictos y no pueden entender la mentalidad de 'andarse con rodeos'."
    },
    {
      "name": "Deliverer",
      "domain": "Doing",
      "description": "Cumplen con sus compromisos y disfrutan viendo cómo esto genera más confianza y respeto entre los demás. Se sienten fatal si las promesas se rompen, tanto al recibirlas como al darlas."
    },
    {
      "name": "Empathizer",
      "domain": "Feeling",
      "description": "Son excelentes para darse cuenta de cómo se sienten los demás y utilizar esta comprensión para hacer algo bueno. Se frustran cuando se les pide que ignoren los sentimientos y las emociones y que sigan una lógica estricta."
    },
    {
      "name": "Focus Expert",
      "domain": "Doing",
      "description": "Las personas con esta fortaleza son expertas en establecer y mantener la concentración en una dirección u objetivo específico, evitando distracciones para lograr resultados."
    },
    {
      "name": "Optimist",
      "domain": "Feeling",
      "description": "Su misión es aportar un espíritu positivo. Creen que el vaso está medio lleno en lugar de medio vacío. Siempre encuentran la manera de hacer las cosas más emocionantes, ya sea un proyecto de trabajo o una situación cotidiana."
    },
    {
      "name": "Peace Keeper",
      "domain": "Feeling",
      "description": "Buscan la armonía y la resolución pacífica de conflictos. Se esfuerzan por encontrar un terreno común y unir a las personas, creando un ambiente de colaboración y entendimiento."
    },
    {
      "name": "Philomath",
      "domain": "Thinking",
      "description": "Les encanta aprender, adquirir conocimientos y buscar la verdad. Sienten una profunda curiosidad y un deseo de entender el mundo que les rodea."
    },
    {
      "name": "Problem Solver",
      "domain": "Doing",
      "description": "Les encanta encontrar errores, descubrir fallas, diagnosticar problemas y encontrar soluciones. Les resulta difícil barrer los problemas debajo de la alfombra y seguir adelante ignorando los problemas sin resolver."
    },
    {
      "name": "Self-believer",
      "domain": "Motivating",
      "description": "Son personas independientes y autosuficientes, que inspiran a otros con su certeza y confianza. No soportan que otros les digan qué hacer o controlen sus acciones."
    },
    {
      "name": "Storyteller",
      "domain": "Motivating",
      "description": "Son maestros de la comunicación. Les gusta ser anfitriones, hablar en público y ser escuchados. Utilizan las historias para conectar, inspirar e influir en los demás."
    },
    {
      "name": "Strategist",
      "domain": "Thinking",
      "description": "Son capaces de ver el panorama general y de identificar patrones donde otros ven complejidad. Disfrutan creando planes y estrategias para navegar hacia un futuro deseado."
    },
    {
      "name": "Thinker",
      "domain": "Thinking",
      "description": "Su objetivo es pensar. A algunos les emociona ejercitar sus bíceps y tríceps, pero ellos prefieren estirar sus 'músculos cerebrales' a través del pensamiento profundo. Disfrutan de la actividad mental y de las conversaciones significativas."
    },
    {
      "name": "Time Keeper",
      "domain": "Doing",
      "description": "Son eficientes y puntuales, y se aseguran de que las cosas se hagan a tiempo. Valoran la puntualidad y la gestión eficaz del tiempo para cumplir con los plazos y los objetivos."
    },
    {
      "name": "Winner",
      "domain": "Motivating",
      "description": "Su objetivo es competir con otros para ganar. En su mente, solo los perdedores creen que participar es más importante que ganar. Las competiciones se crean para seleccionar a un único ganador porque, al final, los resultados son una comparación medida con los demás."
    }
  ]
}
``` 
el user debe seleccionar las 5 fortalezas que salieron como resultado del test, despues de esto tendremos un perfil, este perfil se guardara en una base de datos de sqlite con prisma para simplificar, es importante tener en cuenta la edad del usuario, su carrera y hobbies,  usaremos IA para en base a este perfil de fortalezas recomendar libros, cursos y actividades que se alineen con sus fortalezas y preferencias.
El formulario debe ser sencillo la idea es que sea un edit de perfil donde lo unico que habra sera en el seeder nombre y correo por un seeder, con un selector múltiple para las fortalezas y campos adicionales para la edad, carrera y hobbies.

### Teams
Cada user pertenece a un team la idea de tener un team es que todos los users al tener diligenciado su perfil, podemos ver fortalezas comunes y como planear estrategias para comunicarnos mejor, detectar puntos de fricción y mejorar la colaboración, asi como tambien ver fortalezas complementarias y como podemos aprovecharlas para mejorar el rendimiento del equipo.

### Requisitos técnicos
- Next.js 15 + server actions para acelerar el desarrollo
- shadcn/ui components con Tailwind CSS 4 para desarrollo de UI rápido
- Autenticación básica (login y logout)
- Seeder para crear usuarios con descripción personal
- Seeder para team y asignación de usuarios
- Seeder para crear fortalezas y dominios
- Formulario de edición de perfil con selección múltiple de fortalezas
- Campo de descripción personal para contexto del juego
- Base de datos SQLite con Prisma
- Recomendaciones de IA basadas en el perfil del usuario con Vercel AI SDK
- Generación de preguntas por IA para el juego "Adivina Quién"
- Interfaz drag and drop con @dnd-kit para ranking de jugadores
- Sistema de puntuación y gestión de sesiones de juego

## 11. User stories

### 11.1. User authentication and onboarding

* **ID**: US-001
* **Description**: As a team member, I want to log into the application with my pre-created credentials so that I can access my personal strength profile.
* **Acceptance criteria**:
  * Login form accepts email and password
  * Successful authentication redirects to profile completion
  * Invalid credentials show clear error message
  * No registration option is available
  * Session persists across browser refresh

### 11.2. Strength profile completion

* **ID**: US-002
* **Description**: As a team member, I want to select my 5 High 5 strengths and add personal information so that I can complete my profile and receive personalized recommendations.
* **Acceptance criteria**:
  * Form displays all 20 strengths organized by 4 domains
  * User must select exactly 5 strengths (no more, no less)
  * Form includes fields for age, career, hobbies, and personal description
  * Personal description provides context for AI question generation
  * Form validation prevents submission with incomplete data
  * Success message confirms profile completion
  * User can edit their profile after initial completion

### 11.3. AI-powered recommendations

* **ID**: US-003
* **Description**: As a team member, I want to receive personalized book, course, and activity recommendations based on my strength profile so that I can focus my personal development efforts.
* **Acceptance criteria**:
  * Recommendations appear after profile completion
  * Suggestions are clearly categorized (books, courses, activities)
  * Recommendations consider both strengths and personal preferences
  * Each recommendation includes title, description, and relevance explanation
  * Recommendations update when profile is modified

### 11.4. Team insights and analytics

* **ID**: US-004
* **Description**: As a team member, I want to see how my strengths relate to my team's overall strength distribution so that I can understand my role in team dynamics.
* **Acceptance criteria**:
  * Dashboard shows team strength distribution by domain
  * Highlights common strengths across team members
  * Identifies complementary strength combinations
  * Provides collaboration suggestions based on strength analysis
  * Shows user's unique contributions to the team

### 11.5. Profile data management

* **ID**: US-005
* **Description**: As a team member, I want to edit my profile information and strength selections so that I can keep my data current and accurate.
* **Acceptance criteria**:
  * Edit profile form pre-populates with current data
  * Changes are saved immediately upon form submission
  * Strength selection maintains the 5-strength limit
  * Recommendations refresh automatically after profile updates
  * Clear confirmation of successful updates

### 11.6. User session management

* **ID**: US-006
* **Description**: As a team member, I want to securely log out of the application so that my data remains protected on shared devices.
* **Acceptance criteria**:
  * Logout button is clearly visible in navigation
  * Clicking logout immediately terminates the session
  * User is redirected to login page after logout
  * Protected routes are inaccessible after logout
  * Session timeout handles inactive users appropriately

### 11.7. Data seeding and initialization

* **ID**: US-007
* **Description**: As a facilitator, I want to initialize the application with user accounts, teams, and strength data so that team members can immediately begin using the application.
* **Acceptance criteria**:
  * Seeder creates all 4 domains and 20 strengths
  * Seeder generates user accounts with name and email
  * Users are assigned to appropriate teams
  * Database is properly initialized with relationships
  * Seeder can be run multiple times safely
  * Test data includes realistic team structures

### 11.8. Error handling and validation

* **ID**: US-008
* **Description**: As a team member, I want clear error messages and validation feedback so that I can successfully complete forms and navigate the application.
* **Acceptance criteria**:
  * Form validation provides real-time feedback
  * Error messages are specific and actionable
  * Network errors are handled gracefully
  * Authentication failures show appropriate messages
  * Page loading states provide user feedback
  * Fallback options for failed AI recommendations

### 11.9. Team guessing game functionality

* **ID**: US-009
* **Description**: As a team member, I want to participate in a "Guess Who" game based on team member profiles so that I can learn more about my colleagues in an engaging way.
* **Acceptance criteria**:
  * Game selects a random team member as the subject
  * AI generates 5 questions based on the subject's strengths and description
  * Each question presents a scenario or trait to evaluate
  * Players use drag-and-drop to rank team members by likelihood
  * All team members participate simultaneously, including the subject
  * Game progresses through all 5 questions before revealing results
  * Scoring system awards points for correct guesses
  * Final reveal shows who the subject was and player rankings

### 11.10. AI question generation for games

* **ID**: US-010
* **Description**: As a facilitator, I want the system to automatically generate relevant questions about team members so that the guessing game provides meaningful insights about strengths and personalities.
* **Acceptance criteria**:
  * AI analyzes user's strengths, career, hobbies, and description
  * Questions are generated that relate to behavioral patterns and preferences
  * Each question provides enough context for informed guessing
  * Questions avoid revealing obvious personal details (name, specific location)
  * Generated content is appropriate and professional
  * Questions focus on strengths-based scenarios and preferences

### 11.11. Interactive drag and drop interface

* **ID**: US-011
* **Description**: As a team member, I want to use an intuitive drag-and-drop interface to rank my teammates so that I can easily participate in the guessing game.
* **Acceptance criteria**:
  * Interface displays all team member names as draggable cards
  * Players can reorder teammates from most to least likely
  * Visual feedback shows current ranking order
  * Submit button confirms ranking for each question
  * Interface is responsive and works on different screen sizes
  * Clear instructions guide players through the ranking process

### 11.12. Game session management

* **ID**: US-012
* **Description**: As a team member, I want to participate in synchronized game sessions so that all team members can play together simultaneously.
* **Acceptance criteria**:
  * Game waits for all team members to submit rankings before proceeding
  * Progress indicator shows how many players have completed each question
  * Real-time updates show when teammates finish their rankings
  * Game automatically advances when all players are ready
  * Session state is maintained if players refresh their browsers
  * Clear notifications indicate game progress and waiting states