
import { wss } from "../server.js";
import ReservationModel from "../models/Reservation.model.js";
import UserModel from "../models/User.model.js";
import TableModel from "../models/Table.model.js";


//create table 

export async function createTable(req, res) {
  try {
    const { tableNumber, capacity } = req.body;

    const table = new TableModel({
      tableNumber,
      capacity,
    });

    await table.save();

    return res.status(201).send({
      message: 'Table created successfully',
      table,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}


// Table Assigning Controller
export const assignTable = async (req, res) => {
  const { reservationId, tableId } = req.body;

  try {
    // Validate reservationId and tableId
    // Check if the reservation and table exist in the system

    // Fetch the reservation and table records
    const reservation = await ReservationModel.findById(reservationId);
    // Assuming you have a Table model, fetch the table record as well
    const table = await TableModel.findById(tableId);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Check if the table is available
    if (!table || !table.isAvailable) {
      return res.status(400).json({ error: "Table is not available" });
    }

    // Update reservation record with assigned table information
    reservation.assignedTable = tableId;
    reservation.status = "confirmed";
    reservation.assigner = req.user._id; // Assuming you have authentication and can access the user performing the assignment
    reservation.assignedAt = new Date();

    // Save the updated reservation
    await reservation.save();

    // Update the table availability status
    table.isAvailable = false;
    await table.save();

    return res.json({ message: "Table assigned successfully", reservation });
  } catch (error) {
    console.error("Error assigning table:", error);
    return res.status(500).json({ error: "Failed to assign table" });
  }
};



// Get all reservations


export const getAllReservations = async (req, res) => {
  try {
    const reservations = await ReservationModel.find()
    .populate('user', 'name')  // Populate the 'user' field with only the 'name' field from the User model
    .exec();

    return res.status(200).json({
      message: 'All reservations retrieved successfully',
      reservations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

  // Get a specific reservation by ID


export const getReservationById = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await ReservationModel.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    // Here, you can add additional logic to check the user's authorization
    // For example, you may want to check if the user requesting the reservation
    // is the owner of the reservation or has admin privileges.

    return res.status(200).json({ reservation });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

  
  // Create a new reservation
  
 
  export async function createReservation(req, res) {
    try {
      const { date, time, numberOfGuests, specialRequests, duration, phone } = req.body;
  
      if (!req.user || !req.user._id) {
        return res.status(401).send({ error: "Unauthorized: User not authenticated" });
      }
  
      const userId = req.user._id;
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(401).send({ error: "Unauthorized: User not found" });
      }
  
      const reservation = new ReservationModel({
        user: userId,
        date,
        time,
        numberOfGuests,
        specialRequests,
        duration,
        phone
      });
  
      await reservation.save();
  
      return res.status(201).send({
        message: "Reservation created successfully",
        reservation,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  }
  
  //create reservation with websockets 
  

// export async function createReservation(req, res) {
//   try {
//     const { date, time, numberOfGuests, specialRequests, duration, phone } = req.body;

//     if (!req.user || !req.user._id) {
//       return res.status(401).send({ error: "Unauthorized: User not authenticated" });
//     }

//     const userId = req.user._id;
//     const user = await UserModel.findById(userId);

//     if (!user) {
//       return res.status(401).send({ error: "Unauthorized: User not found" });
//     }

//     const reservation = new ReservationModel({
//       user: userId,
//       date,
//       time,
//       numberOfGuests,
//       specialRequests,
//       duration,
//       phone
//     });

//     await reservation.save();

//     // Notify all connected WebSocket clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === client.OPEN) {
//         client.send(
//           JSON.stringify({
//             type: "NEW_RESERVATION",
//             data: {
//               reservationId: reservation._id,
//               date,
//               time,
//               numberOfGuests,
//               specialRequests,
//               phone,
//               user: user.name,
//             },
//           })
//         );
//       }
//     });

//     return res.status(201).send({
//       message: "Reservation created successfully",
//       reservation,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({ error: "Internal server error" });
//   }
// }

 

  export const updateReservation = async (req, res) => {
    try {
      const { reservationId } = req.params;
      const { time, numberOfGuests, specialRequests, duration, date } = req.body;
  
      // Find the reservation by ID
      const reservation = await ReservationModel.findById(reservationId);
  
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
  
      // Update reservation details
      reservation.time = time;
      reservation.numberOfGuests = numberOfGuests;
      reservation.specialRequests = specialRequests;
      reservation.duration = duration;
      reservation.date = date;
  
      // Save the updated reservation
      await reservation.save();
  
      return res.status(200).json({
        message: 'Reservation updated successfully',
        reservation,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  export const cancelReservation = async (req, res) => {
    try {
      const { reservationId } = req.params;
  
      // Fetch the reservation by ID
      const reservation = await ReservationModel.findById(reservationId);
  
      if (!reservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }
  
      // Check if the reservation is already canceled
      if (reservation.status === "canceled") {
        return res.status(400).json({ error: "Reservation is already canceled" });
      }
  
      // Update reservation status to 'canceled'
      reservation.status = "canceled";
      reservation.canceledAt = new Date(); // Optional: Track when the reservation was canceled
  
      // Save the updated reservation
      await reservation.save();
  
      return res.status(200).json({
        message: "Reservation canceled successfully",
        reservation,
      });
    } catch (error) {
      console.error("Error canceling reservation:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // Delete a reservation
  export const deleteReservation = async (req, res) => {
    res.json("");
  };
  
  // Get availability of tables for a specific date and time
  

  export const getTableAvailability = async (req, res) => {
    try {
      // Fetch all tables from the database
      const tables = await TableModel.find();
  
      // Filter tables based on availability
      const availableTables = tables.filter(table => table.isAvailable);
  
      return res.status(200).json({
        message: 'Table availability retrieved successfully',
        availableTables,
      });
    } catch (error) {
      console.error('Error retrieving table availability:', error);
      return res.status(500).json({ error: 'Failed to retrieve table availability' });
    }
  };
  
  
  // Get guest details by ID
  export const getGuestDetails = async (req, res) => {
    res.json("");
  };
  
  // Get all reservations for a specific guest
 


  export const getCustomerReservations = async (req, res) => {
    try {
      const userId = req.user._id; // Assuming the user ID is stored in the _id field
  
      // Retrieve reservations for the logged-in user
      const reservations = await ReservationModel.find({ user: userId });
  
      return res.status(200).json({
        message: 'Customer reservations retrieved successfully',
        reservations,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  // Get a report of all reservations
  export const getReservationReport = async (req, res) => {
    res.json("");
  };
  