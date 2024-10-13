const bcrypt = require('bcrypt');
const adminService = require('./adminService');

// change Password, takes old password, new password
exports.changePassword = async (adminId, oldPassword, newPassword) => {
    try {
        // Fetch the admin by ID
        const admin = await adminService.getAdminById(adminId);
        if (!admin) {
            return { success: false, message: 'Admin not found' };
        }

        // Check if the old password matches
        const isMatch = await bcrypt.compare(oldPassword, admin.Password);
        if (!isMatch) {
            return { success: false, message: 'Old password is incorrect' };
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the admin's password
        await adminService.updateAdmin(adminId, { Password: hashedPassword });

        return { success: true };
    } catch (error) {
        console.error('Error in changeAdminPassword:', error.message);
        throw error;
    }
};

// forgot Password, gives the security question to client
exports.getQuestion = async (adminId) => {
    try {
        // Fetch the admin by username (change to ID if needed)
        const admin = await adminService.getAdminById(adminId);

        if (!admin) {
            return { success: false, message: 'Admin not found' };
        }

        // Verify the security question answer
        const [storedQuestion, storedAnswer] = admin.SecurityQuestion.split(',').map(part => part.split(':')[1].trim());
        return { storedQuestion};
    } catch (error) {
        console.error('Error in getting question:', error.message);
        throw error;
    }
};

// reset Password, takes answer to questiona nd new password
exports.resetPassword = async (adminId, givenAnswer, newPassword,) => {
    try {
        // Fetch the admin by username (change to ID if needed)
        const admin = await adminService.getAdminById(adminId);

        if (!admin) {
            return { success: false, message: 'Admin not found' };
        }
        const [storedQuestion, storedAnswer] = admin.SecurityQuestion.split(',').map(part => part.split(':')[1].trim());
        // Verify the security question answer
        if (givenAnswer !== storedAnswer) {
            return { success: false, message: 'Security question answer is incorrect' };
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the admin's password
        await adminService.updateAdmin(adminId, { Password: hashedPassword });

        return { success: true };
    } catch (error) {
        console.error('Error in resetAdminPassword:', error.message);
        throw error;
    }
};