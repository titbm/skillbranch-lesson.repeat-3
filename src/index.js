import EXPRESS from 'express';
import CHALK from 'chalk';
import CORS from 'cors';
import MONGOOSE from 'mongoose';
import PROMISE from 'bluebird';
import BODY_PARSER from 'body-parser';
import saveDataInDb from './saveDataInDb';
import Pet from './models/pet.server.model';
import User from './models/user.server.model';
import isAdmin from './isAdmin';
// var open = require('open');

const SERVER = EXPRESS();
const PORT = process.env.PORT || 3000;

MONGOOSE.Promise = PROMISE;
MONGOOSE.connect('mongodb://titbm:012i012p@ds151697.mlab.com:51697/skillbranch-3a-homework');

SERVER.use(CORS());
SERVER.use(EXPRESS.static('public'));
SERVER.use(BODY_PARSER.json());
// SERVER.use(isAdmin);

SERVER.get('/clear', isAdmin, async (request, response) => {
  await User.remove({});
  await Pet.remove({});
  return response.send('ok');
});

SERVER.get('/users', async (request, response) => {
  const users = await User.find();
  return response.json(users);
});

SERVER.get('/pets', async (request, response) => {
  const pets = await Pet.find().populate('owner');
  return response.json(pets);
});

SERVER.post('/data', async (request, response) => {
  const data = request.body;
  if (!data.user) return response.status(400).send('user required');
  if (!data.pets) data.pets = [];

  const user = await User.findOne({ name: data.user.name });
  if (user) response.status(400).send('user.name is exists');

  try {
    const result = await saveDataInDb(data);
    return response.json(result);
  } catch (error) {
    return response.status(500).send(error);
  }
});

SERVER.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(CHALK.cyan(`Server is up on port: ${PORT}`));
    // open("http://localhost:" + PORT);
  }
});
