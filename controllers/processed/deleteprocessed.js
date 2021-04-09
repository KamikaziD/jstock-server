const handleDeleteProcessed = (req, res, db) => {
    const { id } = req.body;
            if (!id) {
                return res.status(400).json('incorrect form submission');
            }
    db.transaction(trx => {
        
        trx.delete('*')
        .from('processstock')
        .where('id', id)
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
    handleProcessed: handleDeleteProcessed
};