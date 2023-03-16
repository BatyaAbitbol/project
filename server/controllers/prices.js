const dal = require('../dal/prices');

exports.create = async (req, res) => {
    // only if its profile is teacher ! - HOW ????

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    await dal.create(req.body)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message:
                 /*   err.message || */"Some error occurred while creating the price."
            });
        });
}

exports.findAll = async (req, res) => {
    await dal.findAll()
        .then(data => {
            if (data) {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving prices."
            })
        });
}
//{ attributes: { exclude: ['id'] } }
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await dal.findOne({ where: { id: id } })
        .then(data => {
            if (data) {
                res.send(data);
            }
            else {
                res.status(404).send({
                    message: `Cannot find price by id: ${id}`
                })
            }
        });
}

exports.findByPrice = async (req, res) => {
    const price = req.body.price;
    await dal.findOne({ where: { price: price } })
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find price by price: ${price}` })
        });
}

exports.update = async (req, res) => {
    const id = req.body.id;
    await dal.update(req.body, id)
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Price was updated successfully 👍."
                });
            }
            else {
                res.send({
                    message: `Cannot update Price with id: ${id}.
                    Maybe Price was not found or req.body is empty!`
                })
            }
        })
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: "Price was deleted successfully 👍." });
            else { res.send({ message: `Cannot delete Price with id: ${id}.` }) }
        });
}