export default (req, res) => {
    res.status(200).json({
        success: true,
        message: '💀',
        data: {
          timestamp: new Date().toISOString(),
        },
    });
}
  