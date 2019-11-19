var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var directorySchema = new Schema({
    dir_id: String,
    user_id: String,
    // type: Number,
    dir_tree: [String],
    link_data: [String],
    shared: [String]
});

module.exports = mongoose.model('directory',directorySchema,'directory');