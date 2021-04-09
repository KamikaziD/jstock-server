const handleGetProducts = (req, res, db) => {

    db.select(
        'products.id', 
        'products.supplier', 
        'products.code', 
        'products.item', 
        'products.category', 
        'products.description', 
        'products.price', 
        'products.stockonhand'
        ).table('products')
        .leftJoin('processstock', 'products.code', 'processstock.code')
        .sum('processstock.stockprocessed as processed')
        .sum('processstock.numberofitems as itemsprocessed')
        .groupBy('products.id')
        .orderBy('products.code', 'ASC')
        .then(products => {
            if (products.length) {
                res.json(products)
                console.log(products)
            } else {
                res.status(400).json('not found')
            }
        })
        .catch(err => res.status(400).json('error getting products'))
}

module.exports = {
    handleProducts: handleGetProducts
};
