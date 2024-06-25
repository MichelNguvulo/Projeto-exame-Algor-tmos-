        // Lista Ligada
        class Node {
            constructor(data) {
                this.data = data;
                this.next = null;
            }
        }

        class LinkedList {
            constructor() {
                this.head = null;
            }

            insertAtBeginning(data) {
                const newNode = new Node(data);
                newNode.next = this.head;
                this.head = newNode;
            }

            insertAtEnd(data) {
                const newNode = new Node(data);
                if (!this.head) {
                    this.head = newNode;
                    return;
                }
                let current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = newNode;
            }

            removeFromBeginning() {
                if (!this.head) return null;
                const data = this.head.data;
                this.head = this.head.next;
                return data;
            }

            removeFromEnd() {
                if (!this.head) return null;
                if (!this.head.next) {
                    const data = this.head.data;
                    this.head = null;
                    return data;
                }
                let current = this.head;
                while (current.next.next) {
                    current = current.next;
                }
                const data = current.next.data;
                current.next = null;
                return data;
            }
        }

        const linkedList = new LinkedList();

        function drawLinkedList() {
            const linkedListDiv = document.getElementById('linked-list');
            linkedListDiv.innerHTML = '';
            let current = linkedList.head;
            while (current) {
                const nodeDiv = document.createElement('div');
                nodeDiv.className = 'node';
                nodeDiv.innerHTML = `<div class="data">${current.data}</div>`;
                linkedListDiv.appendChild(nodeDiv);
                if (current.next) {
                    const arrowDiv = document.createElement('div');
                    arrowDiv.className = 'arrow';
                    arrowDiv.innerHTML = '→';
                    linkedListDiv.appendChild(arrowDiv);
                }
                current = current.next;
            }
        }

        function getInputData(inputId) {
            const dataInput = document.getElementById(inputId);
            const data = dataInput.value.trim();
            dataInput.value = '';
            if (data) {
                return data;
            } else {
                alert('Digite um valor válido.');
                return null;
            }
        }

        function insertAtBeginning() {
            const data = getInputData('data');
            if (data) {
                linkedList.insertAtBeginning(data);
                drawLinkedList();
            }
        }

        function insertAtEnd() {
            const data = getInputData('data');
            if (data) {
                linkedList.insertAtEnd(data);
                drawLinkedList();
            }
        }

        function removeFromBeginning() {
            const data = linkedList.removeFromBeginning();
            const statusDiv = document.getElementById('status');
            if (data !== null) {
                statusDiv.textContent = `Removido do Início: ${data}`;
                statusDiv.className = 'text-info';
                drawLinkedList();
            } else {
                statusDiv.textContent = 'Lista vazia, não há o que remover.';
                statusDiv.className = 'text-danger';
            }
        }

        function removeFromEnd() {
            const data = linkedList.removeFromEnd();
            const statusDiv = document.getElementById('status');
            if (data !== null) {
                statusDiv.textContent = `Removido do Fim: ${data}`;
                statusDiv.className = 'text-info';
                drawLinkedList();
            } else {
                statusDiv.textContent = 'Lista vazia, não há o que remover.';
                statusDiv.className = 'text-danger';
            }
        }

        drawLinkedList();

        // Grafo
        class Graph {
            constructor() {
                this.vertices = {};
            }

            addVertex(vertex) {
                if (!this.vertices[vertex]) {
                    this.vertices[vertex] = {};
                }
            }

            removeVertex(vertex) {
                if (this.vertices[vertex]) {
                    for (const adjacentVertex of Object.keys(this.vertices[vertex])) {
                        this.removeEdge(vertex, adjacentVertex);
                    }
                    delete this.vertices[vertex];
                }
            }

            addEdge(vertex1, vertex2, weight = 1) {
                this.addVertex(vertex1);
                this.addVertex(vertex2);
                this.vertices[vertex1][vertex2] = weight;
                this.vertices[vertex2][vertex1] = weight; // Remove this line for a directed graph
            }

            removeEdge(vertex1, vertex2) {
                if (this.vertices[vertex1] && this.vertices[vertex1][vertex2]) {
                    delete this.vertices[vertex1][vertex2];
                }
                if (this.vertices[vertex2] && this.vertices[vertex2][vertex1]) {
                    delete this.vertices[vertex2][vertex1];
                }
            }

            getVertices() {
                return Object.keys(this.vertices);
            }

            getEdges() {
                const edges = [];
                for (const vertex of Object.keys(this.vertices)) {
                    for (const [adjacentVertex, weight] of Object.entries(this.vertices[vertex])) {
                        edges.push([vertex, adjacentVertex, weight]);
                    }
                }
                return edges;
            }
        }

        const graph = new Graph();
        const canvas = document.getElementById('graph-canvas');
        const ctx = canvas.getContext('2d');

        function drawGraph() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const vertices = graph.getVertices();
            const edges = graph.getEdges();

            const positions = {};
            const radius = 200;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            vertices.forEach((vertex, index) => {
                const angle = index * 2 * Math.PI / vertices.length;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                positions[vertex] = { x, y };
            });

            edges.forEach(([vertex1, vertex2, weight]) => {
                const pos1 = positions[vertex1];
                const pos2 = positions[vertex2];
                ctx.beginPath();
                ctx.moveTo(pos1.x, pos1.y);
                ctx.lineTo(pos2.x, pos2.y);
                ctx.stroke();

                const midX = (pos1.x + pos2.x) / 2;
                const midY = (pos1.y + pos2.y) / 2;
                ctx.fillText(weight, midX, midY);
            });

            vertices.forEach(vertex => {
                const { x, y } = positions[vertex];
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, 2 * Math.PI);
                ctx.fillStyle = 'white';
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = 'black';
                ctx.fillText(vertex, x, y);
            });
        }

        function insertVertex() {
            const vertex = getInputData('vertex');
            if (vertex) {
                graph.addVertex(vertex);
                drawGraph();
            }
        }

        function removeVertex() {
            const vertex = getInputData('remove-vertex');
            if (vertex) {
                graph.removeVertex(vertex);
                drawGraph();
            }
        }

        function insertEdge() {
            const vertex1 = getInputData('edge-from');
            const vertex2 = getInputData('edge-to');
            const weight = getInputData('edge-weight');
            if (vertex1 && vertex2 && !isNaN(weight)) {
                graph.addEdge(vertex1, vertex2, parseInt(weight, 10));
                drawGraph();
            }
        }

        function removeEdge() {
            const vertex1 = getInputData('remove-edge-from');
            const vertex2 = getInputData('remove-edge-to');
            if (vertex1 && vertex2) {
                graph.removeEdge(vertex1, vertex2);
                drawGraph();
            }
        }

        drawGraph();

        // Árvore Binária
        class TreeNode {
            constructor(data) {
                this.data = data;
                this.left = null;
                this.right = null;
            }
        }

        class BinaryTree {
            constructor() {
                this.root = null;
            }

            insert(data) {
                const newNode = new TreeNode(data);
                if (this.root === null) {
                    this.root = newNode;
                } else {
                    this.insertNode(this.root, newNode);
                }
            }

            insertNode(node, newNode) {
                if (newNode.data < node.data) {
                    if (node.left === null) {
                        node.left = newNode;
                    } else {
                        this.insertNode(node.left, newNode);
                    }
                } else {
                    if (node.right === null) {
                        node.right = newNode;
                    } else {
                        this.insertNode(node.right, newNode);
                    }
                }
            }

            remove(data) {
                this.root = this.removeNode(this.root, data);
            }

            removeNode(node, key) {
                if (node === null) {
                    return null;
                } else if (key < node.data) {
                    node.left = this.removeNode(node.left, key);
                    return node;
                } else if (key > node.data) {
                    node.right = this.removeNode(node.right, key);
                    return node;
                } else {
                    if (node.left === null && node.right === null) {
                        node = null;
                        return node;
                    }
                    if (node.left === null) {
                        node = node.right;
                        return node;
                    } else if (node.right === null) {
                        node = node.left;
                        return node;
                    }

                    const aux = this.findMinNode(node.right);
                    node.data = aux.data;
                    node.right = this.removeNode(node.right, aux.data);
                    return node;
                }
            }

            findMinNode(node) {
                if (node.left === null) {
                    return node;
                } else {
                    return this.findMinNode(node.left);
                }
            }

            getRootNode() {
                return this.root;
            }

            inorder(node) {
                if (node !== null) {
                    this.inorder(node.left);
                    console.log(node.data);
                    this.inorder(node.right);
                }
            }
        }

        const binaryTree = new BinaryTree();
        const treeCanvas = document.getElementById('tree-canvas');
        const treeCtx = treeCanvas.getContext('2d');

        function drawNode(node, x, y, xOffset, yOffset) {
    treeCtx.beginPath();
    treeCtx.arc(x, y, 20, 0, 2 * Math.PI);
    treeCtx.fillStyle = 'white';
    treeCtx.fill();
    treeCtx.stroke();
    treeCtx.fillStyle = 'black';
    treeCtx.fillText(node.data, x, y);

    if (node.left) {
        const childY = y + yOffset;
        treeCtx.beginPath();
        treeCtx.moveTo(x, y + 20);
        treeCtx.lineTo(x - xOffset, childY - 20);
        treeCtx.stroke();
        drawNode(node.left, x - xOffset, childY, xOffset / 2, yOffset);
    }
    if (node.right) {
        const childY = y + yOffset;
        treeCtx.beginPath();
        treeCtx.moveTo(x, y + 20);
        treeCtx.lineTo(x + xOffset, childY - 20);
        treeCtx.stroke();
        drawNode(node.right, x + xOffset, childY, xOffset / 2, yOffset);
    }
}

function drawTree() {
    treeCtx.clearRect(0, 0, treeCanvas.width, treeCanvas.height);
    if (binaryTree.root) {
        drawNode(binaryTree.root, treeCanvas.width / 2, 40, treeCanvas.width / 4, 80);
    }
}

        function insertTreeNode() {
            const data = getInputData('tree-node');
            if (data) {
                binaryTree.insert(parseInt(data, 10));
                drawTree();
            }
        }

        function removeTreeNode() {
            const data = getInputData('remove-tree-node');
            if (data) {
                binaryTree.remove(parseInt(data, 10));
                drawTree();
            }
        }

        drawTree();