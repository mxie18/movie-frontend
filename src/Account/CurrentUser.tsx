import * as client from "./client";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useEffect } from "react";
export default function CurrentUser({ children }: { children: any }) {
    const dispatch = useDispatch();
    const fetchCurrentUser = async () => {
        try {
            const currentUser = await client.profile();
            console.log("cached in current user reducer", currentUser);
            dispatch(setCurrentUser(currentUser));
            // dispatch(setImage("KLASDKJASLDJALSJDKLA"));
        } catch (error) {
            console.log("error fetching current user reducer initial");
            dispatch(setCurrentUser(null));
        }
    };

    // const { currentUser, image } = useSelector((state: any) => state.user);

    // console.log("here", currentUser, image);

    useEffect(() => {
        fetchCurrentUser();
    }, []);
    return children;
}
