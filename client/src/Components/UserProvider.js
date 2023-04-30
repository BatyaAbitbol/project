import { useState, useEffect } from "react";
import { UseGetOneById } from "../Hooks/useGetAxios";
import UserContext from "./UserContext";

const UserProvider = ({ children, status, userId }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        if(userId) {
            UseGetOneById(`${status}`, userId)
            .then(res => {
                console.log(res);
                const user = res.data;
                console.log(user);
                setUser(user);
                console.log(user);
            });
        }
    }, [userId])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;