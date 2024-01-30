import { gql } from '@apollo/client';


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id: ID!
      username: String!
      email: String!
      password: String!
    }
  }
`;


export const QUERY_DESTINATION = gql`
  query {
    getDestination(id: ID!): Destination 
  }
  type Destination {
    _id: ID!
    name: String!
    description: String
    attractions: [String]
    accommodationOptions: [String]
  }
`;

export const QUERY_QUOTE = gql`
  query {
    getQuote(id: ID!): Quote
  }
  type Quote {
    _id: ID!
    destination: Destination!
    flightCost: Float!
    accommodationCost: Float!
    activitiesCost: Float!
    totalCost: Float!
  }
`;
export const QUERY_TRAVELPLAN = gql`
  query {
    getTravelPlan(id: ID!): TravelPlan
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
`;

export const QUERY_ITINERARYDAY = gql`
  query {
    getItineraryDay(day: String!): Itinerary Day
  }
  type ItineraryDay {
    day: String!
    activities: [String]
  }
`;


export const QUERY = gql`
  query {
    getQuery(name: String!): Destination
  }
   type Query {
    destination(name: String!): Destination
    destinations: [Destination]
    quotes: [Quote]
    travelPlans: [TravelPlan]
    users: [User]
  }
`;