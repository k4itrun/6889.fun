export default function handler(req, res) {
    res.status(200).json({
      success: true,
      message: 'bypass',
      server: "https://discord.gg/DVUsgKuEhm",
      data: {
        timestamp: new Date().toISOString(),
      },
    });
}
  