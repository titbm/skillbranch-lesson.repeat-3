import Pet from './models/pet.server.model';
import User from './models/user.server.model';

export default async function saveDataInDb(data) {
  try {
    const user = new User(data.user);
    await user.save();
    const promises = data.pets.map((pet) => {
      const petData = Object.assign({}, pet, {
        owner: user._id,
      });
      return (new Pet(petData)).save();
    });
    console.log('success');
    return {
      user,
      pets: await Promise.all(promises),
    };
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
