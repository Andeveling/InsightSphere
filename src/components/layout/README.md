# Layout System Documentation

## Overview

The InsightSphere layout system provides consistent spacing, typography, and responsive design across all dashboard pages. It follows modern design principles and ensures a cohesive user experience.

## Components

### PageContainer

A flexible container component that provides consistent maximum widths, padding, and spacing for page content.

```tsx
import { PageContainer } from "@/components/layout/page-container";

<PageContainer maxWidth="lg" padding="md" spacing="md">
  {children}
</PageContainer>
```

**Props:**
- `maxWidth`: "sm" | "md" | "lg" | "xl" | "2xl" | "full" (default: "lg")
- `padding`: "none" | "sm" | "md" | "lg" (default: "md")
- `spacing`: "none" | "sm" | "md" | "lg" (default: "md")
- `className`: Additional CSS classes

### PageHeader

A standardized header component for page titles, descriptions, and breadcrumbs.

```tsx
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

<PageHeader
  title="Mi Perfil"
  description="Gestiona tu información personal y selecciona tus fortalezas principales."
  breadcrumbs={<Breadcrumbs items={[{ label: "Perfil", current: true }]} />}
>
  <Button>Action Button</Button>
</PageHeader>
```

**Props:**
- `title`: Page title (required)
- `description`: Optional page description
- `breadcrumbs`: Breadcrumb navigation component
- `children`: Action buttons or additional content
- `className`: Additional CSS classes

### Breadcrumbs

A navigation component that shows the current page hierarchy.

```tsx
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

<Breadcrumbs 
  items={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Perfil", current: true }
  ]}
  showHome={true}
/>
```

**Props:**
- `items`: Array of breadcrumb items
- `showHome`: Whether to show the home icon (default: true)
- `className`: Additional CSS classes

**BreadcrumbItem:**
- `label`: Display text
- `href`: Optional link URL
- `current`: Whether this is the current page

## Layout Structure

The dashboard layout follows this hierarchy:

```
DashboardLayout (sticky header with sidebar trigger)
├── PageContainer (consistent spacing and max-width)
    ├── PageHeader (title, description, breadcrumbs)
    └── Page Content (forms, cards, etc.)
```

## Usage Examples

### Standard Page Layout

```tsx
import { PageContainer, PageHeader, Breadcrumbs } from "@/components/layout";

export default function MyPage() {
  const breadcrumbItems = [
    { label: "Section", href: "/dashboard/section" },
    { label: "Current Page", current: true }
  ];

  return (
    <PageContainer maxWidth="xl" padding="md" spacing="md">
      <div className="space-y-8">
        <PageHeader
          title="Page Title"
          description="Page description here"
          breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
        />
        
        {/* Page content */}
        <div>Your content here</div>
      </div>
    </PageContainer>
  );
}
```

### Page with Actions

```tsx
<PageHeader
  title="Team Management"
  description="Manage your team members and settings"
  breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
>
  <div className="flex gap-2">
    <Button variant="outline">Export</Button>
    <Button>Add Member</Button>
  </div>
</PageHeader>
```

## Design Tokens

### Spacing Scale
- `none`: No spacing
- `sm`: 16px (py-4)
- `md`: 24px-32px (py-6 sm:py-8)
- `lg`: 32px-48px (py-8 sm:py-12)

### Max Widths
- `sm`: 672px (max-w-2xl)
- `md`: 768px (max-w-3xl)
- `lg`: 896px (max-w-4xl)
- `xl`: 1152px (max-w-6xl)
- `2xl`: 1280px (max-w-7xl)
- `full`: 100% (max-w-full)

### Padding Scale
- `none`: No padding
- `sm`: 16px-24px (px-4 sm:px-6)
- `md`: 16px-32px (px-4 sm:px-6 lg:px-8)
- `lg`: 24px-48px (px-6 sm:px-8 lg:px-12)

## Accessibility

- All components use semantic HTML elements
- Proper heading hierarchy is maintained
- Focus management for interactive elements
- Screen reader friendly navigation
- High contrast support for text and borders

## Responsive Design

The layout system is mobile-first and responsive:
- Mobile: Single column, compact spacing
- Tablet: Optimized padding and spacing
- Desktop: Full layout with maximum content width

## Migration Guide

To migrate existing pages to the new layout system:

1. Wrap page content in `PageContainer`
2. Replace custom headers with `PageHeader`
3. Add breadcrumb navigation where appropriate
4. Remove custom container classes and spacing
5. Update max-width constraints to use the container system

This ensures consistent spacing, typography, and responsive behavior across the entire application.
