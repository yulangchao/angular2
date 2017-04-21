// ```
// _profile.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// _profile.js may be freely distributed under the MIT license
// ```

// */app/routes/_profile.router.js*

// ## Profile API object

// HTTP Verb  Route                 Description

// GET        /api/profile             Get all of the profile items
// GET        /api/profile/:profile_id    Get a single profile item by profile item id
// POST       /api/profile             Create a single profile item
// DELETE     /api/profile/:profile_id    Delete a single profile item
// PUT        /api/profile/:profile_id    Update a profile item with new info

// Load the profile model
import Profile from '../models/profile.model';

export default (app, router) => {

  // ### Profile API Routes

  // Define routes for the profile item API

  router.route('/profile')

    // ### Create a profile item

    // Accessed at POST http://localhost:8080/api/profile

    // Create a profile item
    .post((req, res) => {

      Profile.create({

        name : req.body.name,
        email : req.body.email.toLowerCase(),
        phone : '',
        type : '',
        logo : 1


      }, (err, profile) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`Profile created: ${profile}`);

        Profile.find((err, profiles) => {
          if(err)
            res.send(err);

          res.json(profiles);
        });
      });
    })

    // ### Get all of the profile items

    // Accessed at GET http://localhost:8080/api/profile
    .get((req, res) => {

      // Use mongoose to get all profile items in the database
      Profile.find((err, profile) => {

        if(err)
          res.send(err);

        else
          res.json(profile);
      });
    });

  router.route('/profile/:profile_id')

    // ### Get a profile item by ID

    // Accessed at GET http://localhost:8080/api/profile/:profile_id
    .get((req, res) => {

      // Use mongoose to a single profile item by id in the database
      Profile.findOne({

      'email' : req.params.profile_id

      }, (err, profile) => {

        if(err)
          res.send(err);

        else
          res.json(profile);
      });
    })

    // ### Update a profile item by ID

    // Accessed at PUT http://localhost:8080/api/profile/:profile_id
    .put((req, res) => {

      // use our profile model to find the profile item we want
      Profile.findOne({

        'email' : req.params.profile_id

      }, (err, profile) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.name)
          profile.name = req.body.name;
        if (req.body.email)
          profile.email = req.body.email;
        if (req.body.phone)
            profile.phone = req.body.phone;
        if (req.body.type)
            profile.type = req.body.type;
        if (req.body.logo)
            profile.logo = req.body.logo;


        // save the profile item
        return profile.save((err) => {

          if (err)
            res.send(err);

          return res.send(profile);

        });
      });
    })

    // ### Delete a profile item by ID

    // Accessed at DELETE http://localhost:8080/api/profile/:profile_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete profile with id: ${req.params.profile_id}`);

      Profile.remove({

        'email' : req.params.profile_id
      }, (err, profile) => {

        if(err)
          res.send(err);

        console.log('Profile successfully deleted!');

        Profile.find((err, profiles) => {
          if(err)
            res.send(err);

          res.json(profiles);
        });
      });
    });
};
