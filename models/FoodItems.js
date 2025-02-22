import mongoose from 'mongoose';

const foodItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: String,
    },
    category: {
        type: String,
    },
    subcategory: {
        type: String,
    },
    image: {
        type: String,
    },
    available_status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

export const FoodItems = mongoose.models.FoodItems || mongoose.model('FoodItems', foodItemsSchema);
