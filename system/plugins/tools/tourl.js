const fetch = require("node-fetch");
const crypto = require("crypto");
const FormData = require("form-data");
const {
    fromBuffer
} = require("file-type");
const axios = require("axios");
const fakeUserAgent = require("fake-useragent");
const cheerio = require("cheerio");
const uloadUrlRegexStr = /url: "([^"]+)"/;
const randomBytes = crypto.randomBytes(5).toString("hex");
const fs = require('node:fs')

let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {

    let q = m.quoted ? m.quoted : m;
    if (!q) throw `kirim foto trus ketik .tourl \\ reply foto trus .tourl`;
    if (/jpg|jpeg|png/.test(q.msg.mimetype)) {

        let media = await (m.quoted ? m.quoted.download() : m.download())

        const {
            ext,
            mime
        } = await fromBuffer(media)

        let filename = './tmp/' + Date.now() + '.' + ext;
        fs.writeFileSync(filename, media);
        try {
            anomakiurl = await anomakiCdn(filename)
        } catch {
            anomakiurl = await Uploader.catbox(media)
        }
        fs.unlinkSync(filename);
        m.reply(anomakiurl)
    } else if (/audio|video|webp|sticker/.test(q.msg.mimetype)) {

        let media = await (m.quoted ? m.quoted.download() : m.download())

        const {
            ext,
            mime
        } = await fromBuffer(media)
        let filename = './tmp/' + Date.now() + '.' + ext;
        fs.writeFileSync(filename, media);
        let formData = new FormData();
        formData.append('file', fs.createReadStream(filename));
        formData.append('expirationOption', 'permanent');
        try {
            res = await fetch('https://Nauval.mycdn.biz.id/upload', {
                method: 'POST',
                body: formData
            })
        } catch {
            res = await Uploader.catbox(media)
        }
        let json = await res.json();

        fs.unlinkSync(filename);
        m.reply(json.fileUrl)
    } else {
        m.reply(`kirim foto trus ketik .tourl \\ reply foto trus .tourl`);
    }
}

deku.command = "tourl"
deku.alias = ["touploader"]
deku.category = ["tools"]
deku.settings = {
    limit: true
}
deku.description = "Mengconvert tourl media"
deku.loading = true

module.exports = deku

const createFormData = (content, fieldName, ext) => {
    const {
        mime
    } = fromBuffer(content) || {};
    const formData = new FormData();
    formData.append(fieldName, content, `${randomBytes}.${ext}`);
    return formData;
};

async function anomakiCdn(path) {
    if (!path) throw new Error("Masukkan Path Yang Benar.");

    try {
        const d = new FormData();
        d.append("files", fs.createReadStream(path));

        const headers = {
            headers: {
                ...d.getHeaders()
            }
        };

        const {
            data: p
        } = await axios.post("https://cdn.anomaki.web.id/api/upload", d, headers);
        const valid = "https://cdn.anomaki.web.id" + p[0].url;

        return valid;
    } catch (error) {
        throw new Error(error.message);
    }
}