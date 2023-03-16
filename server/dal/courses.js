const db = require('../models');
const Courses = db.Courses;

exports.findOne = async (condition) => {
    return await Courses.findOne(condition);
}
exports.findAll = async () => {
    return await Courses.findAll();
}
exports.findAll = async (condition) => {
    return await Courses.findAll(condition);
}
exports.create = async (course) => {
    return await Courses.create(course);
}
exports.update = async (course, id) => {
    return await Courses.update(course, { where: { id: id } });
}
exports.delete = async (id) => {
    return await Courses.destroy({ where: { id: id } });
}