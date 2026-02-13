# Changelog

## 0.3.0 (Unreleased)

### Added
- **All 7 emotion types now implemented**: `neutral`, `focused`, `frustrated`, `happy`, `bored`, `curious`, `stressed`
- **Performance optimizations**:
  - Mouse event throttling (configurable via `mouseThrottleMs`)
  - Configurable analysis intervals
  - Signal window management
- **Enhanced configuration options**:
  - `signalWindowMs` - Time window for signal aggregation
  - `analysisIntervalMs` - Analysis frequency
  - `mouseThrottleMs` - Mouse event throttle interval
  - `confidenceThreshold` - Minimum confidence for emission
  - `debugMode` - Console logging for debugging
- **Performance monitoring** via `getPerformanceMetrics()` method
- **Comprehensive test suite** - 24 test cases covering all features
- **Developer tooling**:
  - ESLint configuration with TypeScript support
  - Comprehensive API documentation
  - Improved CONTRIBUTING.md with development guidelines
  - Framework integration examples (React, Vue, Angular)

### Changed
- **Enhanced emotion detection logic**:
  - Mouse variance calculation for erratic vs smooth patterns
  - Error rate tracking (backspace + delete keys)
  - More nuanced detection rules for all emotion types
- **Improved confidence scoring** - More accurate confidence values per emotion
- **Better signal management** - Automatic cleanup of old signals
- **Framework-agnostic design** - No framework dependencies, works with any JavaScript framework

### Fixed
- Mouse event performance issues (now throttled)
- Emotion detection accuracy improvements
- Memory leak prevention with proper cleanup

### Removed
- React peer dependency - SDK is now 100% framework-agnostic
- All framework-specific code

### Notes
This release significantly improves the SDK's performance, accuracy, and developer experience while maintaining complete framework independence. Works seamlessly with React, Vue, Angular, Svelte, or vanilla JavaScript.


### Fixed
- Mouse event performance issues (now throttled)
- Emotion detection accuracy improvements
- Memory leak prevention with proper cleanup

### Notes
This release significantly improves the SDK's performance, accuracy, and developer experience while maintaining full framework-agnostic compatibility.

---

## 0.2.0

### Added
- Deterministic emotion inference engine
- Confidence-scored `EmotionData`
- React hook with StrictMode safety
- Minimal Vitest test suite

### Changed
- Removed global singleton usage
- Introduced factory-based SDK initialization

### Notes
This release makes EmpathAI Core technically live and open-source ready.
