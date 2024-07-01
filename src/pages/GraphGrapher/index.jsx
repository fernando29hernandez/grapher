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
        <div class="flex pt-3 h-[90%]">
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
            <Sidebar aria-label="Default sidebar example" theme={SideBarCustomTheme} className='w-1/5'>
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
            <div className='w-4/5 gap-2 px-2 flex flex-col ' >
                <div className='flex  pb-px' >

                    <div className='w-1/5 mr-2' >
                        Enter a vertex name
                    </div>

                </div>
                <div className='flex  pb-px py-0 '  >

                    <TextInput sizing="md" onChange={e => setVertex(e.target.value)} value={vertex} className='w-1/5 mr-2 ' placeholder='Enter a vertex name'  />

                    <Button size="md" onClick={insertVertex} className='w-[10%] mr-2 focus:bg-cyan-800 focus:ring-1 focus:ring-cyan-300 ' gradientDuoTone="cyanToBlue" >
                        Add Vertex
                    </Button>
                    <Button size="md" onClick={clear} className='w-[10%] bg-white hover:text-black focus:ring-1 focus:ring-cyan-300 ' outline gradientDuoTone="white" >
                        Clear
                    </Button>
                </div>
                <div className='flex  pb-px' >
                    <div className='w-1/2 mr-2' >
                        Enter a Source 
                    </div>
                    <div className='w-1/2 mr-2' >
                        Enter a Destination
                    </div>
                    <div className='w-[10%] mr-2' >
                        
                    </div>
                </div>
                <div className='flex  pb-px' >

                    <TextInput onChange={e => setEdgeA(e.target.value)} value={edgeA} className='w-1/2 mr-2' placeholder='Enter a name' sizing="md" type="text" />


                    <TextInput onChange={e => setEdgeB(e.target.value)} value={edgeB} className='w-1/2 mr-2' placeholder='Enter a name' sizing="md" type="text" />


                    <Button size="md" onClick={insertEdge} className='w-[10%] mr-2 focus:bg-cyan-800 focus:ring-1 focus:ring-cyan-300' gradientDuoTone="cyanToBlue" >
                        Add Egde
                    </Button>

                </div>
                <div className='flex flex-row gap-2'>
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
                    <CodeMirror value={dotGraph} className='w-[50%]' height="100%" onChange={onChange} theme={vscodeDark} />
                </div>

            </div>

        </div>
    );
}

export default GraphGrapher;