const db = require('../models');
const Answers = db.Answers;

exports.create = async (answer) => {
    return await Answers.create(answer);
}
exports.findAll = async (condition) => {
    if (!condition)
        return await Answers.findAll();
    return await Answers.findAll(condition);
}

exports.findOne = async (condition) => {
    return await Answers.findOne(condition);
}

exports.update = async (answer, id) => {
    return await Answers.update(answer, { where: { id: id } });
}

exports.delete = async (id) => {
    return await Answers.destroy({ where: { id: id } });
}