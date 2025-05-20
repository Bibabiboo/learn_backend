const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

// Defining a model
const Course = new Schema(
    {
        name: { type: String },
        description: { type: String },
        img: { type: String },
        videoId: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        // CreateAt: { type: Date, default: Date.now },
        // UpdateAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
