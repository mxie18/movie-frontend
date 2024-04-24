import axios from "axios";

const USERS_API = `${process.env.REACT_APP_SERVER_URL}/api/users`;

const axiosWithCreds = axios.create({
    withCredentials: true,
});

export const register = async (user: any) => {
    const response = await axiosWithCreds.post(`${USERS_API}/register`, user);
    return response.data;
};

export const signin = async (user: any) => {
    const response = await axiosWithCreds.post(`${USERS_API}/signin`, user);
    return response.data;
};

export const profile = async () => {
    const response = await axiosWithCreds.get(`${USERS_API}/profile`);
    return response.data;
};

export const otherProfile = async (userId: string) => {
    const response = await axiosWithCreds.get(`${USERS_API}/profile/${userId}`);
    return response.data;
};

export const signout = async () => {
    const response = await axiosWithCreds.get(`${USERS_API}/signout`);
    return response.data;
};

export const createUser = async (user: any) => {
    const response = await axiosWithCreds.post(`${USERS_API}`, user);
    return response.data;
};

export const updateUser = async (user: any) => {
    const response = await axiosWithCreds.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const deleteUser = async (user: any) => {
    const response = await axiosWithCreds.delete(`${USERS_API}/${user._id}`);
    return response.data;
};

export const findMoviesLikedByUser = async (userId: string) => {
    const response = await axiosWithCreds.get(
        `${USERS_API}/${userId}/movies/likes`
    );
    return response.data;
};

export const findShowsLikedByUser = async (userId: string) => {
    const response = await axiosWithCreds.get(
        `${USERS_API}/${userId}/shows/likes`
    );
    return response.data;
};

export const findAllUsers = async () => {
    const response = await axiosWithCreds.get(`${USERS_API}`);
    return response.data;
};

export const followUser = async (user: any) => {
    const response = await axiosWithCreds.post(`${USERS_API}/follow`, user);
    return response.data;
};

export const unfollowUser = async (userId: string) => {
    const response = await axiosWithCreds.delete(
        `${USERS_API}/unfollow/${userId}`
    );
    return response.data;
};

export const findFollowers = async (userId: string) => {
    const response = await axiosWithCreds.get(
        `${USERS_API}/${userId}/followers`
    );
    return response.data;
};

export const findFollowing = async (userId: string) => {
    const response = await axiosWithCreds.get(
        `${USERS_API}/${userId}/following`
    );
    return response.data;
};
