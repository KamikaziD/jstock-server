const handleGetReceived = (req, res, db) => {

    db.select('id', 'code', 'stockreceived', 'receiveddate')
        .table('receivedstock')
        .orderBy('code', 'asc')
        .then(received => {
            if (received.length) {
                res.json(received)
                console.log(received)
            } else {
                res.status(400).json('not found')
            }
        })
        .catch(err => res.status(400).json('error getting received stock'))
}

module.exports = {
    handleReceived: handleGetReceived
};