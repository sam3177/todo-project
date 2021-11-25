export default /* GraphQL */ `
  type Query {
    userTodosFindOne(query: QueryInput): Todo
    userTodosFindOneByID(_id: ObjectId!): Todo
    userTodosFind(query: QueryInput): [Todo]!
    userTodosCount(query: QueryInput): Int!
  }

  type Mutation {
    userTodosInsertOne(document: NewTodoInfoInput!): Todo
    userTodosUpdateOne(_id: ObjectId!, document: TodoUpdateInput!): Todo!
    userTodosDeleteOne(_id: ObjectId!): Boolean
  }

  type Subscription {
    userTodosSubscription(body: EJSON): SubscriptionEvent
    userTodosSubscriptionCount(filters: EJSON): SubscriptionCountEvent
  }
`;
