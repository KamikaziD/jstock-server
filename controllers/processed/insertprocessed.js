const handleInsertProcessed = (req, res, db) => {
    const { code, stockprocessed, numberofitems } = req.body;
            if ( !code || !stockprocessed || !numberofitems) {
                return res.status(400).json('incorrect form submission');
            }  

    db.transaction(trx => {
        
        trx.insert({
            code: code,
            stockprocessed: stockprocessed,
            numberofitems: numberofitems
        })
        .into('processstock')
        // .returning('*')
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .then(res => {
        console.log('Transaction complete.');
      })
      .catch(function(err) {
        console.error(err);
      }); 
}

module.exports = {
    handleProcessed: handleInsertProcessed
};