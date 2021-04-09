const handleInsertReceived = (req, res, db) => {
    const { code, stockreceived } = req.body;
            if ( !code || !stockreceived ) {
                return res.status(400).json('incorrect form submission');
            }  

    db.transaction(trx => {
        
        trx.insert({
            code: code,
            stockreceived: stockreceived
        })
        .into('receivedstock')
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
    handleReceived: handleInsertReceived
};