const db = require('../models');
const Questions = db.Questions;

exports.create = async (question) => {
    return await Questions.create(question);
}
exports.findAll = async () => {
    return await Questions.findAll();
}
exports.findAll = async (condition) => {
    return await Questions.findAll(condition);
}
exports.findOne = async (condition) => {
    return await Questions.findOne(condition);
}
exports.update = async (question, id) => {
    return await Questions.update(question, { where: { id: id } });
}
exports.delete = async (id) => {
    return await Questions.destroy({ where: { id: id } });
}