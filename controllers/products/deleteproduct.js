const handleDeleteProduct = (req, res, db) => {
    const {  code, supplier, item, category, price, stockonhand, description } = req.body;
            if (!code) {
                return res.status(400).json('incorrect form submission');
            }
    db.transaction(trx => {
        
        trx.delete('*')
        .from('products')
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
    handleProduct: handleDeleteProduct
};