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
                <div className='flex flex-row  gap-2'>
                    <ErrorBoundary fallback={<div className='w-full h-[600px] bg-white rounded-[12px] text-black align-middle content-center'>Something went wrong</div>} onReset={(details) => {

                        // Reset the state of your app so the error doesn't happen again
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

export default TreeGrapher;