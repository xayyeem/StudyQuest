const profile = require('../model/profile')
const user = require('../model/user')
const { uploadImageToCloudinary } = require('../utils/imageUpload')

exports.updateProfile = async (req, res) => {
    try {
        // getdata
        const { dateOfBirth = "", about = "", contactNo, gender } = req.body
        // get userid
        const id = req.user.id
        // // validations
        // if (!contactNo || !gender) {
        //     return res.status(400).json({ msg: 'Invalid Request', success: false })
        // }
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
            data: userDetails
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message, success: false })
    }
}

// update display picture
exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        const updatedProfile = await user.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}