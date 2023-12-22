import React, { useEffect, useState } from "react";
import { DataType, EventType } from "../../utils/types";
import Event from "../event-item";
import { flatten } from "../../utils";
import "./styles.css";

const data: DataType = {
    id: "xyz",
    events: [],
    children: [
        {
            id: "abc",
            events: [],
            children: [
                {
                    id: "qwe",
                    events: [
                        {
                            id: "abc",
                            city: "london",
                            price: 130,
                        },
                        {
                            id: "def",
                            city: "San Francisco",
                            price: 500,
                        },
                        {
                            id: "ghi",
                            city: "Los Angeles",
                            price: 115,
                        },
                    ],
                },
            ],
        },
    ],
};

const Events = () => {
    const [events, setEvents] = useState<Array<EventType>>([]);
    const [filters, setFilters] = useState([
        {
            label: "City",
            value: "city",
        },
        {
            label: "ID",
            value: "id",
        },
    ]);

    const [selectedParams, setSelectedParams] = useState<string>("city");
    const [query, setQuery] = useState<string>("");
    const [sort, setSort] = useState<Boolean>(false);
    useEffect(() => {
        setEvents(flatten(data));
    }, []);

    useEffect(() => {
        let filteredData = flatten(data);
        filteredData = filteredData.filter(item => {
            return item[selectedParams as keyof EventType].toString().toLowerCase().startsWith(query.toLowerCase());
        });

        if (sort) filteredData = filteredData.sort((a, b) => a.price - b.price);

        setEvents(filteredData);
    }, [selectedParams, sort, query]);

    return (
        <div>
            <div className="fillters">
                <div>
                    <label>
                        <input
                            type="checkbox"
                            id="sort"
                            name="sort"
                            onChange={() => {
                                setSort(!sort);
                            }}
                        />
                        {"Sort By Price"}
                    </label>
                </div>

                <div>
                    <label>
                        Please select filter
                        <select
                            value={selectedParams}
                            onChange={e => setSelectedParams(e.target.value)}
                            name="fillters">
                            {filters.map(item => {
                                return <option value={item.value}>{item.label}</option>;
                            })}
                        </select>
                    </label>
                </div>
            </div>
            <input
                type="search"
                onChange={e => {
                    setQuery(e.target.value);
                }}></input>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(item => {
                        return <Event id={item.id} city={item.city} price={item.price} />;
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Events;
