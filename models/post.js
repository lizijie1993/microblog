var mongodb = require('./db');

function Post(username, post, time) {
    this.username = username;
    this.post = post;

    if (time) {
        this.time = time;
    } else {
        this.time = new Date();
    }
}

Post.prototype.save = function(callback) {
    var post = {
        name: this.username,
        post: this.post,
        time: this.time
    };

    mongodb.open(function(err, db) {
        if (err) {
            mongodb.close();
            callback(err);
        }

        db.collection('posts', function(err, collection) {
            if (err) {
                mongodb.close();
                callback(err);
            }

            collection.ensureIndex('user');
            collection.insert(post, {
                safe: true
            }, function(err, post) {
                mongodb.close();
                callback(err, post);
            });
        });
    });
}

Post.get = function(username, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        // 读取 posts 集合
        db.collection('posts', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 查找 user 属性为 username 的文档，如果 username 是 null 则匹配全部
            var query = {};
            if (username) {
                query.name = username;
            }
            collection.find(query).sort({
                time: -1
            }).toArray(function(err, docs) {
                mongodb.close();
                if (err) {
                    callback(err, null);
                }
                // 封装 posts 为 Post 对象
                var posts = [];
                docs.forEach(function(doc, index) {
                    var post = new Post(doc.name, doc.post, doc.time);
                    posts.push(post);
                });
                callback(null, posts);
            });
        });
    });
}

module.exports = Post;
