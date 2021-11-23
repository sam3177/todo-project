export default /* GraphQL */ `
  input TodoInsertInput {
    createdById: ObjectId!
    isDone: Boolean!
    title: String!
  }
`;
