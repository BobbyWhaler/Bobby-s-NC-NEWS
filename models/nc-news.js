const db = require("../db/connection.js")

exports.selectTopics = () => {
    return db
    .query("SELECT * FROM topics;")
    .then(({ rows }) => rows);
};
exports.selectArticles = () => {
    return db
    .query("SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC;")
    .then(({ rows }) => rows);
};