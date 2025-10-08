import Graphviz from 'graphviz-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';

import { ErrorBoundary } from "react-error-boundary";
import { Button, Sidebar, TextInput } from "flowbite-react";
import { PiGraphBold } from 'react-icons/pi';
import { TbBrandMatrix } from 'react-icons/tb';
import { ToastContainer, toast } from 'react-toastify';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import 'react-toastify/dist/ReactToastify.css';


import { Graph } from '../../structures/graph';
import { SideBarCustomTheme } from '../../Themes/sideBarTheme';

import "./styles.css"

const GraphGrapher = () => {
    const notify = (msg) => toast.info(msg);
    const [vertex, setVertex] = useState("")
    const [edgeA, setEdgeA] = useState("")
    const [edgeB, setEdgeB] = useState("")

    const DEFAULTGRAPH = `digraph DotGraph {\n\trankdir=LR;\n\tnode [shape=circle];\n}`

    const selectTree = (index) => {
        if (index === 0) {
            GRAPH.current = new Graph()
            setDotGraph(DEFAULTGRAPH)
            notify("Graph By adjacency Lists")
            return
        }
        if (index === 1) {
            GRAPH.current = new Graph()
            setDotGraph(DEFAULTGRAPH)
            notify("Graph By Matrix")
            return
        }
    }
    const [dotGraph, setDotGraph] = useState(DEFAULTGRAPH)
    const GRAPH = useRef(null);
    const insertVertex = () => {

        if (!vertex.trim()) {
            notify("You have to enter a  vertex name.")
            return;
        }
        GRAPH.current.addVertex(vertex)
        GRAPH.current.dotGraph()
        setDotGraph(`digraph DotGraph {\n\trankdir=LR;\n\tnode [shape=circle];\n\t` + GRAPH.current.dot + "\n}"
        )
        setVertex("")
    }

    const insertEdge = () => {

        if (!edgeA.trim()&&!edgeB.trim()) {
            notify("You have to enter the vertex names.")
            return;
        }
        GRAPH.current.addEdge((edgeA),edgeB)
        GRAPH.current.dotGraph()
        setDotGraph(`digraph DotGraph {\n\trankdir=LR;\n\tnode [shape=circle];\n\t` + GRAPH.current.dot + "\n}"
        )
        setEdgeA("")
        setEdgeB("")
    }
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
        <div className="flex pt-3 h-[80%] bg-blue-900 min-h-0">
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
            {/* Sidebar hidden on small screens */}
            <Sidebar aria-label="Default sidebar example" theme={SideBarCustomTheme} className='hidden sm:block w-1/5'>
                <Sidebar.Items >
                    <Sidebar.ItemGroup className="bg-gray-900 text-white">
                        <Sidebar.Item href="#" icon={PiGraphBold} className="text-white hover:bg-gray-700" onClick={() => { selectTree(0) }}>
                            By Adj. List
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={TbBrandMatrix} className="text-white hover:bg-gray-700" onClick={() => { selectTree(1) }}>
                            By Matrix
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            <div className='flex-1 min-h-0 w-full sm:w-4/5 gap-2 px-2 flex flex-col' >

                <div className='flex flex-col sm:flex-row pb-px py-0 gap-2'>

                    <TextInput sizing="md" onChange={e => setVertex(e.target.value)} value={vertex} className='w-full sm:w-1/5 mr-0 sm:mr-2 ' placeholder='Enter a vertex name'  />

                    <div className='flex gap-2 w-full sm:w-auto'>
                        <Button size="md" onClick={insertVertex} className='flex-1 sm:flex-none focus:bg-cyan-800 focus:ring-1 focus:ring-cyan-300 ' gradientDuoTone="cyanToBlue" >
                            Add Vertex
                        </Button>
                        <Button size="md" onClick={clear} className='flex-1 sm:flex-none bg-white hover:text-black focus:ring-1 focus:ring-cyan-300 ' outline gradientDuoTone="white" >
                            Clear
                        </Button>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-2'>
                    <div className='w-full sm:w-1/3 text-white'>Enter a Source</div>
                    <div className='w-full sm:w-1/3 text-white'>Enter a Destination</div>
                </div>

                <div className='flex flex-col sm:flex-row gap-2'>
                    <TextInput onChange={e => setEdgeA(e.target.value)} value={edgeA} className='w-full sm:w-1/3 mr-0 sm:mr-2' placeholder='Enter a name' sizing="md" type="text" />

                    <TextInput onChange={e => setEdgeB(e.target.value)} value={edgeB} className='w-full sm:w-1/3 mr-0 sm:mr-2' placeholder='Enter a name' sizing="md" type="text" />

                    <div className='flex w-full sm:w-auto'>
                        <Button size="md" onClick={insertEdge} className='flex-1 sm:flex-none focus:bg-cyan-800 focus:ring-1 focus:ring-cyan-300' gradientDuoTone="cyanToBlue" >
                            Add Edge
                        </Button>
                    </div>
                </div>

                <div className='flex-1 min-h-0 flex flex-col sm:flex-row gap-2 h-full'>
                    <ErrorBoundary fallback={<div className='w-full h-[600px] bg-white rounded-[12px] text-black align-middle content-center'>Something went wrong</div>} onReset={(details) => {
                    }} resetKeys={[dotGraph]}>
                        <div className='flex-1 min-h-0 w-full sm:w-1/2 bg-white rounded-[12px] p-2 overflow-auto h-full'>
                            <Graphviz dot={dotGraph}
                                style={{ height: '100%', width: '100%' }}

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
                    <div className='flex-1 min-h-0 w-full sm:w-1/2 bg_gray-800 rounded-[12px] overflow-auto max-h-screen h-full'>
                        <CodeMirror value={dotGraph} className='w-full h-full' height="100%" onChange={onChange} theme={vscodeDark} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default GraphGrapher;