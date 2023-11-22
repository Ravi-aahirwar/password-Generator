import React, { useState, useCallback,useEffect,useRef} from 'react'

export default function PasswordGenrProj() {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAlowed] = useState(false);

    const [password, setPassword] = useState("");
    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if (numberAllowed) str += '0123456789'
        if (charAllowed) str += "!@#$$%^&*()_+`~;:-"
        for (let i = 1; i <=length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char);
        }
        setPassword(pass)},
        [length, numberAllowed, charAllowed,setPassword]);

        const copyToClipBoard = useCallback(()=>{
            passwordRef.current?.select();
            passwordRef.current?.setSelectionRange(0,101);
            window.navigator.clipboard.writeText(password);
        },
        [password])

        useEffect(()=>{
                passwordGenerator();
        },[length,numberAllowed,charAllowed,passwordGenerator])

    return (
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700' >
            <h1 className='text-white text-center my-3'>Password generator</h1>
            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                <input type="text" value={password}
                    className='outline-none w-full py-1 px-3'
                    placeholder='passwword'
                    readOnly
                    ref={passwordRef}
                />
                <button
                onClick={copyToClipBoard}
                className='outline-none bg-blue-700 hover:bg-blue-800 duration-200
                 text-white px-3 
                py-0.5 shrink-0'

                 >Copy</button>
            </div>
            <div className='flex text-sm gap-x-2' >
                <div className='flex items-center gap-x-1'>
                    <input type="range"
                    min={6}
                    max={100}
                    value={length}
                    className='cursor-pointer '
                    onChange={(event)=>{setLength(event.target.value)}}
                    />
                    <label>Length: {length} </label>
                </div>
                <div className='flex items-center gap-x-1'>
                    <input type="checkbox"
                    defaultChecked ={numberAllowed}
                    id='numberInput'
                    onChange={()=>{
                        setNumberAllowed((prev) => !prev);
                    }}
                    />
                    <label>Numbers</label>
                </div>
                <div className='flex items-center gap-x-1'>
                    <input type="checkbox"
                    defaultChecked ={charAllowed}
                    id='characterInput'
                    onChange={()=>{
                        setCharAlowed((prev) => !prev);
                    }}
                    />
                    <label>Characters </label>
                </div>
            </div>
        </div>
    )
}
