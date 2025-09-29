import type { RootState } from "@/core/presentation/store";


export const selectClientDatabase = (state: RootState) => state.clientDatabase.clientDatabase;
