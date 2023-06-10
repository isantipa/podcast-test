//Por ahora vamos a dejar esto así como idea. No tengo muy claro si lo usaré así o haré las llamadas por otro lado.

const TOP_PODCASTS_URL =
    'https://allorigins.win/get?url=https%3A//itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export async function getTopPodcasts() {
    const cachedData = localStorage.getItem('podcastData');
    const cachedTime = localStorage.getItem('podcastDataTime');

    if (cachedData && cachedTime && new Date().getTime() - cachedTime < 24 * 60 * 60 * 1000) {
        return JSON.parse(cachedData);
    }

    const response = await fetch(TOP_PODCASTS_URL);
    const data = await response.json();

    localStorage.setItem('podcastData', JSON.stringify(data));
    localStorage.setItem('podcastDataTime', new Date().getTime().toString());

    return data;
}
