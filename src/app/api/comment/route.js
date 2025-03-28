import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db/connectMongoDb";
import Comment from "@/lib/models/comments";
import User from "@/lib/models/users";

export const POST = async (request) => {
    try {
        await connectMongoDB();
        const { message, userId, userImage, userName } = await request.json();

        if (!message || !userId || !userImage || !userName) {
            return NextResponse.json(
                { message: "Some infos are missing" },
                { status: 400 }
            );
        }

        const userExits = await User.findById(userId);
        if (!userExits) {
            return NextResponse.json(
                { message: "Author not found" },
                { status: 404 }
            );
        }

        const newComment = await Comment.create({
            message,
            userId,
            userImage,
            userName
        });

        return NextResponse.json(
            { message: 'Comment created successfully', comment: newComment },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

export const GET = async (request) => {
    try {
        await connectMongoDB();
        const url = new URL(request.url);
        const userId = url.searchParams.get("userId");

        const user = await User.findById(userId);
        if (user) {
            const comments = await Comment.find()
            return NextResponse.json(comments);
        }
        else {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
    }
    catch (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}