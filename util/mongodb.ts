import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://linear_digital:NkhnHPIY0iv1TvtC@cluster0.tkipwqr.mongodb.net/calculation?retryWrites=true&w=majority');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;