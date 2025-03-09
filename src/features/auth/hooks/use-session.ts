import { useQuery } from "@tanstack/react-query";
import { getSession } from "../services";

const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSession, // Pastikan ini tidak menerima parameter
    staleTime: 1000 * 60 * 5, // Cache session for 5 minutes
    retry: false, // Disable retry on error
  });
};

export default useSession;
