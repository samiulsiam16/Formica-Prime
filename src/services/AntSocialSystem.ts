import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AntType, Mood } from '../types';

interface AntSocialSystemProps {
  ants: React.ReactNode[];
}

export class AntSocialSystem {
  private interactionCooldowns = new Map<string, boolean>();
  private socialEvents = [
    'argument', 'gossip', 'celebration', 'teamwork', 'nap_together',
    'racing', 'teaching', 'complaining', 'high_five', 'disagreement'
  ];

  constructor() {
    this.startCheckInterval();
  }

  private startCheckInterval() {
    setInterval(() => this.checkForInteractions(), 3000);
  }

  private checkForInteractions() {
    const ants = document.querySelectorAll('.ant-agent');
    const antArray = Array.from(ants) as HTMLElement[];
    
    for (let i = 0; i < antArray.length; i++) {
      for (let j = i + 1; j < antArray.length; j++) {
        const ant1 = antArray[i];
        const ant2 = antArray[j];
        const id1 = ant1.dataset.antId;
        const id2 = ant2.dataset.antId;
        const key = [id1, id2].sort().join('-');
        
        if (this.interactionCooldowns.has(key)) continue;
        
        const rect1 = ant1.getBoundingClientRect();
        const rect2 = ant2.getBoundingClientRect();
        const dist = Math.hypot(
          rect1.left - rect2.left,
          rect1.top - rect2.top
        );
        
        if (dist < 80 && Math.random() > 0.7) {
          this.triggerInteraction(ant1, ant2, key);
        }
      }
    }
  }

  private triggerInteraction(ant1: HTMLElement, ant2: HTMLElement, key: string) {
    const type1 = ant1.dataset.antType as AntType;
    const type2 = ant2.dataset.antType as AntType;
    
    const interactionType = this.getInteractionType(type1, type2);
    
    this.pauseAnts(ant1, ant2);
    this.faceEachOther(ant1, ant2);
    this.playInteractionDialogue(ant1, ant2, interactionType);
    
    this.interactionCooldowns.set(key, true);
    setTimeout(() => {
      this.interactionCooldowns.delete(key);
      this.resumeAnts(ant1, ant2);
    }, 5000 + Math.random() * 5000);
  }

  private getInteractionType(type1: AntType, type2: AntType): string {
    const interactions: Record<string, string> = {
      'worker-creative': 'deadline_argument',
      'worker-strategy': 'strategy_confusion',
      'creative-strategy': 'design_vs_data',
      'worker-worker': 'complaining',
      'creative-creative': 'art_critique',
      'strategy-strategy': 'theory_debate',
      'queen-any': 'royal_command',
      'deals-any': 'sales_pitch',
      'reporter-any': 'interview',
      'spark-creative': 'creative_collab',
      'tiny-any': 'asking_for_help'
    };
    
    const key = `${type1}-${type2}`;
    const reverseKey = `${type2}-${type1}`;
    
    if (type1 === 'queen' || type2 === 'queen') return 'royal_command';
    if (type1 === 'deals' || type2 === 'deals') return 'sales_pitch';
    if (type1 === 'reporter' || type2 === 'reporter') return 'interview';

    return interactions[key] || interactions[reverseKey] || 'general_chat';
  }

  private playInteractionDialogue(ant1: HTMLElement, ant2: HTMLElement, interactionType: string) {
    const dialogues: Record<string, string[][]> = {
      deadline_argument: [
        ["IT'S DUE TOMORROW", "IT'S NOT READY"],
        ["SHIP IT", "IT IS NOT READY"],
        ["QUEEN SAYS NOW", "DEFINE 'NOW'"]
      ],
      design_vs_data: [
        ["THE DATA SAYS BLUE", "MY SOUL SAYS PURPLE"],
        ["USERS PREFER SIMPLE", "USERS ARE WRONG"],
        ["TESTING SHOWS—", "I AM TESTING YOUR PATIENCE"]
      ],
      art_critique: [
        ["YOUR KERNING...", "I KNOW."],
        ["HAVE YOU TRIED LESS?", "HAVE YOU TRIED MORE?"],
        ["THE VIBE IS OFF", "THE VIBE IS INTENTIONAL"]
      ],
      complaining: [
        ["TOO MANY REVISIONS", "SAME."],
        ["WHEN IS LUNCH", "WAS YESTERDAY"],
        ["I'M TIRED", "SAME.", "SAME."]
      ],
      sales_pitch: [
        ["HAVE I GOT A DEAL—", "NO."],
        ["JUST HEAR ME OUT—", "NO."],
        ["BUNDLE PRICING—", "NO."]
      ],
      interview: [
        ["CAN I QUOTE YOU?", "ON WHAT?"],
        ["FOR THE RECORD—", "OFF THE RECORD."],
        ["ONE QUICK QUESTION", "LAST TIME YOU SAID THAT—"]
      ],
      general_chat: [
        ["HAVE YOU EATEN?", "WORKING."],
        ["NICE TUNNEL", "THANKS I DUG IT"],
        ["WHAT TIME IS IT?", "TUNNEL TIME."]
      ]
    };
    
    const dialogue = dialogues[interactionType] || dialogues.general_chat;
    const lines = dialogue[Math.floor(Math.random() * dialogue.length)];
    
    lines.forEach((line, i) => {
      const targetAnt = i % 2 === 0 ? ant1 : ant2;
      setTimeout(() => {
        this.showBubble(targetAnt, line);
      }, i * 1500);
    });
  }

