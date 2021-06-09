const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    text: {
      type: GraphQLString,
    },
  }),
});

module.exports = ItemType;
