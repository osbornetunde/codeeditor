import React, {useState} from 'react';
import CodeEditor from "./components/codeeditor";
import Preview from "./components/preview";
import bundle from './bundler';

const App = () => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');

    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);
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