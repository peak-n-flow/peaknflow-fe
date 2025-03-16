import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "../service";
import { TransactionRequest } from "../types";

const useCreateTransaction = () => {
  return useMutation({
    mutationFn: createTransaction,
    
  });
};

export default useCreateTransaction;
