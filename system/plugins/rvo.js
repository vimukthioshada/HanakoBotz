const baileys = require('baileys')

module.exports = {
    command: "rvo", //- Nama fitur nya
    alias: ["fotorvo"], //- Short cut command
    category: ["main"], //- Kategori Fitur 
    settings: {
       limit: true,
     },
    description: "Melihat Foto 1x lalu ke kirim foto nya", //- Penjelasan tentang fitur nya
    loading: true, //- Ingin menambahkan loading messages ?
 async run(m, { sock, Func, Scraper, text, config }) {
      let msg = m.quoted.message
  let type = Object.keys(msg)[0]
  let media = await baileys.downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
  let buffer = Buffer.from([])
  for await (const chunk of media) {
    buffer = Buffer.concat([buffer, chunk])
  }
  if (/video/.test(type)) {
    return sock.sendFile(m.cht, buffer, 'media.mp4', msg[type].caption || '', m)
  } else if (/image/.test(type)) {
    return sock.sendFile(m.cht, buffer, 'media.jpg', msg[type].caption || '', m)
  }
}
}