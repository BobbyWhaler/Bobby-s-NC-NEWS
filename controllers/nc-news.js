const { selectTopics, selectArticles, selectArticleByID } = require('../models/nc-news');

exports.getApi = (request, response) => {
    response.status(200).send( {message: "all ok"} );
};
exports.getTopics = (request, response) => {
    selectTopics()
    .then((topics) => {
        response.status(200).send( {topics} );
    });
};
exports.getArticles = (request, response) => {
    selectArticles()
    .then((articles) => {
        response.status(200).send( {articles} );
    });
};
exports.getArticleByID = (request, response, next) => {
    const { article_id } = request.params;
    selectArticleByID(article_id)
    .then((article) => { response.status(200).send({ article })})
    .catch(next);
}