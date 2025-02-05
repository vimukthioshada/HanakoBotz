const fetch = require('node-fetch')

let deku = async (m, {
    client,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {

    if (!text.includes('www.mediafire.com')) throw 'Link Mf Nya?'

    const ya = await fetch(`https://api.ryzendesu.vip/api/downloader/mediafire?url=${text}`)

    const mf = await ya.json()

    if (!mf) return m.reply('maaf link Mf failed')

    let caption = ` - 々 \`[ Downloader - Mediafire ]\` 々 -\n\n`
    caption += `> FileName: ${mf.filename}
> Ready: ${mf.ready}
> Created: ${mf.created}
> Desc: ${mf.description}
> Size: ${mf.size}
> Mimetype: ${mf.mimetype}
> Owner: ${mf.owner}

> Otw Di Kirim File nya
`

    m.reply(Func.Styles(caption))

    await client.sendMessage(m.cht, {
        document: {
            url: mf.download
        },
        mimetype: mf.mimetype,
        fileName: mf.filename
    }, {
        quoted: m.fkontak
    })

}

deku.command = "mediafire"
deku.alias = ["mf", "mfdl"]
deku.category = ["downloader"]
deku.settings = {
    limit: true
}
deku.description = "Mendownload File MediaFire"
deku.loading = true

module.exports = deku
