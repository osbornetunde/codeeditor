import * as esbuid from 'esbuild-wasm'
import React, { useState, useEffect, useRef } from 'react';
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";


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
        // ref.current.build({define:{'process.env.NODE_ENV' : '"production"'}})
        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(input)],
            define: {
                global : 'window',
                [process.env.NODE_ENV] : '"production"',
            },
        })

        // console.log(result)
        setCode(result.outputFiles[0].text)
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