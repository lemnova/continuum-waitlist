/*
 * CONTINUUM — KnowledgeGraph
 * Animated SVG node graph representing connected thinking.
 * Nodes pulse, lines animate. Subtle and precise.
 */
import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface Edge {
  from: number;
  to: number;
}

const CYAN = "78, 205, 196";
const WHITE = "220, 230, 240";

function createNodes(width: number, height: number): Node[] {
  const nodes: Node[] = [];
  const count = Math.min(28, Math.floor((width * height) / 14000));
  for (let i = 0; i < count; i++) {
    const isCentral = i < 3;
    nodes.push({
      x: width * 0.15 + Math.random() * width * 0.7,
      y: height * 0.1 + Math.random() * height * 0.8,
      r: isCentral ? 5 + Math.random() * 4 : 2 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      opacity: 0.4 + Math.random() * 0.6,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.012,
    });
  }
  return nodes;
}

function createEdges(nodes: Node[]): Edge[] {
  const edges: Edge[] = [];
  const maxDist = 200;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist && edges.length < 45) {
        edges.push({ from: i, to: j });
      }
    }
  }
  return edges;
}

export default function KnowledgeGraph({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      nodesRef.current = createNodes(rect.width, rect.height);
      edgesRef.current = createEdges(nodesRef.current);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      frameRef.current++;

      ctx.clearRect(0, 0, W, H);

      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += node.pulseSpeed;

        // Bounce off edges
        if (node.x < node.r || node.x > W - node.r) node.vx *= -1;
        if (node.y < node.r || node.y > H - node.r) node.vy *= -1;
        node.x = Math.max(node.r, Math.min(W - node.r, node.x));
        node.y = Math.max(node.r, Math.min(H - node.r, node.y));
      });

      // Draw edges
      edges.forEach((edge) => {
        const a = nodes[edge.from];
        const b = nodes[edge.to];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        if (dist > maxDist) return;

        const alpha = (1 - dist / maxDist) * 0.35;
        const isCyanEdge = edge.from < 3 || edge.to < 3;
        const color = isCyanEdge ? CYAN : WHITE;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${color}, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(node.pulsePhase) * 0.25 + 0.75;
        const isCyan = i < 5;
        const color = isCyan ? CYAN : WHITE;
        const r = node.r * pulse;

        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 3.5);
        gradient.addColorStop(0, `rgba(${color}, ${node.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${node.opacity * pulse})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
