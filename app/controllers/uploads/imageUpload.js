  
//   router
//     .route('/files')
//     .post(upload.single('file'), validate(createFile), (req, res, next) => {
//         //controller logic
//       }
//     );



const Joi = require('joi')
const upload = require('../../middlewares/multer')
const singleUpload = upload.single('image')

const fileValidation = {
    file: Joi.object().keys({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().allow('image/jpeg','image/png').required(),
    buffer: Joi.any().required(),
    size: Joi.number().required()
  }).required()
};


const handler = async (req, res) => {
    try {
        singleUpload(req,res,function (err) {
            if(err){
                return res.status(422).send({error: 'File Upload Error',detail: err.message})
            }
        })
        return res.status(200).send({message: 'success', imageUrl: req.file.location})
       
    } catch (error) {
        throw error;
    }
}

module.exports = {
    handler,
    fileValidation
};

