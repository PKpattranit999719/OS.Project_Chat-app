import { createContext, useState, useEffect } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChat] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatError] = useState(null);

        useEffect(() =>{
            const getUserChats = async()=>{
                if(user?._id){
                    setIsUserChatsLoading(true);
                    setUserChatError(null);

                    const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

                    setIsUserChatsLoading(false);

                    if(response.error){
                        return setUserChatError(response);
                    }

                    setUserChat(response);
                }
            };

            getUserChats();
        }, [user])

    return (
        <ChatContext.Provider
            value={{
                userChats,isUserChatsLoading,userChatsError,
            }}
            >
                {children}
        </ChatContext.Provider>
    );
;}