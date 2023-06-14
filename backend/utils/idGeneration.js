const { v4: uuidv4 } = require('uuid');

exports.generateRandomId = (name) => {
    const id = name+uuidv4().replace(/-/g, '').slice(0, 4);
    return id;
}