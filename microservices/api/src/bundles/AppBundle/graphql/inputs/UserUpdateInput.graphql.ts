export default /* GraphQL */ `
  input UserUpdateInput {
    isEnabled: Boolean
    profile: UserProfileInput
    roles: [UserRoles]
    todosIds: [ObjectId]
  }

  input UserProfileInput {
    firstName: String!
    lastName: String!
  }
`;
