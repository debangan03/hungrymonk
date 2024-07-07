import conndb from "../../../middleware/mongoose";
import Orders from "../../../models/Orders";
import SingleOrders from "../../../models/SingleOrders";
import OrderFoodItems from "../../../models/OrderFoodItems";
import { FoodItems } from "../../../models/FoodItems";
import RestaurantItems from "../../../models/RestaurantItems";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { restaurant_id, restaurant_name, food_item } = req.body;

            // Create a new food item
            const newFoodItem = await FoodItems.create(food_item);

            // Find the restaurant and add the new food item to it
            let restaurant = await RestaurantItems.findOne({ restaurant_id });

            if (!restaurant) {
                // If the restaurant doesn't exist, create a new one
                restaurant = new RestaurantItems({
                    restaurant_id,
                    restaurant_name,
                    food_items: [newFoodItem._id]
                });
            } else {
                // If the restaurant exists, add the new food item to its food_items array
                restaurant.food_items.push(newFoodItem._id);
            }

            const updatedRestaurant = await restaurant.save();

            res.status(200).json({ success: true, data: updatedRestaurant });
        } catch (e) {
            console.error(e);
            res.status(400).json({ success: false, error: e.message });
        }
    } else {
        res.status(201).json({ success: false, message: "Method not allowed" });
    }
};

export default conndb(handler);
