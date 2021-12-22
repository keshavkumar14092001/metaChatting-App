const mainController = require('../app/http/controllers/homeController');

function initRoutes(app) {

    app.get('/', mainController().index);

}

module.exports = initRoutes