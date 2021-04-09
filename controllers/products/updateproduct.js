const handleUpdateProduct = (req, res, db) => {
    const {  code, supplier, item, category, price, stockonhand, description } = req.body;
            if (!code || !supplier || !item || !category || !price || !stockonhand) {
                return res.status(400).json('incorrect form submission');
            }
    db.transaction(trx => {
        
        trx.update({
            code: code,
            supplier: supplier,
            item: item,
            category: category,
            price: price,
            stockonhand: stockonhand,
            description: description
        })
        .into('products')
        .where('code', code)
        // .returning('*')
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .then(res => {
        console.log(res, 'Transaction complete.');
      })
      .catch(function(err) {
        console.error(err);
      }); 
}

module.exports = {
    handleProduct: handleUpdateProduct
};