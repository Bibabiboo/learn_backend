const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

// Defining a model
const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
        description: { type: String },
        img: { type: String },
        videoId: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        // CreateAt: { type: Date, default: Date.now },
        // UpdateAt: { type: Date, default: Date.now },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);

Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
