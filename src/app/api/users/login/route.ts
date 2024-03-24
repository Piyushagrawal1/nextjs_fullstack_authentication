import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB(); // Connect to MongoDB database

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        console.log('User Exists');

        //check if password is correct
        const validatePassword = await bcryptjs.compare(password, user.password);

        if (!validatePassword) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }
        console.log(user);

        // create token data
        const tokendata = {
            _id: user._id,
            username: user.username,
            email: user.email,
        }
        // craete token
        const token = jwt.sign(tokendata, process.env.TOKEN_SECRETT!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: 'Login Successful',
            success: true,
        })

        response.cookies.set('token', token, {
            httpOnly: true,
        })
        return response;


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}