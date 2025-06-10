const Karyawan = require("./models/Karyawan");

const getKryn = async (req, res) => {
    try {
        const kryn = await Karyawan.findAll();
        res.status(200).json(kryn);
    } catch (error) {
        console.error("Karyawan Controller error:", error);
        res.status(500).json({ message: "Gagal mengambil data karyawan." });
    }
};

module.exports = { getKryn };