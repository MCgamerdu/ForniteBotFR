const Discord = require('discord.js')
const bot = new Discord.Client();

var prefix = ("/")

bot.on('ready', function() {
    bot.user.setGame("Command: /help");
    console.log("Connected");
});

bot.login(process.env.TOKEN);

bot.on('message', message => {
  if (message.content === prefix + "botinfo"){
    message.channel.sendMessage("__**Information du BOT**__\n\n **Bot créer par MCgamerdu**\n");
  }

  if (message.content === prefix + "id"){
    message.channel.sendMessage(`**${message.author.username} **` + "Voici ton ID: " + `__${message.author.id}__`);
  }
    
        if (message.content === "Bonjour"){
        message.reply("Bien le bonjour ! :wink:")
    }
  
    if (message.content === prefix + "help"){
        message.delete()
        console.log("Help")
        message.channel.sendMessage(`__${message.author.username} Les commandes disponibles sont envoyer en MP :wink:__`)
        var embed = new Discord.RichEmbed()
          .setColor("0xDBA901")
          .setTitle("Voici la list des commandes disponibles\nPour les Joueurs:")
          .setThumbnail("https://cdn.discordapp.com/attachments/420194475462098949/420242558829199361/unnamed.jpg")
          .addField("**/help**", "Affichez les commandes disponibles")
          .addField("**/botinfo**", "Informations du bot")
          .addField("**/yt**", "Affichez les Youtubeurs")
          message.author.sendEmbed(embed);
    }

    if (message.content === prefix + "help"){
        var embed = new Discord.RichEmbed()
          .setColor("0x0101DF")
          .setTitle("commandes Fun:")
          .addField("**/prank**", "faire un prank à une personne")
          .addField("**/avartar**", "Afficher son avartar")
          .addField("**/id**", "voir son ID")
          message.author.sendEmbed(embed);
    }

    if (message.content === prefix + "avatar") {
        message.reply(message.author.avatarURL)
    }

    if (message.content === prefix + "help"){
      var embed = new Discord.RichEmbed()
        .setColor("0x00FF00")
        .setTitle("Pour le staff:")
        .addField("**/say**", "Faire parlé le bot [StaffMod]")
        .addField("**/ban**", "Bannir un joueur")
        .addField("**/kick**", "expulsé un joueur")
        .setFooter(`L'équipe du staff | ${message.author.username}`)
        .setTimestamp()
        message.author.sendEmbed(embed);
  }

    if (message.content === prefix + "yt"){
        message.channel.sendMessage("__**Voici les Youtubeurs sur le serveur !**__")
        message.delete()
        var embed = new Discord.RichEmbed()
        .setColor("0x00FF40")
        .setTitle("__**Les Youtubers:**__")
        .setThumbnail("https://cdn.discordapp.com/attachments/420194475462098949/420242558829199361/unnamed.jpg")
        .addField("**MCgamerdu:**", "[Cliquer ici](https://www.youtube.com/channel/UCdxYLVE0OdIP42Lf6vWYzWg)", true)
        .addField("**VolagalYT:**", "[Cliquer ici](https://www.youtube.com/channel/UCtls-215NoN3SJBOBYNcjiA)", true)
        .addField("**Damien_X:**", "[Cliquer ici](https://www.youtube.com/channel/UCXMGpKk3HLK3yYV6sokO3qQ)", true)
        .setFooter(`L'équipe du staff | ${message.author.username}`)
        .setTimestamp()
      message.channel.sendEmbed(embed);  
    }
    
    if(message.content.startsWith(prefix + "setgame")){
        let args = message.content.split(` `).slice(1);
        message.delete()
        if (!args){
        args = null; }
        if(message.author.id == "207518319396257793"){
        bot.user.setGame(args.join(` `))
        message.channel.send("J'ai changé mon jeu en : " + args.join(` `))
        console.log("j'ai changé mon jeu en : " + args.join(` `))
        }else{
        message.channel.send(` ${message.author.username} **Tu n'a pas la permission !**`);
        }
        }

        if(message.content.startsWith(prefix + "prank")){
              let args = message.content.split(` `).slice(1);
              message.delete()
              console.log("Prank avec succès !" + `${message.author.username}`)
              if (!args){
              args = null;
               }
              const member = message.mentions.members.first();
              if (!member) return message.reply("Merci de mentionner l'utilisateur à prank !");
              message.channel.send("**Troll:**\n" + "__Message:__\n" + args.join(` `) + `\nTroll by:\n**${message.author.id}**`)
        }

            if (message.content.startsWith(prefix + "say")) {
                message.delete()
                console.log("Say avec succès ! par: " + `${message.author.username}`)
                let modRole = message.guild.roles.find("name", "StaffMod");
                if(message.member.roles.has(modRole.id)) {
                let args = message.content.split(" ").slice(1);
                let thingToEcho = args.join(" ")
                message.channel.sendMessage(thingToEcho)
            } else {
                message.reply(`tu n'as pas la permission de faire cette commande.\n PS: si tu fais parti du staff demmande à MCgamerdu ou Damien_X ou VolagalYT !`)
            }
            }

              let command = message.content.split(" ")[0];
              const args = message.content.slice(prefix.length).split(/ +/);
              command = args.shift().toLowerCase();
           
              if (command === "kick") {
                  let modRole = message.guild.roles.find("name", "StaffMod");
                  if(!message.member.roles.has(modRole.id)) {
                      return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
                  }
                  if(message.mentions.users.size === 0) {
                      return message.reply("Merci de mentionner l'utilisateur à expluser.").catch(console.error);
                  }
                  let kickMember = message.guild.member(message.mentions.users.first());
                  if(!kickMember) {
                      return message.reply("Cet utilisateur est introuvable ou impossible à expulser.")
                  }
                  if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
                      return message.reply("Je n'ai pas la permission KICK_MEMBERS pour faire ceci.").catch(console.error);
                  }
                  kickMember.kick().then(member => {
                      message.reply(`${member.user.username} a été expulsé avec succès.`).catch(console.error);
                      message.guild.channels.find("name", "general").send(`**${member.user.username} a été expulsé du discord par **${message.author.username}**`)
                  }).catch(console.error)
                 
              }
           
              if (command === "ban") {
                  let modRole = message.guild.roles.find("name", "StaffMod");
                  if(!message.member.roles.has(modRole.id)) {
                      return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
                  }
                  const member = message.mentions.members.first();
                  if (!member) return message.reply("Merci de mentionner l'utilisateur à bannir.");
                  member.ban().then(member => {
                      message.reply(`${member.user.username} a été banni avec succès.`).catch(console.error);
                      message.guild.channels.find("name", "general").send(`**${member.user.username}** a été banni du discord par **${message.author.username}**`)
                  }).catch(console.error)
                }})

if (message.content === prefix + "infodiscord"){
        var infodiscord = new Discord.RichEmbed()
        .setColor("0x0000FF")
        .setDescription("Information Du discord")
        .addField("Nom du discord", message.guild.name)
        .addField("Crée le", message.guild.createdAt)
        .addField("Tu as rejoin le", message.member.joinedAt)
        .addField("Utilisateurs sur le discord", message.guild.memberCount)
    message.channel.sendEmbed(infodiscord)
            
    }
