import json
import os
import youtube_dl
import git
from urllib.parse import urlparse, parse_qs

urls = [
    {"url": 'https://www.youtube.com/watch?v=Oqxm1mn917g', "anime": { "name": "Папаши-дружбаны", "raiting": "7.68", "url": "53411"}},
    {"url": 'https://www.youtube.com/watch?v=yr0YpMLsEaA', "anime": { "name": "Непризнанный школой... 2", "raiting": "0.00", "url": "48418"}},
    {"url": 'https://www.youtube.com/watch?v=tfzsmLzyAVw', "anime": { "name": "Ложные выводы 2", "raiting": "7.14", "url": "44204"}},
    {"url": 'https://www.youtube.com/watch?v=P5siWdBumBg', "anime": { "name": "Мой братик теперь не братик!", "raiting": "7.15", "url": "51678"}},
    {"url": 'https://www.youtube.com/watch?v=2eOg5DoYuwU', "anime": { "name": "ファイトソング", "raiting": "10.0", "url": ""}}
]

data = {}

def get_video_urls(url, anime):
    # Set the options for the download
    options = {
        'nocheckcertificate': True,
    }

    # Create the youtube_dl downloader object
    ydl = youtube_dl.YoutubeDL(options)

    # Get information about the video
    info = ydl.extract_info(url, download=False)

    # Get the list of available formats
    formats = info['formats']

    id = video_id(url)
    
    

    print(''.join(id));
    # Find the best audio format in M4A format
    best_audio_format = None
    for f in formats:
        if f['acodec'] == 'mp4a.40.2' and (best_audio_format is None or f.get('abr', 0) > best_audio_format.get('abr', 0)):
            best_audio_format = f

   # Find the best video format with a height of 720 pixels or less
    best_video_format = None
    for f in formats:
        if f['height'] != None and f['ext'] == "mp4" and f.get('height', 0) <= 720 and (best_video_format is None or f.get('height', 0) > best_video_format.get('height', 0)):
            best_video_format = f

    data[id] = {
        "url": url,
        "img": "https://img.youtube.com/vi/"+id+"/hq720.jpg",
        "audio": best_audio_format['url'],
        "video": best_video_format['url'],
        "anime": anime
    }
    # Return the URLs of the audio and video formats
    return (best_audio_format['url'], best_video_format['url'])

def video_id(value):
    query = urlparse(value)
    if query.hostname == 'youtu.be':
        return query.path[1:]
    if query.hostname in ('www.youtube.com', 'youtube.com'):
        if query.path == '/watch':
            p = parse_qs(query.query)
            return p['v'][0]
        if query.path[:7] == '/embed/':
            return query.path.split('/')[2]
        if query.path[:3] == '/v/':
            return query.path.split('/')[2]
    # fail?
    return None

for u in urls:
    get_video_urls(u["url"], u["anime"])

print(data);

# Serialize the dictionary as JSON
json_data = json.dumps(data)

# Save JSON to file
with open("data.json", "w") as f:
    f.write(json_data)

# Update repository
repo = git.Repo(".")
repo.git.add("data.json")
repo.git.commit(message="Added data.json")
repo.git.push()