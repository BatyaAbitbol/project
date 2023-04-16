const dal = require('../dal/lectures');
const course_student_dal = require('../dal/course_students')

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }
    await dal.create(req.body)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some errors occured while creating the lecture." });
        })
}
//findAllByCourseId = כל השיעורים לקורס מסויים
exports.findAll = async (req, res) => {
    const courseId = req.body.courseId;
    await dal.findAllByCourseId(courseId)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: `Some error occurred while retrieving courses for courseId ${courseId}.` });
        })
}
// שיעור מקורס מסויים לפי מספר שיעור
exports.findByNum = async (req, res) => {
    const courseId = req.body.courseId;
    const lectureNum = req.body.lectureNum;
    await dal.findByLectureNumOfCourse(courseId, lectureNum)
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find lecture no.${lectureNum} of courseID ${courseId}` })
        });
}
// שיעורים מקורס מסויים לתלמיד עד מספר השיעור הבא של התלמיד בקורס הזה
exports.findUntilNum = async (req, res) => {
    const courseStudentId = req.body.courseStudentId;
    await course_student_dal.findOneById(courseStudentId)
        .then(async (data) => {
            if (data) {
                const course_student = data.dataValues;
                const num = course_student.nextLectureNum + 1;
                console.log(num);
                course_student.nextLectureNum = num;
                console.log(course_student);
                // await course_student_dal.update(data, courseStudentId);
                console.log(num);
                await dal.findAllInCourseUntilLectureNum(course_student.courseId, num)
                    .then(data => {
                        if (data)
                            res.send(data);
                        else res.send('Error findAll UntilNum')
                    })

            }
            else res.status(500).send('Error findUntilNum')

        })
}
exports.findById = async (req, res) => {
    const id = req.params.id;
    await dal.findOneById(id)
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find lecture with id ${id}` })
        })
}
exports.update = async (req, res) => {
    const id = req.body.id;
    await dal.update(req.body, id)
        .then(num => {
            if (num == 1)
                res.send({ message: "Lecture was updated successfully." });
            else res.send({ message: `Cannot update lecture with id ${id}. Maybe lecture was not found or req.body is empty!` });
        });
}
exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: `Course was deleted successfully! 👍` })
            else res.send({ message: `Cannot delete lecture with id ${id}. Maybe lecture was not found!` })
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete lecture with id ${id}` })
        })
}

