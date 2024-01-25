const { Schema, model } = require('mongoose');

const quoteSchema = new Schema({
    destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
    flightCost: { type: Number, required: true },
    accommodationCost: { type: Number, required: true },
    activitiesCost: { type: Number, required: true },
    totalCost: { type: Number, required: true },
});

const Quote = model('Quote', quoteSchema);

module.exports = Quote;
