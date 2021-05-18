const mongoose = require('mongoose');

const versionSchema = mongoose.Schema({
    name: { type: String, required: true },
    status: { type: Boolean, default: true }
});

module.exports = mongoose.model('Version', versionSchema);
