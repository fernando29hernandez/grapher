import Graphviz from 'graphviz-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import CodeMirror from '@uiw/react-codemirror';
import { Button, Sidebar, TextInput } from "flowbite-react";
import { ErrorBoundary } from "react-error-boundary";
import { FaList, FaListOl } from 'react-icons/fa';
import { SiPolkadot } from 'react-icons/si';
import { ToastContainer, toast } from 'react-toastify';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

import 'react-toastify/dist/ReactToastify.css';

import { CircularLinkedList } from '../../structures/Lists/circularLinkedList';
import { LinkedList } from '../../structures/Lists/linkedList';
import { OrderedLinkedList } from '../../structures/Lists/orderedLinkedList';
import { SideBarCustomTheme } from '../../Themes/sideBarTheme';

import "./styles.css"

const ListGrapher = () => {
    const notify = (msg) => toast.info(msg);
    const [data, setData] = useState("")


    const DEFAULTLIST =`digraph List {\n\trankdir=LR;\n\tnode [shape=record];\n\tedge [tailclip=false];\n}`

    const selectTree = (index) => {
        if (index === 0) {
            LIST.current = new LinkedList()
            setDotGraph(DEFAULTLIST)
            notify("Simple List Selected")
            return
        }
        if (index === 1) {
            LIST.current = new OrderedLinkedList()
            setDotGraph(DEFAULTLIST)
            notify("Ordered List Selected")
            return
        }
        if (index === 2) {
            LIST.current = new CircularLinkedList()
            setDotGraph(DEFAULTLIST)
            notify("Circular List Selected")
            return
        }
    }
    const [dotGraph, setDotGraph] = useState(DEFAULTLIST)
    const LIST = useRef(null);
    const insert = () => {

        if (!data.trim()) {
            notify("You have to enter a number.")
            return;
        }
        LIST.current.insert(parseInt(data))
        LIST.current.dotGraph()
        setDotGraph(`digraph List {\n\trankdir=LR;\n\tnode [shape=record];\n\tedge [tailclip=false];\n\t`+ LIST.current.dot + "\n}"
        )
        setData("")
    }
    useEffect(() => {
        LIST.current = new LinkedList();
    }, [])

    const clear = () => {
        LIST.current.clear();
        notify("Graph clean")
        setDotGraph(DEFAULTLIST)
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
                        <Sidebar.Item href="#" icon={FaList} className="text-white hover:bg-gray-700" onClick={() => { selectTree(0) }}>
                            Linked List
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={FaListOl} className="text-white hover:bg-gray-700" onClick={() => { selectTree(1) }}>
                            Ordered Linked List
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={SiPolkadot} className="text-white hover:bg-gray-700" onClick={() => { selectTree(2) }}>
                            Circular Linked List
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
            <div className='w-4/5 gap-2 px-2 flex flex-col ' >
                <div className='flex  pb-2' >

                    <TextInput onChange={e => setData(e.target.value)} value={data} className='w-2/6 mr-2' placeholder='Enter a number' sizing="md" type="number" />

                    <Button size="md" onClick={insert} className='w-[10%] mr-2 focus:bg-cyan-800 focus:ring-1 focus:ring-cyan-300' gradientDuoTone="cyanToBlue" >
                        Add
                    </Button>
                    <Button size="md" onClick={clear} className='w-[10%] bg-white hover:text-black focus:ring-1 focus:ring-cyan-300' outline gradientDuoTone="white" >
                        Clear
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

export default ListGrapher;