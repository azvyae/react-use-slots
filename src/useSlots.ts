import React, { useMemo } from "react";
type Slot = (
  name?: string,
  defaultChildren?: React.ReactNode
) => React.ReactElement;
type HasSlotFunc = (slot: string) => boolean;

const useSlots = (componentChildren: any): [Slot, HasSlotFunc] => {
  const slots = useMemo(() => {
    let children = componentChildren;
    if (componentChildren?.type === React.Fragment) {
      children = componentChildren.props.children;
    }
    children = Array.isArray(children) ? children : [children];
    const collector: { [slot: string]: React.ReactNode[] } = {
      general: [],
    };
    for (const child of children) {
      const slotName = child?.props?.slot || "general";
      if (!collector[slotName]) {
        collector[slotName] = [];
      }
      collector[slotName].push(child);
    }
    return collector;
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
