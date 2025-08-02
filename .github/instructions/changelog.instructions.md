---
applyTo: "**"
---
# Instrucciones para Estandarizar el Changelog en VSCode

Este documento tiene como objetivo estandarizar la forma en que los agentes (desarrolladores y herramientas automatizadas) documentan los cambios realizados en el proyecto utilizando el archivo `CHANGELOG.md`. Seguir estas directrices asegura claridad y consistencia en el historial de cambios.

---

## Formato General

- Cada entrada debe estar agrupada por versión (ejemplo: `## [1.2.0] - 2025-08-02`).
- Las versiones siguen el esquema [SemVer](https://semver.org/lang/es/) (MAJOR.MINOR.PATCH).
- Los cambios deben clasificarse en categorías:
  - **Added** (Añadido)
  - **Changed** (Cambiado)
  - **Fixed** (Arreglado)
  - **Removed** (Eliminado)
  - **Security** (Seguridad)
- Escribir cada cambio como un ítem de lista (`-`) en lenguaje claro y conciso.

---

## Ejemplo de Entrada

```markdown
## [1.2.0] - 2025-08-02

### Added
- Nueva función de autoformato para archivos de configuración.

### Changed
- Actualizado el tema oscuro para mayor contraste.

### Fixed
- Solucionado error al guardar archivos Markdown.