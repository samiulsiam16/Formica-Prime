import React, { useState, useEffect } from 'react';

export class AdaptiveQualityManager {
  private fps: number = 60;
  private frameCount: number = 0;
  private lastTime: number = performance.now();
  private qualityLevel: 'high' | 'medium' | 'low' = 'high';
  private onQualityChange: (level: 'high' | 'medium' | 'low') => void;

  constructor(onQualityChange: (level: 'high' | 'medium' | 'low') => void) {
    this.onQualityChange = onQualityChange;
    this.startMonitoring();
  }

  private startMonitoring() {
    const monitor = () => {
      const now = performance.now();
      this.frameCount++;
      
      if (now - this.lastTime >= 1000) {
        this.fps = this.frameCount;
        this.frameCount = 0;
        this.lastTime = now;
        this.adjustQuality();
      }
      
      requestAnimationFrame(monitor);
    };
    
    requestAnimationFrame(monitor);
  }

  private adjustQuality() {
    let newLevel: 'high' | 'medium' | 'low' = 'high';
    
    if (this.fps < 30) {
      newLevel = 'low';
    } else if (this.fps < 50) {
      newLevel = 'medium';
    } else {
      newLevel = 'high';
    }
    
    if (newLevel !== this.qualityLevel) {
      this.qualityLevel = newLevel;
      this.onQualityChange(newLevel);
      console.log(`[Quality Manager] Switched to ${newLevel} quality (${this.fps} FPS)`);
    }
  }

  public getQuality() {
    return this.qualityLevel;
  }
}

export const useQuality = () => {
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    const manager = new AdaptiveQualityManager(setQuality);
    return () => {}; // Cleanup if needed
  }, []);

  return quality;
};
