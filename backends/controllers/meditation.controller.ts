import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import mongooseService from '../services/mongoose.service';
import { meditationService, MeditationService } from '../services/meditation.service';
import { meditationType } from '../types/meditation.type';
import { AuthService, authService } from '../services/auth.service';

const AddMedValidation = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    link: Joi.string().required(),
});
let medList: meditationType[] = [];
class MeditationController {
    constructor(
        private medService: MeditationService,
        private authService: AuthService
    ) {
        mongooseService;
    }

    addMeditation = async (req: NextApiRequest, res: NextApiResponse) => {
        // { title , desc , date}
        const token = req.headers.authorization;

        if (token) {
            const verified = (await this.authService.verifyToken(token))!;

            if (verified) {
                const { error, value } = AddMedValidation.validate(req.body);
                const asyncRole = await this.authService.verifyToken(token);
                const role = asyncRole?.role;
                if (error)
                    return res.status(400).json({ message: error.message });
                if (role == 'admin') {
                    const medList = await this.medService.addMed(value);
                    res.json(medList);
                }
            } else {
                res.json({
                    message: 'Invalid Token!!!',
                });
            }
        } else {
            res.json({
                message: 'No Token Found!!!',
            });
        }
    };
}



export const meditationController = new MeditationController(meditationService, authService);