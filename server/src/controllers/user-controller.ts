import { Request, Response } from "express";
import prisma from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthReq } from "../middleware";

async function signUp(req: Request, res: Response): Promise<any> {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Incorrect inputs",
      });
    }

    const userExist = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Signup successfully!",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

async function signIn(req: Request, res: Response): Promise<any> {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Incorrect inputs",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "username does not exists",
      });
    }
    const hashedPassword = await bcrypt.compare(password, user.password);

    if (!hashedPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const userId = user.id;
    const JWT_SECRET = process.env.JWT_SECRET || "secret";

    const token = await jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(201).json({
      success: true,
      message: "Signin successfully!",
      token,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

async function getProfile(req: AuthReq, res: Response): Promise<any> {
  try {
    if (!req.user) return;

    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    user.password = "";
    return res.status(201).json({
      success: true,
      message: "got user details!",
      user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

async function createRoom(req: Request, res: Response): Promise<any> {
  try {
    const { roomName } = req.body;
    if (!roomName) {
      return res.status(400).json({
        success: false,
        message: "Please enter room name",
      });
    }

    const room = await prisma.room.create({
      data: {
        roomName,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Room created successfully!",
      roomId: room.id,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

async function checkRoom(req: Request, res: Response): Promise<any> {
  try {
    const { roomId } = req.body;

    if (!roomId) {
      return res.status(400).json({
        success: false,
        message: "Please enter room id",
      });
    }

    const NumRegex = /^-?\d+$/;

    if(!NumRegex.test(roomId)){
      return res.status(400).json({
        success: false,
        message: "Invalid room ID. It must be a valid number. ",
      });
    }

    const room = await prisma.room.findFirst({
      where: {
        id: Number(roomId),
      },
    });

    if (!room) {
      return res.status(400).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Room found  successfully!",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong!";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

export { signUp, signIn, getProfile , createRoom, checkRoom};
