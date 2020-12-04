// Required Packages - inquirer; axios; file system;
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");

// Utilities - generateMarkdown.js;
const generateMarkdown = require("./utils/generateMarkdown.js");

// API Arrays - (DEFAULT)
const userGitHub = [];
const userRepositories = [];

// User Info;
// - axios + GitHub api
const axiosJS = {
	async getUser(usernameGH) {
		try {
			// - pulls user data; pulls user's repository data;
			userGitHub.push(
				(await axios.get(`https://api.github.com/users/${usernameGH}`)).data
			);
			userRepositories.push(
				...(
					await axios.get(
						`https://api.github.com/users/${usernameGH}/repos?per_page=100`
					)
				).data.map(repo => repo.name)
			);
		} catch {
			console.log(`\nUsername not found.`);
		}
	}
};

// Inquirer Prompts;
const userQuestions = [
	// - Username; - REQUIRED;
	{
		name: "Username",
		type: "input",
		message: "Enter your GitHub Username: ",
		transformer: function (a, b) {
			return `${"@" + a}`;
		},
		validate: async usernameGH => {
			// - test username against GitHub;
			await axiosJS.getUser(usernameGH);
			if (userRepositories.length < 1) {
				userGitHub.splice(0, userGitHub.length);
				return "A valid GitHub Username is required to proceed.";
			}
			return true;
		}
	},
	// - Repository; - REQUIRED;
	{
		name: "Repository",
		type: "list",
		message: "Select your GitHub Repository:",
		choices: userRepositories
	},
	// - Title; - REQUIRED;
	{
		name: "Title",
		type: "input",
		default: "Project_Title",
		message: "Enter the TITLE of your project:",
		validate: response => {
			if (response.length < 1) {
				return "Please title your project.";
			}
			return true;
		}
	},
	// - Description; - REQUIRED;
	{
		name: "Description",
		type: "input",
		message: "Please write a DESCRIPTION of your project:",
		validate: response => {
			if (response.length < 1) {
				return "A valid description is required to proceed.";
			}
			return true;
		}
	},
	// - Installation; - OPTIONAL;
	{
		name: "Installation",
		type: "input",
		message:
			"(OPTIONAL) - Describe the steps required to INSTALL your project:",
		transformer: input => {
			splitInput = input.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
			numberList = splitInput.map((arr, index) => `${index + 1}.\t` + arr);
			listFormat = numberList.join("\n");
			return (
				"*Use sentences with punctuation/Capital letters*" +
				"\n" +
				listFormat +
				"<<<"
			);
		}
	},
	// - Usage; - OPTIONAL;
	{
		name: "Usage",
		type: "input",
		message:
			"(OPTIONAL) - Enter instructions and examples of your project in USE:"
	},
	// - Contributions; - OPTIONAL;
	{
		name: "Contributions",
		type: "input",
		message:
			"(OPTIONAL) - Enter guidelines on how other developers can CONTRIBUTE to your project:"
	},
	// - Testing; - OPTIONAL;
	{
		name: "Testing",
		type: "input",
		message:
			"(OPTIONAL) - Describe the TESTS for your application and examples on how to run them:"
	},
	// - License; - REQUIRED;
	{
		name: "License",
		type: "list",
		message: "Choose a license for your project:",
		choices: [
			"GNU AGPLv3",
			"GNU GPLv3",
			"GNU LGPLv3",
			"Mozilla Public License 2.0",
			"Apache License 2.0",
			"MIT License",
			"Boost Software License 1.0",
			"The Unlicense"
		]
	}
];

// Wite README.md;
function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, err => {
		if (err) {
			return console.log(err);
		}
		console.log("\nYour README.md has been generated.");
	});
}

// Initialize Program Function;
async function init() {
	// Prompt Questions;
	const userResponses = await inquirer.prompt(userQuestions);
	console.log("\n\nYour Responses: ", userResponses);

	// Generate README; - generate markdown; write file;
	const userReadme = generateMarkdown(userResponses, userGitHub[0]);
	await writeToFile("./Generated README/README.md", userReadme);
}

// CALL - Initialize Program;
init();
