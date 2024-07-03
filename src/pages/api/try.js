import conndb from '../../../middleware/mongoose';
import RestaurantItems from '../../../models/RestaurantItems';
import FoodItems from '../../../models/FoodItems';

const handler=async(req, res)=> {
    if (req.method === 'POST') {

        const { restaurant_id, foodItem } = req.body;

        try {
            // Create a new food item
            const newFoodItem = await FoodItems.create(foodItem);

            // Find the restaurant and add the new food item to it
            const restaurant = await RestaurantItems.findById(restaurant_id);
            restaurant.food_items.push(newFoodItem._id);
            await restaurant.save();

            res.status(201).json({ success: true, data: restaurant });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
export default conndb(handler);