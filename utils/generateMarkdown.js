// Markdown Generator
// - '\n' = line break;  '\n&nbsp;\n' = empty line (in Markdown);

function generateMarkdown(userResponses, userGitHub) {
  // Readme Header (Default);
  let readmeDraft =
  // - title; badges; *empty space*; description; *more empty space*
  `# ${userResponses.Title}\n 
  ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${userResponses.Username}/${userResponses.Repository}?style=flat&logo=appveyor)![Badge for License](https://img.shields.io/github/license/${userResponses.Username}/${userResponses.Repository}?style=flat&logo=appveyor)
  \n&nbsp;\n \n&nbsp;\n
  \n## Description: \n${userResponses.Description}
  \n&nbsp;\n \n&nbsp;\n`
  
  // Readme Footer (Default); - license;
  let readmeFooter = `\n## License: \n${userResponses.License}
  \n&nbsp;\n \n&nbsp;\n`;
  
  // Table of Contents || TOC (Default); - TOC; optional entries;
  let tableOfContents = `\n## Table of Contents \n* [License](#license)`;
  
  // TOC Options; - if response is not empty or 'optional'...;
  if (userResponses.Installation !== ('' || 'optional')){
    // - add entry to TOC; add content to Footer;
    tableOfContents += `\n* [Installation](#installation)`;
    readmeFooter += `\n## Installation: \n${userResponses.Installation}
    \n&nbsp;\n \n&nbsp;\n`;}

  // - etc...;
  if (userResponses.Usage !== ('' || 'optional')){
    tableOfContents += `\n* [Usage](#usage)`;
    readmeFooter += `\n## Usage: \n${userResponses.Usage}
    \n&nbsp;\n \n&nbsp;\n`;}

  // - etc...;
  if (userResponses.Contributions !== ('' || 'optional')){
    tableOfContents += `\n* [Contributions](#contributions)`;
    readmeFooter += `\n## Contributions: \n${userResponses.Contributions}
    \n&nbsp;\n \n&nbsp;\n`;}

  // - etc...;
  if (userResponses.Testing !== ('' || 'optional')){
    tableOfContents += `\n* [Testing](#testing)`;
    readmeFooter += `\n## Testing: \n${userResponses.Testing}
    \n&nbsp;\n \n&nbsp;\n`;}

  // Questions; - add questions to Table of Contents & Footer;
  tableOfContents += `\n* [Questions](#questions)
  \n&nbsp;\n \n&nbsp;\n`

  readmeFooter += `\n## Questions?
  \nIf you have any questions, contact me with the information below:
  \n[![Profile Picture](${userGitHub.avatar_url})](${userGitHub.url})
  \nGitHub Username: @${userGitHub.login}`

  // Email?
  if (userGitHub.email !== null){
    readmeFooter += `\nEmail: ${userGitHub.email}`;
} 

// Stitch Draft; - add TOC to draft; add footer to draft.
readmeDraft += tableOfContents;
readmeDraft += readmeFooter;

// Return and Export;
return readmeDraft;
}
module.exports = generateMarkdown;