  private showBubble(ant: HTMLElement, text: string) {
    const bubble = document.createElement('div');
    bubble.className = 'ant-social-bubble';
    bubble.textContent = text;
    ant.appendChild(bubble);
    setTimeout(() => bubble.remove(), 2000);
  }

  private pauseAnts(ant1: HTMLElement, ant2: HTMLElement) {
    [ant1, ant2].forEach(ant => {
      ant.classList.add('social-paused');
    });
  }

  private resumeAnts(ant1: HTMLElement, ant2: HTMLElement) {
    [ant1, ant2].forEach(ant => {
      ant.classList.remove('social-paused');
    });
  }

  private faceEachOther(ant1: HTMLElement, ant2: HTMLElement) {
    const r1 = ant1.getBoundingClientRect();
    const r2 = ant2.getBoundingClientRect();
    const scale1 = r2.left > r1.left ? 1 : -1;
    const scale2 = r1.left > r2.left ? 1 : -1;
    ant1.style.setProperty('--social-scale', scale1.toString());
    ant2.style.setProperty('--social-scale', scale2.toString());
  }
}

export const carryItemSVGs = {
  laptop: `<svg width="20" height="14" viewBox="0 0 20 14"><rect x="2" y="1" width="16" height="10" rx="1" fill="#1A1A1A" stroke="#444" stroke-width="1"/><rect x="0" y="11" width="20" height="2" rx="1" fill="#333"/><rect x="3" y="2" width="14" height="8" fill="#87CEEB"/></svg>`,
  paintbrush: `<svg width="6" height="24" viewBox="0 0 6 24"><rect x="2" y="0" width="2" height="16" fill="#8B6914"/><ellipse cx="3" cy="18" rx="3" ry="4" fill="#8B5CF6"/><ellipse cx="3" cy="21" rx="2" ry="2" fill="#6D28D9"/></svg>`,
  envelope: `<svg width="18" height="14" viewBox="0 0 18 14"><rect x="0" y="0" width="18" height="14" rx="2" fill="#F5E6C8" stroke="#8B6914" stroke-width="1"/><path d="M0,0 L9,7 L18,0" stroke="#8B6914" stroke-width="1" fill="none"/></svg>`,
  newspaper: `<svg width="20" height="16" viewBox="0 0 20 16"><rect x="0" y="0" width="20" height="16" rx="1" fill="#F5F5DC" stroke="#8B6914" stroke-width="0.5"/><rect x="2" y="2" width="16" height="2" fill="#333"/><rect x="2" y="6" width="8" height="1" fill="#666"/><rect x="2" y="8" width="10" height="1" fill="#666"/><rect x="2" y="10" width="7" height="1" fill="#666"/></svg>`,
  coin_bag: `<svg width="16" height="20" viewBox="0 0 16 20"><ellipse cx="8" cy="14" rx="7" ry="6" fill="#FFD700" stroke="#B8860B" stroke-width="1"/><path d="M5,8 Q8,2 11,8" fill="#FFD700" stroke="#B8860B" stroke-width="1"/><text x="8" y="16" text-anchor="middle" font-size="8" fill="#B8860B">$</text></svg>`,
  frame: `<svg width="24" height="20" viewBox="0 0 24 20"><rect x="0" y="0" width="24" height="20" rx="2" fill="#8B6914" stroke="#6B4226" stroke-width="2"/><rect x="3" y="3" width="18" height="14" fill="#87CEEB"/></svg>`,
  toolbox: `<svg width="20" height="16" viewBox="0 0 20 16"><rect x="0" y="5" width="20" height="11" rx="2" fill="#B8860B" stroke="#8B6914" stroke-width="1"/><path d="M7,5 L7,2 Q7,0 10,0 Q13,0 13,2 L13,5" fill="none" stroke="#8B6914" stroke-width="1.5"/><rect x="8" y="9" width="4" height="2" rx="1" fill="#6B4226"/></svg>`,
  award_trophy: `<svg width="16" height="22" viewBox="0 0 16 22"><path d="M4,8 Q0,8 0,4 L4,4" fill="none" stroke="#FFD700" stroke-width="2"/><path d="M12,8 Q16,8 16,4 L12,4" fill="none" stroke="#FFD700" stroke-width="2"/><rect x="3" y="0" width="10" height="10" rx="5" fill="#FFD700" stroke="#B8860B" stroke-width="1"/><rect x="6" y="10" width="4" height="6" fill="#B8860B"/><rect x="3" y="16" width="10" height="3" rx="1" fill="#B8860B"/></svg>`
};

export const antCarryingItems: Record<string, Partial<Record<AntType, keyof typeof carryItemSVGs>>> = {
  home: {
    worker: 'laptop',
    creative: 'paintbrush',
    strategy: 'award_trophy',
    reporter: 'newspaper'
  },
  portfolio: {
    worker: 'frame',
    creative: 'paintbrush',
    strategy: 'award_trophy',
    reporter: 'newspaper'
  },
  services: {
    worker: 'toolbox',
    creative: 'paintbrush',
    strategy: 'envelope',
    deals: 'coin_bag'
  },
  contact: {
    worker: 'envelope',
    reporter: 'newspaper',
    tiny: 'envelope'
  },
  blog: {
    reporter: 'newspaper',
    strategy: 'newspaper',
    worker: 'newspaper'
  }
};
