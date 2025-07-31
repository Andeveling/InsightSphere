import { describe, it, expect } from 'vitest';
import { strengthsData, StrengthProfile } from '../mocks/stregths-data';

describe('strengthsData', () => {
  it('should be an array of 20 elements', () => {
    expect(Array.isArray(strengthsData)).toBe(true);
    expect(strengthsData.length).toBe(20);
  });

  it('should have the correct structure for each strength', () => {
    strengthsData.forEach((item, idx) => {
      expect(item).toHaveProperty('strength');
      expect(typeof item.strength).toBe('string');
      expect(item).toHaveProperty('nameEs');
      expect(typeof item.nameEs).toBe('string');
      expect(item).toHaveProperty('domain');
      expect(typeof item.domain).toBe('string');
      expect(item).toHaveProperty('briefDefinition');
      expect(typeof item.briefDefinition).toBe('string');
      expect(item).toHaveProperty('details');
      expect(typeof item.details).toBe('object');
      expect(item.details).toHaveProperty('fullDefinition');
      expect(typeof item.details.fullDefinition).toBe('string');
      // Arrays opcionales
      if (item.details.howToUseMoreEffectively !== undefined) {
        expect(Array.isArray(item.details.howToUseMoreEffectively)).toBe(true);
      }
      if (item.details.watchOuts !== undefined) {
        expect(Array.isArray(item.details.watchOuts)).toBe(true);
      }
      if (item.details.bestPartners !== undefined) {
        expect(Array.isArray(item.details.bestPartners)).toBe(true);
      }
      if (item.details.careerApplications !== undefined) {
        expect(Array.isArray(item.details.careerApplications)).toBe(true);
      }
    });
  });

  it('should match the StrengthProfile type', () => {
    strengthsData.forEach((item) => {
      // Type assertion: this will fail at compile time if not matching
      const _: StrengthProfile = item;
      expect(item).toBeDefined();
    });
  });
});
