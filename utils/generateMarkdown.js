// Markdown Generator
// 

function generateMarkdown(userResponses, userGitHub) {
  // Readme Header (Default); - title; last commit badge; description;
  let readmeDraft =
  `# ${userResponses.Title} \n![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${userResponses.Username}/${userResponses.Repository}?style=flat&logo=appveyor) \n \n \n## Description: \n${userResponses.Description} \n \n`
  
  // Readme Footer (Default); - license;
  let readmeFooter = `## License: \n${userResponses.License} \n \n \n`;
  
  // Table of Contents || TOC (Default); - TOC; optional entries;
  let tableOfContents = `## Table of Contents \n* [License](#license)`;
  
  // TOC Options; - if response is not empty or 'optional'...;
  if (userResponses.Installation !== ('' || 'optional')){
    // - add entry to TOC; add content to Footer;
    tableOfContents += `\n* [Installation](#installation)`;
    readmeFooter += `## Installation: \n${userResponses.Installation} \n \n \n`
  }

  // - etc...;
  if (userResponses.Usage !== ('' || 'optional')){
    tableOfContents += `\n* [Usage](#usage)`;
    readmeFooter += `## Usage: \n${userResponses.Usage} \n \n \n`;
  }

  // - etc...;
  if (userResponses.Contributions !== ('' || 'optional')){
    tableOfContents += `\n* [Contributions](#contributions)`;
    readmeFooter += `## Contributions: \n${userResponses.Contributions} \n \n \n`;
  }

  // - etc...;
  if (userResponses.Testing !== ('' || 'optional')){
    tableOfContents += `\n* [Testing](#testing)`;
    readmeFooter += `## Testing: \n${userResponses.Testing} \n \n \n`;
  }

  // Questions; - add questions to Table of Contents & Footer;
tableOfContents += `\n* [Questions](#questions) \n \n \n`
readmeFooter += `## Questions? \n \nIf you have any questions, contact me with the information below: \n \n[![Profile Picture](${userGitHub.avatar_url})](${userGitHub.url}) \n \nGitHub Username: @${userGitHub.login}`
if (userGitHub.email !== null){
  readmeFooter += `Email: ${userGitHub.email}`;
} 

// Stitch Draft; - add TOC to draft; add footer to draft.
readmeDraft += tableOfContents;
readmeDraft += readmeFooter;

// Return and Export;
return readmeDraft;
}
module.exports = generateMarkdown;
