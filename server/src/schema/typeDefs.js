const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Destination {
    _id: ID!
    name: String!
    description: String
    attractions: [String]
    accommodationOptions: [String]
  }

  type Quote {
    _id: ID!
    destination: Destination!
    flightCost: Float!
    accommodationCost: Float!
    activitiesCost: Float!
    totalCost: Float!
  }

  type TravelPlan {
    _id: ID!
    user: User!
    destination: Destination!
    itinerary: [ItineraryDay]  # Adjusted to be an array
    accommodationReservation: String
    activitiesReservation: [String]
    travelArrangements: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type ItineraryDay {
    day: String!
    activities: [String]
  }

  input DestinationInput {
    name: String!
    description: String
    attractions: [String]
    accommodationOptions: [String]
  }

  input QuoteInput {
    destination: ID!
    flightCost: Float!
    accommodationCost: Float!
    activitiesCost: Float!
    totalCost: Float!
  }

  input TravelPlanInput {
    user: ID!
    destination: ID!
    itinerary: [ItineraryDayInput]
    accommodationReservation: String
    activitiesReservation: [String]
    travelArrangements: String
  }

  input ItineraryDayInput {
    day: String!
    activities: [String]
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    destination(name: String!): Destination
    destinations: [Destination]
    quotes: [Quote]
    travelPlans: [TravelPlan]
    users: [User]
  }

  type Mutation {
    createDestination(input: DestinationInput): Destination
    createQuote(input: QuoteInput): Quote
    createTravelPlan(input: TravelPlanInput): TravelPlan
    createUser(input: UserInput): User
  }
`;

module.exports = typeDefs;
