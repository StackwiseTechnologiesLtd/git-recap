# typed: false
# frozen_string_literal: true

# Homebrew formula for git-recap.
# Canonical install source: StackwiseTechnologiesLtd/homebrew-tools
#
# After tagging a release, update url/sha256 here and in:
#   homebrew-tools/Formula/git-recap.rb

class GitRecap < Formula
  desc "Aggregate local Git commit messages for daily standups"
  homepage "https://github.com/StackwiseTechnologiesLtd/git-recap"
  url "https://github.com/StackwiseTechnologiesLtd/git-recap/archive/refs/tags/v0.1.0.tar.gz"
  sha256 "8cdd45191091cc80395cff3fb730bd55527d816f12c7dbffbc33c9a16318eba5"
  license "MIT"

  uses_from_macos "git"

  def install
    bin.install "bin/git-recap"
  end

  test do
    assert_match "Usage: git-recap", shell_output("#{bin}/git-recap --help")
  end
end
