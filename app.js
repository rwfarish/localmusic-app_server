require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { urlencoded, request } = require('express');
const PORT = 4000;

const app = express(); 
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

    const un = process.env.MONGO_USER;
    const pw = process.env.MONGO_PASSWORD;
    mongoose.connect(
      `mongodb+srv://${un}:${pw}@cluster0.oi5xs.mongodb.net/localmusicapp?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
 

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    about: { type: String, required: false, unique: false },
    photo: { type: String, required: false, unique: false },  
  });
  const UserModel = mongoose.model('user', userSchema);
    app.post("/createuser", async (request, response) => {
        console.log("create user hit")
    try {
      console.log('post a user');
      const username = request.body.username;
      const about = request.body.about; 
      const photo = request.body.photo; 
  
      const user = new UserModel({
        username,
        about, 
        photo, 
      });
  
      const createdUser = await UserModel.create(user);
  
      response.status(201).send(createdUser);
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  });

    
  app.get("/users", async (request, response) => {
    try {
      const users = await UserModel.find();
      response.status(200).send(users);
    } catch (error) {
      response.status(500).send(error);
      console.log(error);
  }
  });

  app.post("/get-users-by-username", async (request, response) => {
    try {
      const usernameFromRequest = request.body.username; 
      const user = await UserModel.find({username:usernameFromRequest});
      response.status(200).send(user);
    } catch (error) {
      response.status(500).send(error);
      console.log(error);
    }
  });

  

  const artistSchema = new mongoose.Schema({
    artistname: { type: String, required: true, unique: true },
    streaming: { type: String, required: false, unique: false },
    social: { type: String, required: false, unique: false },
    genre: { type: String, required: false, unique: false}, 
    photo: { type: String, required: false, unique: false },  
  });

  const ArtistModel = mongoose.model('artist', artistSchema);
    app.post("/createartist", async (request, response) => {
        console.log("create artist hit")
    try {
      console.log('post an artist');
      const artistname = request.body.artistname;
      const streaming = request.body.streaming; 
      const social = request.body.social; 
      const genre = request.body.social; 
      const photo = request.body.photo; 
  
      const artist = new ArtistModel({
        artistname,
        streaming, 
        social,
        genre, 
        photo 
      });
  
      const createdArtist = await ArtistModel.create(artist);
  
      response.status(201).send(createdArtist);
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  });

  app.get("/artists", async (request, response) => {
    try {
      const artists = await ArtistModel.find();
      response.status(200).send(artists);
    } catch (error) {
    response.status(500).send(error)
      console.log(error);
    }
  });

  const eventSchema = new mongoose.Schema({
    name: { type: String, required: false, unique: false},
    artist: { type: String, required: true, unique: false },
    venue: { type: String, required: false, unique: false },
    date: { type: String, required: false, unique: false },
    description: { type: String, required: false, unique: false },  
    user: { type: String, required: false, unique: false}
  });

  const EventModel = mongoose.model('event', eventSchema);
    app.post("/createevent", async (request, response) => {
        console.log("create event hit")
    try {
      console.log('post an event');
      const name = request.body.name; 
      const artist = request.body.artist;
      const venue = request.body.venue; 
      const date = request.body.date; 
      const description = request.body.description;
      const user = request.body.user; 
  
      const event = new EventModel({
        name,
        artist,
        venue, 
        date,
        description, 
        user 
      });
  
      const createdEvent = await EventModel.create(event);
  
      response.status(201).send(createdEvent);
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  });

  app.get("/events", async (request, response) => {
    try {
      const events = await EventModel.find();
      response.status(200).send(events);
    } catch (error) {
      response.status(500).send(error)
      console.log(error);
    }
  });

  const venueSchema = new mongoose.Schema({
    place: { type: String, required: true, unique: true },
    address: { type: String, required: false, unique: false },
    neighborhood: { type: String, required: false, unique: false }, 
    venuepic: { type: String, required: false, unique: false}  
  });

  const VenueModel = mongoose.model('venue', venueSchema);
    app.post("/createvenue", async (request, response) => {
        console.log("create venue hit")
    try {
      console.log('post an event');
      const place = request.body.place;
      const address = request.body.address; 
      const neighborhood = request.body.neighborhood; 
      const venuepic = request.body.venuepic; 
      
  
      const venue = new VenueModel({
        place,
        address, 
        neighborhood, 
        venuepic
      });
  
      const createdVenue = await VenueModel.create(venue);
  
      response.status(201).send(createdVenue);
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  });

  app.get("/venues", async (request, response) => {
    try {
      const venues = await VenueModel.find();
      response.status(200).send(venues);
    } catch (error) {
      response.status(500).send(error)
      console.log(error);
    }
  });


// users, artists, events, venues 

// users - username, about, photo/avatar/profile pic

// artists - bio, links - music or web links or social, profile pic

// events - artist, venue, date + time, description (not required)

// venues - name, address, neighborhood (list)
app.listen(4000, () => console.log('app is listening on 4000'));