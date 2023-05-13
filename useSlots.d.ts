import React from "react";
interface Props {
    name?: string;
    children?: React.ReactNode;
}
type Slot = (props: Props) => React.ReactElement;
type HasSlotFunc = (slot: string) => boolean;
declare const useSlots: (componentChildren: React.ReactNode) => [Slot, HasSlotFunc];
export default useSlots;
