// create a graph class
class Graph {
    // defining vertex array and
    // adjacent list
    constructor() {

        this.AdjList = new Map();
        this.dot = "";
    }

    clear(){
        this.AdjList = new Map();
        this.dot = "";
    }
    // functions to be implemented

    // add vertex to the graph
    addVertex(v) {
        // initialize the adjacent list with a
        // null array
        if(this.AdjList.has(v)){
            return;
        }
        this.AdjList.set(v, []);
    }
    // add edge to the graph
    addEdge(v, w) {
        // get the list for vertex v and put the
        // vertex w denoting edge between v and w

        if(!this.AdjList.has(v)){
            this.AdjList.set(v, []);
            if(this.AdjList.get(w)){
                this.AdjList.get(v).push(w);
                return;
            }
            this.AdjList.set(w, []);
            this.AdjList.get(v).push(w);
            return;
        }
        if(this.AdjList.get(w)){
            this.AdjList.get(v).push(w);
            return;
        }
        this.AdjList.set(w, []);
        this.AdjList.get(v).push(w);


        // Since graph is undirected,
        // add an edge from w to v also
        //this.AdjList.get(w).push(v);
    }


    dotGraph(){
        this.dot=""
        this.printGraph()
        console.log("dot",this.dot)
    }

    // Prints the vertex and adjacency list
    printGraph() {
        // get all the vertices
        var get_keys = this.AdjList.keys();

        // iterate over the vertices
        for (var i of get_keys) {
            // get the corresponding adjacency list
            // for the vertex
            var get_values = this.AdjList.get(i);
            var conc = "";
            this.dot = this.dot+ "\n\tnode"+i+ "[ label = \""+i+"\"]";
            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values){
                conc += j + " ";
                this.dot = this.dot +"\n\tnode"+i+"->node"+j+";"; 
            }
                

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }

    // function to performs BFS
    bfs(startingNode) {

        // create a visited object
        var visited = {};

        // Create an object for queue
        var q = new Queue();

        // add the starting node to the queue
        visited[startingNode] = true;
        q.enqueue(startingNode);

        // loop until queue is empty
        while (!q.isEmpty()) {
            // get the element from the queue
            var getQueueElement = q.dequeue();

            // passing the current vertex to callback function
            console.log(getQueueElement);

            // get the adjacent list for current vertex
            var get_List = this.AdjList.get(getQueueElement);

            // loop through the list and add the element to the
            // queue if it is not processed yet
            for (var i in get_List) {
                var neigh = get_List[i];

                if (!visited[neigh]) {
                    visited[neigh] = true;
                    q.enqueue(neigh);
                }
            }
            // Main DFS method
            dfs(startingNode)
            {

                var visited = {};

                this.DFSUtil(startingNode, visited);
            }

            // Recursive function which process and explore
            // all the adjacent vertex of the vertex with which it is called
            DFSUtil(vert, visited)
            {
                visited[vert] = true;
                console.log(vert);

                var get_neighbours = this.AdjList.get(vert);

                for (var i in get_neighbours) {
                    var get_elem = get_neighbours[i];
                    if (!visited[get_elem])
                        this.DFSUtil(get_elem, visited);
                }
            }
        }

    }
}

export{Graph}