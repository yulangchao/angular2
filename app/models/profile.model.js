// ```
// profile.model.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// profile.model.js may be freely distributed under the MIT license
// ```

// */app/models/profile.model.js*

// ## Profile Model

// Note: MongoDB will autogenerate an _id for each Profile object created

// Grab the Mongoose module
import mongoose from 'mongoose';

// Create a `schema` for the `Profile` object
let profileSchema = new mongoose.Schema({
  name: { type : String, unique: true},
  email: { type : String, unique: true},
  phone: String,
  type: String,
  logo: Number
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Profile', profileSchema);
