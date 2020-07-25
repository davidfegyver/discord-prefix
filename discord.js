const Discord = require('discord.js');
const client = new Discord.Client();

const db = require('better-sqlite3')('bot.db');

client.once('ready', () => {
    console.log('Ready!');

    function createtable() {
        const sqlInit = `
        CREATE TABLE IF NOT EXISTS prefixes (serverid varchar(30),prefix varchar(4) DEFAULT '/');
            `;
        db.exec(sqlInit);
    }
    
    createtable();


    let sql = db.prepare(`SELECT * from prefixes;`);
    console.log(sql.all());
});

client.on('message', message => {
    let row = db.prepare(`SELECT * FROM prefixes WHERE serverid = ?`).get(message.guild.id);
    if(!row) db.prepare(`INSERT INTO prefixes (serverid) VALUES(?);`).run(message.guild.id);
    row = db.prepare(`SELECT * FROM prefixes WHERE serverid = ?`).get(message.guild.id);
    let prefix = row['prefix']

    console.log(prefix)

    let args = message.content.split(" ").slice(1);

  if (message.content.startsWith(`${prefix}test`)) {
      message.channel.send("Workin.");
  }


  if (message.content.startsWith(`${prefix}prefix`)) {

    db.prepare("update prefixes set prefix = ? where serverid = ?").run(args[0], message.guild.id);

    message.channel.send("átváltva " + args[0])
}

});



client.login('TokeN');