import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useEffect } from "react";
export default function CurrentUser({ children }: { children: any }) {
    const dispatch = useDispatch();
    const fetchCurrentUser = async () => {
        try {
            const currentUser = await client.profile();
            console.log("cached in current user reducer", currentUser);
            dispatch(setCurrentUser(currentUser));
        } catch (error) {
            console.log("error fetching current user reducer initial");
            dispatch(setCurrentUser(null));
        }
    };
    useEffect(() => {
        fetchCurrentUser();
    }, []);
    return children;
}
