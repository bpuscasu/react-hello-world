const { ESLint } = require("eslint");

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    }),
  );
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);
  return filteredFiles.map((fileName) => `"${fileName}"`).join(" ");
};

module.exports = {
  "**/*.{js,jsx}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    return [
      `eslint --report-unused-disable-directives --max-warnings=0 ${filesToLint}`,
    ];
  },
};
