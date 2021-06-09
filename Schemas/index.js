const graphql = require("graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
} = graphql;
const ItemType = require("./TypeDefs/ItemType");
const Item = require("../models/item");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllPosts: {
      type: new GraphQLList(ItemType),
      resolve: async (parent, args) => {
        const allItems = await Item.find();
        return allItems;
      },
    },
    getPost: {
      type: ItemType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, { id }) => {
        const item = await Item.findById(id);
        return item;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createPost: {
      type: ItemType,
      args: {
        text: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const newItem = new Item({
          text: args.text,
        });

        const ourItem = await newItem.save();
        return ourItem;
      },
    },
    updatePost: {
      type: ItemType,
      args: {
        id: { type: GraphQLID },
        newText: { type: GraphQLString },
      },
      resolve: async (parent, { id, newText }) => {
        const oldItem = await Item.findById(id);
        oldItem.text = newText;
        const res = await oldItem?.save();
        return res;
      },
    },
    deletePost: {
      type: GraphQLString,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, { id }) => {
        await Item.findByIdAndRemove(id);
        return `Item with id ${id} deleted`;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
