var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var secrets = require('./secrets.js');

var Hipchatter = require('hipchatter');
var hipchatter = new Hipchatter(secrets.hipchatApiToken);

var interns = [
    'AaronRubens',
    'AlexRodrigues',
    'BenKraft',
    'charlie',
    'david',
    'DavidKong',
    'elizabethlin',
    'ilan',
    'jared',
    'JessieDuan',
    'Jonas',
    'JonathanEng',
    'kasra',
    'kevin',
    'MadeleineTraver',
    'miles',
    'pgao',
    'RebeccaYeoh',
    'ShaneKeller',
    'ShyanKashani',
    'vivek'
];

// Only gen 1 for now--should we add gen 2/beyond?
var colorsAndPokemon = {
    'yellow': [ // Electric
        'Pikachu',
        'Raichu',
        'Magnemite',
        'Magneton',
        'Voltorb',
        'Electrode',
        'Electabuzz',
        'Jolteon',
        'Zapdos'
    ],
    'green': [ // Grass
        'Bulbasaur',
        'Ivysaur',
        'Venusaur',
        'Oddish',
        'Gloom',
        'Vileplume',
        'Bellsprout',
        'Weepinbell',
        'Victreebell',
        'Exeggcute',
        'Exeggutor',
        'Tangela'
    ],
    'red': [ // Fire
        'Charmander',
        'Charmeleon',
        'Charizard', // The best!
        'Charizard', // So let's double its probability
        'Vulpix',
        'Ninetales',
        'Growlithe',
        'Arcanine',
        'Ponyta',
        'Rapidash',
        'Magmar',
        'Flareon',
        'Moltres'
    ],
    'purple': [ // Psychic
        'Abra',
        'Kadabra',
        'Alakazam',
        'Drowzee',
        'Hypno',
        'Mr. Mime',
        'Mewtwo',
        'Mew'
    ],
    'gray': [ // Normal
        'Pidgey',
        'Pidgeotto',
        'Pidgeot',
        'Rattata',
        'Raticate',
        'Spearow',
        'Fearow',
        'Jigglypuff',
        'Wigglytuff',
        'Meowth',
        'Persian',
        'Farfetch\'d',
        'Doduo',
        'Dodrio',
        'Lickitung',
        'Chansey',
        'Kangaskhan',
        'Tauros',
        'Ditto',
        'Eevee',
        'Porygon',
        'Snorlax'
    ]
};

app.post('/intern', function(req, res) {
    var name = req.body.item.sender.mention_name;
    if (interns.indexOf(name) < 0) {
        // I found out how to do randomness in Javascript from
        // http://stackoverflow.com/questions/2532218/
        //                  pick-random-property-from-a-javascript-object
        var colors = Object.keys(colorsAndPokemon);
        var color = colors[colors.length * Math.random() << 0];
        var pokemon = colorsAndPokemon[color];
        var chosenPokemon = pokemon[pokemon.length * Math.random() << 0];
        hipchatter.notify(
            22581,
            {
                message: 'A wild full-timer appeared! ' +
                         chosenPokemon + ', I choose you!',
                token: secrets.hipchatNotificationToken,
                color: color
            }, function(err) {
            }
        );
    }
    res.send(200);
});

app.listen(80);
