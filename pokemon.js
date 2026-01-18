// 7. lépés - önálló feladat:

//         Feladat – Pokémon nyilvántartó alkalmazás

//             Készíts egy konzolos alkalmazást, ami:

//             Bekéri a felhasználótól új Pokémon adatait: név, típus, szint.

//             Egy pokemonok.csv fájlba írja a rekordot CSV formátumban.

//             Kiolvassa a CSV fájl összes tartalmát és listázza a konzolon.

//             Készíts az alkalmazáshoz menüt és egészítsd ki a szükséges funkciókkal:
//             1. Új szerzemény
//             2. Saját Pokémonjaim listája
//             3. Pokémonjaim száma
//             4. Legerősebb Pokémon(jaim)
//             5. Pokémonjain szint szerinti sorrendben

//         CSV példa:

//             név;típus;szint;
//             Pikachu;Elektromos;15;
//             Charmander;Tűz;12;
//             Bulbasaur;Fű;10;

'use strict';

const pokemonAdatainakBekerese = function () {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Mi a pokemon neve?', name => {
        readline.question('Mi a pokemon tipusa?', type => {
            readline.question('Mi a pokemon szintje?', level => {
                // console.log(name,type,level)
                pokemonAdatainakMentese(name, type, level);
                readline.close();
            });
        });
    });
};

const pokemonAdatainakMentese = function (name, type, level) {
    const fs = require("node:fs");
    fs.appendFileSync('pokemonok.csv', `\n${name};${type};${level}`);
};

pokemonAdatainakBekerese();