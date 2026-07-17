# 📦 git-recap

`git-recap` is a lightweight, zero-dependency command-line utility designed to help developers prepare for daily standups in seconds. 

It safely scans your local Git repositories and aggregates your commit messages over a specified timeframe—all completely offline, without needing SSH keys or network access.

---

## ✨ Features

*   **Smart Routing:**
    *   **Contextual:** Run `git-recap` inside any active Git repository to see your recent commits for that project.
    *   **Multi-Scan:** Run `git-recap` in a parent folder (e.g., your `~/Projects` directory) to scan and aggregate commits across all subdirectories.
    *   **Targeted:** Pass specific directory names as arguments (e.g., `git-recap project-a ~/Desktop/project-b`) to target exactly what you want to audit.
*   **Zero Dependencies:** Built in pure Bash using standard `git` plumbing. No Node, Python, or Go runtimes required.
*   **Completely Private:** Processes your `.git` history entirely locally. No code is ever pushed or processed externally.

---

## 🚀 Installation

You can install `git-recap` instantly using Homebrew by tapping your custom tap:

```bash
brew tap YOUR_GITHUB_USERNAME/tools
brew install git-recap
