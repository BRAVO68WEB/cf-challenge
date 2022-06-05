import React, { useEffect, useRef, useState } from "react";
import { Copy, Lock, Save } from "react-feather";
import { FireIcon } from "@heroicons/react/solid";
import WriteStyle from "./Write.style";
import Modal from "./Modal";
import LockModal from "./LockModal";
import Axios from "helpers/Axios";

function Write(props) {
    const [value, setValue] = useState("");
    const [count, setCount] = useState(1);
    const [modal, setModal] = useState(false);
    const [lockModal, setLockModal] = useState(false);

    function handleValueChange(evt) {
        const text = evt.target.value;
        const lines = text.split("\n");
        const count = lines.length;
        const textArea = document.querySelector("textarea");
        textArea.style.height = textArea.scrollHeight + "px";
        setCount(count);
        setValue(text);
    }
    function onLock() {
        
    }
    async function onSave() {
        await Axios.post("/add", { data: value })
            .then(async function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function onCopy() {}
    useEffect(() => {}, []);
    return (
        <WriteStyle className={"w-screen h-screen flex justify-center items-center "}>
            <div className="writer  bg-amber-50 border-4 border-black rounded-lg ">
                <div className="heading flex justify-center items-center w-full p-4 bg-amber-100 rounded-t-lg text-black text-xl font-bold relative">
                    <div className="controls flex absolute left-5">
                        <div className="bg-red-300 shadow h-5 w-5 rounded-full"></div>
                        <div className="bg-yellow-400 shadow ml-2 h-5 w-5 rounded-full"></div>
                    </div>
                    <p>WorkerBin</p>
                </div>
                <div className="main">
                    <div className="controls-text w-full flex items-center p-5">
                        <button
                            className="edit p-2 mx-2 rounded-full text-black bg-amber-100 shadow"
                            onClick={() => {
                                setLockModal(true);
                            }}
                        >
                            <Lock />
                        </button>
                        <button
                            className="edit p-2 mx-2 rounded-full text-black bg-amber-100 shadow"
                            onClick={onSave}
                        >
                            <Save />
                        </button>
                        <button
                            className="edit p-2 mx-2 rounded-full text-black bg-amber-100 shadow"
                            onClick={onCopy}
                        >
                            <Copy />
                        </button>
                        <button
                            className="edit p-2 mx-2 rounded-full text-black bg-amber-100 shadow"
                            onClick={() => {
                                setModal(true);
                            }}
                        >
                            <FireIcon className="h-6 w-5 text-black-1000" />
                        </button>
                    </div>
                    <div className="editor">
                        <div className="line-number bg-gray-50 border-l-0 border-b-0 border-2 p-2 text-center text-black">
                            {Array.from(Array(count).keys()).map((value, index) => {
                                return <div key={value}>{value + 1}</div>;
                            })}
                        </div>
                        <div className="text-editor">
                            <textarea
                                onChange={handleValueChange}
                                value={value}
                                name="content"
                                id="text-area"
                                className={
                                    "focus:outline-none border-2 focus:border-black h-full w-full bg-transparent text-black outline-none p-2 resize-none"
                                }
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={modal} setOpen={setModal} />
            <LockModal open={lockModal} setOpen={setLockModal} />
        </WriteStyle>
    );
}

export default Write;
