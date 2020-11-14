const News = require('../models/news.model.js');

exports.create = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "News content cannot be empty"
        });
    }

    const news = new News({
       title: req.body.title || "Untitled News",
       content: req.body.content 
    });

    news.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the news item."
        });
    });
};

exports.findAll = (req, res) => {
    News.find()
    .then(news => {
        res.send(news);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the news item."
        });
    });
};

exports.findOne = (req, res) => {
    News.findById(req.params.newsId)
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "News with id " + req.params.newsId + " not found"
            });
        }
        res.send(news);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "News with id " + req.params.newsId + " not found"
            });
        }
        return res.status(500).send({
            message: "Error retrieving news with id " + req.params.newsId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "News content cannot be empty"
        });
    }

    News.findByIdAndUpdate(req.params.newsId, {
        title: req.body.title || "Untitled news item",
        content: req.body.content
    }, {new: true})
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "News with id " + req.params.newsId + " not found"
            });
        }
        res.send(news);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "News with id " + req.params.newsId + " not found"
            });
        }
        return res.status(500).send({
            message: "Error updating news with id " + req.params.newsId
        });
    });
};

exports.delete = (req, res) => {
    News.findByIdAndRemove(req.params.newsId)
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "News with id " + req.params.newsId + " not found"
            });
        }
        res.send({message: "News item deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "News with id " + req.params.newsId + " not found"
            });
        }
        return res.status(500).send({
            message: "Could not delete news with id " + req.params.newsId
        });
    });
};