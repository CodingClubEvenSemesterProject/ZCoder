import {useState} from 'react'
import Editor from '@monaco-editor/react'
const CodeEditor = ()=>{

    const [code , setCode]=useState("");
    const [lang , setLang]=useState("cpp")

    

    return(<>
        <div className="CodeEditor-wrapper">
            <div className="lang-selector-wrapper">
                <button className="lang-btn" style={{background:lang==='java' ? "black":"white" , color:lang==='java' ? "white":"black"}} onClick={e=>{setLang('java')}}>Java</button>
                <button className="lang-btn" style={{background:lang==='python' ? "black":"white" , color:lang==='python' ? "white":"black"}} onClick={e=>{setLang('python')}}>Python</button>
                <button className="lang-btn" style={{background:lang==='cpp' ? "black":"white" , color:lang==='cpp' ? "white":"black"}} onClick={e=>{setLang('cpp')}}>C++</button>
            </div>
            <div className="code-space">
                <Editor 
                theme='vs-dark'
                height="80vh"
                defaultLanguage={lang}
                defaultValue=''
                onChange={e=>{
                    setCode(e)
                    console.log(code)
                }}/>
            </div>
            <div className='result-btn-wrapper'>
                <button>Run & Compile</button>
            </div>
            <div className='terminal-box' style={{height:"20vh" , background:"#10100e"}}>
            
            </div>
        </div>
    </>)
}

export default CodeEditor