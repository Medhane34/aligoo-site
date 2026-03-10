// components/AnimatedOverlayStable.tsx
// Renders ONLY the constellation canvas background.
// All hero text/buttons live in HeroSectionStable (the static layer).
"use client";

import { useEffect, useRef } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

// --- Constellation Background ---
const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 150;
const MOUSE_DISTANCE = 200;
const COLORS = ["#EF4444", "#F97316", "#EAB308"];

class Particle {
    x: number; y: number;
    vx: number; vy: number;
    size: number; color: string;
    width: number; height: number;

    constructor(width: number, height: number) {
        this.width = width; this.height = height;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    update(mouse: { x: number; y: number }, width: number, height: number) {
        this.width = width; this.height = height;
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < MOUSE_DISTANCE) {
            const force = (MOUSE_DISTANCE - distance) / MOUSE_DISTANCE;
            this.x -= (dx / distance) * force * 2;
            this.y -= (dy / distance) * force * 2;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function ConstellationBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let animationFrameId: number;

        const particles: Particle[] = [];
        const mouse = { x: -1000, y: -1000 };

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle(width, height));
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p) => { p.update(mouse, width, height); p.draw(ctx); });
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DISTANCE) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255,100,50,${1 - dist / CONNECTION_DISTANCE})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const onResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
        const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
        const onLeave = () => { mouse.x = -1000; mouse.y = -1000; };

        window.addEventListener("resize", onResize);
        canvas.addEventListener("mousemove", onMove);
        canvas.addEventListener("mouseleave", onLeave);
        animate();

        return () => {
            window.removeEventListener("resize", onResize);
            canvas.removeEventListener("mousemove", onMove);
            canvas.removeEventListener("mouseleave", onLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-background-dark/90 z-0 hidden dark:block" />
            <canvas ref={canvasRef} className="absolute inset-0 z-10 block opacity-60" />
        </div>
    );
}

// Exported component: background canvas only, no hero content.
export default function AnimatedOverlay() {
    return (
        <LazyMotion features={domAnimation}>
            <div className="absolute inset-0 z-0 pointer-events-none">
                <ConstellationBackground />
            </div>
        </LazyMotion>
    );
}