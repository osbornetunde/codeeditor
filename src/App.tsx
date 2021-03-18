import * as esbuid from 'esbuild-wasm'
import React, {useState, useEffect, useRef} from 'react';
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";
import {fetchPlugin} from "./plugins/fetch-plugin";
import CodeEditor from "./components/codeeditor";
import Preview from "./components/preview";


const App = () => {
    const ref = useRef<any>(null);
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');

    const startService = async () => {
        ref.current = await esbuid.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })

    }
    useEffect(() => {
        startService();
    }, [])
    const onClick = async () => {
        if (!ref.current) {
            return;
        }


        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                global: 'window',
                "process.env.NODE_ENV": JSON.stringify('production'),
            },
        })
        setCode(result.outputFiles[0].text)
    }


    return (
        <div>
            <CodeEditor initialValue="const a = 1" onChange={value => setInput(value)}/>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code} />
        </div>
    )
}

export default App;