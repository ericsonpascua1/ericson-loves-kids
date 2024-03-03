module.exports.config = {
    name: "uptime",
    version: "1.0",
    hasPermission: 0,
    credits: "Aki Hayakawa",
    usePrefix: true,
    description: "Uptime",
    commandCategory: "Utilities",
    usages: "uptime",
    cooldowns: 0,
};

module.exports.run = async ({ api, event }) => {
    let time = process.uptime();
    let days = Math.floor(time / (24 * 60 * 60)); // Convert uptime to days
    let hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60)); // Remaining time converted to hours
    let minutes = Math.floor((time % (60 * 60)) / 60); // Remaining time converted to minutes
    let seconds = Math.floor(time % 60);

    const timeStart = Date.now();

    return api.sendMessage('', event.threadID, (err, info) => {
        setTimeout(() => {
            const daysString = days === 1 ? "day" : "days";
            const hoursString = hours === 1 ? "hour" : "hours";
            const minutesString = minutes === 1 ? "minute" : "minutes";
            const secondsString = seconds === 1 ? "second" : "seconds";

            const uptimeString = `${days > 0 ? `${days} ${daysString} ` : ''}${hours > 0 ? `${hours} ${hoursString} ` : ''}${minutes > 0 ? `${minutes} ${minutesString} ` : ''}${seconds} ${secondsString}`;

            api.sendMessage(`Ping: ${(Date.now() - timeStart)}ms\nUptime: ${uptimeString}`, event.threadID, event.messageID);
        }, 200);
    }, event.messageID);
};
