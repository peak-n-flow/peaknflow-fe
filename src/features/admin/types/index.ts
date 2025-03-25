export interface EventRequest {
  name: string;
  price: number;
  slot: number;
  start_time: string;
  end_time: string;
  start_date: string;
  end_date: string;
  is_event: boolean;
}

export interface ServiceRequest {
  gym_id: string;
  name: string;
  description: string;
  price: number;
  duration_in_minutes: number;
  slot: number;
}
