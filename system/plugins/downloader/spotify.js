const axios = require("axios");

let rinokumura = {
    command: "spotify",
    alias: ["spdl"],
    category: ["downloader"],
    settings: {
        limit: true
    },
    loading: true,
    async run(m, {
        sock,
        client,
        conn,
        DekuGanz,
        Func,
        Scraper,
        text,
        config
    }) {
        const quoted = m.quoted ? m.quoted : m;
        if (!quoted.text) return m.reply('> masukan link/query/reply')

        if (/open.spotify.com/.test(quoted.text)) {
            await spotify.getMetadata(quoted.text).then(async (a) => {
                let captions = `📁 Download Spotify
> • Title: ${a.data.title}
> • Artist: ${a.data.artists}
> • Album: ${a.data.album}
> • Link: ${a.data.link}`
                m.reply(captions)

                const dl = await spotify.download(a.data.link)
                sock.sendMessage(m.cht, {
                    audio: {
                        url: dl.data.link
                    },
                    mimetype: 'audio/mpeg',
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: !0,
                        forwardingScore: 127,
                        externalAdReply: {
                            title: a.data.title,
                            body: a.data.artists + ' / ' + a.data.id,
                            mediaType: 1,
                            thumbnailUrl: a.data.cover_url,
                            renderLargerThumbnail: false,
                            sourceUrl: dl.data.link
                        }
                    }
                }, {
                    quoted: m
                })
            })
        } else if (quoted.text) {
            search(quoted.text).then(async (a) => {
                let no = 1
                let captions = `🔍 Search Spotify\n`
                for (let i of a) {
                    captions += `> • - - - \`[ ${no++} ]\` - - -
> • Title: ${i.title}
> • Artist: ${i.artist}
> • Id: ${i.id}
> • Link: ${i.url}\n\n`
                }
                await sock.sendAliasMessage(m.cht, {
                    text: captions
                }, a.map((a, i) => ({
                    alias: `${i + 1}`,
                    response: `${m.prefix + m.command} ${a.url}`
                })), m);
            })
        } else m.reply('gagal dl sama metadata nya😂')
    }
}

module.exports = rinokumura

const spotify = {
    getMetadata: async (url) => {
        let {
            data
        } = await axios.post(`https://spotifydown.app/api/metadata?link=${url}`, {}, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.9",
                "Content-Type": "application/json",
                "Origin": "https://spotifydown.app",
                "Referer": "https://spotifydown.app/",
                "Connection": "keep-alive",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            }
        });
        return data;
    },

    download: async (track) => {
        const {
            data: get
        } = await spotify.getMetadata(track)
        let {
            data
        } = await axios.get(`https://spotifydown.app/api/download?link=${track}&n=${get.title}&a=${get.artists}`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.9",
                "Content-Type": "application/json",
                "Origin": "https://spotifydown.app",
                "Referer": "https://spotifydown.app/",
                "Connection": "keep-alive",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            }
        });
        return data;
    }
};

const client_id = "acc6302297e040aeb6e4ac1fbdfd62c3";
const client_secret = "0e8439a1280a43aba9a5bc0a16f3f009";
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

async function spotifyCreds() {
    try {
        const response = await axios.post(
            TOKEN_ENDPOINT,
            "grant_type=client_credentials", {
                headers: {
                    Authorization: "Basic " + basic
                },
            },
        );
        return {
            status: true,
            data: response.data,
        };
    } catch (error) {
        return {
            status: false,
            msg: "Failed to retrieve Spotify credentials."
        };
    }
}

const toTime = (ms) => {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
};

const search = async(query, type = "track", limit = 20) => {
        try {
            const creds = await spotifyCreds();
            if (!creds.status) return creds;

            const response = await axios.get(
                `https://api.spotify.com/v1/search?query=${encodeURIComponent(query)}&type=${type}&offset=0&limit=${limit}`, {
                    headers: {
                        Authorization: "Bearer " + creds.data.access_token
                    },
                },
            );

            if (
                !response.data[type + "s"] ||
                !response.data[type + "s"].items.length
            ) {
                return {
                    msg: "Music not found!"
                };
            }

            return response.data[type + "s"].items.map((item) => ({
                title: item.name,
                id: item.id,
                duration: toTime(item.duration_ms),
                artist: item.artists.map((artist) => artist.name).join(" & "),
                url: item.external_urls.spotify,
            }));
        } catch (error) {
            return {
                status: false,
                msg: "Error searching for music. " + error.message,
            };
        }
    };
