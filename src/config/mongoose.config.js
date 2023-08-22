import mongoose from "mongoose";
export const { Schema } = mongoose;

export const ObjectId = Schema.Types.ObjectId;

export const createCollection = mongoose.model;
