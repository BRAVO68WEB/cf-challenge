import React, { useEffect, useRef, useState } from "react";
import { Copy, Lock, Save, GitHub } from "react-feather";
import { FireIcon } from "@heroicons/react/solid";
import WriteStyle from "./Write.style";
import Modal from "./Modal";
import Final from "./Final";
// import LockModal from "./LockModal";
import Axios from "helpers/Axios";
import { useRouter } from "next/router";
import { GlobeIcon } from "@heroicons/react/outline";

function Write() {
    const router = useRouter();
    const { key } = router.query;
    const [value, setValue] = useState("");
    const [count, setCount] = useState(1);
    const [modal, setModal] = useState(false);
    const [burnit, setBurnit] = useState(false);
    const [final, setFinal] = useState(false);
    const [storeFinal, setStoreFinal] = useState("");
    const [loading, setLoading] = useState(true);
    // const [lockModal, setLockModal] = useState(false);
    function countLines(value) {
        setCount(value.split("\n").length);
    }
    function handleValueChange(evt) {
        if (key) return;
        const text = evt.target.value;
        countLines(text);
        const textArea = document.querySelector("textarea");
        textArea.style.height = textArea.scrollHeight + "px";
        setValue(text);
    }
    // function setPassword(password) {
    //     console.log(password);
    // }
    function setBurn() {
        setBurnit(!burnit);
    }
    function openGithub(){
        router.push('https://github.com/BRAVO68WEB/cf-challenge');
    }
    async function onSave() {
        await Axios.post("/add", { data: value, readOnce: burnit })
            .then((res) => {
                if (burnit) {
                    console.log(res.data);
                    setStoreFinal(res.data.key);
                    setLoading(false);
                    setFinal(true);
                } else {
                    router.push("/?key=" + res.data.key);
                }
            })
            .catch(function (error) {
                console.log("error");
                console.log(error);
            });
    }
    function onCopy() {
        navigator.clipboard.writeText(value);
    }
    function openIsp() {
        router.push("/isp");
    }
    useEffect(() => {
        if (!key) return;
        Axios.post(`/fetch`, { key: key })
            .then((res) => {
                setValue(res.data.data);
                countLines(res.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [key]);
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
                        {/* <button
                            className="edit p-2 mx-2 rounded-full text-black bg-amber-100 shadow"
                            onClick={() => {
                                setLockModal(true);
                            }}
                            disabled={key ? true : false}
                        >
                            <Lock />
                        </button> */}
                        <button
                            className={
                                "edit p-2 mx-2 rounded-full shadow" +
                                (key ? " bg-amber-50 text-gray-600" : " text-black bg-amber-100")
                            }
                            onClick={onSave}
                            disabled={key ? true : false}
                        >
                            <Save />
                        </button>
                        <button
                            className={
                                "edit p-2 mx-2 rounded-full shadow" +
                                (key ? " bg-amber-50 text-gray-600" : " text-black bg-amber-100")
                            }
                            onClick={() => {
                                setModal(true);
                            }}
                            disabled={key ? true : false}
                        >
                            <FireIcon className="h-6 w-5 text-black-1000" />
                        </button>
                        <button
                            className="edit p-2 mx-2 rounded-full text-black bg-amber-100 shadow"
                            onClick={onCopy}
                        >
                            <Copy />
                        </button>
                        <button
                            className="edit p-2 mx-2 rounded-full shadow text-black bg-amber-100"
                            onClick={openIsp}
                        >
                            <GlobeIcon className="h-6 w-5 text-black-1000"/>
                        </button>
                        <button
                            className="edit p-2 mx-2 rounded-full text-black bg-amber-100 shadow"
                            onClick={openGithub}
                        >
                            <GitHub />
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
            <Modal open={modal} setOpen={setModal} setBurn={setBurn} burnit={burnit} />
            {!loading && <Final open={final} setOpen={setFinal} final={storeFinal} />}
            {/* <LockModal open={lockModal} setOpen={setLockModal} setPassword={setPassword} /> */}
        </WriteStyle>
    );
}

export default Write;
