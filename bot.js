{
  "dependencies": {
    "and": "0.0.3",
    "anti-spam": "^0.2.7",
    "array-sort": "^1.0.0",
    "ascii-data-table": "^2.1.1",
    "canvas": "^1.6.11",
    "canvas-prebuilt": "^1.6.5-prerelease.1",
    "child_process": "^1.0.2",
    "common-tags": "^1.8.0",
    "dateformat": "^3.0.3",
    "discord-anti-spam": "^1.1.2",
    "discord.js": "^11.3.2",
    "ffmpeg-binaries": "^4.0.0",
    "figlet": "^1.2.0",
    "file-system": "^2.2.2",
    "forever": "^0.15.3",
    "fortnite": "^4.1.1",
    "fortnite-api": "^2.12.2",
    "get-youtube-id": "^1.0.0",
    "giphy-api": "^1.2.7",
    "goo.gl": "^0.1.4",
    "google-it": "^1.1.3",
    "google-translate-api": "^2.3.0",
    "hastebin-gen": "^1.3.1",
    "i": "^0.3.6",
    "jimp": "^0.2.28",
    "math-expression-evaluator": "^1.2.17",
    "moment": "^2.22.2",
    "node-opus": "^0.3.0",
    "npm": "^6.2.0",
    "opusscript": "0.0.6",
    "pretty-ms": "^3.2.0",
    "queue": "^4.4.2",
    "quick.db": "^6.3.2",
    "short-number": "^1.0.6",
    "simple-youtube-api": "^5.0.2",
    "sqlite": "^2.9.2",
    "table": "^4.0.3",
    "winston": "^3.0.0",
    "youtube-info": "^1.2.0",
    "ytdl-core": "^0.21.1",
    "zalgolize": "^1.2.4"
  }
}
// كل البكجات الي ممكن تحتجها في اي بوت
const { Client, RichEmbed } = require("discord.js");
var { Util } = require('discord.js');
const client = new Client({ disableEveryone: true})
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const botversion = require('./package.json').version;
const simpleytapi = require('simple-youtube-api')
const moment = require("moment");
const fs = require('fs');
const util = require("util")
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require('snekfetch');
const guild = require('guild');
const dateFormat = require('dateformat');//npm i dateformat
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
client.login(TOKEN);
const queue = new Map();
var table = require('table').table
const Discord = require('discord.js');
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
//كود الحالة :
client.on("ready", () => {
console.log(`Logged in as ${client.user.tag}!`);
client.user.setActivity(`%help`);
client.user.setStatus("Online"); // الحالة
});
//شرح الاوامر
//online => online 
//Do Not Disturb => dnd
//Idle => idle
//offline => offline
//كود الكريدت
const cool = [];
client.on('message',async message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  const args = message.content.split(' ');
  const credits = require('./credits.json');
  const path = './credits.json';
  const mention = message.mentions.users.first() || client.users.get(args[1]) || message.author;
  const mentionn = message.mentions.users.first() || client.users.get(args[1]);
  const author = message.author.id;
  const balance = args[2];
  const daily = Math.floor(Math.random() * 350) + 10;

  if(!credits[author]) credits[author] = {credits: 50};
  if(!credits[mention.id]) credits[mention.id] = {credits: 50};
  fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) {if(err) console.log(err)});

  
  if(message.content.startsWith(prefix + "credits")) {
  if(args[0] !== `${prefix}credit` && args[0] !== `${prefix}credits`) return;

  if(args[2]) {
    if(isNaN(args[2]) || args[2] < 0) return message.channel.send('**:heavy_multiplication_x:| لا تقدر تحول بسالب يا قلبي خطا **');
    if(mention.bot) return message.channel.send(`**:heavy_multiplication_x:| ${message.content.split(' ')[1]} لم يتم العثور على**`);
    if(mention.id === message.author.id) return message.channel.send('**:heavy_multiplication_x:| لا يمكنك تحويل كردت لنفسك**');
    if(credits[author].credits < balance) return message.channel.send('**:heavy_multiplication_x:| أنت لا تملك هذا القدر من الكردت**');
    var one = Math.floor(Math.random() * 9) + 1;
    var two = Math.floor(Math.random() * 9) + 1;
    var three = Math.floor(Math.random() * 9) + 1;
    var four = Math.floor(Math.random() * 9) + 1;

    var number = `${one}${two}${three}${four}`;
    
    message.channel.send(`**:heavy_dollar_sign:| \`${number}\`, أكتب الرقم للأستمرار**`).then(m => {
      message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 10000}).then(c => {
        if(c.first().content === number) {
          m.delete();
          message.channel.send(`**:atm:| ${message.author.username}, قام بتحويل \`${balance}\` لـ ${mention}**`);
          credits[author].credits += (-balance);
          credits[mention.id].credits += (+balance);
          fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) {if(err) console.log(err)});
        } else if(c.first().content !== number) {
          m.delete();
          message.channel.send(`** :money_with_wings: | تم الغاء الإرسال**`);
        }
      });
    });
  }
  if(!args[2]) {
    if(mention.bot) return message.channel.send(`**:heavy_multiplication_x:| ${message.content.split(' ')[1]} لم يتم العثور على**`);
    message.channel.send(`**${mention.username}, your :money_with_wings: balance is ** **$${credits[mention.id].credits}**`);
  } 
  
  }
  if(message.content.startsWith(prefix + "daily")) {
    if(cool.includes(message.author.id)) return message.channel.send(`**:heavy_dollar_sign: | \ , يجب عليك انتظار  يوم لأخذ المبلغ مرة اخرى**`);
    if(mentionn) {
      var one = Math.floor(Math.random() * 9) + 1;
      var two = Math.floor(Math.random() * 9) + 1;
      var three = Math.floor(Math.random() * 9) + 1;
      var four = Math.floor(Math.random() * 9) + 1;
  
      var number = `${one}${two}${three}${four}`;

      message.channel.send(`**:atm: | \`${number}\`, قم بكتابة الرقم للأستمرار**`).then(async m => {
        message.channel.awaitMessages(msg => msg.author.id === message.author.id, {max: 1, time: 20000, errors: ['time']}).then(collected => {
          if(collected.first().content === number) {
            m.delete();
            collected.first().delete();
            credits[mentionn.id].credits += (+daily);
            fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) {if(err) console.log(err)});

          message.channel.send(`**:atm: | \`${daily}\`, تم تسليم المبلغ**`);  
          }
          if(collected.first().content !== number) {
            return m.delete();
          }
        });
      });
    } else if(!mentionn) {
      credits[author].credits += (+daily);
      fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) {if(err) console.log(err)});

      message.channel.send(`**:atm: | \`${daily}\`, تم اعطائك المبلغ**`);
    }
    cool.unshift(message.author.id);

    setTimeout(() => {
      cool.shift(message.author.id);
      message.author.send("**:atm: | \`Daily\`, يمكنك الحصول على الكردت المجانية الان**").catch();
    }, ms("1d"));
  }
}); ///كود كريدت عدلت علية كثير مرا

