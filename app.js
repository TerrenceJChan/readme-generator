const fs = require('fs');
const inquirer = require('inquirer');
const { resolve } = require('path');
const { stringify } = require('querystring');

// Asks the user a series of questions regarding their project.
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
                message: "Enter the application's usage instructions:"
            },
            {
                name: 'contributing',
                type: 'input',
                message: 'Explain the terms for contributors to help with your project.'
            },
            {
                name: 'tests',
                type: 'input',
                message: 'What tests can the user use?'
            }
        ]);
}

const generate = async () => {
    // Waits for user to enter info to populate README file.
    let responses = await questions();

    // Checks to see if a current README file exists in the output folder.
    if (fs.existsSync('./output/README.md')) {
        fs.unlinkSync('./output/README.md');
    }

    // Creates README string.
    const newLine = "\r\n";
    const toc = "* [Installation](#installation)" + newLine + "* [Usage](#usage)" + newLine + "* [Contributing](#contributing)" + newLine + "* [Tests](#tests)" + newLine + "* [License](#license)" + newLine + "* [Questions](#questions)";
    let mdString =
        "## Description" +
        newLine + responses.description +
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
        newLine + responses.license +
        newLine + "## Questions" +
        newLine + responses.license;

    // console.log(template);
    fs.appendFileSync('./output/README.md', mdString);
}

// Starts the program for the user.
generate();