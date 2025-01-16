import mongoose from "mongoose";
const TableSchema = new mongoose.Schema({
  tableNumber: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});
export default mongoose.model("Table", TableSchema);
