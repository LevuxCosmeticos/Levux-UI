import { CycleBalanceResponse } from "./CycleBalanceResponse";

export interface CycleResponse {
    customerId: number;
    customerName: string;
    cycle: number;
    taxId: string;
    balances: CycleBalanceResponse[];
}