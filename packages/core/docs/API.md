# EmpathAI Core - API Reference

## Table of Contents
- [Core API](#core-api)
- [React Hook API](#react-hook-api)
- [Types](#types)
- [Configuration](#configuration)

---

## Core API

### `createEmpathAI(options?)`

Factory function to create an EmpathAI instance.

**Parameters:**
- `options` (optional): [`EmpathAIOptions`](#empathaioptions) - Configuration options

**Returns:** `EmpathAI` instance

**Example:**
```javascript
import { createEmpathAI } from 'empathai-core';

const empathAI = createEmpathAI({
  enableMouseTracking: true,
  enableKeyboardTracking: true,
  debugMode: false,
});
```

---

### `EmpathAI` Class

#### Methods

##### `init()`

Initialize emotion tracking. This method is idempotent - calling it multiple times is safe.

**Returns:** `void`

**Example:**
```javascript
empathAI.init();
```

---

##### `destroy()`

Cleanup all event listeners and timers. Call this when you're done using the SDK.

**Returns:** `void`

**Example:**
```javascript
empathAI.destroy();
```

---

##### `onEmotionChange(callback)`

Subscribe to emotion change events.

**Parameters:**
- `callback`: `(data: EmotionData) => void` - Function called when emotion changes

**Returns:** `() => void` - Unsubscribe function

**Example:**
```javascript
const unsubscribe = empathAI.onEmotionChange((emotion) => {
  console.log('Emotion changed:', emotion.type, emotion.confidence);
});

// Later, to unsubscribe:
unsubscribe();
```

---

##### `getCurrentEmotion()`

Get the current emotion state snapshot.

**Returns:** [`EmotionData`](#emotiondata)

**Example:**
```javascript
const emotion = empathAI.getCurrentEmotion();
console.log(emotion.type); // 'focused', 'frustrated', etc.
```

---

##### `getPerformanceMetrics()`

Get performance and debugging metrics.

**Returns:** Object with:
- `mouseSignalCount`: number - Current mouse signals in buffer
- `keySignalCount`: number - Current keyboard signals in buffer
- `listenerCount`: number - Number of active listeners
- `isInitialized`: boolean - Whether SDK is initialized

**Example:**
```javascript
const metrics = empathAI.getPerformanceMetrics();
console.log('Active listeners:', metrics.listenerCount);
```

---

## React Hook API

### `useEmpathAI(options?)`

React hook for emotion detection with automatic lifecycle management.

**Parameters:**
- `options` (optional): [`EmpathAIOptions`](#empathaioptions)

**Returns:** Object with:
- `emotion`: [`EmotionData`](#emotiondata) - Current emotion state
- `instance`: `EmpathAI | undefined` - EmpathAI instance reference

**Example:**
```tsx
import { useEmpathAI } from 'empathai-core';

function MyComponent() {
  const { emotion } = useEmpathAI({
    enableMouseTracking: true,
    debugMode: false,
  });

  return (
    <div>
      <p>Current emotion: {emotion.type}</p>
      <p>Confidence: {(emotion.confidence * 100).toFixed(0)}%</p>
    </div>
  );
}
```

---

## Types

### `EmotionType`

Supported emotion states.

```typescript
type EmotionType =
  | 'neutral'    // Default/baseline state
  | 'focused'    // Concentrated, steady work
  | 'frustrated' // Irritated, making errors
  | 'happy'      // Positive, smooth interactions
  | 'bored'      // Disengaged, minimal activity
  | 'curious'    // Exploring, varied patterns
  | 'stressed';  // Rushed, high error rate
```

---

### `EmotionData`

Emotion detection result.

```typescript
interface EmotionData {
  type: EmotionType;        // Detected emotion
  confidence: number;       // 0.0 to 1.0
  timestamp: number;        // Unix timestamp (ms)
}
```

**Example:**
```javascript
{
  type: 'focused',
  confidence: 0.75,
  timestamp: 1707819305000
}
```

---

### `EmpathAIOptions`

Configuration options for the SDK.

```typescript
interface EmpathAIOptions {
  // Feature toggles
  enableMouseTracking?: boolean;      // Default: true
  enableKeyboardTracking?: boolean;   // Default: true
  
  // Performance tuning
  signalWindowMs?: number;            // Default: 3000ms
  analysisIntervalMs?: number;        // Default: 1000ms
  mouseThrottleMs?: number;           // Default: 50ms
  
  // Detection tuning
  confidenceThreshold?: number;       // Default: 0.3
  
  // Debugging
  debugMode?: boolean;                // Default: false
  
  // Callbacks
  onInit?: () => void;
  onEmotionDetected?: (emotion: EmotionData) => void;
}
```

---

## Configuration

### Performance Tuning

#### `signalWindowMs`

Time window (in milliseconds) for signal aggregation. Signals older than this are discarded.

- **Default:** 3000ms (3 seconds)
- **Range:** 1000ms - 10000ms recommended
- **Impact:** Longer windows = more stable but less responsive

**Example:**
```javascript
createEmpathAI({ signalWindowMs: 5000 }); // 5 second window
```

---

#### `analysisIntervalMs`

How often (in milliseconds) to analyze signals and detect emotions.

- **Default:** 1000ms (1 second)
- **Range:** 500ms - 5000ms recommended
- **Impact:** Shorter intervals = more responsive but higher CPU usage

**Example:**
```javascript
createEmpathAI({ analysisIntervalMs: 500 }); // Analyze twice per second
```

---

#### `mouseThrottleMs`

Throttle interval for mouse events to reduce performance impact.

- **Default:** 50ms (max 20 events/sec)
- **Range:** 16ms - 200ms recommended
- **Impact:** Lower values = more accurate but higher CPU usage

**Example:**
```javascript
createEmpathAI({ mouseThrottleMs: 100 }); // Max 10 mouse events/sec
```

---

### Detection Tuning

#### `confidenceThreshold`

Minimum confidence score required to emit an emotion change.

- **Default:** 0.3 (30%)
- **Range:** 0.0 - 1.0
- **Impact:** Higher threshold = fewer but more confident detections

**Example:**
```javascript
createEmpathAI({ confidenceThreshold: 0.5 }); // Only emit if 50%+ confident
```

---

### Debugging

#### `debugMode`

Enable console logging for analysis details.

- **Default:** false
- **Logs:** Configuration, analysis metrics, emotion changes

**Example:**
```javascript
createEmpathAI({ debugMode: true });
// Console output:
// [EmpathAI] Initialized with config: { ... }
// [EmpathAI] Analysis: { avgMouseSpeed: 45.2, emotion: 'focused', ... }
```

---

## Usage Patterns

### Vanilla JavaScript

```javascript
import { createEmpathAI } from 'empathai-core';

const empathAI = createEmpathAI({
  onEmotionDetected: (emotion) => {
    console.log('Emotion:', emotion.type);
  }
});

empathAI.init();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  empathAI.destroy();
});
```

---

### React

```tsx
import { useEmpathAI } from 'empathai-core';

function App() {
  const { emotion } = useEmpathAI();

  return <div>Emotion: {emotion.type}</div>;
}
```

---

### Vue 3

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { createEmpathAI } from 'empathai-core';

const emotion = ref({ type: 'neutral', confidence: 0.5 });
let empathAI;

onMounted(() => {
  empathAI = createEmpathAI({
    onEmotionDetected: (data) => {
      emotion.value = data;
    }
  });
  empathAI.init();
});

onUnmounted(() => {
  empathAI?.destroy();
});
</script>

<template>
  <div>Emotion: {{ emotion.type }}</div>
</template>
```

---

### Angular

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { createEmpathAI, EmotionData } from 'empathai-core';

@Component({
  selector: 'app-root',
  template: `<div>Emotion: {{ emotion.type }}</div>`
})
export class AppComponent implements OnInit, OnDestroy {
  emotion: EmotionData = { type: 'neutral', confidence: 0.5, timestamp: Date.now() };
  private empathAI: any;

  ngOnInit() {
    this.empathAI = createEmpathAI({
      onEmotionDetected: (data) => {
        this.emotion = data;
      }
    });
    this.empathAI.init();
  }

  ngOnDestroy() {
    this.empathAI?.destroy();
  }
}
```

---

## Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

**Required APIs:**
- `MouseEvent` with `movementX`/`movementY`
- `KeyboardEvent`
- `setInterval`/`clearInterval`
- `addEventListener`/`removeEventListener`

---

## Performance Considerations

### Memory Usage

- **Typical:** ~1-2 MB
- **Signals:** Auto-cleaned after `signalWindowMs`
- **Listeners:** Cleaned up on `destroy()`

### CPU Usage

- **Typical:** <1% on modern hardware
- **Analysis:** Runs every `analysisIntervalMs`
- **Throttling:** Mouse events limited by `mouseThrottleMs`

### Recommendations

For best performance:
1. Use default settings for most applications
2. Increase `mouseThrottleMs` on low-end devices
3. Increase `analysisIntervalMs` if real-time detection isn't critical
4. Always call `destroy()` when done

---

## License

MIT
