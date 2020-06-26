const mongoose = require('mongoose');
// const marked = require('marked')
// const slugify = require('slugify')
// const createDomPurify = require('dompurify')
//const { JSDOM } = require('jsdom')
//const dompurify = createDomPurify(new JSDOM().window)

const habitSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: String
    },
    reminder: {
        type: Number,
        required: true
    },
    goals: {
        type: Number,
        required: true
    }
})

/*habitSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    if (this.body) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.body))
    }

    next()
})*/

/*const Habit = */
module.exports = mongoose.model('Habit', habitSchema);