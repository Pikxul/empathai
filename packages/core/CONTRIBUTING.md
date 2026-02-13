# Contributing to EmpathAI Core

Thank you for your interest in contributing to EmpathAI Core! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites
- Node.js 18+ or 20+
- pnpm 8+ (recommended) or npm 9+
- Git

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pikxul/empathai.git
   cd empathai/packages/core
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run tests**
   ```bash
   pnpm test
   # or
   npm test
   ```

4. **Build the package**
   ```bash
   pnpm build
   # or
   npm run build
   ```

## Development Workflow

### Running in Development Mode

```bash
pnpm dev
# or
npm run dev
```

This runs TypeScript in watch mode, automatically recompiling on file changes.

### Running Tests

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test run

# Run with coverage
pnpm test --coverage
```

### Type Checking

```bash
pnpm check-types
# or
npm run check-types
```

### Linting

```bash
pnpm lint
# or
npm run lint

# Auto-fix issues
pnpm lint:fix
```

## Code Style Guidelines

### TypeScript

- Use TypeScript strict mode
- Prefer `const` over `let`, avoid `var`
- Use explicit types for public APIs
- Use type inference for internal variables
- Document all public methods with JSDoc

### Naming Conventions

- **Classes**: PascalCase (e.g., `EmpathAI`)
- **Functions**: camelCase (e.g., `createEmpathAI`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `SIGNAL_WINDOW_MS`)
- **Interfaces/Types**: PascalCase (e.g., `EmotionData`)
- **Private members**: camelCase with `private` keyword

### Code Organization

```
src/
├── index.ts           # Main exports
├── types.ts           # Type definitions
├── hooks/             # Optional React hooks
│   ├── index.ts
│   └── useEmpathAI.ts
└── __tests__/         # Test files
    └── *.test.ts
```

## Testing Guidelines

### Writing Tests

- Use Vitest for all tests
- Aim for 70%+ code coverage
- Test both happy paths and edge cases
- Use descriptive test names

**Example:**
```typescript
describe('Feature Name', () => {
  it('should do something specific when condition is met', () => {
    // Arrange
    const empathAI = createEmpathAI();
    
    // Act
    empathAI.init();
    
    // Assert
    expect(empathAI.getPerformanceMetrics().isInitialized).toBe(true);
    
    // Cleanup
    empathAI.destroy();
  });
});
```

### Test Categories

1. **Unit Tests**: Test individual functions/methods
2. **Integration Tests**: Test component interactions
3. **Performance Tests**: Verify throttling, memory usage

## Pull Request Process

### Before Submitting

1. ✅ All tests pass (`pnpm test`)
2. ✅ Type checking passes (`pnpm check-types`)
3. ✅ Linting passes (`pnpm lint`)
4. ✅ Build succeeds (`pnpm build`)
5. ✅ Documentation updated (if needed)
6. ✅ CHANGELOG.md updated

### PR Guidelines

- **Title**: Clear, concise description (e.g., "Add emotion history tracking")
- **Description**: Explain what, why, and how
- **Link issues**: Reference related issues (e.g., "Fixes #123")
- **Keep it focused**: One feature/fix per PR
- **Add tests**: Include tests for new features

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
```

## Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build/tooling changes

### Examples

```bash
feat(core): add emotion history tracking

Add getEmotionHistory() method to track emotion changes over time.
Includes configurable duration parameter.

Closes #45

---

fix(throttling): correct mouse event throttle timing

Previously throttle was checking wrong timestamp.
Now correctly throttles based on last event time.

---

docs(api): add Vue and Angular examples

Add framework-specific usage examples to API.md
```

## Feature Development

### Adding New Emotion Types

1. Update `EmotionType` in `src/types.ts`
2. Add detection logic in `analyzeSignals()`
3. Add tests in `src/__tests__/`
4. Update documentation
5. Update CHANGELOG.md

### Adding Configuration Options

1. Update `EmpathAIOptions` in `src/types.ts`
2. Add default value in constructor
3. Use option in relevant methods
4. Add tests for new option
5. Document in `docs/API.md`

## Documentation

### Required Documentation

- **API.md**: All public APIs must be documented
- **README.md**: Update examples if API changes
- **CHANGELOG.md**: Document all changes
- **JSDoc**: All public methods need JSDoc comments

### JSDoc Example

```typescript
/**
 * Subscribe to emotion change events
 * 
 * @param callback - Function called when emotion changes
 * @returns Unsubscribe function to remove the listener
 * 
 * @example
 * ```typescript
 * const unsubscribe = empathAI.onEmotionChange((emotion) => {
 *   console.log('New emotion:', emotion.type);
 * });
 * 
 * // Later...
 * unsubscribe();
 * ```
 */
onEmotionChange(callback: (data: EmotionData) => void): () => void {
  // Implementation
}
```

## Release Process

### Version Numbering

Follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Release Checklist

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Run full test suite
4. Build package
5. Create git tag
6. Publish to npm
7. Create GitHub release

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/Pikxul/empathai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Pikxul/empathai/discussions)
- **Email**: Contact maintainers

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards others

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
