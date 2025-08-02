"use server";

import { actionClient } from "./safe.actions";
import { prisma } from "@/lib/db";
import { InferSafeActionFnResult } from "next-safe-action"


/**
 * Get all domains with their strengths for profile form
 */
export const getAllDomainsWithStrengths = actionClient.action(async () => {
  const domains = await prisma.domain.findMany({
    include: {
      strengths: {
        include: {
          domain: true // Include domain info for each strength
        },
        orderBy: { name: 'asc' }
      }
    },
    orderBy: { name: 'asc' }
  });

  return domains;
});
export type GetAllDomainsWithStrengthsResult = InferSafeActionFnResult<typeof getAllDomainsWithStrengths>;


/**
 * Get all strengths organized by domain
 */
export async function getStrengthsByDomain() {
  try {
    const domains = await prisma.domain.findMany({
      include: {
        strengths: {
          orderBy: {
            name: 'asc'
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    return domains.map(domain => ({
      id: domain.id,
      name: domain.name,
      description: domain.description,
      strengths: domain.strengths.map(strength => ({
        id: strength.id,
        name: strength.name,
        description: strength.description,
        domainId: strength.domainId
      }))
    }));
  } catch (error) {
    console.error("Error fetching strengths by domain:", error);
    throw new Error("Error al obtener las fortalezas por dominio");
  }
}



/**
 * Get all strengths as a flat array
 */
export async function getAllStrengths() {
  try {
    const strengths = await prisma.strength.findMany({
      include: {
        domain: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      },
      orderBy: [
        { domain: { name: 'asc' } },
        { name: 'asc' }
      ]
    });

    return strengths.map(strength => ({
      id: strength.id,
      name: strength.name,
      description: strength.description,
      domain: strength.domain
    }));
  } catch (error) {
    console.error("Error fetching all strengths:", error);
    throw new Error("Error al obtener todas las fortalezas");
  }
}

/**
 * Get strengths by specific domain ID
 */
export async function getStrengthsByDomainId(domainId: string) {
  try {
    const domain = await prisma.domain.findUnique({
      where: { id: domainId },
      include: {
        strengths: {
          orderBy: {
            name: 'asc'
          }
        }
      }
    });

    if (!domain) {
      throw new Error("Dominio no encontrado");
    }

    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      strengths: domain.strengths.map(strength => ({
        id: strength.id,
        name: strength.name,
        description: strength.description,
        domainId: strength.domainId
      }))
    };
  } catch (error) {
    console.error("Error fetching strengths by domain ID:", error);
    throw new Error("Error al obtener las fortalezas del dominio");
  }
}

/**
 * Get a specific strength by ID
 */
export async function getStrengthById(strengthId: string) {
  try {
    const strength = await prisma.strength.findUnique({
      where: { id: strengthId },
      include: {
        domain: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    });

    if (!strength) {
      throw new Error("Fortaleza no encontrada");
    }

    return {
      id: strength.id,
      name: strength.name,
      description: strength.description,
      domain: strength.domain
    };
  } catch (error) {
    console.error("Error fetching strength by ID:", error);
    throw new Error("Error al obtener la fortaleza");
  }
}

/**
 * Get domain information by ID
 */
export async function getDomainById(domainId: string) {
  try {
    const domain = await prisma.domain.findUnique({
      where: { id: domainId },
      select: {
        id: true,
        name: true,
        description: true
      }
    });

    if (!domain) {
      throw new Error("Dominio no encontrado");
    }

    return domain;
  } catch (error) {
    console.error("Error fetching domain by ID:", error);
    throw new Error("Error al obtener el dominio");
  }
}

/**
 * Get all domains without strengths (lightweight)
 */
export async function getAllDomains() {
  try {
    const domains = await prisma.domain.findMany({
      select: {
        id: true,
        name: true,
        description: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return domains;
  } catch (error) {
    console.error("Error fetching all domains:", error);
    throw new Error("Error al obtener todos los dominios");
  }
}


