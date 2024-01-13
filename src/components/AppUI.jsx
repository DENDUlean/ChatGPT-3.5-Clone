import Logo from "./Logo";
import { FaPlus } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useState, useEffect } from "react";

const AppUI = () => {

    const [value, setValue] = useState(null)
    const [message, setMessage] = useState(null);
    const [previousChats, setPreviousChats] = useState([]);
    const [currentTitle, setCurrentTitle] = useState(null);

    const createNewChat = () => {
        setMessage(null)
        setValue(null)
        setCurrentTitle(null)
    }

    const handleClick = (uniqueTitle) => {
        setCurrentTitle(uniqueTitle)
        setMessage(null)
        setValue(null)
    }

    const getMessages = async () => {
        const options = {
            method: "POST",
            body: JSON.stringify({
                message: value
            }),
            headers: {
                "Content-Type" : "application/json"
            }
        }
        try{
            const response = await fetch('http://localhost:8000/completions', options);
            const data = await response.json()
            setMessage(data.choices[0].message);
        } catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        console.log(currentTitle, value, message)
        if(!currentTitle && value && message) {
            setCurrentTitle(value)
        }
        if(currentTitle && value && message){
            setPreviousChats(prevChats => (
                [...prevChats, {
                    title: currentTitle,
                    role: "user",
                    content: value    
                }, {
                    title: currentTitle,
                    role: message.role,
                    content: message.content
                }]
            ))
        }
    }, [message, currentTitle]);

    console.log(previousChats);

    const currentChat = previousChats.filter(previousChats => previousChats.title == currentTitle);
    const uniqueTitles = Array.from( new Set(previousChats.map(previousChats => previousChats.title)));
    console.log(uniqueTitles);



    return (
        <div className="flex w-full">
            
            <aside className="text-white w-72 bg-asside flex flex-col items-center p-5 gap-7 h-screen">
                <Logo />
                
                <div className="flex justify-start w-full">
                    <button className="border text-slate-300 flex justify-center items-center gap-1 w-32 h-12 rounded-md bg-transparent" onClick={createNewChat}>
                        <FaPlus size={12}/> New Chat
                    </button>
                </div>

                <div className="w-full">
                    
                    <ul className=" w-11/12 flex flex-col gap-3">
                        
                        {
                            uniqueTitles?.map((uniqueTitle, index) => 
                                <li className="text-sm text-white bg-send-color p-2 rounded-md cursor-pointer capitalize" 
                                    key={index} 
                                    onClick={() => handleClick(uniqueTitle)}>
                                    {uniqueTitle}
                                </li>
                        )}

                    </ul>
                
                </div>

            </aside>
            
            <div className="flex flex-col items-center justify-center bg-chatbox h-screen w-full">
                
                <h1 className="text-white text-3xl mb-1">ChatGPT 3.5</h1>

                <div className="w-9/12 h-5/6 flex flex-col items-center justify-between">

                    <div className="flex flex-col w-full items-center gap-4 overflow-hidden overflow-y-scroll scroll-smooth scrollbar">

                        <div className="flex flex-col justify-start text-justify gap-5 p-5 rounded-md w-9/12 mb-3">
                            {currentChat.map((chatMessage, index) => 
                            <li key={index} className="w-full bg-user-color list-none flex flex-col gap-4 rounded p-4">
                                <div className="">
                                    <p className="text-white text-sm">{chatMessage.role}</p>
                                </div>
                                <p className="text-white text-sm">{chatMessage.content}</p>
                            </li>
                            )}
                        </div>

                    </div>

                </div>

                <div className="flex items-center justify-center gap-3 p-3 w-7/12 rounded-md bg-send-color mb-0">
                    
                    <input type="text" placeholder="Send a message..." value={value} onChange={(e) =>setValue(e.target.value)} className="w-full bg-transparent outline-none text-white"/>
                    
                    <button onClick={getMessages}>
                        <IoMdSend className="text-white bg-transparent" size={15}/>
                    </button>
                    
                </div>


                <p className="text-white text-xs font-extralight mt-2">ChatGPT may produce inaccurate information about people , places, or facts.</p>
            </div>

        </div>
    )
}

export default AppUI;