//كود معلومات السيرفر
client.on('message', function(msg) {

    if(msg.content.startsWith (prefix + 'serverinfo')) {
      if(!msg.channel.guild) return msg.reply('**❌ اسف لكن هذا الامر للسيرفرات فقط **');
      let embed = new Discord.RichEmbed()
      .setColor('#000000')
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`${msg.guild.name}`,true)
      .addField(':id: **Server ID:**',`${msg.guild.id}`,true)
      .addField('📅** Created On**',msg.guild.createdAt.toLocaleString())
      .addField('👑** Owned By**',`${msg.guild.owner}`,true)
      .addField(':busts_in_silhouette:  **Members **' + `[ ${msg.guild.memberCount} ]`,`**${msg.guild.members.filter(m=>m.presence.status == 'online').size}**` + ' Online')
      .addField(':speech_balloon: Channels ' + `[ ${msg.guild.channels.size} ]`,`**${msg.guild.channels.filter(m => m.type === 'text').size}**` + ' Text | ' + `**${msg.guild.channels.filter(m => m.type === 'voice').size}**` + ' Voice')//tt
      .addField(':earth_africa: Others','**Region: **' + `${msg.guild.region}` + ' **Verification Level:** ' + `${msg.guild.verificationLevel}`)
      .addField(':closed_lock_with_key:** Rules **' + `[ ${msg.guild.roles.size} ]`,'To see a list with all roles use **#roles**');
      msg.channel.send({embed:embed});
    }
  }); 
//كود البنك
 client.on('message', message => {
    if (message.content === (prefix + 'ping')) {
      if (message.author.bot) return;
      if (!message.channel.guild) return;
    message.channel.send({
        embed: new Discord.RichEmbed()
      .setColor('RANDOM')
     .addField('my ping!!!',`${Date.now() - message.createdTimestamp}`)
    })
}
}); 
//كود اخفاء واضاهر الشات
client.on('message', message => { /// edit fox
      if(message.content ===  prefix + "hc") {
      if(!message.channel.guild) return;
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('ليس لديك صلاحية ادمن :x:');
             message.channel.overwritePermissions(message.guild.id, {
             READ_MESSAGES: false
 })
              message.channel.send('تم اخفاء الشات ! :white_check_mark:  ') ///edit fox
 }
});


client.on('message', message => {
      if(message.content === prefix + "sc") {
      if(!message.channel.guild) return;
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('ليست لديك صلاحية ادمن :x:');
             message.channel.overwritePermissions(message.guild.id, {
             READ_MESSAGES: true
 })
              message.channel.send('تم اضهار الشات🌟')
 }
});
//كود معلومات،البوت
client.on('message', message => {
  if (message.content.startsWith(prefix + "botinfo")) {
  message.channel.send({
  embed: new Discord.RichEmbed()
     .setAuthor(client.user.username,client.user.avatarURL)
     .setThumbnail(client.user.avatarURL)
     .setColor('#00FFF1')
     .setTitle('MY INFO |__=_=__|')
     .addField('``My Ping``' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
     .addField('``servers``', [client.guilds.size], true)
     .addField('``channels``' , `[ ${client.channels.size} ]` , true)
     .addField('``Users``' ,`[ ${client.users.size} ]` , true)
     .addField('``My Name``' , `[ ${client.user.tag} ]` , true)
     .addField('``My ID``' , `[ ${client.user.id} ]` , true)
           .addField('``My Prefix``' , `[ > ]` , true)
           .addField('``My Language``' , `[ JavaScript ]` , true)
           .addField('``Bot Version``' , `[ v2.5]` , true)
           .setFooter('developer | Ahmed GiGA')
  })
  }
  });
//كود منع النشر
let spread = JSON.parse(fs.readFileSync('./spread.json' , 'utf8'));


client.on('message', message => {
    if(message.content.startsWith(prefix + "antispread off")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
spread[message.guild.id] = {
onoff: 'Off',
}
message.channel.send(`**⛔ The AntiSpread Is __𝐎𝐅𝐅__ !**`)
          fs.writeFile("./spread.json", JSON.stringify(spread), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }

        })
        client.on('message', message => {
    if(message.content.startsWith(prefix + "antispread on")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
spread[message.guild.id] = {
onoff: 'On',
}
message.channel.send(`**✅ The AntiSpread Is __𝐎𝐍__ !**`)
          fs.writeFile("./spread.json", JSON.stringify(spread), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }

        })
    client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('http://www.gmail.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});

client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.snapchat.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'

            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});


client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.instagram.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});


client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.twitter.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});


client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('http://www.facebook.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});



client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.youtube.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }

});

