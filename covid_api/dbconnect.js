import mongoose from 'mongoose';

export const dbConnect = async () => {
  mongoose
    .connect('mongodb://mongo:27017/covidapidb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    })
    .then(() => {
      console.log('Connected to mongodb.');
    })
    .catch((error) => {
      console.log(error.reason);
    });
};
