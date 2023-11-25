export default function handler(req, res) {
    res.status(200).json({
      success: true,
      message: 'files',
      server: "https://discord.gg/DVUsgKuEhm",
      data: {
        timestamp: new Date().toISOString(),
      },
    });
}
  