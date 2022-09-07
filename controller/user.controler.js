const fs = require('fs');
let usersArray = fs.readFileSync('userData.json')
const userArrayParsed = JSON.parse(usersArray)

module.exports.getAllUser = (req, res) => {
    const { limit } = req.query;
    res.send(userArrayParsed.slice(0, limit))
}

module.exports.getARandomUser = (req, res) => {
    console.log(userArrayParsed[Math.floor(Math.random() * userArrayParsed.length)])
    res.send('hello')
}
module.exports.saveAUser = (req, res) => {
    const userData = req.body;
    const { id, gender, name, contact, address, photoUrl } = userData;

    if (id && gender && name && contact && address && photoUrl) {

        let newUserArray = []
        newUserArray = userArrayParsed;
        newUserArray.push(userData)

        let data = JSON.stringify(newUserArray);
        fs.writeFileSync('userData.json', data);

        res.status(200).send('User data updated Successfully')
    } else {
        res.status(400).send(`Please input ${(id == undefined) ? 'id,' : ''} ${(gender == undefined) ? 'gender,' : ''} ${(name == undefined) ? 'name,' : ''} ${(contact == undefined) ? 'contact,' : ''} ${(address == undefined) ? 'address,' : ''} ${(photoUrl == undefined) ? 'photoUrl' : ''}`)
    }
}

module.exports.updateAUser = (req, res) => {
    const { id } = req.params;
    if (typeof (Number(id)) === 'number') {
        const userData = req.body;
        const { gender, name, contact, address, photoUrl } = userData;

        const findUser = userArrayParsed.find(user => user.id === Number(id))
        findUser.id = Number(id)
        findUser.gender = gender
        findUser.name = name
        findUser.contact = contact
        findUser.address = address
        findUser.photoUrl = photoUrl

        let data = JSON.stringify(userArrayParsed);
        fs.writeFileSync('userData.json', data);
        res.status(200).send('User data updated successfully')
    } else {
        res.send('You can only update the user info by an id and that is a number')
    }
}
module.exports.deleteAUser = (req, res) => {
    const { id } = req.params;
    if (typeof (Number(id)) === 'number') {
        const filteredArray = userArrayParsed.filter(user => user.id !== Number(id))

        const data = JSON.stringify(filteredArray)
        fs.writeFileSync('userData.json', data)
        res.send('User deleted successfully')
        console.log('true')
    } else {
        res.send('You can only delete an user by giving an id and that is a number')
    }
}

module.exports.updateMultipleUser = (req, res) => {
    const { ids } = req.params;
    const idString = ids.slice(1, ids.length - 1);
    const idArray = idString.split(",");

    const data = req.body;
    console.log(idArray);

    if (idArray.length != data.length) {
        res.send("Can't Assign");
    } else {
        const UpdatedArray = idArray.map((id, index) => {

            const findUser = userArrayParsed.find((user) => user?.id === Number(id));

            if (findUser) {
                findUser.id = data[index]?.id || findUser.id;
                findUser.address = data[index]?.address || findUser.address;
                findUser.gender = data[index]?.gender || findUser.gender;
                findUser.name = data[index]?.name || findUser.name;
                findUser.contact = data[index]?.contact || findUser.contact;
                findUser.photoUrl = data[index]?.photoUrl || findUser.photoUrl;

            } else {
                return res.send("User not found. Please give a valid id");
            }
        });
    }
    res.send(userArrayParsed);
    const updatedUserArray = JSON.stringify(userArrayParsed)
    fs.writeFileSync('userData.json', updatedUserArray)
}