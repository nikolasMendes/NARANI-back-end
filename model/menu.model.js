import { Schema, model } from "mongoose";

const menuSchema = new Schema({
  prato: { type: String, required: true },
  imagem: { type: String },
  descrição: { type: String, required: true, minlength: 10 },
  quantidade: { type: Number, required: true },
  preparo: { type: String, required: true },
  calorias: { type: String, required: true },
});

export const MenuModel = model("Menu", menuSchema);
