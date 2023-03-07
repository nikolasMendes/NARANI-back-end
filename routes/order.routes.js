import express from "express";
import { OrderModel } from "../model/order.models.js";
import { UserModel } from "../model/user.model.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

const orderRouter = express.Router();

//POST
orderRouter.post("/", isAuth, attachCurrentUser, async (req, res) => {
  try {
    //const { orderId } = req.params;
    const newOrder = await OrderModel.create({
      ...req.body,
      client: req.currentUser._id,
    }); //alterar wineModel com o model que foi criado no menu
    await UserModel.findOneAndUpdate(
      { _id: req.currentUser._id },
      { $push: { order: newOrder._id } },
      { new: true, runValidators: true }
    );

    return res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    // checking validation
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({
        error: message,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json(error.message);
    }

    return res.status(500).json(error.message);
  }
});

//DELETE
orderRouter.delete("/:orderId", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const { orderId } = req.params;
    const deleted = await OrderModel.deleteOne({ _id: orderId });
    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    // checking validation
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({
        error: message,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json(error.message);
    }

    return res.status(500).json(error.message);
  }
});

//GETALL TODOS OS PEDIDOS FINALIZADOS
orderRouter.get("/", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const orders = await OrderModel.find({ client: req.currentUser._id })
      .populate("client")
      .populate("pedido");
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    // checking validation
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({
        error: message,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json(error.message);
    }

    return res.status(500).json(error.message);
  }
});

export { orderRouter };
