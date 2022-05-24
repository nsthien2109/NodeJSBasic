import pool from '../../configs/connectDB';


//C
let createNewUser = async (req, res) =>{
    let {firstname, lastname, email, address} = req.body;
    if(!firstname || !lastname || !email || !address){
        return res.status(200).json({
            message : "Missing required field"
        });
    }else{
        await pool.execute("INSERT INTO `users` (`firstName`, `lastName`, `email`, `address`) VALUES ( ?, ?, ?, ?) ",[firstname, lastname, email, address]);
        return res.status(200).json({
            message : "Created user success"
        });
    }
}

//R
let getAllUsers = async (req, res) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.status(200).json({
        message : "Success",
        data : rows
    });
}

//U
let updateUser = async (req, res) =>{
    let id = req.params.idUser;
    let {firstname, lastname, email, address} = req.body;
    await pool.execute("UPDATE `users` SET `firstName`= ?,`lastName`= ? ,`email`= ?,`address`= ? WHERE `idUser` = ? ",[firstname, lastname, email, address, id]);
    return res.status(200).json({
        message : "Updated success"
    });
}

//D
let deleteUser = async (req, res) =>{
    let id = req.params.idUser;
    await pool.execute("DELETE FROM `users` WHERE `idUser` = ? ",[id]);
    return res.status(200).json({
        message : "Deleted sucess"
    });
}
 
export default{
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}