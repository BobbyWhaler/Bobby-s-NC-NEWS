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
exports.selectArticleByID = (article_id) => {
    return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((result) => result.rows[0])
    .then((article) => {
        if (article === undefined) {
          return Promise.reject({
            status: 404,
            msg: "Not Found",
          })} else {
            return article
          }
      });
}