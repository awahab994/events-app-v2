import { DataType, EventType } from "./types";

const flatten = (data: DataType): Array<EventType> => {
    let events: Array<EventType> = [...data.events];
    if (!data.children) return events;
    data.children.forEach(item => {
        const itemEvents = flatten(item);
        events.push(...itemEvents);
    });
    return events;
};

export { flatten };
