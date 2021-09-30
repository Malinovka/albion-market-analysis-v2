const { connect } = require("nats");
(async () => {

  const nc = await connect({ 
    servers: "www.albion-online-data.com:4222",
    user: "public",
    pass: "thenewalbiondata",
    json: true,
  });

  console.log(`Connected to ${nc.getServer()}`);

  const sub = nc.subscribe("marketorders.deduped");

    for await (const m of sub) {
      console.log(`[${sub.getProcessed()}]: ${m.data}`);
    }

  await nc.drain();
})().catch(console.log);