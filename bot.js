const TelegramBot = require('node-telegram-bot-api');

const token = '';


const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 9 && currentHour < 18) {
        bot.sendMessage(chatId, 'Informações em: https://uvv.br');
    } else {
        bot.sendMessage(chatId, 'Olá! Estamos fora do horário comercial, me passe seu email, assim que possivel entraremos em contato!');
        bot.once('message', async (msg) => {
            const userEmail = msg.text;

            try {
await prisma.userEmail.create({
data: {
email: userEmail,
},
});
bot.sendMessage(chatId, 'Obrigado! Seu email foi armazenado com sucesso. Entraremos em contato em breve.');
} catch (error) {
bot.sendMessage(chatId, 'Ocorreu um erro ao armazenar seu email. Por favor, tente novamente mais tarde.');
}
});
 }
});
