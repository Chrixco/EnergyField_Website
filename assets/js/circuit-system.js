/* =================================================================== */
/*                    TRON-INSPIRED CIRCUIT GENERATOR                */
/* =================================================================== */

class CircuitSystem {
    constructor(container) {
        this.container = container;
        this.gridSize = 80;
        this.nodes = [];
        this.circuits = [];
        this.dataPackets = [];
        this.maxNodes = 15;
        this.maxCircuits = 25;
        this.maxDataPackets = 8;

        this.init();
    }

    init() {
        this.createCircuitBackground();
        this.generateInitialNodes();
        this.startCircuitGeneration();
        this.startDataFlow();
    }

    createCircuitBackground() {
        // Clear existing content
        this.container.innerHTML = '';

        // Create circuit grid
        const grid = document.createElement('div');
        grid.className = 'circuit-grid';
        this.container.appendChild(grid);

        // Create matrix overlay
        const matrix = document.createElement('div');
        matrix.className = 'circuit-matrix';
        this.container.appendChild(matrix);

        // Create circuit layers
        for (let i = 1; i <= 3; i++) {
            const layer = document.createElement('div');
            layer.className = `circuit-layer circuit-layer-${i}`;
            layer.style.position = 'absolute';
            layer.style.width = '100%';
            layer.style.height = '100%';
            this.container.appendChild(layer);
        }
    }

    generateInitialNodes() {
        const containerRect = this.container.getBoundingClientRect();
        const gridCols = Math.floor(containerRect.width / this.gridSize);
        const gridRows = Math.floor(containerRect.height / this.gridSize);

        // Create initial nodes at strategic positions
        const initialPositions = [
            { x: 2, y: 2 }, // Top-left area
            { x: gridCols - 3, y: 2 }, // Top-right area
            { x: Math.floor(gridCols / 2), y: Math.floor(gridRows / 2) }, // Center
            { x: 2, y: gridRows - 3 }, // Bottom-left area
            { x: gridCols - 3, y: gridRows - 3 } // Bottom-right area
        ];

        initialPositions.forEach((pos, index) => {
            if (pos.x >= 0 && pos.y >= 0 && pos.x < gridCols && pos.y < gridRows) {
                this.createNode(pos.x * this.gridSize, pos.y * this.gridSize, index === 2 ? 'major' : 'normal');
            }
        });
    }

    createNode(x, y, type = 'normal') {
        const node = document.createElement('div');
        node.className = `circuit-node ${type === 'major' ? 'major' : ''}`;
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;

        const nodeData = {
            element: node,
            x: x,
            y: y,
            type: type,
            connections: 0,
            maxConnections: type === 'major' ? 4 : 2
        };

        this.nodes.push(nodeData);
        this.container.appendChild(node);

        // Add random delay for node appearance
        setTimeout(() => {
            node.style.opacity = '1';
        }, Math.random() * 2000);

        return nodeData;
    }

    findNearestNode(x, y, excludeNode = null) {
        let nearest = null;
        let minDistance = Infinity;

        this.nodes.forEach(node => {
            if (node === excludeNode) return;

            const distance = Math.sqrt(
                Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2)
            );

            if (distance < minDistance && distance > 0) {
                minDistance = distance;
                nearest = node;
            }
        });

