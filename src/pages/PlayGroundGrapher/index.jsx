import Graphviz from 'graphviz-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';

import { ErrorBoundary } from "react-error-boundary";
import { Button } from "flowbite-react";

import { ToastContainer, toast } from 'react-toastify';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import 'react-toastify/dist/ReactToastify.css';


import { Graph } from '../../structures/graph';




const PlayGroundGrapher = () => {
    const notify = (msg) => toast.info(msg);

    const DEFAULTGRAPH = `digraph DotGraph {\n\trankdir=LR;\n\tnode [shape=circle];\n}`
    const [dotGraph, setDotGraph] = useState(DEFAULTGRAPH)
    const GRAPH = useRef(null);



    useEffect(() => {
        GRAPH.current = new Graph();
    }, [])

    const clear = () => {
        GRAPH.current.clear();
        notify("Graph clean")
        setDotGraph(DEFAULTGRAPH)
    }

   
    const onChange = useCallback((val, viewUpdate) => {
        setDotGraph(val);
    }, []);

    return (
        <div class="flex pt-3 h-[90%] flex-wrap">
             <ToastContainer position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

            />
            <div className='w-[100%] gap-2 px-2 my-2 ml-5 flex flex-col  ' >
                <div className='flex  pb-px' >

                    <div className='w-1/5 mr-2 text-xl font-bold' >
                        Try your own graphs
                    </div>

                </div>
                <div className='flex  pb-px py-0 '  >
                    <Button size="md" onClick={clear} className='w-[10%] bg-white hover:text-black focus:ring-1 focus:ring-cyan-300 ' outline gradientDuoTone="white" >
                        Clear
                    </Button>
                </div>
                

            </div>
            <div className='flex flex-row gap-2 ml-5 w-[95%]'>
                    <CodeMirror value={dotGraph} className='w-[50%]' height="100%" onChange={onChange} theme={vscodeDark} />
                    <ErrorBoundary fallback={<div className='w-full h-[600px] bg-white rounded-[12px] text-black align-middle content-center'>Something went wrong</div>} onReset={(details) => {

                    }} resetKeys={[dotGraph]}>
                        <div className='w-[50%] w-min-[50%]  h-[600] h-min-[50%] bg-white rounded-[12px] '>
                            <Graphviz dot={dotGraph}

                                options={{
                                    //fit: true,
                                    tweenPaths: true,
                                    tweenShapes: true,
                                    growEnteringEdges: true,
                                    height: 600,
                                    //maxWidth: "95%",
                                    width: "95%",
                                    //zoom: true,
                                    engine: "dot",
                                }}

                            />
                        </div>

                    </ErrorBoundary>
                    
                </div>
        </div>
    );
}

export default PlayGroundGrapher;