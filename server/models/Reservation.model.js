import mongoose from "mongoose";


const ReservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date, // Change from String to Date
    required: true,
  },
  partySize: {
    type: Number,
    required: true,
  },
  specialRequests: {
    type: String,
  },
  phone: {
    type: String,
  },
  canceledAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["confirmed", "pending", "canceled", "completed"],
    default: "confirmed",
  },
  assignedTable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
  },
  assigner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assignedAt: {
    type: Date,
  },
}, { timestamps: true });

export default mongoose.model("Reservation", ReservationSchema);
