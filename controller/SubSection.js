const subsection = require('../model/SubSection')
const section = require('../model/Section')
const { uploadImageToCloudinary } = require('../utils/imageUpload')
require('dotenv').config()

// create section
exports.createSubsection = async (req, res) => {
    try {
        // fetch data from req body
        const { title, timeDuration, description, sectionId } = req.body
        // fetch video
        const video = req.files.videoFile
        // validations
        if (!title || !timeDuration || !description || !sectionId || !video) {
            return res.status(400).json({ error: 'All fields are required', success: false })
        }
        // upload cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.CLOUD_FOLDER)
        // create subsection
        const subSectionDetails = await subsection.create({
            title,
            timeDuration,
            description,
            videoUrl: uploadDetails.secure_url,
            sectionId
        })
        // update section with subsection
        const updatedSection = await section.findByIdAndUpdate({ _id: sectionId }, {
            $push: {
                subsections: subSectionDetails._id
            }
        }, { new: true })
        // TODO  // HW log updated section after populating
        // return res
        return res.status(200).json({
            message: 'Subsection created successfully',
            success: true,
            data: updatedSection
        })
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

// update SubSections
exports.updateSubSection = async (req, res) => {
    try {
        // Fetch data from request body
        const { title, timeDuration, description, sectionId, subsectionId } = req.body;
        const video = req.files ? req.files.videoFile : null; // Optional video file

        // Validations
        if (!subsectionId || !title || !timeDuration || !description || !sectionId) {
            return res.status(400).json({ error: 'All fields are required', success: false });
        }

        // Fetch the subsection to be updated
        const existingSubsection = await subsection.findById(subsectionId);
        if (!existingSubsection) {
            return res.status(404).json({ error: 'Subsection not found', success: false });
        }

        // Upload new video to Cloudinary if provided
        let updatedVideoUrl = existingSubsection.videoUrl; // Default to current URL
        if (video) {
            const uploadDetails = await uploadImageToCloudinary(video, process.env.CLOUD_FOLDER);
            updatedVideoUrl = uploadDetails.secure_url;
        }

        // Update subsection details
        const updatedSubsection = await subsection.findByIdAndUpdate(
            subsectionId,
            {
                title,
                timeDuration,
                description,
                videoUrl: updatedVideoUrl,
                sectionId,
            },
            { new: true } // Return the updated document
        );

        if (!updatedSubsection) {
            return res.status(500).json({ error: 'Failed to update subsection', success: false });
        }

        // Return response
        return res.status(200).json({
            message: 'Subsection updated successfully',
            success: true,
            data: updatedSubsection,
        });
    } catch (error) {
        // Handle errors
        console.error('Error updating subsection:', error.message);
        return res.status(500).json({ message: error.message, success: false });
    }
};



// delete subsections

exports.deleteSubsection = async (req, res) => {
    try {
        const { sectionId } = req.body
        const deleteSection = await subsection.findByIdAndDelete(sectionId)
        if (!deleteSection) {
            return res.status(404).json({ error: 'Section not found', success: false })
        }
        res.status(200).json({
            message: 'Section deleted successfully',
            success: true,
        })
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}







// exports.updateSubSection = async (req, res) => {
//     try {
//         const { title, timeDuration, description, sectionId } = req.body
//         const video = req.files ? req.files.videoFile : null;
//         if (!title || !timeDuration || !description || !sectionId || !video) {
//             return res.status(400).json({ error: 'All fields are required', success: false })
//         }
//         const existingUser = await section.findOne({ sectionId })
//         if (!existingUser) {
//             return res.status(404).json({ error: 'Section not found', success: false })
//         }
//         // upload video
//         if (video) {
//             const uploadDetails = await uploadImageToCloudinary(video, process.env.CLOUD_FOLDER)
//             existingUser.videoUrl = uploadDetails.secure_url
//         }
//         const updatedSection = await subsection.findByIdAndUpdate({ sectionId }, {
//             title,
//             timeDuration,
//             description,
//             videoUrl: existingUser.videoUrl
//         })
//         res.status(200).json({
//             message: 'Section updated successfully',
//             success: true,
//             data: updatedSection
//         })

//     } catch (error) {
//         return res.status(500).json({ message: error.message, success: false })
//     }
// }













// delete SubSection