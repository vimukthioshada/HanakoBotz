const yts = require('yt-search')
const ytdl = require('ytdl-core')

class Command {
    constructor() {
        this.command = "ytmp4"
        this.alias = [
            "ytv",
            "yt-video"
        ]
        this.category = [
            "downloader"
        ]
        this.settings = {
            limit: true
        }
        this.description = "Mendownload YouTube Video"
        this.loading = true
    }
    run = async (m, {
        sock,
        client,
        conn,
        DekuGanz,
        Func,
        Scraper,
        text,
        config
    }) => {
        if (!text.includes('youtu')) throw `Link Contoh ${m.prefix + m.command} <link>`;
        const videoId = await ytdl.getURLVideoID(text)
        if (!videoId) return m.reply(Func.Styles('Maaf VideoId nya ga valid'))
        let result = await yts({
            videoId: videoId,
            hl: 'id',
            gl: 'ID'
        })

        let hah = result.url;
        let deku = Func.Styles(`⏤͟͟͞͞╳── *[ ytv - download ]* ── .々─ᯤ\n`)
        deku += `│    =〆 ᴛɪᴛʟᴇ: ${result.title}\n`
        deku += `│    =〆 ɪᴅ: ${result.videoId}\n`
        deku += `│    =〆 ᴅᴜʀᴀsɪ: ${result.timestamp}\n`
        deku += `│    =〆 ᴀɢᴏ: ${result.ago}\n`
        deku += `│    =〆 ᴅᴇsᴄʀɪᴘᴛɪᴏɴ: ${result.description}\n`
        deku += `│    =〆 ᴜʀʟ: ${result.url}\n`
        deku += `⏤͟͟͞͞╳────────── .✦`

        await sock.sendMessage(m.cht, {
            text: deku,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: result.title,
                    mediaType: 1,
                    previewType: 1,
                    body: `Durasi : ${result.timestamp} / View : ${result.views}`,
                    thumbnailUrl: result.image,
                    renderLargerThumbnail: true,
                    mediaUrl: result.url,
                    sourceUrl: result.url
                }
            }
        }, {
            quoted: m
        });

        let capt = ` =〆 ᴛɪᴛʟᴇ: ${result.title}\n`
        capt += ` =〆 ɪᴅ: ${result.videoId}\n`
        capt += ` =〆 ᴅᴜʀᴀsɪ: ${result.timestamp}\n`
        capt += ` =〆 ᴀɢᴏ: ${result.ago}\n`
        capt += ` =〆 ᴜʀʟ: ${result.url}`

        try {
            const {
                link
            } = await Scraper.ytmp3cc(text, 'mp4')
            sock.sendMessage(m.cht, {
                video: {
                    url: link
                },
                mimetype: 'video/mp4',
                fileName: result.title + '.mp4',
                caption: capt
            }, {
                quoted: m
            })
        } catch (err) {
            try {
                const {
                    downloadUrl
                } = await Scraper.ddownr.download(text, '720')
                sock.sendMessage(m.cht, {
                    video: {
                        url: downloadUrl
                    },
                    mimetype: 'video/mp4',
                    fileName: result.title + '.mp4',
                    caption: capt
                }, {
                    quoted: m
                })
            } catch (err) {
                m.reply('error' + err)
            }
        }
        m.react('✅')
    }
}

module.exports = new Command();
