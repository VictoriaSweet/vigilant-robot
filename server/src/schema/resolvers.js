const { DestinationModel, QuoteModel, TravelPlanModel, UserModel } = require('./models');

const resolvers = {
    Query: {
        //search the database from one destination based on it's name
        destination: async (parent, { name }) => {
            try {
                const destination = await DestinationModel.findOne({ name })
                return destinations;
            } catch (error) {
                throw new Error('Error fetching destination');
            }
            
        },
        destinations: async () => {
            try {
                const destinations = await DestinationModel.find();
                return destinations;
            } catch (error) {
                throw new Error('Error fetching destinations');
            }
        },
        quotes: async () => {
            try {
                const quotes = await QuoteModel.find();
                return quotes;
            } catch (error) {
                throw new Error('Error fetching quotes');
            }
        },
        travelPlans: async () => {
            try {
                const travelPlans = await TravelPlanModel.find();
                return travelPlans;
            } catch (error) {
                throw new Error('Error fetching travel plans');
            }
        },
        users: async () => {
            try {
                const users = await UserModel.find();
                return users;
            } catch (error) {
                throw new Error('Error fetching users');
            }
        },
    },
    Mutation: {
        createDestination: async (_, { input }) => {
            try {
                const destination = await DestinationModel.create(input);
                return destination;
            } catch (error) {
                throw new Error('Error creating destination');
            }
        },
        createQuote: async (_, { input }) => {
            try {
                const quote = await QuoteModel.create(input);
                return quote;
            } catch (error) {
                throw new Error('Error creating quote');
            }
        },
        createTravelPlan: async (_, { input }) => {
            try {
                const travelPlan = await TravelPlanModel.create(input);
                return travelPlan;
            } catch (error) {
                throw new Error('Error creating travel plan');
            }
        },
        createUser: async (_, { input }) => {
            try {
                const user = await UserModel.create(input);
                return user;
            } catch (error) {
                throw new Error('Error creating user');
            }
        },
    },
};

module.exports = resolvers;