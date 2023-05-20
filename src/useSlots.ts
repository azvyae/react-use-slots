import React, { useMemo } from "react";

type Slot = (name?: string, defaultChildren?: React.ReactNode) => React.ReactElement;
type HasSlotFunc = (slot: string) => boolean;

const useSlots = (componentChildren: React.ReactNode): [Slot, HasSlotFunc] => {
  const slots = useMemo(() => {
    return React.Children.toArray(componentChildren).reduce(
      (collector: { [key: string]: React.ReactNode[]; }, child) => {
        let slotName = "general";

        if (React.isValidElement(child)) {
          slotName = child.props.slot || "general";
        }

        if (!collector[slotName]) {
          collector[slotName] = [];
        }

        collector[slotName].push(child);

        return collector;
      },
      { general: [] }
    );
  }, [componentChildren]);

  const slot: Slot = (name = "", defaultChildren = []) => {
    const children = !name ? slots.general : slots[name] ?? defaultChildren;

    return React.createElement(React.Fragment, {}, children);
  };

  const hasSlotFunction: HasSlotFunc = (slot: string) => {
    return slots.hasOwnProperty(slot) && slots[slot].length > 0;
  };

  return [slot, hasSlotFunction];
};

export default useSlots;
