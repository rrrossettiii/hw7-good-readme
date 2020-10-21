function generateMarkdown(data) {
  
  // Readme Header
  let readmeDraft =
  `# ${data.Title} \n![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${data.Username}/${data.Repository}?style=flat&logo=appveyor) \n \n \n## Description \n${data.Description} \n \n`

  // Table of Contents
  let tableOfContents = `## Table of Contents \n* [License](#license)`;
  let readmeFooter = `## License \n${data.License} \n \n \n`;
  if (data.Installation !== ('' || 'optional')){
    tableOfContents += `\n* [Installation](#installation)`;
    readmeFooter += `## Installation \n${data.Installation} \n \n \n`
  }

  if (data.Usage !== ('' || 'optional')){
    tableOfContents += `\n* [Usage](#usage)`;
    readmeFooter += `## Usage \n${data.Usage} \n \n \n`;
  }

  if (data.Contributions !== ('' || 'optional')){
    tableOfContents += `\n* [Contributions](#contributions)`;
    readmeFooter += `## Contributions \n${data.Contributions} \n \n \n`;
  }

  if (data.Testing !== ('' || 'optional')){
    tableOfContents += `\n* [Testing](#testing) \n \n \n`;
    readmeFooter += `## Testing \n${data.Testing} \n \n \n`;
  }

readmeFooter += `<hr>` 

readmeDraft += tableOfContents;
readmeDraft += readmeFooter;

return readmeDraft;
}
module.exports = generateMarkdown;
