const handleGetProcessed = (req, res, db) => {

    db.select('id', 'code', 'stockprocessed', 'numberofitems', 'processdate')
        .table('processstock')
        .orderBy('processdate', 'desc')
        .then(processed => {
            if (processed.length) {
                res.json(processed)
                console.log(processed)
            } else {
                res.status(400).json('not found')
            }
        })
        .catch(err => res.status(400).json('error getting processed stock'))
}

module.exports = {
    handleProcessed: handleGetProcessed
};