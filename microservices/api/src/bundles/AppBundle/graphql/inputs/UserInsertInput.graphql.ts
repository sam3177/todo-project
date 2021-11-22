export default /* GraphQL */ `
  input UserInsertInput {
    isEnabled: Boolean!
    profile: UserProfileInput!
    roles: [UserRoles]!
    todosIds: [ObjectId]!
  }

  input UserProfileInput {
    firstName: String!
    lastName: String!
  }
`;
