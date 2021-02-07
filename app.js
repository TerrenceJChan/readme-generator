const fs = require('fs');
const inquirer = require('inquirer');
const { resolve } = require('path');
const { stringify } = require('querystring');

let questions = () => {
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
    let responses = await questions();

    if (fs.existsSync('./output/README.md')) {
        fs.unlinkSync('./output/README.md');
    }

    const newLine = "\r\n";

    // Creates README string.
    let mdString =
        "## Table of Contents" +
        newLine + "* [Description](#description)\r\n* [Installation](#installation)\r\n* [Usage](#usage)\r\n* [License](#license)\r\n* [Contributing](#contributing)\r\n* [Tests](#tests)\r\n" +
        newLine + "## Description" +
        newLine + responses.description +
        newLine + "## Installation" +
        newLine + responses.installation +
        newLine + "## Usage" +
        newLine + responses.usage +
        newLine + "## Contributing" +
        newLine + responses.contributing +
        newLine + "## Tests" +
        newLine + responses.tests;

    // console.log(template);
    fs.appendFileSync('./output/README.md', mdString);
}

generate();