const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');

function initRoutes(app) {

    app.get('/', homeController().index);

    app.get('/register', authController().register);

    app.post('/register', authController().postRegister);

    app.get('/login', authController().login);

    app.post('/login', authController().postLogin);

    app.post('/logout', authController().logout);
    
}

module.exports = initRoutes;