import * as esbuid from 'esbuild-wasm'
import React, { useState, useEffect, useRef } from 'react';


const App = () => {
    const ref = useRef<any>(null);
    const  [input, setInput ] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
       ref.current = await esbuid.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        })

    }
    useEffect(() =>{
        startService();
    },[])
    const onClick= async () => {
        if(!ref.current){
            return;
        }
        const result = await ref.current.transform(input, {
            loader:'jsx',
            target:'es2015'
        })
        setCode(result.code)
    }
    return(
        <div>
            <textarea value={input} onChange={e => setInput(e.target.value)}/>
                <div>
                    <button onClick={onClick}>Submit</button>
                </div>
                <pre>{code}</pre>
        </div>
    )
}

export default App;