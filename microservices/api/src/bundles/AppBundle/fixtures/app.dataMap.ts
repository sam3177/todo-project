export default {
  users: [
    {
      _id: { $objectId: "619f2c1b611f9ee42ffaf6a3" },
      roles: ["ADMIN"],
      updatedAt: { $date: 1637794801928 },
      createdAt: { $date: 1637780822714 },
      isDeleted: false,
      password: {},
      isEnabled: true,
      profile: { firstName: "Kaela", lastName: "Beier" },
      createdById: { $objectId: "619f2c1b611f9ee42ffaf6a4" },
      updatedById: { $objectId: "619f2c1b611f9ee42ffaf6a3" },
    },
    {
      _id: { $objectId: "619f2c1b611f9ee42ffaf6a4" },
      roles: ["ADMIN"],
      updatedAt: { $date: 1637821187326 },
      createdAt: { $date: 1637739434221 },
      isDeleted: false,
      password: {},
      isEnabled: true,
      profile: { firstName: "Doris", lastName: "Rosenbaum" },
      createdById: { $objectId: "619f2c1b611f9ee42ffaf6a4" },
      updatedById: { $objectId: "619f2c1b611f9ee42ffaf6a3" },
    },
  ],
  todos: [
    {
      _id: { $objectId: "619f2c1b611f9ee42ffaf6a5" },
      title: "Legacy Division Assistant",
      isDone: false,
      createdById: { $objectId: "619f2c1b611f9ee42ffaf6a3" },
    },
    {
      _id: { $objectId: "619f2c1b611f9ee42ffaf6a6" },
      title: "Direct Research Liaison",
      isDone: true,
      createdById: { $objectId: "619f2c1b611f9ee42ffaf6a3" },
    },
    {
      _id: { $objectId: "619f2c1b611f9ee42ffaf6a7" },
      title: "International Web Developer",
      isDone: true,
      createdById: { $objectId: "619f2c1b611f9ee42ffaf6a4" },
    },
    {
      _id: { $objectId: "619f2c1b611f9ee42ffaf6a8" },
      title: "Chief Group Assistant",
      isDone: true,
      createdById: { $objectId: "619f2c1b611f9ee42ffaf6a4" },
    },
    {
      _id: { $objectId: "619f2c1b611f9ee42ffaf6a9" },
      title: "Internal Integration Planner",
      isDone: true,
      createdById: { $objectId: "619f2c1b611f9ee42ffaf6a3" },
    },
    {
      _id: { $objectId: "619f2c1b611f9ee42ffaf6aa" },
      title: "Global Marketing Assistant",
      isDone: false,
      createdById: { $objectId: "619f2c1b611f9ee42ffaf6a3" },
    },
    {
      _id: { $objectId: "619f2c1b611f9ee42ffaf6ab" },
      title: "Legacy Branding Specialist",
      isDone: false,
      createdById: { $objectId: "619f2c1b611f9ee42ffaf6a3" },
    },
    {
      _id: { $objectId: "619f2c1b611f9ee42ffaf6ac" },
      title: "Human Brand Manager",
      isDone: false,
      createdById: { $objectId: "619f2c1b611f9ee42ffaf6a4" },
    },
    {
      _id: { $objectId: "619f2c1b611f9ee42ffaf6ad" },
      title: "Chief Creative Supervisor",
      isDone: false,
      createdById: { $objectId: "619f2c1b611f9ee42ffaf6a3" },
    },
    {
      _id: { $objectId: "619f2c1b611f9ee42ffaf6ae" },
      title: "Internal Mobility Specialist",
      isDone: true,
      createdById: { $objectId: "619f2c1b611f9ee42ffaf6a4" },
    },
  ],
};
