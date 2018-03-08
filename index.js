#!/usr/bin/env node

const axios = require('axios');
const cheerio = require('cheerio');
const figlet = require('figlet');


axios
    .get(
    'http://www.citura.fr/fr/NextDeparture/logicalstop?logicalId=1210'
    )
    .then(res => {
        const $ = cheerio.load(res.data);
        let depart = $('.list-next-departure-link').text();
        let trimDepart = depart.replace(/  +/g, '').replace(/\n\n+/g, ' ').replace(/Bus/g, '');
        if (!trimDepart) {
            trimDepart = 'Pas de prochain départ'
        }
        figlet('ligne 3', function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data)
            console.log(trimDepart);
        });
    })
    .catch(err => console.log(err));