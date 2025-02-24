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
    if (!text) throw '> Masukan Kata Kata!'
    const api = 'https://fgsi-ai.hf.space/'
    const {
        data: ai
    } = await axios.post(api, {
        messages: [{
            role: "system",
            content: "kamu ai rin okumura dari anime blue exorcist"
        }, {
            role: "user",
            content: text
        }],
        temperature: 1,
        max_tokens: 1000,
        top_p: 1
    }, {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    if (!ai.data.prompt) return m.reply('maaf error kata kata mu😂')
    m.reply(ai.data.prompt)
}

module.exports = {
    command: "ai",
    alias: [
        "openai",
        "fgsiai",
        "fongsiai"
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
