const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Hogy hívnak??', name => {
    readline.question('Hány éves vagy?', age => {
        console.log(name,age)
        readline.close();
    });
});