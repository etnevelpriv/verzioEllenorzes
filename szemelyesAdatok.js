// 5. lépés
//   Konzolos alkalmazás (személyes adatok)
//   Készítsen egy Node.js-alapú konzolos alkalmazást, amely egyetlen JavaScript fájlban valósul meg.
//   A program futásakor kérje be a felhasználó nevét és életkorát.
//   Hozzon létre egy osztályt az adatok tárolására, majd példányosítsa azt.
//   A megadott adatokat írja ki a konzolra egy összefüggő mondat formájában.
//   Minden adatbekérés után mentse el az adatokat egy fájlba.
//   A program futása során listázza ki a konzolra az eddig eltárolt adatokat.

class Felhasznalo {
    constructor(name, age) {
        if (typeof name != 'string' || name === null || name === '' || name === undefined) {
            throw new Error(`Nem megfelelően van megadva a név. : ${name}`);
        };
        if (typeof age != 'number' || age === null || age === undefined || age <= 0) {
            throw new Error(`Nem megfelelően van megadva az életkor. : ${age}`);
        };
        this.name = name;
        this.age = age;
    };
    toString() {
        return (`A felhasználó neve: ${this.name}. A felhasználó életkora: ${this.age}`)
    };
};

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const userInputs = function () {
    readline.question('Hogy hívnak?', name => {
        readline.question('Hány éves vagy?', age => {
            console.log(name, age);
            const user = new Felhasznalo(name, Number(age));
            saveUser(user);
            readline.close();
        });
    });
};

const saveUser = function (user) {
    try {
        const fs = require('fs')
        const jsonFile = JSON.parse(fs.readFileSync('data.json').toString());
        jsonFile.users.push(user);
        fs.writeFileSync('data.json', JSON.stringify(jsonFile));
        console.log(fs.readFileSync('data.json').toString());
    } catch (err) {
        throw new Error(err);
    };
};

userInputs();