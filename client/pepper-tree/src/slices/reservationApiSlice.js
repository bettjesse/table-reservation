// import { apiSlice } from './apiSlice';

// export const reservationApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Existing endpoints...

//     createReservation: builder.mutation({
//       query: (data) => ({
//         url: "/api/reservations",
//         method: 'POST',
//         body: data,
//         credentials: 'include',
//       }),
//     }),

//     getMyReservations: builder.query({
//       query: () => ({
//         url: "/api/my-reservations",
//         method: 'GET',
//         credentials: 'include',
//       }),
//     }),
//   }),
// });

// export const {
  
  

//   useCreateReservationMutation,
//   useGetMyReservationsQuery,
// } = reservationApiSlice;

import { apiSlice } from './apiSlice';

export const reservationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing endpoints...

    createReservation: builder.mutation({
      query: (data) => ({
        url: "/api/reservations",
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),

    getMyReservations: builder.query({
      query: () => ({
        url: "/api/my-reservations",
        method: 'GET',
        credentials: 'include',
      }),
    }),

    updateReservation: builder.mutation({
      query: ({ reservationId, ...data }) => ({
        url: `/api/reservations/${reservationId}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useGetMyReservationsQuery,
  useUpdateReservationMutation, // Export the new mutation
} = reservationApiSlice;


