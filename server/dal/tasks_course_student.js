const db = require('../models');
const Tasks_atudent = db.TaskCourseStudent;

exports.create = async (task) => {
    return await Tasks_atudent.create(task);
}
exports.findAll = async (condition) => {
    return await Tasks_atudent.findAll(condition);
}
exports.findAll = async () => {
    return await Tasks_atudent.findAll();
}
exports.findOne = async (condition) => {
    return await Tasks_atudent.findOne(condition);
}
exports.findOneByTaskId = async (taskId) => {
    return await Tasks_atudent.findOne({ where: { taskId: taskId } });
}
exports.update = async (task, id) => {
    return await Tasks_atudent.update(task, { where: { id: id } });
}
exports.delete = async (id) => {
    return await Tasks_atudent.destroy({ where: { id: id } });
}