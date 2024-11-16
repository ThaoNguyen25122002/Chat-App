import { useState } from "react";

export const EventBusContext = React.createContext();
export const EventBusProvider = ({ children }) => {
    const [events, setEvents] = useState({});
};