client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.discordapp.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }

});
client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://discord.gg/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }

});
//كود النقاط
/*let points = JSON.parse(fs.readFileSync('./points.json' , 'utf8'));


client.on('message', async message => {


	if(message.channel.type !== 'text') return;
	
	
	var command = message.content.toLowerCase().split(" ")[0];
	var args = message.content.toLowerCase().split(" ");
	var userM = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.id == args[1]));
	  const embed  = new Discord.RichEmbed()
.setDescription(`
**لم يتم تسجيل أي نقطة حتى الأن **
** أمثلة للأوامر: **
**:small_orange_diamond:** ${prefix}points ${message.author} 1 `لتغيير نقاط شخص مع`
**:small_orange_diamond:** ${prefix}points ${message.author} +1 `لزيادة نقاط شخص معين`
**:small_orange_diamond:** ${prefix}points ${message.author} -1 `لأزالة نقطة من شخص معين `
**:small_orange_diamond:** ${prefix}points ${message.author} 0 `لتصفير نقاط شخص معين `
**:small_orange_diamond:** ${prefix}points reset `لتصفير جميع النقاط``)
.setFooter('Requested by '+message.author.username, message.author.avatarURL)
.setColor(`#e60909`)
  const error  = new Discord.RichEmbed()
.setDescription(`
**:x: | يجب كتابة الأمر بشكل صحيح. **
** أمثلة للأوامر: **
**:small_orange_diamond:** ${prefix}points ${message.author} 1 `لتغيير نقاط شخص معين`
**:small_orange_diamond:** ${prefix}points ${message.author} +1 `لزيادة نقاط شخص معين`
**:small_orange_diamond:** ${prefix}points ${message.author} -1 `لأزالة نقطة من شخص معين `
**:small_orange_diamond:** ${prefix}points ${message.author} 0 `لتصفير نقاط شخص معين `
**:small_orange_diamond:** ${prefix}points reset `لتصفير جميع النقاط``)
.setFooter('Requested by '+message.author.username, message.author.avatarURL)
.setColor(`#e60909`)
if(command == prefix + 'points') {
	 
		if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return message.channel.send(':no_entry: | I dont have Embed Links permission.');
		if(!args[1]) {
			if(!points) return message.channel.send(embed);
			var members = Object.values(points);
			var memb = members.filter(m => m.points >= 1);
			if(memb.length == 0) return message.channel.send(embed);
			var x = 1;
			let pointsTop = new Discord.RichEmbed()
			.setAuthor('Points:')
			.setColor('#FBFBFB')
			.setDescription(memb.sort((second, first) => first.points > second.points).slice(0, 10).map(m => `**:small_blue_diamond:** <@${m.id}> `${m.points}``).join('n'))
			.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
			message.channel.send({
				embed: pointsTop
			});
		}else if(args[1] == 'reset') {
			let pointsReset = new Discord.RichEmbed()
			.setDescription('**:white_check_mark: | تم تصفير جميع النقاظ بنجاح**')
			.setFooter('Requested by '+message.author.username, message.author.avatarURL)
			if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("You dont have Manage Server permission.");
			if(!points) return message.channel.send(pointsReset);
			var members = Object.values(points);
			var memb = members.filter(m => m.points >= 1);
			if(memb.length == 0) return message.channel.send(pointsReset);
			points = {};
			message.channel.send(pointsReset);
		}else if(userM) {
			if(!message.member.hasPermission('MANAGE_GUILD')) return  message.channel.send("You dont have Manage Server permission.");
			if(!points[userM.user.id]) points[userM.user.id] = {
				points: 0,
				id: userM.user.id
			};
			if(!args[2]) {
				if(points[userM.user.id].points == 0) return message.channel.send( `${userM.user.username} Not have any points.`);
				var userPoints = new Discord.RichEmbed()
				.setColor('#d3c325')
				.setAuthor(`${userM.user.username} have ${points[userM.user.id].points} points.`);
				message.channel.send({
					embed: userPoints
				});
			}else if(args[2] == 'reset') {
				if(points[userM.user.id].points == 0) return message.channel.send(error);
				points[userM.user.id].points = 0;
				message.channel.send(`Successfully reset ${userM.user.username} points.`);
			}else if(args[2].startsWith('+')) {
				args[2] = args[2].slice(1);
				args[2] = parseInt(Math.floor(args[2]));
				if(points[userM.user.id].points == 1000000) return message.channel.send(error);
				if(!args[2]) return message.channel.send(error);
				if(isNaN(args[2])) return message.channel.send(error);
				if(args[2] > 1000000) return message.channel.send(error);
				if(args[2] < 1) return message.channel.send(error);
				if((points[userM.user.id].points + args[2]) > 1000000) args[2] = 1000000 - points[userM.user.id].points;
				points[userM.user.id].points += args[2];
				let add = new Discord.RichEmbed()
				.setDescription(`**:small_blue_diamond:** <@${userM.id}> `${points[userM.user.id].points}``)
				.setAuthor('Points:')
				.setColor('#FBFBFB')
				.setFooter('Requested by' + message.author.username, message.author.avatarURL)
				message.channel.send(add);
			}else if(args[2].startsWith('-')) {
				args[2] = args[2].slice(1);
				args[2] = parseInt(Math.floor(args[2]));
				if(points[userM.user.id].points == 0) return message.channel.send(error);
				if(!args[2]) return message.channel.send(error);
				if(isNaN(args[2])) return message.channel.send(error);
				if(args[2] > 1000000) return message.cha
//كود الساعة
client.on('message', message => {
  if (message.content === prefix + 'clock') {
    let Canvas = require('canvas');
    let canvas = new Canvas(400, 400),
    rebel = canvas.getContext('2d');
 
    var radius = canvas.height / 2;
    rebel.translate(radius, radius);
    radius = radius * 0.90;
   
    let Image = Canvas.Image;
 
    imgImport(rebel);
   
    drawClock();
   
 
    let fileC  = new Discord.Attachment(canvas.toBuffer(), prefix + 'clock png');
    message.channel.send({file : fileC});
   
    function imgImport(rebel){
        var img = new Image();
        img.onload = function(){
            rebel.drawImage(img,-200,-200);
        };
        img.src = './';
    }
   
    function drawClock() {
        drawFace(rebel, radius);
        drawNumbers(rebel, radius);
        drawTime(rebel, radius);
    }
   
    function drawFace(rebel, radius) {
        var grad;
        rebel.beginPath();
        rebel.arc(0, 0, radius, 0, 2*Math.PI);
        //ctx.fillStyle = 'white';
        //ctx.fill();
        grad = rebel.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
        grad.addColorStop(0, '#42d9f4');
        grad.addColorStop(0.5, 'white');
        grad.addColorStop(1, '#42d9f4');
        rebel.strokeStyle = grad;
        rebel.lineWidth = radius*0.1;
        rebel.stroke();
        rebel.beginPath();
        rebel.arc(0, 0, radius*0.1, 0, 2*Math.PI);
        rebel.fillStyle = '#42d9f4';
        rebel.fill();
    }
    function drawNumbers(rebel, radius) {
        var ang;
        var num;
        rebel.font = radius*0.15 + "px arial";
        rebel.textBaseline="middle";
        rebel.textAlign="center";
        for(num = 1; num < 13; num++){
            ang = num * Math.PI / 6;
            rebel.rotate(ang);
            rebel.translate(0, -radius*0.85);
            rebel.rotate(-ang);
            rebel.fillText(num.toString(), 0, 0);
            rebel.rotate(ang);
            rebel.translate(0, radius*0.85);
            rebel.rotate(-ang);
        }
    }
   
    function drawTime(rebel, radius){
        var now = new Date();
        var hour = now.getHours() + 2;
        var minute = now.getMinutes() - 8;
        var second = now.getSeconds();
        //hour
        hour=hour%12;
        hour=(hour*Math.PI/6)+
        (minute*Math.PI/(6*60))+
        (second*Math.PI/(360*60));
        drawHand(rebel, hour, radius*0.5, radius*0.07);
        //minute
        minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
        drawHand(rebel, minute, radius*0.8, radius*0.07);
        // second
        second=(second*Math.PI/30);
        drawHand(rebel, second, radius*0.9, radius*0.02);
    }
   
    function drawHand(rebel, pos, length, width) {
        rebel.beginPath();
        rebel.lineWidth = width;
        rebel.lineCap = "round";
        rebel.moveTo(0,0);
        rebel.rotate(pos);
        rebel.lineTo(0, -length);
        rebel.stroke();
        rebel.rotate(-pos);
    }
 
  };
 
 
});*/
//كود الافاتار
client.on("message",message => {
if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "avatar")){
const mention = message.mentions.users.first()

if(!mention) return console.log("") 
let embed = new Discord.RichEmbed()
.setColor("BLACK")
.setAuthor(`${mention.username}#${mention.discriminator}`,`${mention.avatarURL}`) 
.setTitle("Avatar Link")
.setURL(`${mention.avatarURL}`)
.setImage(`${mention.avatarURL}`)
.setFooter(`Requested By ${message.author.tag}`,`${message.author.avatarURL}`)    
    message.channel.send(embed)
}
})

client.on("message", message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "avatar server")) {
    let doma = new Discord.RichEmbed()
    .setColor("BLACK")
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setTitle("Avatar Link")
    .setURL(message.guild.iconURL)
    .setImage(message.guild.iconURL)
    .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL)
    message.channel.send(doma)
  } else if(message.content.startsWith(prefix + "avatar")) {
    let args = message.content.split(" ")[1]
var avt = args || message.author.id;    
    client.fetchUser(avt).then(user => {
     avt = user;
  let embed = new Discord.RichEmbed() 
  .setColor("BLACK")
  .setAuthor(`${avt.tag}`, avt.avatarURL)
  .setTitle("Avatar Link")
  .setURL(avt.avatarURL)
  .setImage(avt.avatarURL)
  .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL)
  message.channel.send(embed) 
    })
  }
})
//كود توب السيرفرات
client.on("message", message =>{
  if(message.content.startsWith(prefix + 'topservers')){ // الامر (topserver)
    let count = message.content.split(" ")[1];
    const top = client.guilds.sort((a,b)=>a.memberCount-b.memberCount).array().reverse()
    if(!count) count = 10;
    if(isNaN(count)) count = 10;
    if(count <= 0) count = 10;
    if(count > top.length) count = top.length;
    let embed = new Discord.RichEmbed();
    for(let i = 0; i < count; i++){
    embed.addField(`**${top[i].name}** : ${top[i].memberCount}`," ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎");
    }
    embed.setTitle(`**Top ${count} Servers**`);
    embed.setThumbnail(message.author.displayAvatarURL);
    embed.setTimestamp();
    embed.setFooter(client.user.username,client.user.displayAvatarURL);
    message.channel.send(embed);
  }});
