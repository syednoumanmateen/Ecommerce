const productPopulatePipeline = () => {
    return [
        {
            $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "category" }
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        {
            $lookup: { from: "brands", localField: "brand", foreignField: "_id", as: "brand" }
        },
        { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
        {
            $lookup: { from: "patterntypes", localField: "patternType", foreignField: "_id", as: "patternType" }
        },
        { $unwind: { path: "$patternType", preserveNullAndEmptyArrays: true } },
        {
            $lookup: { from: "shoprooms", localField: "shopRoom", foreignField: "_id", as: "shopRoom" }
        },
        { $unwind: { path: "$shopRoom", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                name: 1,
                description: 1,
                price: 1,
                quantity: 1,
                images: 1,
                featured: 1,
                rating: 1,
                category: { _id: "$category._id", name: "$category.name" },
                brand: { _id: "$brand._id", name: "$brand.name" },
                patternType: { _id: "$patternType._id", name: "$patternType.name" },
                shopRoom: { _id: "$shopRoom._id", name: "$shopRoom.name" },
                createdAt: 1,
                updatedAt: 1
            }
        }
    ];
}


module.exports = productPopulatePipeline