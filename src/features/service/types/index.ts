export interface SubService {
  title: string;
  description: string;
}

export interface BookingListResponse {
  gym: Gym;
  service: Service;
  service_bookings: ServiceBookings;
}

export type ServiceBookings = Record<string, Booking[]>;

export interface Booking {
  id: string;
  start_at: string;
  end_at: string;
  status: "booked" | "closed";
}
