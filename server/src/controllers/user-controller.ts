import { Request, Response } from "express";
import prisma from "../db/db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

async function signUp(req: Request, res: Response):Promise<any> {
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
      success: true,
      message,
    });
  }
}


async function signIn(req: Request, res: Response): Promise<any>{
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
        username 
    }
  })
  if(!user){
    return res.status(400).json({
        success: false,
        message: "username does not exists",
      });
  }
      const hashedPassword = await bcrypt.compare(password, user.password)
  
     if(!hashedPassword){
        return res.status(400).json({
            success: false,
            message: "Invalid credentials!",
          });
     }
  
     const userId = user.id
     const JWT_SECRET = process.env.JWT_SECRET || 'secret'


     const token = await jwt.sign({userId}, JWT_SECRET, {expiresIn: '1h'})

      return res.status(201).json({
        success: true,
        message: "Signin successfully!",
        token
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong!";
  
      return res.status(400).json({
        success: true,
        message,
      });
    }
  }
  
  

export {
  signUp, signIn
}