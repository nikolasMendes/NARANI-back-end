import express from "express";
import { MenuModel } from "../model/menu.model.js";

const menuRouter = express.Router();

menuRouter.post("/", async (req, res) => {
  try {
    const newMenu = await MenuModel.create({ ...req.body });

    return res.status(201).json(newMenu);
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(...err.errors).map(
        (value) => value.message
      );
      return res.status(400).json({
        error: message,
      });
    }
    if (error.code === 11000) {
      return res.status(400).json(error.message);
    }

    res.status(500).json(error.message);
  }
});

menuRouter.get("/", async (req, res) => {
  try {
    const menus = await MenuModel.find();

    return res.status(200).json(menus);
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(...err.errors).map(
        (value) => value.message
      );
      return res.status(400).json({
        error: message,
      });
    }
    if (error.code === 11000) {
      return res.status(400).json(error.message);
    }

    res.status(500).json(error.message);
  }
});

export { menuRouter };
