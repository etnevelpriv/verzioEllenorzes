// 6. lépés
//   Konzolos alkalmazás (licencek)
//   Készítsen egy Node.js-alapú konzolos alkalmazást, amelyben a felhasználótól bekéri:
//     egy licenc típusát,
//     valamint annak jelentését.
//   A megvalósításhoz hozzon létre egy külön osztályt, és építse be azt az alkalmazásba.
//   Az adatokat licenc.csv nevű fájlba mentse el pontosvessző (;) elválasztással.
//   A fájlba mentéskor rögzítse az adatrögzítés pontos dátumát és időpontját is.
//   Egészítse ki az alkalmazást validációval:
//     amennyiben a felhasználó üres választ ad, kérje be az adatot újra.
//   Listázza ki a licenc.txt fájl teljes tartalmát a konzolra.
//   A konzolos megjelenítést színezze:
//     a páratlan sorszámú sorok zöld színnel jelenjenek meg,
//     a páros sorszámú sorok piros színnel jelenjenek meg.

class License {
    constructor(type, meaning, date) {
        if (typeof type != 'string' || type === null || type === '' || type === undefined) {
            throw new Error(`Nem megfelelően van megadva a típus. : ${type}`);
        };
        if (typeof meaning != 'string' || meaning === null || meaning === undefined || meaning === '') {
            throw new Error(`Nem megfelelően van megadva a jelentés. : ${meaning}`);
        };
        if (date === null || date === undefined || date > Date()) {
            throw new Error(`Nem megfelelően van megadva a dátum. : ${date}`);
        };
        this.type = type;
        this.meaning = meaning;
        this.date = date;
    };
    toString() {
        return (`A licensz típusa: ${this.type}. A licensz jelentése: ${this.meaning}. Készítés dátuma: ${this.date}`)
    };
    toCSVFormat() {
        return (`\n${this.type};${this.meaning};${this.date}`)
    };
};

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const licenseInput = function () {
    readline.question('Mi a licensz típusa?', type => {
        readline.question('Mi a licensz jelentése?', meaning => {
            try {
                const license = new License(type, meaning, Date());
                saveLicense(license.toCSVFormat());
                console.log(license.toString())
                readline.close();
            } catch (err) {
                console.log(`Hibás adatok: ${err}\nPróbáld újra.`)
                licenseInput();
            };

        });
    });
};

const saveLicense = function (license) {
    try {
        const fs = require('fs')
        fs.appendFileSync('licenc.csv', license);
    } catch (err) {
        throw new Error(err);
    };
};

licenseInput();