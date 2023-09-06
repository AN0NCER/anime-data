import ytdl from 'ytdl-core';
import { google } from 'googleapis';
import fetch from 'node-fetch';
import fs from 'fs';
import simpleGit from 'simple-git';

// ID канала, с которого хотите получить видео
const CHANNEL_ID = 'UC6pGDc4bFGD1_36IKv3FnYg';
// Количество видео, которое хотите получить
const MAX_RESULTS = 5;

// Создаем клиент YouTube Data API
const youtube = google.youtube({
    version: 'v3',
    auth: ''
});

const git = simpleGit();

// Функция для получения списка видео с канала
async function getChannelVideos() {
    try {
        const response = await youtube.search.list({
            channelId: CHANNEL_ID,
            part: 'snippet',
            order: 'date',
            maxResults: MAX_RESULTS,
            q: '"OFFICIAL TRAILER" OR "OFFICIAL TEASER"', // Запрос на фильтрацию по названиям
        });

        const videos = response.data.items;
        return videos;
    } catch (error) {
        console.error('Error fetching channel videos:', error.message);
        return [];
    }
}

async function anylizyVideo(id) {
    console.log('Loadig Video Id: ' + id);
    const info = await ytdl.getInfo(id);
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    console.log('Loaded video');
    return {
        audioUrl: audioFormat.url,
        videoUrl: videoFormat.url,
        thumbinalUrl: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url
    }
}

async function GetShikimoriGraphql(name) {
    console.log('Search Anime: ' + name);

    const response = await fetch('https://shikimori.me/api/graphql', {
        method: 'POST',
        "headers": {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: "{\"operationName\":null,\"query\":\"{animes(search:\\\""+name+"\\\", limit: 1,kind: \\\"!special\\\",status: \\\"!released\\\"){id,russian,score,kind,status,season,studios{name}}}\",\"variables\":{}}"
    });

    if (response.status == 429) {
        await sleep(1000);
        console.log('Sleep: 1000');
        return GetShikimoriGraphql(name);
    }
    console.log('Status code: ' + response.status);
    const data = await response.json();
    console.log('Return Data Length: ' + data.data.animes.length);
    return data.data.animes;
}

async function GetShikimori(name) {
    console.log('Search Anime: ' + name);
    const response = await fetch(`https://shikimori.me/api/animes?limit=1&search=${name}`);
    if (response.status == 429) {
        await sleep(1000);
        console.log('Sleep: 1000');
        return GetShikimori(name);
    }
    const data = await response.json();
    console.log('Return Data Length: ' + data.length);
    return data;
}

async function updateRepository(info_count) {
    try {
        // Обновляем репозиторий (получаем изменения из удаленного репо)
        await git.pull();

        // Добавляем файл data.json в индекс
        await git.add('data.json');

        // Создаем коммит с сообщением, в котором используется значение info_count
        await git.commit(`Updated data.json, anime ${info_count}`);

        // Отправляем коммиты на удаленный репозиторий
        await git.push();

        console.log('Repository update successful!');
    } catch (error) {
        console.error('Error updating repository:', error);
    }
}

let data = {};

// Пример использования функции
getChannelVideos()
    .then(async (videos) => {
        data = {};
        for (let index = 0; index < videos.length; index++) {
            const video = videos[index];
            const id = video.id.videoId;
            const shiki = await GetShikimoriGraphql(extractTitleFromText(video.snippet.title))
            const formats = await anylizyVideo(id);

            if (shiki.length != 0 && formats) {
                console.log("Add data: " + id);
                data[id] = {
                    url: `https://www.youtube.com/watch?v=${id}`,
                    "img": formats.thumbinalUrl,
                    "audio": formats.audioUrl,
                    "video": formats.videoUrl,
                    "anime": {
                        "name": shiki[0].russian,
                        "raiting": shiki[0].score,
                        "id": shiki[0].id,
                        "score": shiki[0].score,
                        "kind": shiki[0].kind,
                        "status": shiki[0].status,
                        "season": shiki[0].season,
                        "studio": shiki[0].studios[0].name
                    }
                }
            }
        }
        console.log(data);
        fs.writeFileSync('data.json', JSON.stringify(data));
        updateRepository(Object.keys(data).length)
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });

function extractTitleFromText(text) {
    const match = text.match(/^(.*?)\s*\|/);
    return match ? match[1].trim() : null;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}