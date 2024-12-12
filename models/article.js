class Article {
    constructor(title, content) {
        this.title = title;
        this.content = content;
        this.createdAt = new Date().toISOString(); // Gunakan ISO string untuk createdAt
    }

    // Konversi ke plain object
    toPlainObject() {
        return {
            title: this.title,
            content: this.content,
            createdAt: this.createdAt
        };
    }
}

module.exports = Article;
