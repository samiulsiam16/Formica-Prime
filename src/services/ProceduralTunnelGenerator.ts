export class ProceduralTunnelGenerator {
  private svg: SVGSVGElement;
  private width: number;
  private height: number;
  private seed: number;

  constructor(svgElement: SVGSVGElement, width: number, height: number) {
    this.svg = svgElement;
    this.width = width;
    this.height = height;
    this.seed = Date.now();
  }

  private seededRandom() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  public generate(chamberPositions: Record<string, { x: number; y: number }>) {
    this.svg.innerHTML = ''; // Clear existing
    
    const chambers = Object.entries(chamberPositions);
    const connections = this.getMSTConnections(chambers);
    
    connections.forEach(([from, to]) => {
      const path = this.generateOrganicPath(from, to);
      this.renderTunnel(path);
    });

    // Add random branching dead-end tunnels
    for (let i = 0; i < 8; i++) {
      this.addDeadEndTunnel(chambers);
    }

    this.addRootStructures();
  }

  private generateOrganicPath(from: { x: number; y: number }, to: { x: number; y: number }) {
    const points = [];
    const steps = 4 + Math.floor(this.seededRandom() * 4);
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const baseX = from.x + (to.x - from.x) * t;
      const baseY = from.y + (to.y - from.y) * t;
      
      const perpX = -(to.y - from.y);
      const perpY = to.x - from.x;
      const len = Math.hypot(perpX, perpY) || 1;
      const deviation = (this.seededRandom() - 0.5) * 60 * Math.sin(t * Math.PI);
      
      points.push({
        x: baseX + (perpX / len) * deviation,
        y: baseY + (perpY / len) * deviation
      });
    }
    
    return points;
  }

  private renderTunnel(points: { x: number; y: number }[]) {
    const outerPath = this.pointsToSmoothPath(points, 18);
    const outer = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    outer.setAttribute('d', outerPath);
    outer.setAttribute('fill', '#3D200E');
    outer.setAttribute('stroke', '#1A0F08');
    outer.setAttribute('stroke-width', '2');
    this.svg.appendChild(outer);
    
    const innerPath = this.pointsToSmoothPath(points, 14);
    const inner = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    inner.setAttribute('d', innerPath);
    inner.setAttribute('fill', '#2C1200');
    inner.setAttribute('class', 'tunnel-path');
    this.svg.appendChild(inner);
  }

  private pointsToSmoothPath(points: { x: number; y: number }[], width: number) {
    if (points.length < 2) return '';
    
    let d = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 1; i < points.length - 1; i++) {
      const cp1x = (points[i-1].x + points[i].x) / 2;
      const cp1y = (points[i-1].y + points[i].y) / 2;
      const cp2x = (points[i].x + points[i+1].x) / 2;
      const cp2y = (points[i].y + points[i+1].y) / 2;
      d += ` Q ${points[i].x},${points[i].y} ${cp2x},${cp2y}`;
    }
    
    d += ` L ${points[points.length-1].x},${points[points.length-1].y}`;
    return d;
  }

  private addDeadEndTunnel(chambers: [string, { x: number; y: number }][]) {
    const startChamber = chambers[Math.floor(this.seededRandom() * chambers.length)][1];
    const angle = this.seededRandom() * Math.PI * 2;
    const length = 100 + this.seededRandom() * 200;
    const end = {
      x: startChamber.x + Math.cos(angle) * length,
      y: startChamber.y + Math.sin(angle) * length
    };
    const path = this.generateOrganicPath(startChamber, end);
    this.renderTunnel(path);
  }

  private addRootStructures() {
    const rootCount = 12;
    for (let i = 0; i < rootCount; i++) {
      const startX = (this.width / rootCount) * i + this.seededRandom() * 80;
      this.drawRoot(startX, 80, 0, 1, 5);
    }
  }

  private drawRoot(x: number, y: number, angle: number, depth: number, maxDepth: number) {
    if (depth > maxDepth) return;
    
    const length = 30 + this.seededRandom() * 50;
    const endX = x + Math.sin(angle) * length;
    const endY = y + Math.cos(angle) * length;
    
    const root = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    root.setAttribute('x1', x.toString());
    root.setAttribute('y1', y.toString());
    root.setAttribute('x2', endX.toString());
    root.setAttribute('y2', endY.toString());
    root.setAttribute('stroke', '#1A0A05');
    root.setAttribute('stroke-width', Math.max(0.5, 2.5 - depth * 0.4).toString());
    root.setAttribute('opacity', '0.6');
    this.svg.insertBefore(root, this.svg.firstChild);
    
    if (depth < maxDepth && this.seededRandom() > 0.3) {
      const branchAngle1 = angle + (this.seededRandom() - 0.5) * 1.2;
      const branchAngle2 = angle + (this.seededRandom() - 0.5) * 1.2;
      this.drawRoot(endX, endY, branchAngle1, depth + 1, maxDepth);
      if (this.seededRandom() > 0.5) {
        this.drawRoot(endX, endY, branchAngle2, depth + 1, maxDepth);
      }
    }
  }

  private getMSTConnections(chambers: [string, { x: number; y: number }][]) {
    const connected = new Set([chambers[0][0]]);
    const edges: [{ x: number; y: number }, { x: number; y: number }][] = [];
    
    while (connected.size < chambers.length) {
      let bestDist = Infinity;
      let bestEdge: [{ x: number; y: number }, { x: number; y: number }, string] | null = null;
      
      chambers.forEach(([id1, c1]) => {
        if (!connected.has(id1)) return;
        chambers.forEach(([id2, c2]) => {
          if (connected.has(id2)) return;
          const dist = Math.hypot(c1.x - c2.x, c1.y - c2.y);
          if (dist < bestDist) {
            bestDist = dist;
            bestEdge = [c1, c2, id2];
          }
        });
      });
      
      if (bestEdge) {
        edges.push([bestEdge[0], bestEdge[1]]);
        connected.add(bestEdge[2]);
      } else break;
    }
    
    return edges;
  }
}
