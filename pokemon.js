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

    readline.question('\nMi a pokemon neve?', name => {
        readline.question('Mi a pokemon tipusa?', type => {
            readline.question('Mi a pokemon szintje?', level => {
                // console.log(name,type,level)
                if (isNaN(Number(level))) {
                    console.log('Szintnek szamot kell megadni.')
                    readline.close();
                    pokemonAdatainakBekerese();
                    return;
                };
                pokemonAdatainakMentese(name, type, level);
                readline.close();
            });
        });
    });
};

const pokemonAdatainakMentese = function (name, type, level) {
    const ujSzerzemeny = `${name};${type};${level}`
    const fs = require("node:fs");
    fs.appendFileSync('pokemonok.csv', `\n${ujSzerzemeny}`);

    const rawFile = fs.readFileSync('pokemonok.csv').toString();
    const lines = rawFile.split(`\n`).slice(1);
    const sajatPokemonokListaja = [];
    const pokemonokSzama = lines.length;
    const legerosebbPokemonjaim = [];
    const pokemonjaimSzintSzerintiSorrendben = [];
    for (let i = 0; i < lines.length; i++) {
        // console.log(lines[i]);
        const name = lines[i].split(';')[0];
        const type = lines[i].split(';')[1];
        const level = Number(lines[i].split(';')[2]);
        sajatPokemonokListaja.push(name);

        if (legerosebbPokemonjaim.length == 0) {
            legerosebbPokemonjaim.push({
                nev: name,
                szint: level
            });
        } else if (legerosebbPokemonjaim[0].szint <= level) {
            if (legerosebbPokemonjaim[0].szint < level) {
                legerosebbPokemonjaim.length = 0;
            };
            legerosebbPokemonjaim.push({
                nev: name,
                szint: level
            });
        };

        pokemonjaimSzintSzerintiSorrendben.push({
            nev: name,
            tipus: type,
            szint: level
        });
    };

    for (let i = 0; i < pokemonjaimSzintSzerintiSorrendben.length-1; i++) {
        for (let j = i+1; j < pokemonjaimSzintSzerintiSorrendben.length; j++) {
            if (pokemonjaimSzintSzerintiSorrendben[j].szint > pokemonjaimSzintSzerintiSorrendben[i].szint) {
                const seged = pokemonjaimSzintSzerintiSorrendben[i];
                pokemonjaimSzintSzerintiSorrendben[i] = pokemonjaimSzintSzerintiSorrendben[j];
                pokemonjaimSzintSzerintiSorrendben[j] = seged;
            };
        };
    };

    console.log(ujSzerzemeny);
    console.log(sajatPokemonokListaja);
    console.log(pokemonokSzama);
    console.log(legerosebbPokemonjaim);
    console.log(pokemonjaimSzintSzerintiSorrendben);
};

pokemonAdatainakBekerese();