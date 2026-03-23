import { AntType, AntScheduleSlot } from '../types';

export class PathfindingSystem {
  private grid: number[][] = [];
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array(height).fill(0).map(() => Array(width).fill(0));
  }

  public setObstacle(x: number, y: number, isObstacle: boolean) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.grid[y][x] = isObstacle ? 1 : 0;
    }
  }

  public findPath(start: { x: number; y: number }, end: { x: number; y: number }) {
    // Simple A* implementation
    const openSet = [start];
    const cameFrom = new Map<string, { x: number; y: number }>();
    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();

    const startKey = `${start.x},${start.y}`;
    gScore.set(startKey, 0);
    fScore.set(startKey, this.heuristic(start, end));

    while (openSet.length > 0) {
      let current = openSet.reduce((a, b) => 
        (fScore.get(`${a.x},${a.y}`) || Infinity) < (fScore.get(`${b.x},${b.y}`) || Infinity) ? a : b
      );

      if (current.x === end.x && current.y === end.y) {
        return this.reconstructPath(cameFrom, current);
      }

      openSet.splice(openSet.indexOf(current), 1);
      
      const neighbors = this.getNeighbors(current);
      for (const neighbor of neighbors) {
        const neighborKey = `${neighbor.x},${neighbor.y}`;
        const tentativeGScore = (gScore.get(`${current.x},${current.y}`) || Infinity) + 1;

        if (tentativeGScore < (gScore.get(neighborKey) || Infinity)) {
          cameFrom.set(neighborKey, current);
          gScore.set(neighborKey, tentativeGScore);
          fScore.set(neighborKey, tentativeGScore + this.heuristic(neighbor, end));
          if (!openSet.find(p => p.x === neighbor.x && p.y === neighbor.y)) {
            openSet.push(neighbor);
          }
        }
      }
    }

    return null;
  }

  private heuristic(a: { x: number; y: number }, b: { x: number; y: number }) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  private getNeighbors(p: { x: number; y: number }) {
    const neighbors = [];
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (const [dx, dy] of dirs) {
      const nx = p.x + dx;
      const ny = p.y + dy;
      if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height && this.grid[ny][nx] === 0) {
        neighbors.push({ x: nx, y: ny });
      }
    }
    return neighbors;
  }

  private reconstructPath(cameFrom: Map<string, { x: number; y: number }>, current: { x: number; y: number }) {
    const path = [current];
    while (cameFrom.has(`${current.x},${current.y}`)) {
      current = cameFrom.get(`${current.x},${current.y}`)!;
      path.unshift(current);
    }
    return path;
  }
}

export class ColonyTimeClock {
  private time: number = 0; // Minutes from 0 to 1439
  private speed: number = 30; // 1 real second = 30 colony minutes (2 real seconds = 1 colony hour)
  private onTimeUpdate: (time: number) => void;

  constructor(onTimeUpdate: (time: number) => void) {
    this.onTimeUpdate = onTimeUpdate;
    this.start();
  }

  private start() {
    setInterval(() => {
      this.time = (this.time + 1) % 1440;
      this.onTimeUpdate(this.time);
    }, 2000 / 60); // 2 seconds per hour = 2000ms / 60 mins
  }

  public getTimeString() {
    const hours = Math.floor(this.time / 60);
    const mins = this.time % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  public getIsDay() {
    return this.time >= 360 && this.time < 1200; // 6 AM to 8 PM
  }
}

export interface AntAgent {
  id: string;
  name: string;
  type: AntType;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  path: { x: number; y: number }[];
  schedule: AntScheduleSlot[];
  currentTask: string;
  mood: string;
  energy: number;
}

export class ColonySimulation {
  private ants: AntAgent[] = [];
  private time: number = 0;
  private pathfinding: PathfindingSystem;
  private onUpdate: (ants: AntAgent[]) => void;

  constructor(width: number, height: number, onUpdate: (ants: AntAgent[]) => void) {
    this.pathfinding = new PathfindingSystem(width, height);
    this.onUpdate = onUpdate;
    this.initAnts();
    this.startLoop();
  }

  private initAnts() {
    // Initialize 60 ants with schedules
    const roles: AntType[] = ['worker', 'creative', 'strategy', 'guard', 'nurse', 'doctor', 'chef', 'delivery', 'police', 'construction', 'farmer', 'royal', 'scribe', 'historian'];
    
    for (let i = 0; i < 60; i++) {
      const type = roles[i % roles.length];
      this.ants.push({
        id: `ant-${i}`,
        name: `Ant ${i + 1}`,
        type,
        x: Math.random() * 1200,
        y: Math.random() * 1000,
        targetX: 0,
        targetY: 0,
        path: [],
        schedule: this.generateSchedule(type),
        currentTask: 'Idle',
        mood: 'happy',
        energy: 100
      });
    }
  }

  private generateSchedule(type: AntType): AntScheduleSlot[] {
    return [
      { startTime: '06:00', endTime: '08:00', activity: 'Wake Up', location: 'Residential' },
      { startTime: '08:00', endTime: '12:00', activity: 'Work', location: 'Industrial' },
      { startTime: '12:00', endTime: '13:00', activity: 'Lunch', location: 'Commercial' },
      { startTime: '13:00', endTime: '18:00', activity: 'Work', location: 'Industrial' },
      { startTime: '18:00', endTime: '20:00', activity: 'Dinner', location: 'Commercial' },
      { startTime: '20:00', endTime: '06:00', activity: 'Sleep', location: 'Residential' }
    ];
  }

  private startLoop() {
    const loop = () => {
      this.update();
      this.onUpdate([...this.ants]);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  private update() {
    this.ants.forEach(ant => {
      // Move towards target
      if (ant.path.length > 0) {
        const next = ant.path[0];
        const dx = next.x - ant.x;
        const dy = next.y - ant.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < 2) {
          ant.path.shift();
        } else {
          ant.x += (dx / dist) * 2;
          ant.y += (dy / dist) * 2;
        }
      } else {
        // Find new target if idle
        if (Math.random() > 0.99) {
          ant.targetX = Math.random() * 1200;
          ant.targetY = Math.random() * 1000;
          // In a real simulation, we'd use pathfinding here
          ant.path = [{ x: ant.targetX, y: ant.targetY }];
        }
      }
    });
  }

  public updateTime(time: number) {
    this.time = time;
    // Update ant tasks based on schedule
  }
}
