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
        <div className="flex flex-col pt-3 bg-blue-900 min-h-screen">
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
            <div className='flex-1 min-h-0 w-full gap-2 px-4 py-3 flex flex-col'>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2'>
                    <div className='text-xl font-bold text-white'>Try your own graphs</div>
                    <div className='flex gap-2'>
                        <Button size="md" onClick={clear} className='bg-white hover:text-black focus:ring-1 focus:ring-cyan-300 ' outline gradientDuoTone="white" >
                            Clear
                        </Button>
                    </div>
                </div>

                <div className='flex-1 min-h-0 flex flex-col sm:flex-row gap-2'>
                    <div className='flex-1 min-h-0 w-full sm:w-1/2 bg-gray-800 rounded-[12px] overflow-hidden'>
                        <CodeMirror value={dotGraph} className='w-full h-full' height="100%" onChange={onChange} theme={vscodeDark} />
                    </div>
                    <ErrorBoundary fallback={<div className='w-full h-[600px] bg-white rounded-[12px] text-black align-middle content-center'>Something went wrong</div>} onReset={(details) => {

                    }} resetKeys={[dotGraph]}>
                        <div className='flex-1 min-h-0 w-full sm:w-1/2 bg-white rounded-[12px] p-2 overflow-auto'>
                            <Graphviz dot={dotGraph}

                                options={{
                                    //fit: true,
                                    tweenPaths: true,
                                    tweenShapes: true,
                                    growEnteringEdges: true,
                                    height: '100%',
                                    //maxWidth: "95%",
                                    width: "100%",
                                    //zoom: true,
                                    engine: "dot",
                                }}

                            />
                        </div>

                    </ErrorBoundary>

                </div>
            </div>
        </div>
    );
}

export default PlayGroundGrapher;