import fetch from 'node-fetch';
import yargs from 'yargs';

// Определение параметра -m
const argv = yargs(process.argv.slice(2))
    .options('m', {
        alias: 'message', // Синоним -m
        describe: 'Текст сообщения',
        demandOption: true, // Обязательный параметр
        type: 'string', // Ожидается строковое значение
    }).options("t", {
        alias: 'type',
        describe: 'Тип сообжения',
        demandOption: true,
        type: 'boolean'
    }).option("a", {
        alias: 'anime',
        describe: 'Аниме которые были добавлены',
        demandOption: false,
        type: 'array'
    }).check((args) => {
        if (args.t && !args.a) {
            throw new Error('Параметр -a обязателен, если -t true');
        }
        return true;
    }).argv;


//Ссервер на Telegram Bot 
const URL_TELEGRAM = '';


console.log(argv);

// Выводим текст сообщения
const message = argv.message;
console.log(`Текст сообщения: ${message}`);

if (argv.t) {
    SendComplete({ anime: argv.a });
}

if (!argv.t) {
    SendError({error: argv.m});
}


async function SendComplete({ title = "Trailers", anime } = {}) {
    try {
        const date = `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`;
        fetch(`${URL_TELEGRAM}/trailers`, { body: new URLSearchParams({ title, anime, date }), method: 'POST' });
    } catch (error) {

    }
}

async function SendError({ file = 'index.js', title = "Trailers", error = "No text" } = {}) {
    try {
        const date = `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`;
        fetch(`${URL_TELEGRAM}/error`, { body: new URLSearchParams({ title, file, date, 'stack': error }), method: 'POST' });
    } catch {

    }
}