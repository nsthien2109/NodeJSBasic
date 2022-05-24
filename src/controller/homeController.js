import pool from '../configs/connectDB';
import multer from 'multer';
import helperImage from '../helpers/image_helper';

let  getHomePage = async (req, res) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('home.ejs', {dataUser : rows});
}

let getDetailPage = async (req, res) =>{
    let id = req.params.idUser;
    let [user] = await pool.execute("SELECT * FROM `users` WHERE `idUser` = ? ", [id]);
    return res.render('detail.ejs', {userInfo : user[0]});
}

let createUser = async (req, res)=>{
    let {firstname, lastname, email, address} = req.body;
    await pool.execute("INSERT INTO `users` (`firstName`, `lastName`, `email`, `address`) VALUES ( ?, ?, ?, ?) ",[firstname, lastname, email, address]);
    return res.redirect('/');
}

let deleteUser = async (req, res) =>{
    let id = req.params.idUser;
    await pool.execute("DELETE FROM `users` WHERE `idUser` = ? ",[id]);
    return res.redirect('/');
}

let getEditPage = async (req, res)=>{
    let id = req.params.idUser;
    let [user] = await pool.execute("SELECT * FROM `users` WHERE `idUser` = ? ", [id]);
    return res.render('edit.ejs', {userEdit : user[0]});
}

let updateUser = async (req, res) =>{
    let {idUser ,firstname, lastname, email, address} = req.body;
    await pool.execute("UPDATE `users` SET `firstName`= ?,`lastName`= ? ,`email`= ?,`address`= ? WHERE `idUser` = ? ",[firstname, lastname, email, address, idUser]);
    return res.redirect('/');
}

let getUploadFilePage = async (req, res) =>{
    return res.render('upload.ejs');
}

const uploadSingle = multer().single('file_upload');
const uploadMultipleFile = helperImage.upload.array('multiple_file_upload',5);

let handleUploadSingleFile = async (req,res) =>{
    uploadSingle(req, res, function(err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        res.send(`You have uploaded this image: <hr/><img src="images/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
}

let handleUploadMultipleFile = async (req, res) =>{
    uploadMultipleFile(req, res, function(err) {
        if(err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE'){
            return res.send("Upload nhiều file ảnh hơn cho phép");
        }
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (req.files.length < 1) {
            return res.send('Please select an image to upload');
        }else{
            let result = "You have uploaded these images: <hr />";
            const files = req.files;
            let index, len;
        
            // Loop through all the uploaded images and display them on frontend
            for (index = 0, len = files.length; index < len; ++index) {
                result += `<img src="images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
            }
            result += '<hr/><a href="./">Upload more images</a>';
            res.send(result);
        }
    });
}


export default {
    getHomePage,
    getDetailPage, 
    createUser,
    deleteUser,
    getEditPage,
    updateUser,
    getUploadFilePage,
    handleUploadSingleFile,
    handleUploadMultipleFile
}