const mongoose = require("mongoose");
const OurSchema = mongoose.Schema;

const ItemSchema = new OurSchema({
  text: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("items", ItemSchema);

module.exports = Item;
