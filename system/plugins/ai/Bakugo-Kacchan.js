const Groq = require('groq-sdk')

const axios = require('axios')

let Yukio = async (m, {
    sock,
    client,
    conn,
    DekuGanz,
    Func,
    Scraper,
    text,
    config
}) => {
    let h = await BakugoChat(text)
    if (!h) return m.reply('maaf error kata kata mu😂')
    const {
        key
    } = await sock.sendMessage(m.cht, {
        text: "loading ai"
    }, {
        quoted: m
    })
    await sock.sendMessage(m.cht, {
        text: h,
        edit: key
    }, {
        quoted: m
    })
}

module.exports = {
    command: "bakugo",
    alias: [
        "kacchan",
        "bakuai"
    ],
    category: [
        "ai"
    ],
    settings: {
        limit: true
    },
    loading: true,
    run: Yukio
}

const client = new Groq({
    apiKey: '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'
});

async function BakugoChat(prompt) {
    chatCompletion = await client.chat.completions.create({
        messages: [{
                role: "system",
                content: "kamu ai bakugo kacchan, dari anime my hero academia, kamu bisa bahasa Indonesia, dan campuran bahasa jepang kek anime gitu, bergaulan, dan bisa emoticon, dan bisa marah marah"
            },
            {
                role: "assistant",
                content: "baiklah"
            },
            {
                role: "user",
                content: prompt
            }
        ],
        model: 'llama-3.3-70b-versatile'
    });
    let hasil = chatCompletion.choices[0].message.content
    return hasil
}
