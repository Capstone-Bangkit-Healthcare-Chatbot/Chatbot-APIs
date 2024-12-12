const db = require('../config/firebase');
const Article = require('../models/article');

// CREATE article
exports.createArticle = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newArticle = new Article(title, content); // Membuat instance Article
        const docRef = await db.collection('articles').add(newArticle.toPlainObject()); // Konversi ke plain object
        res.status(201).json({ id: docRef.id, ...newArticle.toPlainObject() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ all articles
exports.getArticles = async (req, res) => {
    try {
        const snapshot = await db.collection('articles').get();
        const articles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ a single article by ID
exports.getArticleById = async (req, res) => {
    try {
        const articleId = req.params.id;
        const doc = await db.collection('articles').doc(articleId).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE article
exports.updateArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const { title, content } = req.body;
        const articleRef = db.collection('articles').doc(articleId);
        const articleDoc = await articleRef.get();
        if (!articleDoc.exists) {
            return res.status(404).json({ message: 'Article not found' });
        }
        await articleRef.update({ title, content });
        res.status(200).json({ id: articleId, title, content });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE article
exports.deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const articleRef = db.collection('articles').doc(articleId);
        const articleDoc = await articleRef.get();
        if (!articleDoc.exists) {
            return res.status(404).json({ message: 'Article not found' });
        }
        await articleRef.delete();
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
