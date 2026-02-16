# Contributing directly to EmpathAI

First off, thank you for considering contributing to EmpathAI! It's people like you that make EmpathAI such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issue Tracker](https://github.com/Pikxul/empathai/issues) to see if someone else has already reported it. If not, go ahead and [create an issue](https://github.com/Pikxul/empathai/issues/new/choose)!

## Fork & Create a Branch

If this is something you think you can fix, then [fork EmpathAI](https://help.github.com/articles/fork-a-repo) and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```sh
git checkout -b 325-add-japanese-translations
```

## Get the test suite running

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

Install dependencies:

```sh
npm install
```

Run the tests:

```sh
npm test
```

## Make your changes

Implement your fix or feature! Make sure to follow the existing code style.

## Did you find a bug?

* **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/Pikxul/empathai/issues).
* If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/Pikxul/empathai/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

## Did you write a patch that fixes a bug?

* Open a new GitHub pull request with the patch.
* Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

## formatting

We use Prettier and ESLint. Please ensure your code is formatted correctly before submitting a PR.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
