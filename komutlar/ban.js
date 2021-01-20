const Discord = require('discord.js');


exports.run = (client, message, args) => {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Yetkin Yetersiz')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('Bunu Kullanılbilmek İçin Bana Ban Yetkisi Vermelisin')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Lütfen bir kullanıcı belirtin');

        if(!member) return message.channel.send('Bu kullanıcıyı bulamıyor gibi görünüyor. Bunun için üzgünüm: /');
        if(!member.bannable) return message.channel.send('Bu Kullanıcı Yasaklanamaz Ya Senle Aynı Rütbede Yada Rolüm Altta');

        if(member.id === message.author.id) return message.channel.send('kendini yasaklayamazsın!');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Belirtilmemiş';

        member.ban({reason:`${reason}`})
        .catch(err => {
            if(err) return message.channel.send('Bir Şey Yanlış Oldu')
        })

        const banembed = new Discord.MessageEmbed()
        .setTitle('Üye Yasaklandı')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Kullanıcı Yasaklandı', member)
        .addField('Tarafından atıldı', message.author)
        .addField('Sebebi', reason)

        message.channel.send(banembed);


    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ban'],
    permLevel: 0
};

exports.help = {
    name: 'ban',
    description: 'Ban ',
    usage: 'ban'
};