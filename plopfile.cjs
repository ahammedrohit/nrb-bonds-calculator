// eslint-disable-next-line no-undef
module.exports = (plop) => {
    plop.setGenerator('component', {
        description: 'Create a component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your component name?',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
                templateFile: 'plop-templates/component.hbs',
            }
        ],
    }
    ),
        plop.setGenerator('page', {
            description: 'Create a page',
            prompts: [
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is your page name?',
                },
            ],
            actions: [
                {
                    type: 'add',
                    path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.tsx',
                    templateFile: 'plop-templates/page.hbs',
                },
            ],
        }
        ),
        plop.setGenerator('hook', {
            description: 'Create a hook',
            prompts: [
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is your hook name?',
                },
            ],
            actions: [
                {
                    type: 'add',
                    path: 'src/hooks/{{pascalCase name}}/{{pascalCase name}}.tsx',
                    templateFile: 'plop-templates/hook.hbs',
                },
                {
                    type: 'add',
                    path: 'src/hooks/{{pascalCase name}}/{{pascalCase name}}.module.css',
                    templateFile: 'plop-templates/default.hbs',
                },
                {
                    type: 'add',
                    path: 'src/hooks/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
                    templateFile: 'plop-templates/test.hbs',
                },
                {
                    type: 'add',
                    path: 'src/hooks/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
                    templateFile: 'plop-templates/story.hbs'
                },
            ],
        }),
        plop.setGenerator('interface', {
            description: 'Create a interface',
            prompts: [
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is your interface name?',
                },
            ],
            actions: [
                {
                    type: 'add',
                    path: 'src/interfaces/{{pascalCase name}}/{{pascalCase name}}.tsx',
                    templateFile: 'plop-templates/interface.hbs',
                },
            ],
        }),
        plop.setGenerator('store', {
            description: 'Create a store',
            prompts: [
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is your store name?',
                },
            ],
            actions: [
                {
                    type: 'add',
                    path: 'src/store/{{pascalCase name}}/{{pascalCase name}}.tsx',
                    templateFile: 'plop-templates/store.hbs',
                },
            ],
        })

}
