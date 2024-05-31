        return process.exit(0);
      }
      if (['presence', 'typ', 'read_receipt'].some(data => data === message.type)) return;
      return listener(message);
    });
  });
}
(async () => {
  try {
    console.log(`\n` + `──DATABASE─●`);
    console.log(`[ CONNECT ] Connected to JSON database successfully!`);
    console.log(`\n` + `──LOADING COMMANDS─●`);
    console.log(`LOADED commands and events successfully`);
    console.log(`[ TIMESTART ] Launch time: ${((Date.now() - global.client.timeStart) / 1000).toFixed()}s`);
    onBot();
  } catch (error) {
    console.error(`[ CONNECT ] Failed to connect to the JSON database.`);
  }
})();
// Call the keepAlive function to start the keep-alive process
keepAlive();
