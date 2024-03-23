import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from '@/helpers/mailer'


connectDB();
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { uername, email, Password } = reqBody;
    //validation
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcryptjs.hash(Password, 10);

    const newUser = new User({
      uername,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser)

    //send varification main
    await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id })
    return NextResponse.json({ 
      message: "User Registered successfully",
      success: true,
      savedUser,
    }, { status: 201 })

  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

