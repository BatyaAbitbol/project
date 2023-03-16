const db = require('../models');
const Lectures = db.Lectures;

exports.create = async (lecture) => {
    return await Lectures.create(lecture);
}
exports.findAll = async () => {
    return await Lectures.findAll();
}
exports.findAll = async (condition) => {
    return await Lectures.findAll(condition);
}
exports.findOne = async (condition) => {
    return await Lectures.findOne(condition)
}
exports.update = async (lecture, id) => {
    return await Lectures.update(lecture, { where: { id: id } })
}
exports.delete = async (id) => {
    return await Lectures.destroy({ where: { id: id } })
}