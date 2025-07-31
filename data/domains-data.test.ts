import { describe, it, expect } from 'vitest';
import domainsData from '../mocks/domains-data';

// Definir el tipo esperado para los dominios
interface DomainProfile {
  name: string;
  nameEs: string;
  description: string;
  metaphor: string;
  keyQuestion: string;
  summary: string;
  contributionToTeam: string[];
  potentialPitfall: string;
  strengthsInDomain: string[];
}

describe('domainsData', () => {
  it('should be an array of 4 elements', () => {
    expect(Array.isArray(domainsData)).toBe(true);
    expect(domainsData.length).toBe(4);
  });

  it('should have the correct structure for each domain', () => {
    domainsData.forEach((item: DomainProfile) => {
      expect(item).toHaveProperty('name');
      expect(typeof item.name).toBe('string');
      expect(item).toHaveProperty('nameEs');
      expect(typeof item.nameEs).toBe('string');
      expect(item).toHaveProperty('description');
      expect(typeof item.description).toBe('string');
      expect(item).toHaveProperty('metaphor');
      expect(typeof item.metaphor).toBe('string');
      expect(item).toHaveProperty('keyQuestion');
      expect(typeof item.keyQuestion).toBe('string');
      expect(item).toHaveProperty('summary');
      expect(typeof item.summary).toBe('string');
      expect(item).toHaveProperty('contributionToTeam');
      expect(Array.isArray(item.contributionToTeam)).toBe(true);
      expect(item).toHaveProperty('potentialPitfall');
      expect(typeof item.potentialPitfall).toBe('string');
      expect(item).toHaveProperty('strengthsInDomain');
      expect(Array.isArray(item.strengthsInDomain)).toBe(true);
    });
  });

  it('should have only the expected domain names', () => {
    const expected = ['Doing', 'Feeling', 'Motivating', 'Thinking'];
    const actual = domainsData.map((d: DomainProfile) => d.name);
    expect(actual.sort()).toEqual(expected.sort());
  });

  it('should match the DomainProfile type', () => {
    domainsData.forEach((item) => {
      const _: DomainProfile = item;
      expect(item).toBeDefined();
    });
  });
});
