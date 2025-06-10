const Pelanggan = require("./models/Pelanggan");

const getPlgn = async (req, res) => {
    try {
        const plgn = await Pelanggan.findAll();
        res.status(200).json(plgn);
    } catch (error) {
        console.error("Pelanggan Controller error:", error);
        res.status(500).json({ message: "Gagal mengambil data pelanggan." });
    }
};

module.exports = { getPlgn };