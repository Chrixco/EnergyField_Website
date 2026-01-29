# Energy Field - Animated Background Creation Instructions

## Files Created for Moving Background Effect

### 1. Electrical Effects CSS
**File: `assets/css/electrical-effects.css`**
- Contains electrical particle animations
- Floating energy orbs
- Circuit line animations
- Lightning bolt effects
- Electrical glow effects

### 2. Circuit Background CSS
**File: `assets/css/circuit-background.css`**
- Circuit board pattern overlay
- Animated circuit nodes
- Energy flow animations
- Grid-based circuit design

### 3. Electrical Particles JavaScript
**File: `assets/js/electrical-particles.js`**
- Dynamic particle system
- Mouse-following particle trails
- Floating energy orbs with physics
- Real-time particle generation

### 4. Circuit System JavaScript
**File: `assets/js/circuit-system.js`**
- Interactive circuit animations
- Node connection effects
- Energy flow visualization
- Circuit board dynamics

## Key Background Features

### Particle System
- 30+ floating energy orbs
- Mouse-following particle trails
- Realistic physics simulation
- Dynamic particle generation based on scroll

### Circuit Animations
- Animated circuit board overlay
- Flowing energy lines
- Pulsing connection nodes
- Responsive to user interaction

### Electrical Effects
- Lightning bolt animations
- Electrical glow effects
- Energy field simulations
- Particle burst effects

## Implementation Notes

1. **CSS Files** are linked in index.html:
   ```html
   <link rel="stylesheet" href="./assets/css/electrical-effects.css">
   <link rel="stylesheet" href="./assets/css/circuit-background.css">
   ```

2. **JavaScript Files** are loaded:
   ```html
   <script src="./assets/js/circuit-system.js"></script>
   <script src="./assets/js/electrical-particles.js"></script>
   ```

3. **HTML Elements** for background:
   ```html
   <div class="energy-particles electrical-enhanced"></div>
   <div class="circuit-lines electrical-enhanced"></div>
   ```

## Performance Optimizations
- GPU acceleration using transform and opacity
- Throttled scroll events
- Particle cleanup procedures
- Mobile-specific optimizations
- Prefers-reduced-motion support

## Color Scheme
- Consistent neon yellow (#FFFF00) accent color
- White text on dark background
- Electrical blue highlights for energy effects
- Transparent overlays for subtle effects

This animated background system creates an immersive electrical/energy theme that enhances the Energy Field card game aesthetic.