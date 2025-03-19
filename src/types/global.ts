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
