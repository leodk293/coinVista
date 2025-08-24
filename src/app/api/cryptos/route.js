import ListSchema from "@/lib/models/PersonalizedList";
import User from "@/lib/models/users";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db/connectMongoDb";

// GET - Fetch user's cryptocurrency list
export const GET = async (request) => {
    try {
        // Connect to database
        await connectMongoDB();

        // Get userId from query parameters or headers
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Fetch user's cryptocurrency list
        const cryptoList = await ListSchema.find({ userId })
            .sort({ market_cap_rank: 1 }) // Sort by market cap rank
            .populate('userId', 'name email'); // Populate user info if needed

        return NextResponse.json({
            success: true,
            data: cryptoList,
            count: cryptoList.length
        }, { status: 200 });

    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch cryptocurrency list" },
            { status: 500 }
        );
    }
};

// POST - Add cryptocurrency to user's list
export const POST = async (request) => {
    try {
        // Connect to database
        await connectMongoDB();

        const body = await request.json();
        const {
            market_cap_rank,
            image,
            name,
            symbol,
            current_price,
            price_change_percentage_24h,
            market_cap,
            userId,
            userName
        } = body;

        // Validation - Check for required fields
        if (!market_cap_rank || !image || !name || !symbol ||
            current_price === undefined || price_change_percentage_24h === undefined ||
            !market_cap || !userId || !userName) {
            return NextResponse.json(
                { success: false, error: "All fields are required" },
                { status: 400 }
            );
        }

        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        // Check if cryptocurrency already exists in user's list
        const existingEntry = await ListSchema.findOne({
            $and: [
                { userId },
                { $or: [{ name }, { symbol: symbol.toUpperCase() }] }
            ]
        });

        if (existingEntry) {
            return NextResponse.json(
                { success: false, error: "Cryptocurrency already exists in your list" },
                { status: 409 }
            );
        }

        // Create new cryptocurrency entry
        const newCrypto = new ListSchema({
            market_cap_rank,
            image,
            name,
            symbol: symbol.toUpperCase(),
            current_price,
            price_change_percentage_24h: price_change_percentage_24h.toString(),
            market_cap: market_cap.toString(),
            userId,
            userName
        });

        await newCrypto.save();

        // Populate user info before returning
        await newCrypto.populate('userId', 'name email');

        return NextResponse.json({
            success: true,
            data: newCrypto,
            message: "Cryptocurrency added to list successfully"
        }, { status: 201 });

    } catch (error) {
        console.error("POST Error:", error);

        // Handle duplicate key errors (from compound indexes)
        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, error: "This cryptocurrency is already in your list" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, error: "Failed to add cryptocurrency to list" },
            { status: 500 }
        );
    }
};

// DELETE - Remove cryptocurrency from user's list
export const DELETE = async (request) => {
    try {
        // Connect to database
        await connectMongoDB();

        const { searchParams } = new URL(request.url);
        const cryptoId = searchParams.get('id');
        const userId = searchParams.get('userId');

        if (!cryptoId || !userId) {
            return NextResponse.json(
                { error: "Cryptocurrency ID and User ID are required" },
                { status: 400 }
            );
        }

        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Find and delete the cryptocurrency entry
        const deletedCrypto = await ListSchema.findOneAndDelete({
            _id: cryptoId,
            userId: userId // Ensure user can only delete their own entries
        });

        if (!deletedCrypto) {
            return NextResponse.json(
                { error: "Cryptocurrency not found in your list" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: deletedCrypto,
            message: "Cryptocurrency removed from list successfully"
        }, { status: 200 });

    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json(
            { error: "Failed to remove cryptocurrency from list" },
            { status: 500 }
        );
    }
};