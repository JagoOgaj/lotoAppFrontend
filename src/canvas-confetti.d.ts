declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    startVelocity?: number;
    spread?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: string[];
  }

  function confetti(options?: ConfettiOptions): void;
  export default confetti;
}
