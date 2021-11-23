export default /* GraphQL */ `
  input TodoUpdateInput {
    createdById: ObjectId
    isDone: Boolean
    title: String
  }
`;
