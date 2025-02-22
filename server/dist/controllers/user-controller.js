"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = signUp;
exports.signIn = signIn;
exports.getProfile = getProfile;
exports.createRoom = createRoom;
exports.checkRoom = checkRoom;
const db_1 = __importDefault(require("../db/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect inputs",
                });
            }
            const userExist = yield db_1.default.user.findFirst({
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
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            yield db_1.default.user.create({
                data: {
                    username,
                    password: hashedPassword,
                },
            });
            return res.status(201).json({
                success: true,
                message: "Signup successfully!",
            });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong!";
            return res.status(400).json({
                success: false,
                message,
            });
        }
    });
}
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect inputs",
                });
            }
            const user = yield db_1.default.user.findFirst({
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
            const hashedPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!hashedPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials!",
                });
            }
            const userId = user.id;
            const JWT_SECRET = process.env.JWT_SECRET || "secret";
            const token = yield jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
            return res.status(201).json({
                success: true,
                message: "Signin successfully!",
                token,
                user
            });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong!";
            return res.status(400).json({
                success: false,
                message,
            });
        }
    });
}
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user)
                return;
            const userId = req.user.userId;
            const user = yield db_1.default.user.findUnique({
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
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong!";
            return res.status(400).json({
                success: false,
                message,
            });
        }
    });
}
function createRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { roomName } = req.body;
            if (!roomName) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter room name",
                });
            }
            const room = yield db_1.default.room.create({
                data: {
                    roomName,
                },
            });
            return res.status(201).json({
                success: true,
                message: "Room created successfully!",
                roomId: room.id,
            });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong!";
            return res.status(400).json({
                success: false,
                message,
            });
        }
    });
}
function checkRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { roomId } = req.body;
            if (!roomId) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter room id",
                });
            }
            const NumRegex = /^-?\d+$/;
            if (!NumRegex.test(roomId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid room ID. It must be a valid number. ",
                });
            }
            const room = yield db_1.default.room.findFirst({
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
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong!";
            return res.status(400).json({
                success: false,
                message,
            });
        }
    });
}
