const DB = require('../model/mongo');

class DataBase {

    insertUserData = (payload, res) => {
        DB.insertData(payload, async (message) => {
            await this.getUserData(payload, res);
        });
    }
    
    getUserData = async (payload, res) => {
        await DB.checkAlreadyExists(payload, async (isUserExists, data) => {
        if (isUserExists) {
            if (data.isAdmin) {
                await DB.getAdminPriviledgeData((adminData) => {
                    res.send(adminData);
                });
            } else {
                const user = [data]
                res.send(user);
            }
        } else {
            console.log('No user found');
            res.send(null)
            }
        })
    }
}

module.exports = new DataBase();
