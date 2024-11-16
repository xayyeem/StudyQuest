const Tag = require('../model/Tags')

exports.createTag = async (req, res) => {
    try {
        // fetch data from req body
        const { name, description } = req.body
        // validation
        if (!name || !description) {
            return res.status(400).json({
                message: 'Name and description are required',
                success: false
            })
        }
        // create tag entry in db
        const tagDetails = await Tag.create({
            name,
            description
        })
        // return res
        res.status(200).json({
            message: 'Tag created successfully',
            data: tagDetails,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message

        })
    }
}

// getAllTags

exports.showAllTags = async (req, res) => {
    try {
        const allTags = await Tag.find({}, {
            name: true, description: true
        })
        res.status(200).json({
            message: 'Tags successfully returned',
            data: allTags,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message

        })
    }
}