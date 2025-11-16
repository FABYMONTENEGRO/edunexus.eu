# Estructura del Proyecto Erasmus+ Calculator

## Objetivo
Crear una aplicación web bilingüe (inglés/castellano) con calculadora de evaluación de proyectos Erasmus+ que permita:
- Ingresar nombre del proyecto
- Evaluar 5 capítulos/bloques con puntuaciones
- Guardar proyectos
- Generar PDF descargable con resumen

## 5 Bloques de Evaluación

### BLOQUE 1: ALINEAMIENTO ESTRATÉGICO (25 puntos)
- 6 items evaluables
- Puntuación máxima: 25 puntos

### BLOQUE 2: CONSORCIO Y GOBERNANZA (20 puntos)
- 7 items evaluables
- Puntuación máxima: 20 puntos

### BLOQUE 3: CALIDAD DE LA PROPUESTA (30 puntos)
- 7 items evaluables
- Puntuación máxima: 30 puntos

### BLOQUE 4: GESTIÓN Y PRESUPUESTO (15 puntos)
- 5 items evaluables
- Puntuación máxima: 15 puntos

### BLOQUE 5: DIFUSIÓN Y VISIBILIDAD (10 puntos)
- 4 items evaluables
- Puntuación máxima: 10 puntos

**TOTAL: 100 puntos**

## Funcionalidades Requeridas

1. **Entrada de datos**
   - Campo para nombre del proyecto
   - Navegación por los 5 bloques/capítulos
   - Input para puntos obtenidos en cada item
   - Campo opcional para notas/comentarios por item

2. **Cálculo automático**
   - Subtotal por bloque
   - Total general
   - Indicador visual de estado (≥90: excelente, 75-89: aceptable, <75: riesgo)

3. **Multiidioma**
   - Selector de idioma (ES/EN)
   - Todo el contenido traducido

4. **Persistencia**
   - Guardar proyecto en localStorage
   - Cargar proyectos guardados

5. **Generación de PDF**
   - Resumen del proyecto
   - Puntuación por bloque
   - Total y evaluación
   - Descargable

6. **Diseño**
   - Logos: Edunexus y European Commission
   - Responsive
   - Interfaz intuitiva
