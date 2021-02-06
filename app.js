const inquirer = require('inquirer');

inquirer
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
            message: 'List the names of the contributors to this project.'
        },
        {
            name: 'tests',
            type: 'input',
            message: 'What tests can the user use?'
        }
    ]);