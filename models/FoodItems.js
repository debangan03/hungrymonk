import mongoose from 'mongoose';

export const fooditems = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    quantity: {
        type: String,
        default:"1",
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
    image:{
        type:String,
    },
    available_status:{
        type:Boolean,
        default:true,
    }
}, { timestamps: true })

export default mongoose.models.FoodItems || mongoose.model("FoodItems", fooditems)