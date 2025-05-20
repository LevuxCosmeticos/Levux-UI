import { CycleBalanceUpdateRequest } from './CycleBalanceUpdateRequest';

export interface CycleUpdateRequest {
    customerId: number;
    cycleNumber: number;
    cycleBalanceUpdates: CycleBalanceUpdateRequest[];
}