import { useMutation } from "@tanstack/react-query";
import { TransactionRequest } from "../types";
import { createAdminTransaction } from "../service";

const useCreateAdminTransaction = () => {
    return useMutation({
        mutationFn: createAdminTransaction,

    });
};

export default useCreateAdminTransaction;
