# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

#### Profile Management System - Phase 1 & 2 (2025-07-30)

**Phase 1: Profile Page Structure & Routing**
- Created main profile page at `/dashboard/profile` with authentication protection
- Created profile editing page at `/dashboard/profile/edit` 
- Implemented profile layout component with navigation breadcrumbs
- Added profile menu item to sidebar with conditional display for authenticated users
- Updated middleware with intelligent redirection logic for incomplete profiles

**Phase 2: Data Fetching & Validation Schemas**
- Created comprehensive Zod validation schemas in `/src/lib/validations/profile.ts`
  - Profile form validation with Spanish error messages
  - Strength selection validation (exactly 5 required)
  - Type-safe form data handling with automatic transformations
  - Profile completeness checker utility function
- Implemented profile server actions in `/src/actions/profile.ts`
  - `getUserProfile()` - Complete profile with relationships
  - `getUserBasicProfile()` - Lightweight profile version
  - `updateUserProfile()` - Full profile update with database transactions
  - `updateProfileField()` - Individual field updates
  - `updateUserStrengths()` - Strength-only updates
  - `checkProfileComplete()` - Profile completion verification
- Implemented strengths server actions in `/src/actions/strengths.ts`
  - `getStrengthsByDomain()` - Strengths organized by domain
  - `getAllStrengths()` - Flat array of all strengths
  - `getStrengthsByDomainId()` - Domain-specific strengths
  - Helper functions for individual strengths and domains
- Enhanced middleware with real-time profile completion calculation
  - Automatic redirection to profile completion for incomplete profiles
  - Smart redirection to dashboard for users with complete profiles
  - Robust error handling and graceful fallbacks

### Changed
- Updated project structure to organize profile routes under `/dashboard` for layout reuse
- Enhanced middleware logic to use profile completion validation instead of simple database flags
- Improved authentication flow with better user experience for profile completion

### Technical Details
- Uses Next.js 15 App Router with server actions
- Implements Prisma database transactions for data consistency
- Follows TypeScript strict mode with comprehensive type safety
- Integrates with NextAuth.js v5 authentication system
- Uses shadcn/ui components for consistent design
- Implements automatic cache revalidation with `revalidatePath()`

### Files Added
- `/src/app/dashboard/profile/page.tsx` - Main profile page
- `/src/app/dashboard/profile/edit/page.tsx` - Profile editing page  
- `/src/app/dashboard/profile/layout.tsx` - Profile section layout
- `/src/lib/validations/profile.ts` - Zod validation schemas
- `/src/actions/profile.ts` - Profile management server actions
- `/src/actions/strengths.ts` - Strengths data server actions

### Files Modified
- `/src/components/app-sidebar.tsx` - Added profile menu item
- `/middleware.ts` - Enhanced with profile completion logic

## [0.3.0] - 2025-07-30

### Added
- **Strength Ranking System**: Complete TOP 5 strength selection with priority ranking (1-5)
  - New `position` field in `UserStrength` model for ranking strengths
  - `StrengthRankingSelector` component with visual ranking interface
  - Trophy, medal, and award icons for position indicators
  - Interactive strength selection with real-time ranking updates

- **Enhanced Profile Management**: Improved user profile system with better UX
  - Separate view and edit modes for profiles (`/dashboard/profile/view` and `/dashboard/profile/edit`)
  - `StrengthsDisplay` component for beautiful strength visualization
  - Professional profile layout with personal information cards
  - Profile completion status tracking and notifications

- **Improved Layout System**: Consistent spacing and design across dashboard
  - `PageContainer` component for responsive layouts with configurable max-widths
  - `PageHeader` component with breadcrumbs support and action buttons
  - `Breadcrumbs` component with home navigation and proper hierarchy
  - Enhanced dashboard layout with sticky header and backdrop blur effect

- **Database Migration**: Schema updates for strength ranking
  - Added `position` field to `UserStrength` model (nullable for backward compatibility)
  - Unique constraints for user-position combinations (prevents duplicate rankings)
  - Database migration applied successfully with existing data preservation

### Enhanced
- **Form Validation**: Advanced Zod schemas supporting both old and new strength formats
- **Server Actions**: Updated to handle strength rankings with proper validation and error handling
- **Type Safety**: Comprehensive TypeScript interfaces for all new components and data structures
- **UI Components**: Enhanced cards, badges, and interactive elements with domain-specific colors
- **Navigation**: Updated sidebar links and breadcrumb navigation for better UX

### Technical
- Database migration `add-position-ranking-to-user-strengths` applied successfully
- React 19 useActionState pattern implementation for form handling
- Comprehensive error handling and validation throughout the application
- Responsive design improvements with mobile-first approach
- Performance optimizations and component architecture improvements

## [Unreleased]

### Added
- **Bilingual Strength Names:** Added `nameEs` (Spanish name) field to the `Strength` model in the database schema for official HIGH5 strengths.
- **Seed Update:** Updated `prisma/seed.ts` to populate Spanish names for all strengths.
- **UI Localization:** All profile and strengths-related UI components now display both English and Spanish names for each strength (e.g., `Analyst / Analista`).
- **TypeScript Types:** Updated types and props to support the new `nameEs` field throughout the app.
- **Database Migration:** Applied migration to add the new field and re-seeded the database with bilingual data.

### Changed
- **Component Updates:** Modified all relevant components to show both names, ensuring Spanish-speaking teams can easily identify strengths.
- **Type Safety:** Fixed type errors and ensured all strength data includes the new `nameEs` field where needed.

### Technical Details
- Prisma migration: `add_name_es_to_strength_optional` applied successfully.
- All seed and UI changes validated with type checks and tests.
- No breaking changes for existing data; `nameEs` is optional for backward compatibility.