# typed: strict
# frozen_string_literal: true

# Homebrew formula for git-recap (reference copy in the app repo).
#
# Canonical install source:
#   https://github.com/StackwiseTechnologiesLtd/homebrew-tools
#   Formula/git-recap.rb
#
# Install:
#   brew tap StackwiseTechnologiesLtd/tools
#   brew trust StackwiseTechnologiesLtd/tools
#   brew install git-recap
#
# After tagging a release (vX.Y.Z):
#   1. curl -sL https://github.com/StackwiseTechnologiesLtd/git-recap/archive/refs/tags/vX.Y.Z.tar.gz | shasum -a 256
#   2. Update url + sha256 here and in the tap formula
#   3. Push homebrew-tools; users run: brew upgrade git-recap

# Offline standup summaries from local Git history (Bash + git).
class GitRecap < Formula
  LOGO = <<~'ASCII'
       .-=*@@@@@@@@@+=:                                                                                            
    .=@@@=-...   ..:-+@@+-                                                                                         
   +@@-.   .           .+@@-                                                                                       
 :@@-     :@@-..          +@*                                                                                      
:@@.        :@@@@          =@@                                                                                     
@@=          :@@@@-         @@-                                                                                    
@@:           +@ :@@++:     +@+                                                                                    
@@=           +@  .@@@=     .-                                                                                     
.@@:          *@.        -:   :-         .-===:.  .-: --------:      .-----.   -------   .-==-:.    :-.    :-----. 
 :@@=        @@@@        -@@=@@-       :@@@===@+  -@@ -==@@@==-      -@@--+@@ .@@===== :@@@==+@:   =@@@.   @@@--@@@
   =@@=.      ::.          :=:         @@:  -====.:@@    +@=   ..... :@@==+@* .@@++=+: @@:        =@=.@@.  +@@--@@@
     -@@@+-:.    .:-=+@+               *@*. -=@@@ :@@    *@+  .@@@@+ :@@=@@=  :@@-:::. @@+.  .:  =@@++@@@. *@@---. 
        :=+@@@@@@@@@+-:                 -@@@@@@=  :@@    +@=         :@@  =@@..@@@@@@@  -@@@@@@-:@@.::.=@@ +@=     
  ASCII

  desc "Offline standup summaries from your local Git commit messages"
  homepage "https://github.com/StackwiseTechnologiesLtd/git-recap"
  url "https://github.com/StackwiseTechnologiesLtd/git-recap/archive/refs/tags/v0.1.2.tar.gz"
  sha256 "d0c10a44cc7561c196a173c451466e7a57bbe3dc6f2d3631803850ff10a82d11"
  license "MIT"
  head "https://github.com/StackwiseTechnologiesLtd/git-recap.git", branch: "main"

  livecheck do
    url :stable
    regex(/^v?(\d+(?:\.\d+)+)$/i)
  end

  # Runtime: Bash shebang + git plumbing. Git ships with macOS / Xcode CLT.
  uses_from_macos "git"

  def install
    bin.install "bin/git-recap"

    # Keep a copy of the man-page-less help surface discoverable in the keg.
    # (CLI is self-documenting via --help; README is the long-form docs.)
    doc.install "README.md" if File.exist?("README.md")
    doc.install "CHANGELOG.md" if File.exist?("CHANGELOG.md")
    doc.install "LICENSE" if File.exist?("LICENSE")
  end

  def caveats
    <<~EOS
      \e[38;2;84;17;17m#{LOGO}\e[0m

      git-recap reads only local .git history (no network).

      Configure your Git author so commits are matched correctly:
        git config --global user.email "you@example.com"
        git config --global user.name "Your Name"

      Quick start:
        git-recap                 # current repo, or scan cwd subdirs
        git-recap --today
        git-recap --plain         # paste into Slack / notes
        git-recap --summary-only
        git-recap -h

      Docs: #{homepage}#readme
      Site: https://stackwisetechnologies.com/
    EOS
  end

  test do
    assert_path_exists bin/"git-recap"
    assert_predicate bin/"git-recap", :executable?

    help = shell_output("#{bin}/git-recap --help")
    assert_match "Usage: git-recap", help
    assert_match "--today", help
    assert_match "--yesterday", help
    assert_match "--week", help
    assert_match "--plain", help
    assert_match "--summary-only", help
    assert_match "--flat", help

    assert_match "Usage: git-recap", shell_output("#{bin}/git-recap -h")

    # Bash syntax check (portable across Homebrew's default shells).
    system "bash", "-n", bin/"git-recap"

    # Functional smoke: init a tiny repo and confirm standup output.
    system "git", "init"
    system "git", "config", "user.email", "formula-test@example.com"
    system "git", "config", "user.name", "Formula Test"
    (testpath/"note.txt").write "standup\n"
    system "git", "add", "note.txt"
    system "git", "commit", "-m", "feat: add standup note"

    output = shell_output("#{bin}/git-recap --today")
    assert_match(/Features|add standup note/i, output)

    plain = shell_output("#{bin}/git-recap --today --plain")
    assert_match(/standup note/i, plain)
    refute_match(/\e\[/, plain) # no ANSI escapes in --plain

    summary = shell_output("#{bin}/git-recap --today --summary-only")
    assert_match(/Standup summary|Features|standup note/i, summary)
  end
end
