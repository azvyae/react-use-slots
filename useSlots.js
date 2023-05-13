import React from "react";
const useSlots = (componentChildren) => {
    const slots = React.Children.toArray(componentChildren).reduce((collector, child) => {
        var _a;
        if (!React.isValidElement(child)) {
            return collector;
        }
        const slotName = (_a = child.props.slot) !== null && _a !== void 0 ? _a : "general";
        if (!collector[slotName]) {
            collector[slotName] = [];
        }
        collector[slotName].push(child);
        return collector;
    }, { general: [] });
    const slot = ({ name = "", children: defaultChildren = [] }) => {
        var _a;
        const children = !name ? slots.general : (_a = slots[name]) !== null && _a !== void 0 ? _a : defaultChildren;
        return React.createElement(React.Fragment, null, children);
    };
    const hasSlotFunction = (slot) => {
        return slots.hasOwnProperty(slot) && slots[slot].length > 0;
    };
    return [slot, hasSlotFunction];
};
export default useSlots;
