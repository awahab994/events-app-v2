import React from "react";
import "./styles.css";

interface EventProps {
    id: string;
    city: string;
    price: number;
}

export default function Event({ id, city, price }: EventProps) {
    return (
        <tr>
            <td>{id}</td>
            <td>{city}</td>
            <td>{price}</td>
        </tr>
    );
}
