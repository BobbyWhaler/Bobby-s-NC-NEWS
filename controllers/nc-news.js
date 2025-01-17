const { selectTopics, selectArticles, selectArticleByID, selectCommentsByArticleID, insertComments, updateArticleByID, selectUsers, removeCommentByID } = require('../models/nc-news');
const endPointJSON = require("../endpoints.json")

exports.getApi = (request, response) => {
    response.status(200).send(endPointJSON);
};
exports.getTopics = (request, response) => {
    selectTopics()
    .then((topics) => {
        response.status(200).send( {topics} );
    });
};
exports.getArticles = (request, response, next) => {
    selectArticles(request.query)
    .then((articles) => {
        response.status(200).send( {articles} );
    })
    .catch(next);
};

exports.getArticleByID = (request, response, next) => {
    const { article_id } = request.params;
    selectArticleByID(article_id)
    .then((article) => { response.status(200).send({ article })})
    .catch(next);
}
exports.getCommentsByID = (request, response, next) => {
    const { article_id } = request.params
    selectCommentsByArticleID(article_id)
    .then((comments) => { response.status(200).send({ comments })})
    .catch(next)
}
exports.postComment = (request, response, next) => {
    const body = request.body
    const { article_id } = request.params
    insertComments(body, article_id)
    .then((comment) => {
        response.status(201).send({ comment })})
        .catch(next)
}
exports.patchArticleByID = (request, response, next) => {
    const body = request.body
    const { article_id } = request.params
    updateArticleByID(body, article_id)
    .then((article) => {
        response.status(200).send({ article })})
    .catch(next)
}
exports.getUsers = (request, response) => {
    selectUsers()
    .then((users) => {
        response.status(200).send( {users} );
    });
}
exports.deleteCommentByID = (request, response, next) => {
    const { comment_id } = request.params
    removeCommentByID(comment_id)
    .then((comment) => {
        response.status(204).send()
    })
    .catch(next)
}