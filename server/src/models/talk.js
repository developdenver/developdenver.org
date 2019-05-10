const Model = require('./model');

class Talk extends Model {
    constructor() {
        super('talk');
        this.publicProperties = [
            'id',
            'title',
            'type',
            'description',
            'talk_photo_url',
            'user_id',
            'category',
            'event_date',
        ];
    }
}

module.exports = new Talk();
