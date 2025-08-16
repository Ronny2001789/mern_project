const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    _id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Job {
    _id: ID!
    title: String!
    description: String!
    postedBy: User!
  }

  type AuthData {
    userId: ID!
    token: String!
  }

  type Query {
    getJobs: [Job!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!, role: String): String
    login(email: String!, password: String!): AuthData
    createJob(title: String!, description: String!): Job
    
  }
`);
