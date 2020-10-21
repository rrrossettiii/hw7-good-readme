function generateMarkdown(data, userInfo) {
  
  // Readme Header
  let readmeDraft =
  `# ${data.Title} \n![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${data.Username}/${data.Repository}?style=flat&logo=appveyor) \n \n \n## Description: \n${data.Description} \n \n`
  
  // Readme Footer
  let readmeFooter = `## License: \n${data.License} \n \n \n`;
  
  // Table of Contents
  let tableOfContents = `## Table of Contents \n* [License](#license)`;
  
  if (data.Installation !== ('' || 'optional')){
    tableOfContents += `\n* [Installation](#installation)`;
    readmeFooter += `## Installation: \n${data.Installation} \n \n \n`
  }

  if (data.Usage !== ('' || 'optional')){
    tableOfContents += `\n* [Usage](#usage)`;
    readmeFooter += `## Usage: \n${data.Usage} \n \n \n`;
  }

  if (data.Contributions !== ('' || 'optional')){
    tableOfContents += `\n* [Contributions](#contributions)`;
    readmeFooter += `## Contributions: \n${data.Contributions} \n \n \n`;
  }

  if (data.Testing !== ('' || 'optional')){
    tableOfContents += `\n* [Testing](#testing)`;
    readmeFooter += `## Testing: \n${data.Testing} \n \n \n`;
  }

  // Questions
tableOfContents += `\n* [Questions](#questions) \n \n \n`
readmeFooter += `## Questions? \n \nIf you have any questions, contact me with the information below: \n \n[![Profile Picture](${userInfo.avatar_url})](${userInfo.url}) \n \nGitHub Username: @${userInfo.login}`
if (userInfo.email !== null){
  readmeFooter += `Email: ${userInfo.email}`;
} 

readmeDraft += tableOfContents;
readmeDraft += readmeFooter;

return readmeDraft;
}
module.exports = generateMarkdown;
