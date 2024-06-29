import Graphviz from 'graphviz-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import "./styles.css"
import { Button, Sidebar, TextInput } from "flowbite-react";
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaList, FaListOl } from 'react-icons/fa';
import { OrderedLinkedList } from '../../structures/Lists/orderedLinkedList';
import { Graph } from '../../structures/graph';
import { PiGraphBold } from 'react-icons/pi';
import { TbBrandMatrix } from 'react-icons/tb';


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
        console.log(GRAPH.current.dot)
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
        console.log(GRAPH.current.dot)
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

    const customTheme =
    {
        "root": {
            "base": "h-full",
            "collapsed": {
                "on": "w-16",
                "off": "w-64"
            },
            "inner": "h-full overflow-y-auto overflow-x-hidden rounded bg-gray-900 px-3 py-4 dark:bg-gray-800"
        },
        "collapse": {
            "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
            "icon": {
                "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
                "open": {
                    "off": "",
                    "on": "text-gray-900"
                }
            },
            "label": {
                "base": "ml-3 flex-1 whitespace-nowrap text-left",
                "icon": {
                    "base": "h-6 w-6 transition delay-0 ease-in-out",
                    "open": {
                        "on": "rotate-180",
                        "off": ""
                    }
                }
            },
            "list": "space-y-2 py-2"
        },
        "cta": {
            "base": "mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700",
            "color": {
                "blue": "bg-cyan-50 dark:bg-cyan-900",
                "dark": "bg-dark-50 dark:bg-dark-900",
                "failure": "bg-red-50 dark:bg-red-900",
                "gray": "bg-alternative-50 dark:bg-alternative-900",
                "green": "bg-green-50 dark:bg-green-900",
                "light": "bg-light-50 dark:bg-light-900",
                "red": "bg-red-50 dark:bg-red-900",
                "purple": "bg-purple-50 dark:bg-purple-900",
                "success": "bg-green-50 dark:bg-green-900",
                "yellow": "bg-yellow-50 dark:bg-yellow-900",
                "warning": "bg-yellow-50 dark:bg-yellow-900"
            }
        },
        "item": {
            "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-xs",
            "active": "bg-gray-800 dark:bg-gray-700",
            "collapsed": {
                "insideCollapse": "group w-full pl-8 transition duration-75",
                "noIcon": "font-bold"
            },
            "content": {
                "base": "flex-1 whitespace-nowrap px-3"
            },
            "icon": {
                "base": "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
                "active": "text-gray-700 dark:text-gray-100"
            },
            "label": "",
            "listItem": ""
        },
        "items": {
            "base": ""
        },
        "itemGroup": {
            "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
        },
        "logo": {
            "base": "mb-5 flex items-center pl-2.5",
            "collapsed": {
                "on": "hidden",
                "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
            },
            "img": "mr-3 h-6 sm:h-7"
        }

    };
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
            <Sidebar aria-label="Default sidebar example" theme={customTheme} className='w-1/5'>
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

                    <TextInput sizing="sm" onChange={e => setVertex(e.target.value)} value={vertex} className='w-1/5 mr-2 ' placeholder='Enter a vertex name'  />

                    <Button size="xs" onClick={insertVertex} className='w-1/5 mr-2 focus:bg-cyan-800 focus:ring-1 focus:ring-cyan-300 ' gradientDuoTone="cyanToBlue" >
                        Add Vertex
                    </Button>
                    <Button size="xs" onClick={clear} className='w-1/5 bg-white hover:text-black focus:ring-1 focus:ring-cyan-300 ' outline gradientDuoTone="white" >
                        Clear
                    </Button>
                </div>
                <div className='flex  pb-px' >
                    <div className='w-2/5 mr-2' >
                        Enter a Source 
                    </div>
                    <div className='w-2/5 mr-2' >
                        Enter a Destination
                    </div>
                </div>
                <div className='flex  pb-px' >

                    <TextInput onChange={e => setEdgeA(e.target.value)} value={edgeA} className='w-1/2 mr-2' placeholder='Enter a name' sizing="sm" type="text" />


                    <TextInput onChange={e => setEdgeB(e.target.value)} value={edgeB} className='w-1/2 mr-2' placeholder='Enter a name' sizing="sm" type="text" />


                    <Button size="xs" onClick={insertEdge} className='w-1/5 mr-2 focus:bg-cyan-800 focus:ring-1 focus:ring-cyan-300' gradientDuoTone="cyanToBlue" >
                        Add Egde
                    </Button>

                </div>
                <div className='flex flex-row h-[300px] gap-2'>
                    <ErrorBoundary fallback={<div className='w-full h-[250px] bg-white rounded-[12px] text-black align-middle content-center'>Something went wrong</div>} onReset={(details) => {

                        // Reset the state of your app so the error doesn't happen again
                    }} resetKeys={[dotGraph]}>
                        <div className='w-[50%] w-min-[50%] bg-white rounded-[12px] '>
                            <Graphviz dot={dotGraph}

                                options={{
                                    //fit: true,
                                    tweenPaths: true,
                                    tweenShapes: true,
                                    growEnteringEdges: true,
                                    height: 250,
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