        return nearest;
    }

    createCircuitPath(startNode, endNode) {
        if (!startNode || !endNode) return null;
        if (startNode.connections >= startNode.maxConnections) return null;

        const path = this.generatePath(startNode, endNode);
        if (!path) return null;

        const circuitData = {
            startNode: startNode,
            endNode: endNode,
            elements: [],
            path: path
        };

        // Create visual path elements
        path.segments.forEach((segment, index) => {
            const element = this.createPathSegment(segment);
            if (element) {
                circuitData.elements.push(element);
                this.container.appendChild(element);

                // Animate path creation
                setTimeout(() => {
                    element.style.animationDelay = `${index * 0.2}s`;
                }, index * 100);
            }
        });

        startNode.connections++;
        endNode.connections++;
        this.circuits.push(circuitData);

        return circuitData;
    }

    generatePath(startNode, endNode) {
        const startX = startNode.x;
        const startY = startNode.y;
        const endX = endNode.x;
        const endY = endNode.y;

        const segments = [];

        // Determine if we need horizontal or vertical first movement
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        // Create L-shaped path with rounded corners
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal first
            const midX = startX + deltaX * 0.7;

            // Horizontal segment
            segments.push({
                type: 'horizontal',
                x: Math.min(startX, midX),
                y: startY,
                width: Math.abs(midX - startX),
                height: 2
            });

            // Corner
            segments.push({
                type: 'corner',
                x: midX,
                y: deltaY > 0 ? startY : startY - 8,
                cornerType: deltaY > 0 ?
                    (deltaX > 0 ? 'bottom-left' : 'bottom-right') :
                    (deltaX > 0 ? 'top-left' : 'top-right')
            });

            // Vertical segment
            segments.push({
                type: 'vertical',
                x: midX,
                y: Math.min(startY, endY),
                width: 2,
                height: Math.abs(endY - startY)
            });
        } else {
            // Vertical first
            const midY = startY + deltaY * 0.7;

            // Vertical segment
            segments.push({
                type: 'vertical',
                x: startX,
                y: Math.min(startY, midY),
                width: 2,
                height: Math.abs(midY - startY)
            });

            // Corner
            segments.push({
                type: 'corner',
                x: deltaX > 0 ? startX : startX - 8,
                y: midY,
                cornerType: deltaX > 0 ?
                    (deltaY > 0 ? 'top-right' : 'bottom-right') :
                    (deltaY > 0 ? 'top-left' : 'bottom-left')
            });

            // Horizontal segment
            segments.push({
                type: 'horizontal',
                x: Math.min(startX, endX),
                y: midY,
                width: Math.abs(endX - startX),
                height: 2
            });
        }

        return { segments: segments };
    }

    createPathSegment(segment) {
        const element = document.createElement('div');

        if (segment.type === 'horizontal' || segment.type === 'vertical') {
            element.className = `circuit-path ${segment.type}`;
            element.style.left = `${segment.x}px`;
            element.style.top = `${segment.y}px`;
            element.style.width = `${segment.width}px`;
            element.style.height = `${segment.height}px`;
        } else if (segment.type === 'corner') {
            element.className = `circuit-corner ${segment.cornerType}`;
            element.style.left = `${segment.x}px`;
            element.style.top = `${segment.y}px`;
            element.style.width = '16px';
            element.style.height = '16px';
        }

        return element;
    }

    createDataPacket(circuit) {
        if (!circuit || !circuit.elements.length) return;

        const packet = document.createElement('div');
        packet.className = 'circuit-data';

        const packetData = {
            element: packet,
            circuit: circuit,
            progress: 0,
            speed: 0.01 + Math.random() * 0.02
        };

        this.dataPackets.push(packetData);
        this.container.appendChild(packet);

        return packetData;
    }

    animateDataPackets() {
        this.dataPackets.forEach((packet, index) => {
            packet.progress += packet.speed;

            if (packet.progress >= 1) {
                // Remove completed packet
                packet.element.remove();
                this.dataPackets.splice(index, 1);
                return;
            }

            // Calculate position along circuit path
            const position = this.calculatePacketPosition(packet.circuit, packet.progress);
            if (position) {
                packet.element.style.left = `${position.x}px`;
                packet.element.style.top = `${position.y}px`;
            }
        });
    }

    calculatePacketPosition(circuit, progress) {
        if (!circuit || !circuit.startNode || !circuit.endNode) return null;

        const startX = circuit.startNode.x;
        const startY = circuit.startNode.y;
        const endX = circuit.endNode.x;
        const endY = circuit.endNode.y;

        return {
            x: startX + (endX - startX) * progress,
            y: startY + (endY - startY) * progress
        };
    }

    startCircuitGeneration() {
        setInterval(() => {
            if (this.circuits.length < this.maxCircuits && this.nodes.length >= 2) {
                // Try to create a new circuit
                const availableNodes = this.nodes.filter(node =>
                    node.connections < node.maxConnections
                );

                if (availableNodes.length >= 2) {
                    const startNode = availableNodes[Math.floor(Math.random() * availableNodes.length)];
                    const endNode = this.findNearestNode(startNode.x, startNode.y, startNode);

                    if (endNode && endNode.connections < endNode.maxConnections) {
                        this.createCircuitPath(startNode, endNode);
                    }
                }

                // Occasionally create new nodes
                if (Math.random() < 0.3 && this.nodes.length < this.maxNodes) {
                    this.createRandomNode();
                }
            }
        }, 3000 + Math.random() * 2000);
    }

    createRandomNode() {
        const containerRect = this.container.getBoundingClientRect();
        const margin = this.gridSize;

        const x = margin + Math.random() * (containerRect.width - margin * 2);
        const y = margin + Math.random() * (containerRect.height - margin * 2);

        // Snap to grid
        const gridX = Math.round(x / this.gridSize) * this.gridSize;
        const gridY = Math.round(y / this.gridSize) * this.gridSize;

        // Check if position is too close to existing nodes
        const tooClose = this.nodes.some(node => {
            const distance = Math.sqrt(
                Math.pow(node.x - gridX, 2) + Math.pow(node.y - gridY, 2)
            );
            return distance < this.gridSize * 1.5;
        });

        if (!tooClose) {
            this.createNode(gridX, gridY, Math.random() < 0.2 ? 'major' : 'normal');
        }
    }

    startDataFlow() {
        // Create initial data packets
        setInterval(() => {
            if (this.dataPackets.length < this.maxDataPackets && this.circuits.length > 0) {
                const randomCircuit = this.circuits[Math.floor(Math.random() * this.circuits.length)];
                this.createDataPacket(randomCircuit);
            }
        }, 1500 + Math.random() * 1000);

        // Animate existing packets
        const animateFrame = () => {
            this.animateDataPackets();
            requestAnimationFrame(animateFrame);
        };
        animateFrame();
    }

    addEnergySurge() {
        if (this.circuits.length === 0) return;

        const randomCircuit = this.circuits[Math.floor(Math.random() * this.circuits.length)];
        const surge = document.createElement('div');
        surge.className = 'energy-surge';

        // Position surge along the circuit
        const startX = randomCircuit.startNode.x;
        const startY = randomCircuit.startNode.y;
        const endX = randomCircuit.endNode.x;
        const endY = randomCircuit.endNode.y;

        surge.style.left = `${Math.min(startX, endX)}px`;
        surge.style.top = `${Math.min(startY, endY)}px`;
        surge.style.width = `${Math.abs(endX - startX)}px`;

        this.container.appendChild(surge);

        setTimeout(() => {
            surge.remove();
        }, 8000);
    }

    resize() {
        // Recalculate positions on resize
        const containerRect = this.container.getBoundingClientRect();
        this.gridSize = Math.min(80, containerRect.width / 15);

        // Recreate the entire system
        this.nodes = [];
        this.circuits = [];
        this.dataPackets = [];
        this.init();
    }
}

// Initialize Circuit System
document.addEventListener('DOMContentLoaded', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        // Create circuit background container
        const circuitContainer = document.createElement('div');
        circuitContainer.className = 'circuit-background';
        heroBackground.appendChild(circuitContainer);

        // Initialize circuit system
        const circuitSystem = new CircuitSystem(circuitContainer);

        // Handle window resize
        window.addEventListener('resize', () => {
            circuitSystem.resize();
        });

        // Trigger energy surges periodically
        setInterval(() => {
            circuitSystem.addEnergySurge();
        }, 10000 + Math.random() * 5000);
    }
});