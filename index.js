import { TikTokLive } from "tiktok-live-events";

const username = process.env.TIKTOK_USERNAME;

if (!username) {
    console.error("❌ TIKTOK_USERNAME غير موجود");
    process.exit(1);
}

const live = new TikTokLive(username);

live.on("connected", () => {
    console.log(`🟢 Connected to @${username}`);
});

live.on("disconnected", () => {
    console.log("🔴 Disconnected from TikTok LIVE");
});

live.on("gift", (event) => {
    console.log(
        `🎁 GIFT | ${event.user?.uniqueId ?? "Unknown"} | ${event.giftName} x${event.repeatCount ?? 1}`
    );
});

live.on("like", (event) => {
    console.log(
        `❤️ LIKE | ${event.user?.uniqueId ?? "Unknown"} | ${event.likeCount ?? 1}`
    );
});

live.on("follow", (event) => {
    console.log(
        `➕ FOLLOW | ${event.user?.uniqueId ?? "Unknown"}`
    );
});

live.on("chat", (event) => {
    console.log(
        `💬 CHAT | ${event.user?.uniqueId ?? "Unknown"}: ${event.comment}`
    );
});

live.on("error", (error) => {
    console.error("❌ TikTok error:", error);
});

await live.connect();
