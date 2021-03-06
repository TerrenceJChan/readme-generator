const fs = require('fs');
const inquirer = require('inquirer');
const { resolve } = require('path');
const { stringify } = require('querystring');

// Asks the user a series of questions regarding their project.
// inquirer is used extensively here to prompt the user for inputs.
// More info can on inquirer be found at https://www.npmjs.com/package/inquirer
let questions = () => {
    // Inputs will return to 'responses' variable.
    return inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the title of your project:'
            },
            {
                name: 'description',
                type: 'input',
                message: 'Enter what the application is intended to do:'
            },
            {
                name: 'installation',
                type: 'input',
                message: 'Explain how the application will be installed:'
            },
            {
                name: 'usage',
                type: 'input',
                message: 'Enter the application\'s usage instructions:'
            },
            {
                name: 'contributing',
                type: 'input',
                message: 'Explain the terms for contributors to help with your project'
            },
            {
                name: 'tests',
                type: 'input',
                message: 'What tests can the user use?'
            },
            {
                name: 'license',
                type: 'list',
                message: 'What license do you want to publish this project under? (Use arrow keys to navigate, use enter key to select)',
                choices: ['None', 'Apache', 'GPLv2', 'GPLv3', 'MPL', 'MIT', 'BSL', 'Unilicense', 'Other']
            },
            {
                when: (answers) => answers.license === 'Other',
                name: 'other',
                type: 'input',
                message: 'Enter the name of the license you want to publish your project under.'
            },
            {
                name: 'name',
                type: 'input',
                message: 'What is your name?'
            },
            {
                name: 'github',
                type: 'input',
                message: 'What is your GitHub username?'
            },
            {
                name: 'email',
                type: 'input',
                message: 'What is your email?'
            }
        ]);
}

const generate = async () => {
    // Waits for user to enter info to populate README file.
    let responses = await questions();

    // Checks to see if a current README file exists in the output folder.
    // fs is used to write information onto the README file.
    // More information on fs can be found at https://nodejs.org/api/fs.html
    if (fs.existsSync('./output/README.md')) {
        fs.unlinkSync('./output/README.md');
    }

    // Creates README string.
    const newLine = '\r\n';
    const toc = '* [Installation](#installation)' + newLine + '* [Usage](#usage)' + newLine + '* [Contributing](#contributing)' + newLine + '* [Tests](#tests)' + newLine + '* [License](#license)' + newLine + '* [Questions](#questions)';
    let mdString = '';
    let licenseContent;

    if (responses.license !== 'None') {
        if (responses.license === 'Other') {
            responses.license = responses.other;
        }
        mdString = `![License Badge](https://img.shields.io/badge/License-${responses.license}-green.svg)  ` + newLine;
        licenseContent = `©${responses.name}. This project is published under the ${responses.license} license.`;
    } else {
        licenseContent = `©${responses.name}. This project is not published under any license.`;
    }

    mdString =
        `# ${responses.title}  ` +
        newLine + mdString +
        responses.description +
        newLine + "## Table of Contents" +
        newLine + toc +
        newLine + "## Installation" +
        newLine + responses.installation +
        newLine + "## Usage" +
        newLine + responses.usage +
        newLine + "## Contributing" +
        newLine + responses.contributing +
        newLine + "## Tests" +
        newLine + responses.tests +
        newLine + "## License" +
        newLine + licenseContent +
        newLine + "## Questions" +
        newLine + `For questions, contact ${responses.name} at ${responses.email}.  
        To view other projects by me, visit my [GitHub account](https://github.com/${responses.github}).`;

    // Writes README.md file to output folder.
    fs.appendFileSync('./output/README.md', mdString);
    console.log('Your file has been created! You can find it in the output folder from the same directory as this program.');
}

// Starts the program for the user.
generate();