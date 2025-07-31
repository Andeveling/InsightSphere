const fs = require('fs');
const path = require('path');

// Script para validar el archivo example.js
// Este archivo solo es necesario para desarrollo y validación

try {
  console.log('🔍 Validando estructura de example.js...');
  const exampleFilePath = path.join(__dirname, 'example.js');
  const exampleDataContent = fs.readFileSync(exampleFilePath, 'utf8');
  
  // Método seguro usando Function constructor
  const data = new Function('return ' + exampleDataContent)();
  
  if (!Array.isArray(data)) {
    throw new Error('El archivo no contiene un array');
  }
  
  console.log(`✅ El archivo contiene un array con ${data.length} elementos`);
  
  // Validar estructura de cada elemento
  const requiredFields = ['strength', 'nameEs', 'domain', 'briefDefinition', 'details'];
  const detailFields = ['fullDefinition', 'howToUseMoreEffectively', 'watchOuts', 'strengthsDynamics', 'bestPartners', 'careerApplications'];
  
  data.forEach((item, index) => {
    console.log(`\nValidando fortaleza #${index + 1}: ${item.strength || 'Desconocida'}`);
    
    // Validar campos obligatorios
    requiredFields.forEach(field => {
      if (!item[field]) {
        console.warn(`⚠️ Campo '${field}' no encontrado`);
      } else {
        console.log(`✓ Campo '${field}' presente`);
      }
    });
    
    // Validar detalles
    if (item.details) {
      detailFields.forEach(field => {
        if (!item.details[field]) {
          console.warn(`⚠️ Detalle '${field}' no encontrado`);
        } else if (field === 'bestPartners' || field === 'careerApplications') {
          if (Array.isArray(item.details[field])) {
            console.log(`✓ Detalle '${field}' es un array con ${item.details[field].length} elementos`);
          } else {
            console.warn(`⚠️ Detalle '${field}' no es un array`);
          }
        } else if (field === 'howToUseMoreEffectively' || field === 'watchOuts') {
          if (Array.isArray(item.details[field])) {
            console.log(`✓ Detalle '${field}' es un array con ${item.details[field].length} elementos`);
          } else {
            console.warn(`⚠️ Detalle '${field}' no es un array`);
          }
        } else {
          console.log(`✓ Detalle '${field}' presente`);
        }
      });
    } else {
      console.warn('⚠️ No se encontró el campo "details"');
    }
  });
  
  console.log('\n✅ Validación completada');
} catch (error) {
  console.error('❌ Error al validar el archivo:', error);
}
