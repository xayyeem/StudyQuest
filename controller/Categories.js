const Categories = require('../model/Categories')

exports.createCategories = async (req, res) => {
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
        const tagDetails = await Categories.create({
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

exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Categories.find({}, {
            name: true, description: true
        })
        res.status(200).json({
            message: 'Tags successfully returned',
            data: allCategories,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message

        })
    }
}

// catagory page details

exports.catageryPageDetails = async (req, res) => {
    try {
        // get courses for spcific couse id
        const { categoryId } = req.body
        // get course for specified category
        const selectedCategroy = await Categories.findById(categoryId).populate('courses').exec()
        // validation
        if (!selectedCategroy) {
            return res.status(404).json({
                message: 'Category not found',
                success: false
            })
        }

        // getcourses for categories
        const differentCategories = await Categories.find({ _id: { $ne: categoryId } }).populate('courses').exec()
        // return res
        res.status(200).json({
            message: 'Category details successfully returned',
            data: selectedCategroy,
            differentCategories,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message

        })
    }
}