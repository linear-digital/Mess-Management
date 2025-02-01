import mongoose from 'mongoose';

const yourSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true,
        enum: ["Morning", "Evening", "Afternoon", "Night"]
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    });

// Check if the model already exists, and use it, otherwise define it
const Mills = mongoose.models.Mils || mongoose.model('Mils', yourSchema);

export default Mills;