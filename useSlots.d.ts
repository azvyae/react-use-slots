import React from "react";
type Slot = (name?: string, defaultChildren?: React.ReactNode) => React.ReactElement;
type HasSlotFunc = (slot: string) => boolean;
declare const useSlots: (componentChildren: React.ReactNode) => [Slot, HasSlotFunc];
export default useSlots;
