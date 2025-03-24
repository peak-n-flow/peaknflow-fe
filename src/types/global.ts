interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone_number: string;
}

interface Gym {
  id: string;
  name: string;
  description: string;
  open_at: string;
  close_at: string;
  status: string;
  created_at: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration_in_minutes: number;
  created_at: string;
  slot: number;
}

interface ErrorAPI {
  message: string;
  status: number;
}

interface DecodedJWT {
  user_id: string;
  role: string;
}

interface Meta {
  total_data: number;
  total_page: number;
  page: number;
  limit: number;
}

interface Transaction {
  id: string;
  code: string;
  user_name: string;
  user_email: string;
  user_phone_number: string;
  gym_name: string;
  service_name: string;
  service_price: string;
  service_start_at: string;
  service_end_at: string;
  raw_price: string;
  final_price: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
  voucher_code: string;
}

interface Window {
  snap: {
    pay: (token: string, options: any) => void;
  };
}
