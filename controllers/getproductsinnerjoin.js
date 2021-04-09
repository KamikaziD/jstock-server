const handleGetInnerJoinProducts = (req, res, db) => {

    db.select('id', 'supplier', 'code', 'item', 'category', 'description', 'price', 'stockonhand', 'stockprocessed',
        db.raw('"price" * "stockonhand" as "stockvalue"'),
        db.raw('"stockonhand" - "stockprocessed" as "stockleft"'))
        .table('products')
        .orderBy('code', 'asc')
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
    handleInnerJoinProducts: handleGetInnerJoinProducts
};