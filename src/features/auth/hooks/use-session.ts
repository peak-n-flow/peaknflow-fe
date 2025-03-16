import { useQuery } from "@tanstack/react-query";
import { getSession } from "../services";
import { useSession as UseNextAuthSession } from "next-auth/react";

const useSession = () => {
  const { status } = UseNextAuthSession();
  return useQuery({
    queryKey: ["session"],
    queryFn: getSession, // Pastikan ini tidak menerima parameter
    staleTime: 1000 * 60 * 5, // Cache session for 5 minutes
    retry: false, // Disable retry on error
    enabled: status === "authenticated", // Only fetch when user is authenticated
  });
};

export default useSession;
