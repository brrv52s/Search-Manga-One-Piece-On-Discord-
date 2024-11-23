const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// توكن بوتك
const token = '';
// رابط الصورة الي بتطلع بالإيمبيد 
const imageURL = ``;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('Code Developed By : .52s ')
});


client.on('messageCreate', async (message) => {
    
    if (message.author.bot) return;

    
    if (message.content.startsWith('!search')) {
        
        const args = message.content.split(' ');
        if (args.length < 2) {
            return message.reply('يرجى تحديد رقم الفصل مثال : `!search 1131`');
        }

        const chapterNumber = args[1];

        
        if (isNaN(chapterNumber) || chapterNumber < 1) {
            return message.reply('يرجى كتابة رقم فصل صحيح مثال : `!search 1131`');
        }

        try {

            const chapterURL = `https://3asq.org/manga/one-piece/${chapterNumber}/`;

         
          const embed = new EmbedBuilder()
                .setColor(0x0099ff)
                .setDescription(`## فصل ون بيس رقم __${chapterNumber}__ 
اضغط على الزر أدناه للإنتقال للفصل`)
                .setImage(imageURL) 
                .setTimestamp();

            
            const button = new ButtonBuilder()
                .setLabel('قراءة الفصل')
                .setStyle(ButtonStyle.Link)
                .setURL(chapterURL);

            
            const row = new ActionRowBuilder().addComponents(button);

            
            await message.channel.send({
                embeds: [embed],
                components: [row],
            });
        } catch (error) {
            console.error(error);
            message.reply('حدث خطأ أثناء محاولة جلب الفصل يرجى المحاولة لاحقًا');
        }
    }
});

client.login(token);
