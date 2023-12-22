export type EventType = {
    id: string;
    city: string;
    price: number;
};

export type DataType = {
    id: string;
    events: Array<EventType>;
    children?: Array<DataType>;
};
