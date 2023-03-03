import { Schema, model } from "mongoose";

const menuSchema = new Schema({
  prato: { type: String, requerid: true },
  imagem: { type: String },
  descrição: { type: String, requerid: true, minlength: 10 },
  quantidade: { type: Number, requerid: true },
  serve: { type: String, requerid: true },
  calorias: { type: String, requerid: true },
});

export const MenuModel = model("Menu", menuSchema);
