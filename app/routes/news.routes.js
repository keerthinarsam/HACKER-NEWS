module.exports = (app) => {
    const news = require('../controllers/news.controller.js');

    app.post('/news', news.create); // Create new news item

    app.get('/news/', news.findAll); // Retrieve all news items

    app.get('/news/:newsId', news.findOne); // Retrieve a single news item

    app.put('/news/:newsId', news.update); // Update a news item

    app.delete('/news/:newsId', news.delete); // Delete a news item
}