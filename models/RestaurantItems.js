import mongoose from 'mongoose';
import { fooditems } from './FoodItems';


const restaurantItems = new mongoose.Schema({
    restaurant_id: {
        type: String,
    },
    restaurant_name: {
        type: String,
    },
    food_items:[fooditems],
    
}, { timestamps: true })

export default mongoose.models.RestaurantItems || mongoose.model("RestaurantItems", restaurantItems)