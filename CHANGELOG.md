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