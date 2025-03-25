import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema(
    {
        message: {
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

const Comment = models.Comment || mongoose.model("comment", commentSchema);

export default Comment;