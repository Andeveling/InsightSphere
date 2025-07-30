import React from "react";
import { PageContainer } from "@/components/layout/page-container";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageContainer maxWidth="xl" padding="md" spacing="md">
      {children}
    </PageContainer>
  );
}
