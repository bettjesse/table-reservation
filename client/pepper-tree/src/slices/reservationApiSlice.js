

import { apiSlice } from './apiSlice';

export const reservationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing endpoints...

    createReservation: builder.mutation({
      query: (data) => ({
        url: "/api/reservation",
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    checkTableAvailability: builder.mutation({
      query: (data) => ({
        url: "/api/table-availability",
        method: "POST",
        body: data,
        credentials: "include",
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
    cancelReservation: builder.mutation({
      query: (reservationId) => ({
        url: `/api/reservations/${reservationId}/cancel`,
        method: 'PUT',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useGetMyReservationsQuery,
  useUpdateReservationMutation, 
  useCancelReservationMutation,
  useCheckTableAvailabilityMutation
} = reservationApiSlice;


