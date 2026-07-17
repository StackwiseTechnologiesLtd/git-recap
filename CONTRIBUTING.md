# Contributing to git-recap

Thanks for helping improve git-recap. This project is a **Bash CLI** plus an optional **Next.js landing site**. Please keep changes focused, tested, and consistent with the existing style.

## Code of conduct expectations

* Be respectful and constructive in issues and PRs.
* Assume good intent; prefer clear technical feedback.
* Do not commit secrets, credentials, or private commit history dumps.

## Ways to contribute

* Bug reports and reproducible failures
* CLI features that stay offline and zero-dependency
* Tests and CI improvements
* Docs and landing-page polish
* Homebrew formula / release process fixes

## Before you start

1. Search existing issues/PRs to avoid duplicates.
2. For larger features, open an issue first so we can align on scope.
3. Keep the CLI **offline** and free of new runtime dependencies (no Node/Python for `bin/git-recap`).

## Development setup

### CLI

```bash
git clone https://github.com/StackwiseTechnologiesLtd/git-recap.git
cd git-recap
chmod +x bin/git-recap tests/cli-smoke.sh
```

### Landing site (`web/`)

```bash
cd web
npm install
npm run dev
```

Full details: [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

## Making changes

### Branching

* Branch from `main`.
* Use a descriptive name, e.g. `fix/plain-mode-hashes` or `docs/contributing`.

### Coding guidelines

**CLI (`bin/git-recap`)**

* Keep Bash 3.2–compatible where practical (macOS ships an older Bash).
* Quote variables; handle spaces in paths safely.
* Prefer small, readable functions over clever one-liners.
* Do not add network calls or telemetry.

**Web (`web/`)**

* Match the existing clean UI: white background, black text, primary `#541111`.
* Keep terminal showcases dark (VS Code / Warp style).
* Prefer accessible markup and `prefers-reduced-motion` friendly animations.
* Avoid introducing heavy UI libraries unless discussed.

**Docs**

* Update README / docs when behavior or install steps change.
* Keep the logo path consistent: canonical `docs/logo.svg`.

## Tests and checks (required)

Run the same checks CI runs before opening a PR.

### CLI

```bash
bash -n bin/git-recap
./tests/cli-smoke.sh
# optional, if ShellCheck is installed:
shellcheck bin/git-recap
```

### Web

```bash
cd web
npm run lint
npm test
npm run build
```

Pull requests should not weaken or remove CI without a clear reason.

## Pull request process

1. Keep PRs focused — one concern per PR when possible.
2. Fill in a clear description:
   * What changed and why
   * How you tested it
3. Link related issues.
4. Ensure CI is green on GitHub Actions.
5. Expect review feedback; iterate until checks pass.

### Commit messages

* Prefer short, imperative summaries (e.g. `Add --plain mode for Slack paste`).
* Explain the “why” when the change is non-obvious.

## Reporting bugs

Include:

* OS and shell (`bash --version`, `git --version`)
* Exact command you ran
* Expected vs actual output
* Whether the repo uses conventional commits / unusual author config

## Security

If you discover a security issue (e.g. unsafe path handling that could execute unexpected content), please open a private security advisory on GitHub or contact the maintainers before filing a public issue.

## License

By contributing, you agree that your contributions are licensed under the MIT License (see [LICENSE](LICENSE)).
