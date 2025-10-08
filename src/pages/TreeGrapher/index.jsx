import Graphviz from 'graphviz-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import CodeMirror from '@uiw/react-codemirror';
import { Button, Sidebar, TextInput } from "flowbite-react";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer, toast } from 'react-toastify';
import { TbBinaryTree, TbBinaryTree2 } from "react-icons/tb";
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

import 'react-toastify/dist/ReactToastify.css';

import { AVLTree } from '../../structures/Trees/avlTree';
import { BinaryTree } from '../../structures/Trees/binaryTree';
import { SplayTree } from '../../structures/Trees/splayTree';
import { SideBarCustomTheme } from '../../Themes/sideBarTheme';

import "./styles.css"

const TreeGrapher = () => {
    const notify = (msg) => toast.info(msg);
    const [data, setData] = useState("")

    const DEFAULTTREE = `digraph Tree {\n\trankdir=TB;\n\tgraph [ nodesep=0.5];\n\tnode [shape = record, style=filled, fillcolor=seashell2,width=0.1,height=0.4];\n}`


    const selectTree = (index) => {
        if (index === 0) {
            BST.current = new BinaryTree()
            setDotGraph(DEFAULTTREE)
            notify("Binary Tree Selected")
            return
        }
        if (index === 1) {
            BST.current = new AVLTree()
            setDotGraph(DEFAULTTREE)
            notify("AVL Tree Selected")
            return
        }
        if (index === 2) {
            BST.current = new SplayTree()
            setDotGraph(DEFAULTTREE)
            notify("Splay Tree Selected")
            return
        }
    }
    const [dotGraph, setDotGraph] = useState(DEFAULTTREE);
    const BST = useRef(null);
    const insert = () => {

        if (!data.trim()) {
            notify("You have to enter a number.")
            return;
        }
        BST.current.insert(parseInt(data))
        BST.current.dotGraph()
        setDotGraph(`digraph Tree 
{\n\trankdir=TB;\n\tgraph [ nodesep=0.5];\n\tnode [shape = record, style=filled, fillcolor=seashell2,width=0.1,height=0.4];\n\t`+ BST.current.dot + "\n}"
        )
        setData("")
    }
    useEffect(() => {
        BST.current = new AVLTree();
    }, [])

    const clear = () => {
        BST.current.clear();
        notify("Graph clean")
        setDotGraph(DEFAULTTREE)
    }

    
    const onChange = useCallback((val, viewUpdate) => {
        setDotGraph(val);
    }, []);
    return (
        <div className="flex pt-3 h-[100%] bg-blue-900 min-h-0">
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
                        <Sidebar.Item href="#" icon={TbBinaryTree} className="text-white hover:bg-gray-700" onClick={() => { selectTree(0) }}>
                            Binary Tree
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={TbBinaryTree} className="text-white hover:bg-gray-700" onClick={() => { selectTree(1) }}>
                            AVL Tree
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={TbBinaryTree2} className="text-white hover:bg-gray-700" onClick={() => { selectTree(2) }}>
                            Splay Tree
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
            <div className='flex-1 min-h-0 w-full sm:w-4/5 gap-2 px-2 flex flex-col' >
                <div className='flex flex-col sm:flex-row sm:items-center pb-2 gap-2'>

                    <div className='flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto'>
                        <label className='text-white hidden sm:block mr-2'>Type:</label>
                        <select onChange={e => selectTree(parseInt(e.target.value))} className='bg-gray-800 text-white rounded px-2 py-1 w-full sm:w-auto'>
                            <option value={0}>Binary Tree</option>
                            <option value={1}>AVL Tree</option>
                            <option value={2}>Splay Tree</option>
                        </select>
                    </div>

                    <TextInput onChange={e => setData(e.target.value)} value={data} className='w-full sm:w-2/6 mr-0 sm:mr-2' placeholder='Enter a number' sizing="md" type="number" />

                    <div className='flex gap-2 w-full sm:w-auto'>
                        <Button size="md" onClick={insert} className='flex-1 sm:flex-none focus:bg-cyan-800 focus:ring-1 focus:ring-cyan-300' gradientDuoTone="cyanToBlue" >
                            Add
                        </Button>
                        <Button size="md" onClick={clear} className='flex-1 sm:flex-none bg-white hover:text-black focus:ring-1 focus:ring-cyan-300' outline gradientDuoTone="white" >
                            Clear
                        </Button>
                    </div>
                </div>

                <div className='flex-1 min-h-0 flex flex-col sm:flex-row gap-2 h-full'>
                    <ErrorBoundary fallback={<div className='w-full h-[600px] bg-white rounded-[12px] text-black align-middle content-center'>Something went wrong</div>} onReset={(details) => {

                        // Reset the state of your app so the error doesn't happen again
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
                    <div className='flex-1 min-h-0 w-full sm:w-1/2 bg-gray-800 rounded-[12px] overflow-auto max-h-screen h-full'>
                        <CodeMirror value={dotGraph} className='w-full h-full' height="100%" onChange={onChange} theme={vscodeDark} />
                    </div>
                </div>

            </div>

        </div>
    );
}

export default TreeGrapher;