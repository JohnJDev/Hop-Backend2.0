import fs from "fs";
import path from "path";
import User from "../models/User.js";

// Actualiza el avatar de un usuario al subir un archivo
export const downLoad = async (req, res) => {
    try {
        const { file } = req;
        const { id } = req.query;

        if (!file) {
            return res.status(400).json({ success: false, message: "File not provided" });
        }

        console.log("File uploaded:", file);

        const updateData = { avatar: file.path, isavatar: true };
        const updatedUser = await User.findOneAndUpdate({ _id: id }, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error in downLoad:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Envía un archivo avatar desde el servidor
export const sendFile = async (filePath, res) => {
    try {
        const absolutePath = path.resolve(process.cwd(), filePath);

        if (!fs.existsSync(absolutePath)) {
            return res.status(404).json({ success: false, message: "File not found" });
        }

        return res.status(200).sendFile(absolutePath);
    } catch (error) {
        console.error("Error in sendFile:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Obtiene el avatar del usuario autenticado
export const upLoad = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.avatar || user.avatar === "") {
            return res.status(404).json({ success: false, message: "Avatar not set" });
        }

        return sendFile(user.avatar, res);
    } catch (error) {
        console.error("Error in upLoad:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Obtiene el avatar de un usuario basado en su email
export const getAvatar = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.avatar || user.avatar === "") {
            return res.status(404).json({ success: false, message: "Avatar not set" });
        }

        return sendFile(user.avatar, res);
    } catch (error) {
        console.error("Error in getAvatar:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
