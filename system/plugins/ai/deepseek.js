const Groq = require('groq-sdk')

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
    let h = await DekuChat(text)
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
    command: "deepseek",
    alias: [
        "dpai",
        "deepsek"
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

async function DekuChat(prompt) {
    chatCompletion = await client.chat.completions.create({
        messages: [{
                role: "system",
                content: "kamu ai deepseek mau pintar, dan tidak, bodoh dan kamu bisa niruin ai deepseek, dan bisa emoticon"
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
        model: 'llama3-8b-8192'
    });
    let hasil = chatCompletion.choices[0].message.content
    return hasil
}
