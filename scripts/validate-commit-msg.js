const fs = require('fs');

/**
 * Validate git commit message against Conventional Commits specification.
 * Enforces the format: <type>(<scope>)?: <description>
 * Mirrors the requirements of the 'git-formatter' developer skill.
 */

// Command line argument containing the commit message or file path
const commitMsgArg = process.argv[2];

if (!commitMsgArg) {
    console.error('Error: Please provide a commit message string or file path as an argument.');
    process.exit(1);
}

let commitMsg = commitMsgArg.trim();

// If the argument points to an existing file (standard Git hook behavior), read it
if (fs.existsSync(commitMsgArg)) {
    try {
        commitMsg = fs.readFileSync(commitMsgArg, 'utf8').trim();
    } catch (err) {
        console.error(`Error reading commit message file: ${err.message}`);
        process.exit(1);
    }
}

// Strip git comments (lines starting with #)
commitMsg = commitMsg
    .split('\n')
    .filter((line) => !line.trim().startsWith('#'))
    .join('\n')
    .trim();

// Regex matching conventional commit types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
const conventionalRegex =
    /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(?:\([a-z0-9\-_]+\))?!?: .{1,100}/i;

if (!conventionalRegex.test(commitMsg)) {
    console.error('\n======================================================');
    console.error('❌ GIT FORMAT ERROR: Invalid Commit Message Format!');
    console.error(`Parsed message: "${commitMsg}"`);
    console.error('======================================================');
    console.error('Conventional Commit standard format is required:');
    console.error('  <type>(<scope>)?: <subject>');
    console.error('\nValid types:');
    console.error('  feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert');
    console.error('\nExamples:');
    console.error('  feat: add automatic websocket status syncing');
    console.error('  fix(api): format destination phone numbers');
    console.error('  docs: write installation guidelines in README');
    console.error('======================================================\n');
    process.exit(1);
}

console.log('✅ Git commit message format verified successfully.');
process.exit(0);
