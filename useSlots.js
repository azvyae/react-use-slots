import React, { useMemo } from "react";
const useSlots = (componentChildren) => {
    const slots = useMemo(() => {
        var _a;
        let children = componentChildren;
        if ((componentChildren === null || componentChildren === void 0 ? void 0 : componentChildren.type) === React.Fragment) {
            children = componentChildren.props.children;
        }
        children = Array.isArray(children) ? children : [children];
        const collector = {
            general: [],
        };
        for (const child of children) {
            const slotName = ((_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.slot) || "general";
            if (!collector[slotName]) {
                collector[slotName] = [];
            }
            collector[slotName].push(child);
        }
        return collector;
    }, [componentChildren]);
    const slot = (name = "", defaultChildren = []) => {
        var _a;
        const children = !name ? slots.general : (_a = slots[name]) !== null && _a !== void 0 ? _a : defaultChildren;
        return React.createElement(React.Fragment, {}, children);
    };
    const hasSlotFunction = (slot) => {
        return slots.hasOwnProperty(slot) && slots[slot].length > 0;
    };
    return [slot, hasSlotFunction];
};
export default useSlots;
