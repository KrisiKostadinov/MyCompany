const Post = require('../models/Post');

module.exports = {
    get: {
        async all(req, res) {
            let posts = await Post.find({ companyId: req.params.companyId }).lean();
            posts.forEach(post => {
                post.createdOn = new Date(post.createdOn).toLocaleDateString();
            })
            res.render('news/all', { posts });
        },

        async add(req, res) {
            res.render('news/add');
        },

        async details(req, res) {
            const post = await Post.findById(req.params.id).lean();
            post.createdOn = new Date(post.createdOn).toLocaleDateString();
            res.render('news/details', { post });
        },

        async edit(req, res) {
            const post = await Post.findById(req.params.id).lean();
            res.render('news/edit', { post });
        },

        async delete(req, res) {
            const post = await Post.findById(req.params.id).lean();
            res.render('news/delete', { post });
        }
    },

    post: {
        async add(req, res) {
            await Post.create({ ...req.body, companyId: req.data.companyId });
            res.redirect('/news');
        },

        async edit(req, res) {
            const post = await Post.findByIdAndUpdate(req.params.id, { ...req.body });
            res.redirect('/news/details/' + post._id);
        }
    },

    delete: {
        async byId(req, res) {
            const post = await Post.findById(req.params.id).lean();
            res.render('news/delete', { post });
        }
    }
}