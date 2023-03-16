const db = require('../models');
const Students = db.Students;

exports.create = async (student) => {
    return await Students.create(student)
}
exports.findAll = async () => {
    return await Students.findAll();
}
exports.findOne = async (condition) => {
    return await Students.findOne(condition);
}
exports.update = async (student, id) => {
    return await Students.update(student, { where: { id: id } });
}
exports.delete = async (id) => {
    return await Students.destroy({ where: { id: id } });
}