import mongoose, { Schema, models } from "mongoose";

const listSchema = new Schema(
    {
        market_cap_rank: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
            // Removed unique: true to allow multiple users to have the same crypto
        },
        name: {
            type: String,
            required: true
            // Removed unique: true to allow multiple users to have the same crypto
        },
        symbol: {
            type: String,
            required: true
        },
        current_price: {
            type: Number,
            required: true
        },
        price_change_percentage_24h: {
            type: String,
            required: true
        },
        market_cap: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        userName: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

// Create compound index to prevent duplicate cryptos per user
// This ensures a user can't add the same crypto twice, but different users can have the same crypto
listSchema.index({ userId: 1, name: 1 }, { unique: true });
listSchema.index({ userId: 1, symbol: 1 }, { unique: true });

const ListSchema = models.ListSchema || mongoose.model("ListSchema", listSchema);

export default ListSchema;