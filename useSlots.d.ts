import React from "react";
type Slot = (name?: string, defaultChildren?: React.ReactNode) => React.ReactElement;
type HasSlotFunc = (slot: string) => boolean;
declare const useSlots: (componentChildren: any) => [Slot, HasSlotFunc];
export default useSlots;
