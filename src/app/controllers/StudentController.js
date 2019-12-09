import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.number().integer(),
            weight: Yup.number(),
            height: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const studentExists = await Student.findOne({
            where: { email: req.body.email },
        });

        if (studentExists) {
            return res.status(400).json({ error: 'Student already exists.' });
        }

        const student = await Student.create(req.body);

        return res.json({ student });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.number().integer(),
            weight: Yup.number(),
            height: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const student = await Student.findByPk(req.params.id);

        const response = await student.update(req.body);

        return res.json({ response });
    }
}

export default new StudentController();