//كود إرسال رسالة بالخاص
client.on("message", msg => {
  let msgarray = msg.content.split(" ");
  let cmd = msgarray[0];
  let args = msgarray.slice(1);  
if(cmd === `${prefix}dm`){
  let mentions = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if(!mentions) return msg.reply("**منشن العضو**").then(men => {
      men.delete(2222)
      msg.delete()
  })
  let args2 = args.join(" ").slice(22);
  if(!args2) return msg.reply("**اكتب الرسالة**").then(am => {
      am.delete(2222)
      msg.delete()
  })
let emb = new Discord.RichEmbed()
.setTitle("**DM**")
.addField("**الرسالة**", args2)
.addField("**الرسالة لـ**", mentions)
.addField("**من قبل**", msg.author)
.setDescription(`**هل انت متاْكد برسالتك؟
✔ | نعم

❌ | لا**`)
msg.channel.send(emb).then(od => {
  od.react("✔")
  .then(()=> od.react("✔"))
  .then(()=> od.react("❌"))
  let reaction1Filter = (reaction, user) => reaction.emoji.name === '✔' && user.id === msg.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === msg.author.id;

let reaction1 = od.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = od.createReactionCollector(reaction2Filter, { time: 12000 });
reaction2.on("collect", r => {
msg.reply("**تم الغاء رسل رسالتك بنجاح**").then(cn => {
cn.delete(2222)
msg.delete()
})
od.delete(2222)
})
reaction1.on("collect", r => {
let embd = new Discord.RichEmbed()
.setTitle("**DM**")
.setDescription(`** الرسالة نوع وش؟ :arrow_down:
🚩 | امبد

✨ | بدون امبد
**`)
msg.delete()
od.delete(2222)
msg.channel.send(embd).then(bo => {
bo.react("🚩")
.then(() => bo.react("🚩"))
.then(() => bo.react("✨"))
let r1 = (reaction, user) => reaction.emoji.name === '🚩' && user.id === msg.author.id;
let r2 = (reaction, user) => reaction.emoji.name === '✨' && user.id === msg.author.id;

let rec1 = bo.createReactionCollector(r1, { time: 12000 });
let rec2 = bo.createReactionCollector(r2, { time: 12000 });
rec1.on("collect", r => {
let embde = new Discord.RichEmbed()
.setTitle("**رسالة**")
.addField("**الرسالة**", args2)
.addField("**من قبل**", msg.author)
bo.delete(2222)
msg.reply("**تم ارسال الرسالة بنجاح ✔**").then(op => {
  op.delete(2222)
  msg.delete()
})
mentions.send(embde)
})
rec2.on("collect", r => {
  mentions.send(args2)
  msg.reply("**تم ارسال الرسالة بنجاح ✔**").then(ede => {
      ede.delete(2222)
      bo.delete(2222)
      msg.delete()
     
  })
  })

})

}) 
})
}
})
//كود معلومات السيرفر بصورة
const bbg =["https://i.pinimg.com/236x/22/75/5f/22755f39c8f4f712cfdb237a4b8f0e7a.jpg", //MA$TER_killer!!
            "https://i.pinimg.com/564x/b6/d9/94/b6d994a07f9dd19a98b52994b5fcf7d7.jpg", //MA$TER_killer!!
            "https://i.pinimg.com/236x/2d/7a/92/2d7a92241570589639f5922a5021a38e.jpg", //MA$TER_killer!!
            "https://i.pinimg.com/236x/2a/f7/f3/2af7f307ccfda22028e261657f07ca7b.jpg", //MA$TER_killer!! 
            "https://i.pinimg.com/236x/1e/08/fc/1e08fca2fc4df9f5cbca156d61b6ecd3.jpg",  //MA$TER_killer!!
            "https://i.pinimg.com/236x/f5/f8/38/f5f8380ef692c55e7b97cf0f64d07556.jpg", //MA$TER_killer!!
           ]; //MA$TER_killer!!

  client.on("message",async msg => {  //MA$TER_killer!!
if(msg.content.startsWith(prefix + "serverpng")){  //MA$TER_killer!!
const Canvas = require("canvas");        //MA$TER_killer!!
let mentions = msg.mentions.members.first()  //MA$TER_killer!!
if(!mentions) {  //MA$TER_killer!!
let bbs = bbg[Math.floor(Math.random() * bbg.length)]
let serverid = msg.guild.id  //MA$TER_killer!!
let serverna = msg.guild.name  //MA$TER_killer!! 
let owner = msg.guild.owner   //MA$TER_killer!!
let ownerna = owner.user.username //MA$TER_killer!!
let ownerta = owner.user.discriminator//MA$TER_killer!!
let channels = msg.guild.channels.size   //MA$TER_killer!! 
let voice = msg.guild.channels.filter(f => f.type === "voice").size  //MA$TER_killer!! 
let text = msg.guild.channels.filter(f => f.type === "text").size  //MA$TER_killer!! 
let createdo = moment(msg.guild.createdAt).format(`D/M/YYYY h:mm`)   //MA$TER_killer!! 
let createdf = moment(msg.guild.createdAt).locale("EN-eg").fromNow()   //MA$TER_killer!! 
let members = msg.guild.members.size //MA$TER_killer!!
let online = msg.guild.members.filter(c => c.presence.status !== "offline").size //MA$TER_killer!!
let region = msg.guild.region   //MA$TER_killer!! 
let verificationl = msg.guild.verificationLevel   //MA$TER_killer!! 
let roles = msg.guild.roles.size   //MA$TER_killer!!
let by = msg.author.username  //MA$TER_killer!!
let tserverid = "server id:"  //MA$TER_killer!!
let townerna = "owner:"  //MA$TER_killer!!
let tchannels = "channels:"  //MA$TER_killer!! 
let tvoice = "voice:"  //MA$TER_killer!! 
let ttext = "text:"  //MA$TER_killer!! 
let tcreatedo = "created at:"   //MA$TER_killer!! 
let tregion = "region:"   //MA$TER_killer!! 
let tverificationl = "verification level:"   //MA$TER_killer!! 
let troles = "roles"   //MA$TER_killer!!
let tmembers = "members:"  //MA$TER_killer!!
let tonline = "online:" //MA$TER_killer!!
let hm = "Requested by" //MA$TER_killer!!
let servericon = msg.guild.iconURL   //MA$TER_killer!!
let canvas = Canvas.createCanvas(800 , 500) //MA$TER_killer!!
let ctx = canvas.getContext('2d'); //MA$TER_killer!!
const background = await Canvas.loadImage(`${bbs}`);//MA$TER_killer!!
const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/637449457658494999/642490023954087946/hmmmm.PNG");
const icon = await Canvas.loadImage(`${servericon}`); //MA$TER_killer!!
const avatar = await Canvas.loadImage(`${msg.author.avatarURL}`);
ctx.drawImage(background, 0, 0, canvas.width, canvas.height); //MA$TER_killer!!
ctx.drawImage(bg, 0, 0, canvas.width, canvas.height); //MA$TER_killer!!
ctx.font = '25px Elephant';//MA$TER_killer!!
ctx.fontSize = '30px';//MA$TER_killer!!
ctx.textAlign = "center";//MA$TER_killer!!
ctx.fillStyle = "#007cff"; //MA$TER_killer!!
ctx.fillText(serverid, canvas.width / 2, canvas.height / 1.6); //MA$TER_killer!!
ctx.font = '30px Elephant';//MA$TER_killer!!
ctx.fillStyle = "#ffffff"; //MA$TER_killer!!
ctx.fillText(serverna, canvas.width / 2, canvas.height / 2); //MA$TER_killer!!
ctx.font = '25px Elephant';//MA$TER_killer!!
ctx.fillStyle = "#ffd304"; //MA$TER_killer!!
ctx.fillText(ownerna+"#"+ownerta, canvas.width / 2, canvas.height / 1.8); //MA$TER_killer!!
ctx.fillStyle = "#ffffff"; //MA$TER_killer!!
ctx.fillText(channels, canvas.width / 1.1, canvas.height / 6); //MA$TER_killer!!
ctx.fillText(voice, canvas.width / 1.1, canvas.height / 4.8); //MA$TER_killer!!
ctx.fillText(text, canvas.width / 1.1, canvas.height / 3.9); //MA$TER_killer!!
ctx.fillStyle = "#e9abab"; //MA$TER_killer!!
ctx.fillText(createdo, canvas.width / 5, canvas.height / 3.1); //MA$TER_killer!!
ctx.fillText(createdf, canvas.width / 5, canvas.height / 2.75); //MA$TER_killer!!
ctx.fillStyle = "#ffffff"; //MA$TER_killer!!
ctx.fillText(region, canvas.width / 1.2, canvas.height / 2.9); //MA$TER_killer!!
ctx.fillText(verificationl, canvas.width / 2.9, canvas.height / 6); //MA$TER_killer!!
ctx.fillText(roles, canvas.width / 1.5, canvas.height / 1.3); //MA$TER_killer!!
ctx.font = '30px Elephant';//MA$TER_killer!!
ctx.fillStyle = "#007cff"; //MA$TER_killer!!
ctx.fillText(tserverid, canvas.width / 6, canvas.height / 1.6); //MA$TER_killer!!
ctx.font = '30px Elephant';//MA$TER_killer!!
ctx.fillStyle = "#ffd304"; //MA$TER_killer!!
ctx.fillText(townerna, canvas.width / 6, canvas.height / 1.8); //MA$TER_killer!!
ctx.fillStyle = "#ffffff"; //MA$TER_killer!!
ctx.font = '30px Elephant';//MA$TER_killer!!
ctx.fillText(tchannels, canvas.width / 1.4, canvas.height / 6); //MA$TER_killer!!
ctx.fillText(tvoice, canvas.width / 1.4, canvas.height / 4.8); //MA$TER_killer!!
ctx.fillText(ttext, canvas.width / 1.4, canvas.height / 3.9); //MA$TER_killer!!
ctx.fillStyle = "#e9abab"; //MA$TER_killer!!
ctx.fillText(tcreatedo, canvas.width / 5, canvas.height / 3.6); //MA$TER_killer!!
ctx.fillStyle = "#ffffff"; //MA$TER_killer!!
ctx.font = '25px Elephant';//MA$TER_killer!!
ctx.fillText(tregion, canvas.width / 1.5, canvas.height / 2.9); //MA$TER_killer!!
ctx.fillText(tverificationl, canvas.width / 5.5, canvas.height / 6); //MA$TER_killer!!
ctx.font = '30px Elephant';//MA$TER_killer!!
ctx.fillText(troles, canvas.width / 1.8, canvas.height / 1.3); //MA$TER_killer!!
ctx.font = '25px Elephant';//MA$TER_killer!!
ctx.fillText(hm, canvas.width / 4.3, canvas.height / 1.1); //MA$TER_killer!!
ctx.font = '30px Elephant';//MA$TER_killer!!
ctx.fillStyle = "#ff0000"; //MA$TER_killer!!
ctx.fillText(tmembers, canvas.width / 5, canvas.height / 1.4); //MA$TER_killer!!
ctx.fillStyle = "#00ff70"; //MA$TER_killer!!
ctx.fillText(tonline, canvas.width / 4.3, canvas.height / 1.3); //MA$TER_killer!!
ctx.fillStyle = "#ff0000"; //MA$TER_killer!!
ctx.font = '25px Elephant';//MA$TER_killer!!
ctx.fillText(members, canvas.width / 2.5, canvas.height / 1.4); //MA$TER_killer!!
ctx.fillStyle = "#00ff70"; //MA$TER_killer!!
ctx.fillText(online, canvas.width / 2.5, canvas.height / 1.3); //MA$TER_killer!!
ctx.fillStyle = "#ffffff"; //MA$TER_killer!!
ctx.fillText(by, canvas.width / 1.99, canvas.height / 1.1); //MA$TER_killer!!
ctx.drawImage(avatar, 50, 410, 50, 50); //MA$TER_killer!!
ctx.strokeStyle = '#74037b'; //MA$TER_killer!!
ctx.strokeRect(0, 0, canvas.width, canvas.height); //MA$TER_killer!!
ctx.beginPath(); //MA$TER_killer!!
ctx.arc(394, 125, 85, 0, Math.PI * 2, true); //MA$TER_killer!!
ctx.closePath(); //MA$TER_killer!!
ctx.clip(); //MA$TER_killer!!
ctx.drawImage(icon, 309, 40, 170, 170); //MA$TER_killer!!
msg.channel.sendFile(canvas.toBuffer()) //MA$TER_killer!!
}//MA$TER_killer!!
}//MA$TER_killer!!
});//MA$TER_killer!!
//كود الوقت
client.on('message', message => {
if (message.content.startsWith(prefix +`time`)) {
  
   let embed = new Discord.RichEmbed()
      .setDescription("امر الوقت")
      .addField("الوقت", message.createdAt)
        message.channel.send(embed)
}
})
//كود معلومات السيرفر عن طريق الايدي
client.on("message", message => {
  let command = message.content.split(" ")[0];
  if (command == prefix + "moreinfo") {
    var server = client.guilds.find(
      c => c.id === message.content.split(" ")[1]
    );//by ${ ! YamanSaleh }| Myame [🍇]#1282
    if (!server)
      return message.channel.send("**I Can't find this server :x:**");
    message.channel.send(
      new Discord.RichEmbed()
        .setColor("#36393e")
        .setTitle(`📖 **${server.name}** Info`)
        .setImage(
          `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=1024`
        )//by ${ ! YamanSaleh }| Myame [🍇]#1282
        .addField(
          "**Members Cout:**",
          `**${server.memberCount -
            server.members.filter(m => m.user.bot).size}** | **${
            server.members.filter(m => m.user.bot).size
          }** bots`,
          true
        )
        .addField(
          `**Channels [${server.channels.size}]**`,
          `**${
            server.channels.filter(m => m.type === "text").size
          }** Text | **${
            server.channels.filter(m => m.type === "voice").size
          }** Voice | **${
            server.channels.filter(m => m.type === "category").size
          }** Category`,
          true
        )
        .addField("**Server Region:**", server.region, true)
        .addField("**Server Owner**", `**${server.owner}**`, true)
        .addField(`**Roles Count [${server.roles.size}]**`, `** **`, true)
        .addField(
          `**verification Level [ ${server.verificationLevel} ]**`,
          `** **`,
          true
        )
    );
  }
});
//كود انتي سبام
const antispam = JSON.parse(fs.readFileSync("./antispam.json", "utf8"));

