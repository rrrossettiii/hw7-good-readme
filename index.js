// Required Packages - inquirer; axios; file system;
const inquirer = require("inquirer")
const axios = require("axios")
const fs = require("fs")

// Utilities - generateMarkdown.js;
const generateMarkdown = require("./utils/generateMarkdown.js")

// Inquirer Prompts;
const userQuestions = [
    // - Username; - REQUIRED;
    {
        name: 'Username',
        type: 'input',
        default: 'Username',
        message: 'Enter your GitHub Username:',
        validate: (response) => {if (response == ('' || 'Username')){
            return console.log('A valid GitHub Username is required to proceed.');
        }
        return true;}
    },
    // - Repository; - REQUIRED;
    {
        name: 'Repository',
        type: 'input',
        default: 'Case-Sensitive',
        message: 'Enter the name of your GitHub Repository:',
        validate: (response) => {if (response == ('' || 'Case-Sensitive')){
            return console.log('A GitHub Repository is required for badges.');
        }
        return true;}
    },
    // - Title; - REQUIRED;
    {
        name: 'Title',
        type: 'input',
        default: 'Project-Title',
        message: 'Enter the title of your project:',
        validate: (response) => {if (response == ('' || 'Project-Title')){
            return console.log('Please title your project.');
        }
        return true;}
    },
    // - Description; - REQUIRED;
    {
        name: 'Description',
        type: 'input',
        default: 'Description...',
        message: 'Please write a description of your project:',
        validate: (response) => {if (response == ('' || 'Description...')){
            return console.log('A valid description is required to proceed.');
        }
        return true;}
    },
    // - Installation; - OPTIONAL;
    {
        name: 'Installation',
        type: 'input',
        default: 'optional',
        message: "Describe the steps required to INSTALL your project:",
    },
    // - Usage; - OPTIONAL;
    {
        name: 'Usage',
        type: 'input',
        default: 'optional',
        message: "Enter instructions and examples of your project in USE:",
    },
    // - Contributions; - OPTIONAL;
    {
        name: 'Contributions',
        type: 'input',
        default: 'optional',
        message: "Enter guidelines on how other developers can CONTRIBUTE to your project:",
    },
    // - Testing; - OPTIONAL;
    {
        name: 'Testing',
        type: 'input',
        default: 'optional',
        message: "Enter TESTS written for your application and examples on how to run them:",
    },
    // - License; - REQUIRED;
    {
        name: 'License',
        type: 'list',
        message: "Choose a license for your project:",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
    }
];

// Wite README.md;
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if(err){
            return console.log(err);
        }
        console.log('Your README.md has been generated.');
    })
}

// Initialize Program Function;
async function init() {
    // Prompt Questions;
    const userResponses = await inquirer.prompt(userQuestions) 
    console.log('Your Responses: ', userResponses);

    // User Info;
    // - axios + GitHub api
    const axiosJS = {
        async getUser(userResponses) {
            try { let response = await axios.get(`https://api.github.com/users/${userResponses.Username}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
};

    // - get User information from GitHub; define it as userGitHub;
    const userGitHub = await axiosJS.getUser(userResponses);
    console.log('Github user info:', userGitHub);

    // Generate README; - generate markdown; write file;
    const userReadme = generateMarkdown(userResponses, userGitHub)
    await writeToFile(userResponses.Title + '-README.md', userReadme)
}

// CALL - Initialize Program;
init();