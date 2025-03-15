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

export interface TransactionRequest {
  service_id: string;
  start_at: string;
  end_at: string;
  payment_method: string;
  user_name: string;
  user_email: string;
  user_phone_number: string;
}

export interface Payment {
  code: string;
  total_price: string;
  payment_method: string;
  expire_at: string;
  qr_code_url: string;
  va_number: string;
}
