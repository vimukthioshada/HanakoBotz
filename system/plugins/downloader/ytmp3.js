const yts = require("yt-search");
const ytdl = require('ytdl-core')
const axios = require('axios')

let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {

    if (!text.includes('youtu')) throw "Link Contoh .ytmp3 <link>";

    const videoId = await ytdl.getURLVideoID(text)
    let result = await yts({
        videoId: videoId,
        hl: 'id',
        gl: 'ID'
    })

    if (!result.url || !result) {
        m.reply(Func.Styles('maaf ga ketemu...'))
    }

    let hah = result.url;
    let deku = Func.Styles(`⏤͟͟͞͞╳── *[ yta - download ]* ── .々─ᯤ\n`)
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
    })

    try {
        const {
            result
        } = await Scraper.y2ts.dl(text)
        await sock.sendMessage(m.cht, {
            audio: {
                url: result.mp3
            },
            mimetype: 'audio/mpeg'
        }, {
            quoted: m
        })
    } catch (err) {
        try {
            const {
                downloadUrl
            } = await Scraper.ddownr.download(text, 'mp3')
            await sock.sendMessage(m.cht, {
                audio: {
                    url: downloadUrl
                },
                mimetype: 'audio/mpeg'
            }, {
                quoted: m
            })
        } catch (err) {
            m.reply('error' + err)
        }
    }
    m.react('✅')
}

deku.command = "ytmp3"
deku.alias = ["yta", "yt-audio"]
deku.category = ["downloader"]
deku.settings = {
    limit: true
}
deku.description = "Mendownload YouTube Audio"
deku.loading = true

module.exports = deku