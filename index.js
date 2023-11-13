// async function testing() {
const BingChat = await import("bing-chat");

async function example() {
    const api = new BingChat({
        cookie: "1k0mR8sigerF7HCG6LnfENnhH3FYnYh691u0t3wcAWZFoAv3etL-DNoH0qN4SHXOGK7Y08G-yBB2MPTQ7SE7jBl0sYmM-3YKQ7kD3_6tSht7vN6WuiLdM23q8P7oCE7AC6YRcb04DF87bq-aCKW5ZhpGK9Q_xmC5ufQbSGtfMr45EcDyaI3CMKOm6OaxHboIjDFvClspwLKbq0xB2R5cFLNSwVNar3HIiAQeHbGLk584",
    });

    const res = await api.sendMessage("Hello World!");
    console.log(res.text);
}
