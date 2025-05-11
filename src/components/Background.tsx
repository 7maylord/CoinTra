'use client';

import { useEffect, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type ISourceOptions } from '@tsparticles/engine';

export default function ParticlesBackground() {
  useEffect(() => {
    initParticlesEngine(async () => {
      await import('@tsparticles/slim');
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: '#0d1a33', // Dark blue for crypto vibe
        },
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: ['#40c4ff', '#00ff00', '#ff4081'], // Neon cyan, green, pink
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
        },
        size: {
          value: { min: 1, max: 3 },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none',
          random: true,
          straight: false,
          outModes: {
            default: 'out',
          },
        },
        links: {
          enable: true,
          distance: 150,
          color: '#40c4ff',
          opacity: 0.3,
          width: 1,
        },
      },
      detectRetina: true,
    }),
    []
  );

  return <Particles id="tsparticles" options={options} className="absolute inset-0 z-0" />;
}