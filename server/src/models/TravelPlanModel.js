const { Schema, model } = require('mongoose');

const travelPlanSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
    itinerary: [{ day: String, activities: [String] }],
    accommodationReservation: { type: String },
    activitiesReservation: [{ type: String }],
    travelArrangements: String,
});

const TravelPlan = model('TravelPlan', travelPlanSchema);

module.exports = TravelPlan;
