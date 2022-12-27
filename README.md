# Python Synchronizer

This script fetches data from youtube video and puts it in `data.json`  which is used by [Tunime](https://an0ncer.github.io) website

This script uses libraries: **`youtube_dl`**, **`gitpython`**, and standard libraries

___

## Notes

This piece of code gets the video quality in 720p:

```python
# Find the best audio format in M4A format
best_audio_format = None
for f in formats:
    if f['acodec'] == 'mp4a.40.2' and (best_audio_format is None or f.get('abr', 0) > best_audio_format.get('abr', 0)):
        best_audio_format = f
```

This piece of code gets the best audio track:

```python
# Find the best video format with a height of 720 pixels or less
best_video_format = None
for f in formats:
    if f['height'] != None and f['ext'] == "mp4" and f.get('height', 0) <= 720 and (best_video_format is None or f.get('height', 0) > best_video_format.get('height', 0)):
        best_video_format = f
```

Then the audio and video are connected and played on the site