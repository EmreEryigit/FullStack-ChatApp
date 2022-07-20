import { Request, Response } from "express";
import formSchema from "@whatsapp-clone/common"

const validateForm = (req: Request,res: Response) => {
    const formData = req.body
    formSchema.validate(formData).catch(err => {
        res.status(422).send()
        console.log(err.errors)
    }).then(valid => {
        if(valid) {
            console.log("Form is valid")
        }
    })
}
export default validateForm