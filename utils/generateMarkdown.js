// Markdown Generator
// - '\n' = line break;  '\n&nbsp;\n' = empty line (in Markdown);

function generateMarkdown(userResponses, userGitHub) {
  // Readme Header (Default);
  let readmeDraft =
  // - title; badges; *empty space*; description; *more empty space*
  `# ${userResponses.Title}
  \n${userResponses.Repository}
  \n![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${userResponses.Username}/${userResponses.Repository}?style=flat&logo=appveyor)![Badge for License](https://img.shields.io/github/license/${userResponses.Username}/${userResponses.Repository}?style=flat&logo=appveyor)
  \n&nbsp;\n \n&nbsp;\n
  \n## Description:
  \n${userResponses.Description}
  \n&nbsp;\n \n&nbsp;\n`
  
  // Readme Footer (Default); - license;
  let readmeFooter = `\n## License: \n${userResponses.License}
  \n&nbsp;\n \n&nbsp;\n`;
  
  // Table of Contents || TOC (Default); - TOC; optional entries;
  let tableOfContents = `\n## Table of Contents \n* [License](#license)`;
  
  // - Installation - if response is not empty or 'undefined'...;
  if (userResponses.Installation !== ('' || 'use sentences with punctuation/capital letters')){
    // - Format - split to array of sentences; number sentences; convert back to string;
    instructionsArray = userResponses.Installation.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")
    numberedInstructionsArray = instructionsArray.map((arr, index) => `${index + 1}.\t` + arr);
    userInstructions = numberedInstructionsArray.join(" \n")
    // - add entry to TOC; add content to Footer;
    tableOfContents += `\n* [Installation](#installation)`;
    readmeFooter += `\n## Installation: \n${userInstructions}
    \n&nbsp;\n \n&nbsp;\n`;}

  // - Usage - etc...;
  if (userResponses.Usage.length > 1){
    console.log(userResponses.Usage);
    console.log('test');
    tableOfContents += `\n* [Usage](#usage)`;
    readmeFooter += `\n## Usage: \n${userResponses.Usage}
    \n<img alt="Usage Capture" src="assets/usageCapture.gif" width="50%" height="50%"/>
    \n&nbsp;\n \n&nbsp;\n`;}

  // - Contributions - etc...;
  if (userResponses.Contributions.length > 1){
    tableOfContents += `\n* [Contributions](#contributions)`;
    readmeFooter += `\n## Contributions: \n${userResponses.Contributions}
    \n&nbsp;\n \n&nbsp;\n`;}

  // - Testing - etc...;
  if (userResponses.Testing.length > 1){
    tableOfContents += `\n* [Testing](#testing)`;
    readmeFooter += `\n## Testing: \n${userResponses.Testing}
    \n&nbsp;\n \n&nbsp;\n`;}

  // Questions; - add questions to Table of Contents & Footer;
  tableOfContents += `\n* [Questions](#questions)
  \n&nbsp;\n \n&nbsp;\n`

  // - Contact Info
  readmeFooter += `\n## Questions?
  \nIf you have any questions, contact me with the information below:
  \n[![Profile Picture](${userGitHub.avatar_url})](${userGitHub.url})
  \nGitHub Username: [@${userGitHub.login}](${userGitHub.url})`

  // Email?
  if (userGitHub.email !== null){
    readmeFooter += `\nEmail: ${userGitHub.email}`;
} 

// Assemble Draft; - add TOC to draft; add footer to draft.
readmeDraft += tableOfContents;
readmeDraft += readmeFooter;

// Return and Export;
return readmeDraft;
}
module.exports = generateMarkdown;
