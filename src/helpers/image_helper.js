import path from 'path';
import appRoot from 'app-root-path';
import multer from 'multer';

const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, appRoot +  '/src/public/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, "NodeJS-basic" + '-' + uniqueSuffix + ".jpg");
    }
});

let upload = multer({ storage: storage, fileFilter: imageFilter });


export default {
    imageFilter,upload
}