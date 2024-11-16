const profile = require('../model/profile')
const user = require('../model/user')

exports.updateProfile = async (req, res) => {
    try {
        // getdata
        const { dateOfBirth = "", about = "", contactNo, gender } = req.body
        // get userid
        const id = req.user.id
        // validations
        if (!contactNo || !gender || !id) {
            return res.status(400).json({ msg: 'Invalid Request', success: false })
        }
        // find profile
        const userDetails = await user.findById(id)
        const profileId = userDetails.additionalDetails
        const profileDetails = await profile.findById(profileId)
        // update profile
        profileDetails.about = about
        profileDetails.gender = gender
        profileDetails.dateOfBirth = dateOfBirth
        profileDetails.contactNo = contactNo
        await profileDetails.save()
        // return updated profile
        return res.status(200).json({
            msg: 'Profile updated successfully',
            success: true,
            profile: profileDetails,
        })

    } catch (error) {
        return res.status(500).json({ msg: error.message, success: false })
    }
}

// delete account
exports.deleteAccount = async (req, res) => {
    try {
        // fetch id
        const id = req.user.id
        // validation
        const userDetails = await user.findById(id)
        if (!userDetails) {
            return res.status(404).json({
                msg: 'User not found',
                success: false
            })
        }
        // profile delete
        await profile.findByIdAndDelete({ _id: userDetails.additionalDetails })
        // delete user
        await user.findByIdAndDelete({ _id: id })
        // return res
        return res.status(200).json({
            msg: 'Account deleted successfully',
            success: true,
        })
        // TODO  //  HW unenrolled se delete
    } catch (error) {
        return res.status(500).json({ msg: error.message, success: false })
    }
}


exports.getAllProfile = async (req, res) => {
    try {
        const id = req.user.id
        const userDetails = await user.findById(id).populate('additionalDetails').exec()
        res.status(200).json({
            msg: 'Profile fetched successfully',
            success: true,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message, success: false })
    }
}

// tags ko change karna hai category mai