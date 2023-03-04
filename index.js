// BrianCDev
// {} [] `` <> \

const { REST, Routes, Client, GatewayIntentBits, ActivityType, EmbedBuilder } = require("discord.js");
const client = new Client({ 
    intents: [

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessageTyping
    
    ]
});


// Cuando el cliente encienda.
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`.green);

    client.user.setPresence({
        activities: [{ name: `/ayuda`, type: ActivityType.Watching }],
        status: 'offline',
      });
    
});




// Importamos módulos
const config = require(`${process.cwd()}/config.json`);
const fs = require("fs")

require("colors");


// Creamos el comando
const commands = [
    {
        name: "react",
        description: "Add reacts!",
    },
    {
        name: "developer",
        description: "Who are my owner",
    },
    {
        name: "ping",
        description: "Reply with bot latency.",
    },
];


const rest = new REST({version: "10"}).setToken(config.token);

(async () => {
    try {
        console.log("Started refreshing application (/) commands".blue);

        await rest.put(Routes.applicationCommands(config.client_id), { body: commands});

        console.log("succesfully reloaded application (/) commands.".green)

    } catch(error) {
        console.error(error);
    }
    
})();



// Bot responde, cuando ejecutamos un comando.
client.on("interactionCreate", async interaction => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === "react"){

        const message = await interaction.reply({ content: 'Reacting!', fetchReply: true });
		await message.react('🇦');
		await message.react('🇧');
		await message.react('🇨');
    }

    if(interaction.commandNAme === "developer"){
        await interaction.reply("My developer is @BrianCDev");
    }

    if(interaction.commandNAme === "ping"){
        await interaction.reply(` Server status is ✅, running at \`${client.ws.ping}ms\`!`);
    }

});


// Autentificación del bot.
client.login(config.token);