import { NextFunction, Request, Response } from "express";
import formSchema from "@whatsapp-clone/common";

const validateForm = (req: Request, res: Response, next: NextFunction) => {
    const formData = req.body;
    formSchema
        .validate(formData)
        .catch((err) => {
            res.status(422).send();
            console.log(err.errors);
        })
        .then((valid) => {
            if (valid) {
                next();
            } else {
                res.status(422).send();
            }
        });
};
export default validateForm;
