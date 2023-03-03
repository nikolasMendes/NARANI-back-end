import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "User" },
  pedido: [{ type: Schema.Types.ObjectId, ref: "Menu" }], //precisa bater o product com o que a Nayra fez
});
export const OrderModel = model("Order", orderSchema);
