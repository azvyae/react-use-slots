import React from "react";

interface Props {
  name?: string;
  children?: React.ReactNode;
}

type Slot = (props: Props) => React.ReactElement;
type HasSlotFunc = (slot: string) => boolean;

const useSlots = (componentChildren: React.ReactNode): [Slot, HasSlotFunc] => {
  const slots = React.Children.toArray(componentChildren).reduce(
    (collector: { [key: string]: React.ReactElement[]; }, child) => {
      let slotName = "general";

      if (React.isValidElement(child)) {
        slotName = child.props.slot ?? "general";
      }

      if (!collector[slotName]) {
        collector[slotName] = [];
      }

      if (React.isValidElement(child)) {
        collector[slotName].push(child);
      } else {
        child = React.createElement(child.toString());
      }

      return collector;
    },
    { general: [] }
  );

  const slot: Slot = ({ name = "", children: defaultChildren = [] }) => {
    const children = !name ? slots.general : slots[name] ?? defaultChildren;

    return React.createElement(React.Fragment, null, children);
  };

  const hasSlotFunction: HasSlotFunc = (slot: string) => {
    return slots.hasOwnProperty(slot) && slots[slot].length > 0;
  };

  return [slot, hasSlotFunction];
};

export default useSlots;
