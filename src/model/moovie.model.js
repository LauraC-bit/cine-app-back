import {
  ObjectId,
  Schema,
  createCollection,
} from "../config/mongoose.config.js";

const moovieSchema = new Schema({
  title: {
    type: String,
  },
  vote_average: {
    type: Number,
  },
  vote_count: {
    type: Number,
  },
  popularity: {
    type: Number,
  },
  overview: {
    type: String,
  },
  release_date: {
    type: String,
  },
  id: {
    type: Number,
  },
  genre_ids: {
    type: [Number],
  },
  adulte: {
    type: Boolean,
  },
  poster_path: {
    type: String,
  },
  AddedBy: { type: ObjectId, ref: "User" },
});
const Moovie = createCollection("Moovie", moovieSchema);

export default Moovie;
