import mongoose, { Schema, models } from "mongoose";

const promptSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },

        imageCount: {
            type: Number,
            default: 1
        },
        model: {
            type: String,
            required: true
        },
        ratio: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    { timestamps: true }
);

const Prompt = models.Prompt || mongoose.model("Prompt", promptSchema);

export default Prompt;