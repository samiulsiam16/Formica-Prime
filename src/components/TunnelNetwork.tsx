import React, { useEffect, useRef } from 'react';
import { ProceduralTunnelGenerator } from '../services/ProceduralTunnelGenerator';

const TunnelNetwork: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const generator = new ProceduralTunnelGenerator(svgRef.current, 1000, 1000);
      generator.generate({
        home: { x: 500, y: 400 },
        portfolio: { x: 200, y: 400 },
        services: { x: 800, y: 400 },
        about: { x: 500, y: 100 },
        contact: { x: 500, y: 800 },
        blog: { x: 800, y: 100 },
        throne: { x: 100, y: 800 },
        archive: { x: 900, y: 800 },
        training: { x: 100, y: 200 },
        graveyard: { x: 900, y: 200 },
        colony: { x: 500, y: 50 }
      });
    }
  }, []);

  return (
    <svg 
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0" 
      viewBox="0 0 1000 1000" 
      preserveAspectRatio="none"
    />
  );
};

export default TunnelNetwork;
