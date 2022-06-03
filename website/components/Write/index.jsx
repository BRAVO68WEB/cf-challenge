import React, {useEffect, useRef, useState} from 'react';
import {Copy, Edit, Lock, Save, Trash} from "react-feather";

function Write(props) {
    const [value,setValue] = useState("");
    const [count,setCount] = useState(1)
    function handleValueChange(evt){
        const text = evt.target.value;
        const lines = text.split("\n");
        const count = lines.length;
        setCount(count)
        setValue(text)
    }
    useEffect(() => {
    },[])
    return (
        <div className={"w-screen h-screen flex justify-center items-center "}>
            <div className="writer w-2/3 h-4/5 bg-amber-50 border-4 border-black rounded-lg flex flex-col ">
                <div className="heading flex justify-center items-center w-full p-4 bg-amber-100 rounded-t-lg text-black text-xl font-bold relative">
                    <div className="controls flex absolute left-5">
                        <div className="bg-red-300 shadow h-5 w-5 rounded-full"></div>
                        <div className="bg-yellow-400 shadow ml-2 h-5 w-5 rounded-full"></div>
                    </div>
                    <p>Pastebin</p>
                </div>
                <div className="main flex-1 flex flex-col">
                    <div className="controls-text w-full flex items-center p-5">
                        <button className="edit p-2 mx-2 rounded-full text-black bg-amber-100 shadow"><Edit /></button>
                        <button className="edit p-2 mx-2 rounded-full text-black bg-amber-100 shadow"><Lock /></button>
                        <button className="edit p-2 mx-2 rounded-full text-black bg-amber-100 shadow"><Save /></button>
                        <button className="edit p-2 mx-2 rounded-full text-black bg-amber-100 shadow"><Trash /></button>
                        <button className="edit p-2 mx-2 rounded-full text-black bg-amber-100 shadow"><Copy /></button>

                    </div>
                    <div className="editor flex w-full flex-1">
                        <div className="line-number h-full w-1/12 border-l-0 border-b-0 border-2 p-2 text-center text-black">
                            {Array.from(Array(count).keys()).map((value,index) => {
                                return <div key={value} >{value+1}</div>
                            })}
                        </div>
                        <div className="text-editor h-full flex-1">
                            <textarea onChange={handleValueChange} name="content" id="text-area" className={"h-full w-full bg-transparent text-black outline-none p-2 resize-none"}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Write;