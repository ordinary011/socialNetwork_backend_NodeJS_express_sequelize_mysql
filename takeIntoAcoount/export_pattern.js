module.exports = async (req, res) => {
    try {
        
		res.status(200).json({
			success: true,
			msg: 'ok'
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
}