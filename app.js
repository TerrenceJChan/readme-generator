const fs = require('fs');
const inquirer = require('inquirer');
const { resolve } = require('path');
const { stringify } = require('querystring');
const template = require('./utils/template.json')

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
    const writeContent = template.description.content;
    // fs.writeFile('./output/README.md', stringify(responses), (err) => {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log('Check the output folder for your new README.md file!');
    // })

    console.log(responses);
    template.description.content = responses.description;
    template.installation.content = responses.installation;
    template.usage.content = responses.usage;
    template.contributing.content = responses.contributing;
    template.tests.content = responses.tests;

    console.log(template);
}

generate();