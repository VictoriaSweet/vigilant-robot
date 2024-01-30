import { gql } from '@apollo/client';
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const CREATE_USER = gql`
  mutation {
    createUser(id: ID!, $username: String!, $email: String!, $password: String!): User
  }
  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }
`;
export const CREATE_TRAVELPLAN = gql`
  mutation {
    createTravelPlan($user: ID!, $destination: ID!, $day: String!, $activities: [String], $accommodationReservation: String!, $activitiesReservation: [String]!, $travelArrangements: String!): TravelPlan
  }
  input TravelPlanInput {
    user: ID!
    destination: ID!
    itinerary: [$day: String!, $activities: [String]]
    accommodationReservation: String
    activitiesReservation: [String]
    travelArrangements: String
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
export const CREATE_DESTINATION = gql`
  mutation {
    createDestination($name: String!, $description: String!, $attractions: [String]!, $accommodationOptions: [String]! ): Destination
  }
  input DestinationInput {
    name: String!
    description: String
    attractions: [String]
    accommodationOptions: [String]
  }
  type Destination {
    _id: ID!
    name: String!
    description: String
    attractions: [String]
    accommodationOptions: [String]
  }
`;
export const CREATE_QUOTE = gql`
  mutation {
    createQuote($destination: ID!, $flightCost: Float!, $accommodationCost: Float!, $activitiesCost: Float!, $totalCost: Float!): Quote
  }
  input QuoteInput {
    destination: ID!
    flightCost: Float!
    accommodationCost: Float!
    activitiesCost: Float!
    totalCost: Float!
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