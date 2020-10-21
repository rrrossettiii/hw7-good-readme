// Required Packages
const inquirer = require("inquirer")
const fs = require("fs")
const generateMarkdown = require("./utils/generateMarkdown.js")

// array of userQuestions for user
const userQuestions = [
    {
        name: 'Username',
        type: 'input',
        default: '@Username',
        message: 'Enter your GitHub Username.',
        validate: (response) => {if (response.length < 1){
            return console.log('A valid GitHub Username is required to proceed.');
        }
        return true;}
    },
    {
        name: 'Repository',
        type: 'input',
        default: 'Case-Sensitive',
        message: 'Enter the name of your GitHub Repository?',
        validate: (response) => {if (response.length < 1){
            return console.log('A GitHub Repository is required for badges.');
        }
        return true;}
    },
    {
        name: 'Title',
        type: 'input',
        default: 'Project-Title',
        message: 'Enter the title of your project?',
        validate: (response) => {if (response.length < 1){
            return console.log('Please title your project.');
        }
        return true;}
    },
    {
        name: 'Description',
        type: 'input',
        default: 'Description...',
        message: 'Please write a description of your project:',
        validate: (response) => {if (response.length < 1){
            return console.log('A valid description is required to proceed.');
        }
        return true;}
    },
    {
        name: 'Installation',
        type: 'input',
        default: 'optional',
        message: "Describe the steps required to install your project.",
    },
    {
        name: 'Usage',
        type: 'input',
        default: 'optional',
        message: "Enter instructions and examples of your project in use.",
    },
    {
        name: 'Contributions',
        type: 'input',
        default: 'optional',
        message: "Enter guidelines on how other developers can contribute to your project.",
    },
    {
        name: 'Testing',
        type: 'input',
        default: 'optional',
        message: "Enter tests written for your application and examples on how to run them.",
    },
    {
        name: 'License',
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
    }
];

const confirmCorrect = [
    {
        name: 'Confirm',
        type: 'confirm',
        message: 'Is this information all correct?'
    },
    {
        name: 'Fix It',
        type: 'checkbox',
        choices: ['Repository', 'Title', 'Description', 'Installation', 'Usage', 'Contributions', 'Tests', 'License']
    }
]

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if(err){
            return console.log(err);
        }
        console.log('Your README.md has been generated.');
    })
}


// function to initialize program
async function init() {
    const userResponses = await inquirer.prompt(userQuestions) 
    console.log('Your Responses: ', userResponses);

    const userReadme = generateMarkdown(userResponses)
    console.log(userReadme);
    await writeToFile(userResponses.Title + '-README.md', userReadme)
}

// function call to initialize program
init();
