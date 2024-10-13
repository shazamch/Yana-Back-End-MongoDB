const passwordService = require('../services/passwordServices');
//
exports.changePassword = async (req, res) => {
    const id = req.user.id
    const { oldPassword, newPassword } = req.body;
    try {
        const result = await passwordService.changePassword(id, oldPassword, newPassword);

        if (result.success) {
            res.json({ message: 'Password changed successfully' });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error changing password:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getQuestion = async (req, res) => {
    const id = req.user.id
    try {
        const question = await passwordService.getQuestion(id);
        res.status(400).json({ message: "QUestion retrived Sucessfully.", question: question });
    } catch (error) {
        console.error('Error while retriving question:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.resetPassword = async (req, res) => {
    const id = req.user.id
    const { securityQuestionAnswer, newPassword } = req.body;
    try {
        const result = await passwordService.resetPassword(id, securityQuestionAnswer, newPassword);

        if (result.success) {
            res.json({ message: 'Password reset successfully' });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error resetting password:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};