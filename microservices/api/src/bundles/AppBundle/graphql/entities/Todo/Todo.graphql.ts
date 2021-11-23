export default /* GraphQL */ `
  type Todo {
    _id: ObjectId
    createdBy: User!
    createdById: ObjectId!
    isDone: Boolean!
    title: String!
  }
`;
