import axios from "axios";

const USERS_API = `${process.env.REACT_APP_SERVER_URL}/api/users`;

export const register = async (user: any) => {
    const response = await axios.post(`${USERS_API}`, user);
    return response.data;
};
