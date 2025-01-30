/**==================================
 - Script Case x Plugin By: Deku
 - Base Esce: nekobot - Axel-Network
==================================**/

const util = require("util");
const config = require("../settings.js");
const {
    exec
} = require("child_process");
const fs = require("node:fs");
const axios = require("axios");
const Func = require("../lib/function");
const {
    writeExif
} = require("../lib/sticker");
const {
    catbox
} = require("../lib/uploader");
const {
    downloadContentFromMessage
} = require('baileys');
const pkg = require("../lib/case");

module.exports = async (m, sock, store) => {
    const isCommand = m.prefix && m.body.startsWith(m.prefix);
    const quoted = m.isQuoted ? m.quoted : m;
    const Scraper = await scraper.list();
    await db.main(m);
    if (m.isBot) return;
    if (db.list().settings.self && !m.isOwner) return;


    if (m.isGroup && db.list().group[m.cht].mute) {
        if (!m.isAdmin && !m.isOwner) return
    }

    if (m.isGroup) {
        // Mute
        if (db.list().group[m.cht].mute && !m.isOwner && !m.isAdmin) {
            return
        }
    }

    let group = db.list().group[m.cht]
    if (typeof group !== 'object') db.list().group[m.cht] = {}
    if (group) {
        if (!('antilink' in group)) group.antilink = false
        if (!('antilinkgc' in group)) group.antilinkgc = false
        if (!('antilinkch' in group)) group.antilinkch = false
        if (!('antilinknumber' in group)) group.antilinknumber = false
        if (!('antitoxic' in group)) group.antitoxic = false
    } else {
        db.list().group[m.cht] = {
            antilink: false,
            antilinkgc: false,
            antilinkch: false,
            antilinknumber: false,
            antitoxic: false,
        }
    }

    if (db.list().group[m.cht].antilink) {
        if (m.body.match("http") && m.body.match("https")) {
            bvl = `Admin Mah Boleh Kirim Link Lain`
            if (m.isAdmin) return m.reply(bvl)
            if (m.key.fromMe) return m.reply(bvl)
            if (m.isOwner) return m.reply(bvl)
            await sock.sendMessage(m.cht, {
                delete: {
                    remoteJid: m.cht,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
            sock.sendMessage(m.cht, {
                text: `Woi Kontol Gausah Promosi Link Anjg Kek Punya Lu Aja Nih Grup😹`,
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            }, {
                quoted: m
            })
        }
    }

    if (db.list().group[m.cht].antilinkgc) {
        if (m.body.match("chat.whatsapp.com")) {
            bvl = `Admin Mah Boleh Kirim Link Lain`
            if (m.isAdmin) return m.reply(bvl)
            if (m.key.fromMe) return m.reply(bvl)
            if (m.isOwner) return m.reply(bvl)
            await sock.sendMessage(m.cht, {
                delete: {
                    remoteJid: m.cht,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
            sock.sendMessage(m.cht, {
                text: `Woi Kontol Gausah Promosi Link Anjg Kek Punya Lu Aja Nih Grup😹`,
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            }, {
                quoted: m
            })
        }
    }

    if (db.list().group[m.cht].antilinkch) {
        if (m.body.match("whatsapp.com")) {
            bvl = `Admin Mah Boleh Kirim Link Lain`
            if (m.isAdmin) return m.reply(bvl)
            if (m.key.fromMe) return m.reply(bvl)
            if (m.isOwner) return m.reply(bvl)
            await sock.sendMessage(m.cht, {
                delete: {
                    remoteJid: m.cht,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
            sock.sendMessage(m.cht, {
                text: `Woi Kontol Gausah Promosi Link Anjg Kek Punya Lu Aja Nih Grup😹`,
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            }, {
                quoted: m
            })
        }
    }

    if (db.list().group[m.cht].antilinknumber) {
        if (m.body.match("wa.me")) {
            bvl = `Admin Mah Boleh Kirim Link Lain`
            if (m.isAdmin) return m.reply(bvl)
            if (m.key.fromMe) return m.reply(bvl)
            if (m.isOwner) return m.reply(bvl)
            await sock.sendMessage(m.cht, {
                delete: {
                    remoteJid: m.cht,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
            sock.sendMessage(m.cht, {
                text: `Woi Kontol Gausah Promosi Link Anjg Kek Punya Lu Aja Nih Grup😹`,
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            }, {
                quoted: m
            })
        }
    }

    if (db.list().group[m.cht].antitoxic) {
        if (m.body.startsWith("Anj") || m.body.startsWith("Anjing") || m.body.startsWith("Tol") || m.body.startsWith("Tolol") || m.body.startsWith("Kon") || m.body.startsWith("Kontol")) {
            bvl = `Admin Mah Boleh Kirim Toxic Lain`
            if (m.isAdmin) return m.reply(bvl)
            if (m.key.fromMe) return m.reply(bvl)
            if (m.isOwner) return m.reply(bvl)
            await sock.sendMessage(m.cht, {
                delete: {
                    remoteJid: m.cht,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
            sock.sendMessage(m.cht, {
                text: `Toxic Amat Lo Rek😹`,
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            }, {
                quoted: m
            })
        }
    }


    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    switch (isCommand ? m.command.toLowerCase() : false) {
        case "wm":
        case "swm": {
            try {
                if (!m.quoted) {
                    return m.reply(`Kirim/kutip stiker atau media lalu ketik ${m.prefix + m.command} San|Abc`);
                }

                let text = m.text.split('|');
                let packname = text[0]?.trim() || config.sticker.packname;
                let author = text[1]?.trim() || config.sticker.author;

                await sock.sendMessage(m.cht, {
                    react: {
                        text: "🔎",
                        key: m.key
                    }
                });

                if (/image|video|webp/.test(quoted.msg?.mimetype)) {
                    let media = await quoted.download();

                    if (/video/.test(quoted.msg?.mimetype) && quoted.msg?.seconds > 25) {
                        return m.reply('Maksimal durasi video adalah 25 detik!');
                    }

                    let sticker = await writeExif({
                        mimetype: quoted.msg.mimetype,
                        data: media
                    }, {
                        packName: packname,
                        packPublish: author
                    });

                    if (sticker) {
                        await sock.sendMessage(m.cht, {
                            sticker
                        }, {
                            quoted: m
                        });
                    } else {
                        m.reply('Gagal membuat stiker dengan watermark.');
                    }
                } else {
                    m.reply(`Kirim/kutip stiker, foto, atau video lalu ketik ${m.prefix + m.command} San|Abc`);
                }
            } catch (error) {
                m.reply(`Terjadi kesalahan: ${error.message}`);
            }
        }
        break;
        case "ssearch": {
            const axios = require("axios");
            const cheerio = require("cheerio");

            class Sticker {
                constructor(stickerPackName, url = null) {
                    this.sticker = stickerPackName;
                    this.BASE_URL = "https://getstickerpack.com/stickers?query=" + this.sticker;
                    this.url = url;
                }

                async search() {
                    try {
                        const {
                            data: html
                        } = await axios.get(this.BASE_URL);
                        const $ = cheerio.load(html);
                        const stickerPacks = [];

                        $(".sticker-pack-cols").each((i, el) => {
                            const packUrl = $(el).find("a").attr("href");
                            const trayImage = $(el).find("img").attr("src");
                            const username = $(el).find(".username").text();
                            const title = $(el).find(".title").text();

                            stickerPacks.push({
                                packUrl,
                                trayImage,
                                username,
                                title
                            });
                        });

                        return stickerPacks;
                    } catch (error) {
                        console.error("Error fetching stickers:", error);
                        return [];
                    }
                }
                async download() {
                    try {
                        const {
                            data: hl
                        } = await axios.get(this.url);
                        const $ = cheerio.load(hl);
                        const stickers = [];

                        $(".sticker-image").each((i, el) => {
                            const stickerImage = $(el).attr("data-src-large");
                            stickers.push(stickerImage);
                        });

                        return stickers;
                    } catch (error) {
                        console.error("Error downloading stickers:", error);
                    }
                }
            }
            try {
                if (m.text) {
                    const stickerName = m.text.trim();
                    const data = new Sticker(stickerName);
                    const results = await data.search();

                    if (results && results.length > 0) {
                        let message = "Stiker ditemukan, pilih pack yang ingin diunduh:\n\n";
                        results.forEach((result, index) => {
                            message += `${index + 1}. *${result.title}* oleh ${result.username}\n`;
                            message += `Preview: ${result.trayImage}\n`;
                            message += `Pack Url: ${result.packUrl}\n\n`
                        });

                        m.reply(message);
                    } else {
                        m.reply("Tidak ditemukan stiker dengan kata kunci tersebut.");
                    }
                } else {
                    m.reply("Masukkan kata kunci untuk mencari stiker.");
                }
            } catch (error) {
                m.reply(`Terjadi kesalahan: ${error.message}`);
            }
            break;
        }
        case "sticker":
        case "s": {
            if (/image|video|webp/.test(quoted.msg.mimetype)) {
                let media = await quoted.download();
                if (quoted.msg?.seconds > 10)
                    throw "> Video diatas durasi 10 detik gabisa";
                let exif;
                if (m.text) {
                    let [packname, author] = m.text.split(/[,|\-+&]/);
                    exif = {
                        packName: packname ? packname : "",
                        packPublish: author ? author : "",
                    };
                } else {
                    exif = {
                        packName: config.sticker.packname,
                        packPublish: config.sticker.author,
                    };
                }
                let sticker = await writeExif({
                        mimetype: quoted.msg.mimetype,
                        data: media
                    },
                    exif,
                );
                await m.reply({
                    sticker
                });
            } else if (m.mentions.length !== 0) {
                for (let id of m.mentions) {
                    await delay(1500);
                    let url = await sock.profilePictureUrl(id, "image");
                    let media = await axios
                        .get(url, {
                            responsType: "arraybuffer",
                        })
                        .then((a) => a.data);
                    let sticker = await writeExif(media, {
                        packName: config.sticker.packname,
                        packPublish: config.sticker.author,
                    });
                    await m.reply({
                        sticker
                    });
                }
            } else if (
                /(https?:\/\/.*\.(?:png|jpg|jpeg|webp|mov|mp4|webm|gif))/i.test(
                    m.text,
                )
            ) {
                for (let url of Func.isUrl(m.text)) {
                    await delay(1500);
                }
            } else
                m.reply("> Reply photo atau video yang ingin di jadikan sticker");
        }
        break;
        case "download_sticker":
        case "ds": {
            const axios = require("axios");
            const cheerio = require("cheerio");

            class Sticker {
                constructor(stickerPackName, url = null) {
                    this.sticker = stickerPackName;
                    this.BASE_URL = "https://getstickerpack.com/stickers?query=" + this.sticker;
                    this.url = url;
                }

                async search() {
                    try {
                        const {
                            data: html
                        } = await axios.get(this.BASE_URL);
                        const $ = cheerio.load(html);
                        const stickerPacks = [];

                        $(".sticker-pack-cols").each((i, el) => {
                            const packUrl = $(el).find("a").attr("href");
                            const trayImage = $(el).find("img").attr("src");
                            const username = $(el).find(".username").text();
                            const title = $(el).find(".title").text();

                            stickerPacks.push({
                                packUrl,
                                trayImage,
                                username,
                                title
                            });
                        });

                        return stickerPacks;
                    } catch (error) {
                        console.error("Error fetching stickers:", error);
                        return [];
                    }
                }

                async download() {
                    const {
                        data: html
                    } = await axios.get(this.url);
                    const $ = cheerio.load(html);
                    const imageUrls = [];

                    $(".sticker-image").each((i, el) => {
                        const imageUrl = $(el).attr("data-src-large");
                        imageUrls.push(imageUrl);
                    });

                    return imageUrls;
                }
            }
            m.react("🕖")
            try {
                if (m.text) {
                    const stickerUrl = m.text.trim();
                    const data = new Sticker("", stickerUrl);
                    const imageUrls = await data.download();
                    await m.reply("*Semua Sticker Di Kirim Lewat Private Untuk Mengindari Spam.*")

                    if (imageUrls && imageUrls.length > 0) {
                        for (const imageUrl of imageUrls) {
                            const media = await axios.get(imageUrl, {
                                responseType: 'arraybuffer'
                            });
                            const buffer = Buffer.from(media.data, 'binary');
                            let exif = {
                                packName: "Devolution",
                                packPublish: m.pushName
                            };

                            let sticker = await writeExif({
                                mimetype: 'image/png',
                                data: buffer
                            }, exif);
                            await sock.sendMessage(m.sender, {
                                sticker
                            }, {
                                quoted: m
                            });
                        }
                        m.reply("Semua stiker berhasil diunduh dan dikirim.");
                    } else {
                        m.reply("Tidak ada gambar ditemukan untuk stiker.");
                    }
                } else {
                    m.reply("Masukkan URL untuk mengunduh stiker.");
                }
            } catch (error) {
                m.reply(`Terjadi kesalahan: ${error.message}`);
            }
            break;
        }
        case "antilink": {
            if (!text) return m.reply({
                poll: {
                    name: `*– 乂 Cara Penggunaan*
> *\`0\`* Untuk mematikan fitur ${m.prefix}antilink off
> *\`1\`* Untuk menghidupkan fitur ${m.prefix}antilink on`,
                    values: [`${m.prefix}antilink on`, `${m.prefix}antilink off`],
                    selectableCount: 1,
                },
            });
            const args = m.args
            if (!m.isGroup) return m.reply('maaf khusus group')
            if (!m.isOwner && !m.isAdmin) return m.reply('maaf command ini bisa nya ke admin and owner')

            if (args[0] === 'off') {
                db.list().group[m.cht].antilink = false
                m.reply('Oke Fitur Mute Udah Nonaktifkan')
            } else if (args[0] === 'on') {
                db.list().group[m.cht].antilink = true
                m.reply('Oke Fitur Mute Udah Aktif')
            } else {
                m.reply({
                    poll: {
                        name: `*– 乂 Cara Penggunaan*
> *\`0\`* Untuk mematikan fitur ${m.prefix}antilink off
> *\`1\`* Untuk menghidupkan fitur ${m.prefix}antilink on`,
                        values: [`${m.prefix}antilink on`, `${m.prefix}antilink off`],
                        selectableCount: 1,
                    },
                });
            }
            break
        }
        case "antilinkgc": {
            if (!text) return m.reply({
                poll: {
                    name: `*– 乂 Cara Penggunaan*
> *\`0\`* Untuk mematikan fitur ${m.prefix}antilinkgc off
> *\`1\`* Untuk menghidupkan fitur ${m.prefix}antilinkgc on`,
                    values: [`${m.prefix}antilinkgc on`, `${m.prefix}antilinkgc off`],
                    selectableCount: 1,
                },
            });
            const args = m.args
            if (!m.isGroup) return m.reply('maaf khusus group')
            if (!m.isOwner && !m.isAdmin) return m.reply('maaf command ini bisa nya ke admin and owner')

            if (args[0] === 'off') {
                db.list().group[m.cht].antilinkgc = false
                m.reply('Oke Fitur Antilinkgc Udah Nonaktifkan')
            } else if (args[0] === 'on') {
                db.list().group[m.cht].antilinkgc = true
                m.reply('Oke Fitur Antilinkgc Udah Aktif')
            } else {
                m.reply({
                    poll: {
                        name: `*– 乂 Cara Penggunaan*
> *\`0\`* Untuk mematikan fitur ${m.prefix}antilinkgc off
> *\`1\`* Untuk menghidupkan fitur ${m.prefix}antilinkgc on`,
                        values: [`${m.prefix}antilinkgc on`, `${m.prefix}antilinkgc off`],
                        selectableCount: 1,
                    },
                });
            }
            break;
        }
        case "antilinkch": {
            if (!text) return m.reply({
                poll: {
                    name: `*– 乂 Cara Penggunaan*
> *\`0\`* Untuk mematikan fitur ${m.prefix}antilinkch off
> *\`1\`* Untuk menghidupkan fitur ${m.prefix}antilinkch on`,
                    values: [`${m.prefix}antilinkch on`, `${m.prefix}antilinkch off`],
                    selectableCount: 1,
                },
            });
            const args = m.args
            if (!m.isGroup) return m.reply('maaf khusus group')
            if (!m.isOwner && !m.isAdmin) return m.reply('maaf command ini bisa nya ke admin and owner')

            if (args[0] === 'off') {
                db.list().group[m.cht].antilinkch = false
                m.reply('Oke Fitur Antilinkch Udah Nonaktifkan')
            } else if (args[0] === 'on') {
                db.list().group[m.cht].antilinkch = true
                m.reply('Oke Fitur Antilinkch Udah Aktif')
            } else {
                m.reply({
                    poll: {
                        name: `*– 乂 Cara Penggunaan*
> *\`0\`* Untuk mematikan fitur ${m.prefix}antilinkch off
> *\`1\`* Untuk menghidupkan fitur ${m.prefix}antilinkch on`,
                        values: [`${m.prefix}antilinkch on`, `${m.prefix}antilinkch off`],
                        selectableCount: 1,
                    },
                });
            }
            break;
        }
        case "antitoxic": {
            if (!text) return m.reply({
                poll: {
                    name: `*– 乂 Cara Penggunaan*
> *\`0\`* Untuk mematikan fitur ${m.prefix}antitoxic off
> *\`1\`* Untuk menghidupkan fitur ${m.prefix}antitoxic on`,
                    values: [`${m.prefix}antitoxic on`, `${m.prefix}antitoxic off`],
                    selectableCount: 1,
                },
            });
            const args = m.args
            if (!m.isGroup) return m.reply('maaf khusus group')
            if (!m.isOwner && !m.isAdmin) return m.reply('maaf command ini bisa nya ke admin and owner')

            if (args[0] === 'off') {
                db.list().group[m.cht].antitoxic = false
                m.reply('Oke Fitur Antitoxic Udah Nonaktifkan')
            } else if (args[0] === 'on') {
                db.list().group[m.cht].antitoxic = true
                m.reply('Oke Fitur Antitoxic Udah Aktif')
            } else {
                m.reply({
                    poll: {
                        name: `*– 乂 Cara Penggunaan*
> *\`0\`* Untuk mematikan fitur ${m.prefix}antitoxic off
> *\`1\`* Untuk menghidupkan fitur ${m.prefix}antitoxic on`,
                        values: [`${m.prefix}antitoxic on`, `${m.prefix}antitoxic off`],
                        selectableCount: 1,
                    },
                });
            }
            break;
        }

        default:
    }
};

// Auto reload file
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    delete require.cache[file];
    console.log(`File ${file} telah diperbarui`);
});