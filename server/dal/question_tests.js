const db = require('../models');
const QuestionTests = db.QuestionTests;

exports.create = async (questions) => {
    return await QuestionTests.create(questions);
}
exports.findAll = async () => {
    return await QuestionTests.findAll();
}
exports.findAll = async (condition) => {
    return await QuestionTests.findAll(condition);
}
exports.findOne = async (condition) => {
    return await QuestionTests.findOne(condition);
}
exports.update = async (ans, id) => {
    return await QuestionTests.update(ans, { where: { id: id } });
}
exports.delete = async (id) => {
    return await QuestionTests.destroy({ where: { id: id } });
}