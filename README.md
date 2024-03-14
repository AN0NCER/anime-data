# Anime Data

The repository serves the site [Tunime](https://an0ncer.github.io), enriching it with data from the anime world.

## Trailers Data

<details>
  <summary>Anime Data v1.0 (1.9.8)</summary>

  <code><strong>URL:</strong> https://raw.githubusercontent.com/AN0NCER/anime-data/main/data.json</code>

  <pre><span class="pl-kos">{</span>
    <span class="pl-c1">keys</span>:<span class="pl-kos">{</span>
        <span class="pl-c1">url</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
        <span class="pl-c1">img</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
        <span class="pl-c1">audio</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
        <span class="pl-c1">video</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
        <span class="pl-c1">anime</span>:<span class="pl-kos">{</span>
            <span class="pl-c1">name</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
            <span class="pl-c1">eng</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
            <span class="pl-c1">raiting</span>: <span class="pl-s1">number</span><span class="pl-kos">,</span>
            <span class="pl-c1">id</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
            <span class="pl-c1">score</span>: <span class="pl-s1">number</span><span class="pl-kos">,</span>
            <span class="pl-c1">kind</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
            <span class="pl-c1">status</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
            <span class="pl-c1">season</span>: <span class="pl-s1">string</span> <span class="pl-c1">|</span> <span class="pl-c1">undefined</span><span class="pl-kos">,</span>
            <span class="pl-c1">studio</span>: <span class="pl-s1">string</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>
<span class="pl-kos">}</span></pre>
</details>

<details>
  <summary>Anime Data v2.0 (2.0.0)</summary>

  <code><strong>URL:</strong> https://raw.githubusercontent.com/AN0NCER/anime-data/main/data-v2.json</code>

  <pre><span class="pl-kos">[</span>
    <span class="pl-kos">{</span>
        <span class="pl-c1">id</span>: string
        <span class="pl-s1">youtube</span>: <span class="pl-kos">{</span>
            <span class="pl-s1">link</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
            <span class="pl-c1">preview</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
            <span class="pl-c1">video</span>: <span class="pl-s1">string</span>
        <span class="pl-kos">}</span>
        <span class="pl-s1">anime</span>: <span class="pl-kos">{</span>
            <span class="pl-s1">eng</span>: string<span class="pl-kos">,</span>
            <span class="pl-s1">rus</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
            <span class="pl-s1">kind</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
            <span class="pl-s1">status</span>: <span class="pl-s1">string</span><span class="pl-kos">,</span>
            <span class="pl-s1">studio</span>: <span class="pl-s1">string</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>
<span class="pl-kos">]</span></pre>
</details>