client.on("message", async message => {
  if (antispam[message.author.id] == undefined) {
    antispam[message.author.id] = {
    lastmessage: "none"
    };
    fs.writeFile("./antispam.json", JSON.stringify(antispam), function(err) {
      if (err) throw err;
    });
  }else  if (antispam[message.guild.id] == undefined) {
    antispam[message.guild.id] = {
    onoff: "off"
    };
    fs.writeFile("./antispam.json", JSON.stringify(antispam), function(err) {
      if (err) throw err;
    });
  }
  let args = message.content.split(" ");
  let command = args[0]
  if(command === prefix + "antispam"){
      if(!args[1])return message.channel.send("**Error | Use `antispam on/off`**");
    if(args[1] === "on"){
            message.channel.send("**Done Sir Anti Spam Changed To ON**")
      antispam[message.guild.id].onoff = "on";
      fs.writeFile("./antispam.json", JSON.stringify(antispam), function(
        err
      ) {
        if (err) throw err;
      });
    }else if(args[1] === "off"){
      antispam[message.guild.id].onoff = "off";
      fs.writeFile("./antispam.json", JSON.stringify(antispam), function(
        err
      ) {
        if (err) throw err;
      });
      message.channel.send("**Done Sir Anti Spam Changed To OFF**")
    }
  }
});

