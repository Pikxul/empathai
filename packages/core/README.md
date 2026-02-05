# @empathai/core

[![npm version](https://img.shields.io/npm/v/empathai-core.svg)](https://www.npmjs.com/package/empathai-core)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub](https://img.shields.io/github/last-commit/Pikxul/empathai?style=flat-square)](https://github.com/Pikxul/empathai)

**EmpathAI Core** — lightweight, non-intrusive emotion detection for web apps (keyboard + mouse).

---

## What it does

`empathai-core` analyzes user interaction signals (mouse movement, typing rhythm, clicks) and returns inferred emotional states (e.g. `focused`, `frustrated`, `bored`, `neutral`) together with a basic confidence score.  
It is intentionally **privacy-first** — no camera/mic required.

---

## What EmpathAI Core Does

- Captures **non-intrusive user behavior signals**
- Infers **basic emotional states** (deterministic v1)
- Emits **structured emotion data** with confidence & timestamp
- Works entirely **on the client**
- Stores **no personal data**
- Safe for **BFSI / SaaS / FinTech / enterprise / privacy-sensitive environments**

---

## What EmpathAI Core Does NOT Do

- No camera access  
- No microphone access  
- No personal data collection  

EmpathAI Core provides **signals**, not decisions.

---

## Installation
```bash
npm install empathai-core
# or
pnpm add empathai-core
```

---

## Usage Examples

### React (Recommended for React Apps)
```jsx
import { useEmpathAI } from 'empathai-core/hooks';

function App() {
  const { emotion } = useEmpathAI({
    enableMouseTracking: true,
    enableKeyboardTracking: true,
  });

  return (
    <div>
      <h2>Current emotion</h2>
      <p>{emotion.type}</p>
      <p>Confidence: {emotion.confidence}</p>
    </div>
  );
}

export default App;
```

---

### JavaScript (Vanilla JS)
```javascript
import { createEmpathAI } from 'empathai-core';

const empathAI = createEmpathAI({
  onEmotionDetected: (emotion) => {
    console.log('Emotion detected:', emotion);
  }
});

empathAI.init();

// Optional cleanup
window.addEventListener('beforeunload', () => {
  empathAI.destroy();
});
```

---

### Java Backend with Web Frontend

**Frontend (JavaScript)**
```javascript
import { createEmpathAI } from 'empathai-core';

const empathAI = createEmpathAI({
  onEmotionDetected: (emotion) => {
    fetch('/api/emotion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emotion),
    });
  }
});

empathAI.init();
```

**Backend (Spring Boot example)**
```java
@RestController
@RequestMapping("/api")
public class EmotionController {

    @PostMapping("/emotion")
    public ResponseEntity<Void> receiveEmotion(@RequestBody EmotionPayload payload) {
        // Store, analyze, or react to emotion signal
        return ResponseEntity.ok().build();
    }
}
```

---

### Python Backend with Web Frontend

**Frontend (JavaScript)**
```javascript
import { createEmpathAI } from 'empathai-core';

const empathAI = createEmpathAI({
  onEmotionDetected: (emotion) => {
    fetch('/emotion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emotion),
    });
  }
});

empathAI.init();
```

**Backend (Flask example)**
```python
from flask import Flask, request

app = Flask(__name__)

@app.route("/emotion", methods=["POST"])
def receive_emotion():
    data = request.json
    # Process emotion signal
    return "", 200
```

---

## License

MIT