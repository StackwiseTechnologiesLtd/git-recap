# typed: false
# frozen_string_literal: true

# Homebrew formula for git-recap.
#
# After tagging a release and uploading the source tarball, replace:
#   - YOUR_GITHUB_USERNAME
#   - PASTE_THE_SHA256_OF_YOUR_TAR_GZ_HERE
#
# Then place this file in your tap, e.g.:
#   homebrew-tools/Formula/git-recap.rb

class GitRecap < Formula
  desc "Aggregate local Git commit messages for daily standups"
  homepage "https://github.com/YOUR_GITHUB_USERNAME/git-recap"
  url "https://github.com/YOUR_GITHUB_USERNAME/git-recap/archive/refs/tags/v0.1.0.tar.gz"
  sha256 "PASTE_THE_SHA256_OF_YOUR_TAR_GZ_HERE"
  license "MIT"

  depends_on "git"

  def install
    bin.install "bin/git-recap"
  end

  test do
    assert_match "Usage: git-recap", shell_output("#{bin}/git-recap --help")
  end
end