client.on("message", async message => {
  if (antispam[message.author.id] == undefined) {
    antispam[message.author.id] = {
    lastmessage: "none"
    };
    fs.writeFile("./antispam.json", JSON.stringify(antispam), function(err) {
      if (err) throw err;
    });
  }else  if (antispam[message.guild.id] == undefined) {
    antispam[message.guild.id] = {
    onoff: "off"
    };
    fs.writeFile("./antispam.json", JSON.stringify(antispam), function(err) {
      if (err) throw err;
    });
  }else if(antispam[message.author.id].lastmessage === "none") {
    return;
  }else if(antispam[message.guild.id].onoff === "off"){
    return;
  }else if(antispam[message.author.id].lastmessage === message.content){
    return message.delete();
  }

  antispam[message.author.id].lastmessage = message.content;
  fs.writeFile("./antispam.json", JSON.stringify(antispam), function(
    err
  ) {
    if (err) throw err;
  });

});
//كود الحذف
client.on("message", message => {
var prefix = "%";
var args = message.content.substring(prefix.length).split(" ");
if (message.content.startsWith(prefix + "مسح")) {
if (!args[1]) {
let x5bz1 = new Discord.RichEmbed()
.setDescription("#clear <number>")
.setColor("#0000FF");
message.channel.sendEmbed(x5bz1);
} else {
let messagecount = parseInt(args[1]);
message.channel
.fetchMessages({ limit: messagecount })
.then(messages => message.channel.bulkDelete(messages));
message.channel
.fetchMessages({ limit: messagecount })
.then(messages => message.channel.bulkDelete(messages));
message.channel
.fetchMessages({ limit: messagecount })
.then(messages => message.channel.bulkDelete(messages));
let x5bz2 = new Discord.RichEmbed()
.setColor("#008000")
.setDescription(":white_check_mark: | Delete " + args[1] + " Message!");
message.delete("..");
message.channel.sendEmbed(x5bz2);
}
}
});
//كود الكيك
client.on('message', message => {
  if(message.content.split(' ')[0] == `${prefix}kick`){
  if(!message.guild || message.author.bot) return undefined;
      if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(':no_entry: | لا تمتلك صلاحية طرد الاعضاء!');
      if(!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.channel.send(':no_entry: | انا لا امتلك صلاحية طرد الاعضاء!');
      let args = message.content.split(" ").slice(1);
      let user = message.guild.members.get(message.content.split(' ')[1]) || message.mentions.members.first();
      let reason = message.content.split(" ").slice(2).join(" ");
      if(!user) return message.channel.send("**منشن عضو**");
      if(!reason) reason = 'No reason provided.';
      if(user.user.id === message.author.id) return message.channel.send(':no_entry: | لماذا تريد طرد نفسك؟');
      if(user.user.id === message.guild.owner.id) return message.channel.send(':no_entry: | محاولة فاشلة جميلة :3');
      if(message.guild.member(user.user).highestRole.position >= message.guild.member(message.member).highestRole.position) return message.channel.send(`:no_entry: | لا يمكنك طرد **${user.user.username}** لأن رتبته اعلي منك!`);
      if(message.guild.member(user.user).highestRole.position >= message.guild.member(client.user).highestRole.position) return message.channel.send(`:no_entry: | لا يمكنني طرد **${user.user.username}** لأن رتبته اعلي من رتبتي!`);
      if(!message.guild.member(user.user).kickable) return message.channel.send(`:no_entry: | لا يمكنني طرد **${user.user.username}** `);
      if(message.guild.member(user.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`:no_entry: | لا يمكننك طرد **${user.user.username}** لأنه يمتلك رتبة عالية!`);
      message.guild.member(user).kick(reason, user);
      message.channel.send(`:white_check_mark: | تم بنجاح طرد ${user.user.username} من السيرفر! :airplane: ``${reason}```);
    }
});
//كود اليوزر
client.on("message", pixelbot => {
  // 
  if (pixelbot.content.startsWith(prefix + "user")) {
    // 
    if (pixelbot.author.bot) return;
    if (!pixelbot.guild)
      return pixelbot.reply("**❌ - This Command is only done on Servers**");
    pixelbot.guild.fetchInvites().then(invites => {
      // 
      let personalInvites = invites.filter(
        i => i.inviter.id === pixelbot.author.id
      );
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      var roles = pixelbot.member.roles
        .map(roles =>`**${roles.name}** |`)
        .join( );
      let pixeluser = new Discord.RichEmbed() // 
        .setColor("#00000")
        .setTitle(" 🔰 💗   | Use  r Info") // 
        .setAuthor(pixelbot.author.username, pixelbot.author.avatarURL)
        .addField("**✽ الاسم :**   ", pixelbot.author.username, true)
        .addField("**✽ التاك :**   ", pixelbot.author.discriminator, true)
        .addField("**✽ ID :** ", pixelbot.author.id, true) // 
        .addField(
          "**✽ داخل السيرفر بهذا الوقت :**   ",
          moment(pixelbot.joinedAt).format("D/M/YYYY h:mm a "),
          true
        )
        .addField(
          "**✽ مسوي حسابك في :**    ",
          moment(pixelbot.author.createdAt).format("D/M/YYYY h:mm a "),
          true
        )
        .addField("**✽ جايب انفايت :**    ", inviteCount, true)
        .setTimestamp(); // 

      pixelbot.channel.sendEmbed(pixeluser).then(c => {}); // 
    });
  }
}); //
/*//كود الباند
client.on('message', message => {
    var p = message.mentions.members.first();
    var reason = message.content.split(" ").slice(2).join(' ');
    var log = message.guild.channels.find('name', 'ban-log'); //سوي روم اسمها ban-log
   if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.channel.send("`You dont have BAN_MEMBERS Permission!`");
    if(message.content.startsWith(`${prefix}ban`)){
        if(!p) return message.reply(`**منشن الشخص**`);
        if(!reason) return message.reply(`**حط سبب
('1', "**نشر روابط بدون اذن الادارة**")
('2', "**نشر في الخاص**")
('3', "**اسم غير لائق**")
('4', "**صوره غير لائقه**")
('5', "**سب الاهل**")
('6', "**سب**")
('7', "**تقليل احترام**")
('8', "**تحرش**")
**`);
        if(!p.bannable) return message.reply(`**م اقدر ابند شخص من الستاف**`);
        reason = reason.replace('1', "**نشر روابط بدون اذن الادارة**");
        reason = reason.replace('2', "**نشر في الخاص**");
        reason = reason.replace('3', "**اسم غير لائق**");
        reason = reason.replace('4', "**صوره غير لائقه**");
        reason = reason.replace('5', "**سب الاهل**");
        reason = reason.replace('6', "**سب**");
        reason = reason.replace('7', "**تقليل احترام**");
        reason = reason.replace('8', "**تحرش**");
        reason = reason.replace
        reason = reason.replace
        var embed = new Discord.RichEmbed()
        .setAuthor(`User Banned!`)
        .addField(`Name ♣`, `<@${p.id}>`)
        .addField(`By ♣`, `<@${message.author.id}>`)
        .addField(`Reason ♣`, reason)
        .setTimestamp()
        .setColor("BLACK")
        .setFooter(` `)
        p.ban();
            message.delete();
        log.send({embed});
       
    }
});*/
//كود اللوق
/*const log = JSON.parse(fs.readFileSync('./log.json' , 'utf8')); // lazm mlf log.json
//Perfect log Code
client.on('message', message => {
    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
    if(message.content.startsWith(prefix + "setlog")) {
if (message.author.bot) return;
        if(!message.channel.guild) return message.reply('**This Command is Just For Servers!**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
if(!findroom) return message.channel.send('Please Type The Log Channel Name')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Log Code Has Been Setup**')
.addField('Channel:', `${room}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
log[message.guild.id] = {
channel: room,
onoff: 'On'
}
fs.writeFile("./log.json", JSON.stringify(log), (err) => {
if (err) console.error(err)
})
    }})
         
client.on('message', message => {
 
    if(message.content.startsWith(prefix + "logtoggle")) {
if (message.author.bot) return;
        if(!message.channel.guild) return message.reply('**This Command is Just For Servers!**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
          if(log[message.guild.id].onoff === 'Off') return [message.channel.send(`**The log Is __𝐎𝐍__ !**`), log[message.guild.id].onoff = 'On']
          if(log[message.guild.id].onoff === 'On') return [message.channel.send(`**The log Is __𝐎𝐅𝐅__ !**`), log[message.guild.id].onoff = 'Off']
          fs.writeFile("./log.json", JSON.stringify(log), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }
         
        })
 
 
client.on('messageDelete', message => {
 
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
                        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
    if(log[message.guild.id].onoff === 'Off') return;
    var logChannel = message.guild.channels.find(c => c.name === `${log[message.guild.id].channel}`);
    if(!logChannel) return;
 
    let messageDelete = new Discord.RichEmbed()
    .setTitle('**[MESSAGE DELETE]**')
    .setColor('RED')
    .setThumbnail(message.author.avatarURL)
 /*  .setDescription(`**n**:wastebasket: Successfully ``DELETE`` **MESSAGE** In ${message.channel}nn**Channel:** ``${message.channel.name}`` (ID: ${message.channel.id})n**Message ID:** ${message.id}n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})n**Message:**n`${message}``)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
 
    logChannel.send(messageDelete);
});
client.on('messageUpdate', (oldMessage, newMessage) => {
 
    if(oldMessage.author.bot) return;
    if(!oldMessage.channel.type === 'dm') return;
    if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
                        if(!log[oldMessage.guild.id]) log[oldMessage.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMessage.guild.id].onoff === 'Off') return;
    var logChannel = oldMessage.guild.channels.find(c => c.name === `${log[oldMessage.guild.id].channel}`);
    if(!logChannel) return;
 
    if(oldMessage.content.startsWith('https://')) return;
 
    let messageUpdate = new Discord.RichEmbed()
    .setTitle('**[MESSAGE EDIT]**')
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor('BLUE')
  /*  .setDescription(`**n**:wrench: Successfully ``EDIT`` **MESSAGE** In ${oldMessage.channel}nn**Channel:** ``${oldMessage.channel.name}`` (ID: ${oldMessage.channel.id})n**Message ID:** ${oldMessage.id}n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})nn**Old Message:**```${oldMessage}```n**New Message:**```${newMessage}````)
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)
 
    logChannel.send(messageUpdate);
});
 
 
client.on('roleCreate', role => {
 
    if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
    var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleCreate = new Discord.RichEmbed()
        .setTitle('**[ROLE CREATE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**n**:white_check_mark: Successfully ``CREATE`` Role.nn**Role Name:** ``${role.name}`` (ID: ${role.id})n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(role.guild.name, role.guild.iconURL)
 
        logChannel.send(roleCreate);
    })
});
client.on('roleDelete', role => {
 
    if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
    var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleDelete = new Discord.RichEmbed()
        .setTitle('**[ROLE DELETE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**n**:white_check_mark: Successfully ``DELETE`` Role.nn**Role Name:** ``${role.name}`` (ID: ${role.id})n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RED')
        .setTimestamp()
        .setFooter(role.guild.name, role.guild.iconURL)
 
        logChannel.send(roleDelete);
    })
});
client.on('roleUpdate', (oldRole, newRole) => {
 
    if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[oldRole.guild.id]) log[oldRole.guild.id] = {
          onoff: 'Off'
            }
    if(log[oldRole.guild.id].onoff === 'Off') return;
    var logChannel = oldRole.guild.channels.find(c => c.name === `${log[oldRole.guild.id].channel}`);
    if(!logChannel) return;
 
    oldRole.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(oldRole.name !== newRole.name) {
            if(log[oldRole.guild.id].onoff === 'Off') return;
            let roleUpdateName = new Discord.RichEmbed()
            .setTitle('**[ROLE NAME UPDATE]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**n**:white_check_mark: Successfully ``EDITED`` Role Name.nn**Old Name:** ``${oldRole.name}``n**New Name:** ``${newRole.name}``n**Role ID:** ${oldRole.id}n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
 
            logChannel.send(roleUpdateName);
        }
        if(oldRole.hexColor !== newRole.hexColor) {
            if(oldRole.hexColor === '#000000') {
                var oldColor = '`Default`';
            }else {
                var oldColor = oldRole.hexColor;
            }
            if(newRole.hexColor === '#000000') {
                var newColor = '`Default`';
            }else {
                var newColor = newRole.hexColor;
            }
            if(log[oldRole.guild.id].onoff === 'Off') return;
            let roleUpdateColor = new Discord.RichEmbed()
            .setTitle('**[ROLE COLOR UPDATE]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**n**:white_check_mark: Successfully ``EDITED`` **${oldRole.name}** Role Color.nn**Old Color:** ${oldColor}n**New Color:** ${newColor}n**Role ID:** ${oldRole.id}n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
 
            logChannel.send(roleUpdateColor);
        }
    })
});
 
 
client.on('channelCreate', channel => {
 
    if(!channel.guild) return;
    if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
    var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
    if(!logChannel) return;
 
    if(channel.type === 'text') {
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') {
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') {
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let channelCreate = new Discord.RichEmbed()
        .setTitle('**[CHANNEL CREATE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**n**:white_check_mark: Successfully ``CREATE`` **${roomType}** channel.nn**Channel Name:** ``${channel.name}`` (ID: ${channel.id})n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelCreate);
    })
});
client.on('channelDelete', channel => {
    if(!channel.guild) return;
    if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
    var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
    if(!logChannel) return;
 
    if(channel.type === 'text') {
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') {
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') {
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let channelDelete = new Discord.RichEmbed()
        .setTitle('**[CHANNEL DELETE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**n**:white_check_mark: Successfully ``DELETE`` **${roomType}** channel.nn**Channel Name:** ``${channel.name}`` (ID: ${channel.id})n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RED')
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelDelete);
    })
});
client.on('channelUpdate', (oldChannel, newChannel) => {
    if(!oldChannel.guild) return;
            if(!log[oldChannel.guild.id]) log[oldChannel.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldChannel.guild.id].onoff === 'Off') return;
    var logChannel = oldChannel.guild.channels.find(c => c.name === `${log[oldChannel.guild.id].channel}`);
    if(!logChannel) return;
 
    if(oldChannel.type === 'text') {
        var channelType = 'Text';
    }else
    if(oldChannel.type === 'voice') {
        var channelType = 'Voice';
    }else
    if(oldChannel.type === 'category') {
        var channelType = 'Category';
    }
 
    oldChannel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(oldChannel.name !== newChannel.name) {
            let newName = new Discord.RichEmbed()
            .setTitle('**[CHANNEL EDIT]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**n**:wrench: Successfully Edited **${channelType}** Channel Namenn**Old Name:** ``${oldChannel.name}``n**New Name:** ``${newChannel.name}``n**Channel ID:** ${oldChannel.id}n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)
 
            logChannel.send(newName);
        }
        if(oldChannel.topic !== newChannel.topic) {
            if(log[oldChannel.guild.id].onoff === 'Off') return;
            let newTopic = new Discord.RichEmbed()
            .setTitle('**[CHANNEL EDIT]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
   /*         .setDescription(`**n**:wrench: Successfully Edited **${channelType}** Channel Topicnn**Old Topic:**n```${oldChannel.topic || 'NULL'}```n**New Topic:**n```${newChannel.topic || 'NULL'}```n**Channel:** ${oldChannel} (ID: ${oldChannel.id})n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)
 
            logChannel.send(newTopic);
        }
    })
});
 
 
client.on('guildBanAdd', (guild, user) => {
 
    if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[guild.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[guild.guild.id].onoff === 'Off') return;
    var lo*/
//كود منع دخول البوتات

var Enmap = require("enmap");
client.antibots = new Enmap({ name: "chat" });
var antibots = client.antibots;
var julian = client;

julian.on("message", codes => {
if (codes.content.startsWith(prefix + "antibots on")) {
if (
codes.author.bot ||
!codes.channel.guild ||
codes.author.id != codes.guild.ownerID
)
return;
antibots.set(`${codes.guild.id}`, {
onoff: "On"
});

codes.channel.send("**تم تفعيل خاصية منع دخول البوتات 🔐 **");
}
if (codes.content.startsWith(prefix + "antibots off")) {
if (
codes.author.bot ||
!codes.channel.guild ||
codes.author.id != codes.guild.ownerID
)
return;
antibots.set(`${codes.guild.id}`, {
onoff: "Off"
});
codes.channel.send("**تم الغاء خاصية منع دخول البوتات 🔓 **");
}
});

julian.on("guildMemberAdd", member => {
if (!antibots.get(`${member.guild.id}`)) {
antibots.set(`${member.guild.id}`, {
onoff: "Off"
});
}
if (antibots.get(`${member.guild.id}`).onoff == "Off") return;
if (member.user.bot) return member.kick();
});

client.on("message", async message => {
const moment = require("moment"); //npm i moment
const ms = require("ms"); //npm i ms
var time = moment().format("Do MMMM YYYY , hh:mm");
var room;
var title;
var duration;
var currentTime = new Date(),
hours = currentTime.getHours() + 3,
minutes = currentTime.getMinutes(),
done = currentTime.getMinutes() + duration,
seconds = currentTime.getSeconds();
if (minutes < 10) {
minutes = "0" + minutes;
}
var suffix = "AM";
if (hours >= 12) {
suffix = "PM";
hours = hours - 12;
}
if (hours == 0) {
hours = 12;
}
});
///قفل الشات وفتحو
client.on("message", message => {
if (message.content === prefix + "قفل") {
if (!message.channel.guild)
return message.reply(" هذا الامر فقط للسيرفرات !!");

if (!message.member.hasPermission("MANAGE_MESSAGES"))
return message.reply(" ليس لديك صلاحيات");
message.channel
.overwritePermissions(message.guild.id, {
SEND_MESSAGES: false
})
.then(() => {
message.reply("**تم قفل الشات :no_entry: **");
});
}
if (message.content === prefix + "فتح") {
if (!message.channel.guild)
return message.reply(" هذا الامر فقط للسيرفرات !!");

if (!message.member.hasPermission("MANAGE_MESSAGES"))
return message.reply("ليس لديك صلاحيات");
message.channel
.overwritePermissions(message.guild.id, {
SEND_MESSAGES: true
})
.then(() => {
message.reply("**تم فتح الشات :white_check_mark:**");
});
}
});

client.on("error", err => {
console.log(err);
});

client.on("messageCreate", async message => {
let args = message.cleanContent.split(" ");
if (args[0] == `${prefix}roles`) {
let space = " ";
let roles = message.guild.roles
.map(r => r)
.sort((a, b) => b.position - a.position);
let rr = roles
.map(
r =>
`${r.name +
space.substring(r.name.length) +
message.guild.members.filter(m => m.roles.includes(r.id))
.length} members`
)
.join("\n");
await message.channel.sebd(`\`\`\`${rr}\`\`\``);
}
});
//Warn
client.on("message", message => {
if (message.content.startsWith(prefix + "warn")) {
if (!message.member.hasPermission("ADMINISTRATOR"))
return message.reply(`You Don't Have Permission`);
let user = message.mentions.users.first();
if (!user)
return message
.reply("**!منشن شخص**")
.then(message => message.delete(4500));
let reason = message.content.split(" ").slice(2);

if (message.guild.member(user).hasPermission("ADMINISTRATOR"))
return message
.reply(`**You Can't Warn This User**`)
.then(message => message.delete(5000));
let embed = new Discord.RichEmbed()
.setTitle(":warning: **You Were warned!**")
.addField(reason)
.setFooter(
`${message.guild.iconURL} ${message.guild.name} | ${message.createdAt}`
);
user.sendEmbed(embed);
message.channel.send(`**تم تحذير هذا العضو**`);
}
});
//كود الهيلب
client.on("message", m => {
  if (m.content === prefix + "help") {
    let Dashboard = "رابط موقع البوت";
    var addserver ="رابط اضافت البوت ";
    var SUPPORT = "رابط سيرفر البوت هنا";
    let embed = new Discord.RichEmbed().setTitle(`قائمة الاوامر🏅`)
      .setDescription(`               
**برفيكس البوت = %**
----------------------------
%credits = لمعرفة كم عندك كريدت
%daily = لائخذ كريدت كل اربع وعشرين ساعة
----------------------------
%avatar = يجيب لك صورتك
%user = يعطيك معلومات على حسابك
%topservers = توب السيرفرات الي فيها البوت
%time = يقول لك كم الوقت الان
----------------------------
%serverinfo = معلومات السيرفر
%serverpng = معلومات السيرفر في صورة
----------------------------
%dm (الرسالة) = يرسل رسالة لشخص على الخاص
%ping = لمعرفة سرعة اتصال البوت
----------------------------
%hc = اخفاء الروم
%sc = الغاء اخفاء الروم
%قفل = لقفل الروم
%فتح = افتح الروم
----------------------------
%antispam on = منع السبام
%antispam off = الغاء منع السبام
%antispread on = منع نشر روابط
%antispread off = الغاء منع نشر الروابط
%antibots on = منع دخول البوتات
%antibots off = الغاء منع دخول البوتات
----------------------------
%warn = تحذير
%kick = طرد العضو من،السيرفر
~~%ban = باند~~ لم انتهي من هذا الامر
%مسح = لمسح الرسايل
----------------------------
%botinfo = معلومات على البوت
%bots = أضهار جميع البوتات
----------------------------
رابط اضافة البوت :
https://discord.com/api/oauth2/authorize?client_id=719608104408318032&permissions=8&scope=bot
رابط سيرفر السبورت :
https://discord.gg/kqRxsqR
وشكرآ لكم`);
    m.react("👑");
    m.author.send(embed);
  }
});
//كود اضهار جميع البوتات
client.on('message', alphamsg => {
if(alphamsg.content === prefix + "bots") {
if(!alphamsg.channel.guild) return;
let alphaf = 1;
const alpha = alphamsg.guild.members.filter(m=>m.user.bot).map(m=>`:small_orange_diamond: ${alphaf++} - <@${m.id}>`);
alphamsg.channel.send(`**وجدت ${alphamsg.guild.members.filter(m=>m.user.bot).size} بوت
البوتات الموجوده في السيرفر
${alpha.join('')}
**
`)
}
});

client.login(process.env.BOT_TOKEN);
