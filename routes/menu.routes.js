import express from "express";
import { MenuModel } from "../model/menu.model.js";
import { UserModel } from "../model/user.model.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const menuRouter = express.Router();

menuRouter.post("/", isAuth, attachCurrentUser, isAdmin, async (req, res) => {
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

menuRouter.delete(
  "/delete/:id",
  isAuth,
  attachCurrentUser,
  isAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      let deletedFood = await MenuModel.findByIdAndDelete(id);
      return res.status(200).json(deletedFood);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

menuRouter.put(
  "/edit/:id",
  isAuth,
  attachCurrentUser,
  isAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      let updatedFood = await MenuModel.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedFood);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

menuRouter.get("/details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let oneFood = await MenuModel.findById(id);
    return res.status(200).json(oneFood);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { menuRouter };
