const handleInsertProduct = (req, res, db) => {
    const {  code, supplier, item, category, price, stockonhand, stockprocessed, stockreceived, image, description } = req.body;
            if ( !code || !supplier || !item || !category || !price || !stockonhand ) {
                return res.status(400).json('incorrect form submission');
            }
    db.transaction(trx => {
        
        trx.insert({
            code: code,
            supplier: supplier,
            item: item,
            category: category,
            price: price,
            stockonhand: stockonhand,
            stockprocessed: 0,
            stockreceived: 0,
            image: image,
            description: description
        })
        .into('products')
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
    handleProduct: handleInsertProduct
};