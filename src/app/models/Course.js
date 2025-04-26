const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

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

module.exports = mongoose.model('Course', Course);
