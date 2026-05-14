/* ============================================================
   IRIDESCENCE COMPONENT — Obsidian Intelligence
   WebGL canvas that creates a slow, atmospheric iridescent shimmer.
   Used as hero background, section atmosphere, and contact backdrop.
   ============================================================ */

import { useEffect, useRef } from "react";

interface IridescenceProps {
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
  className?: string;
  overlayOpacity?: number;
}

export default function Iridescence({
  color = [0.55, 0.35, 0.9],
  speed = 0.3,
  amplitude = 0.04,
  mouseReact = true,
  className = "",
  overlayOpacity = 0.72,
}: IridescenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return;

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform vec3 u_color;
      uniform float u_amplitude;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 mouse = u_mouse;

        float dist = length(uv - mouse);
        float wave = sin(uv.x * 4.0 + u_time * 0.8) * cos(uv.y * 3.0 + u_time * 0.6);
        wave += sin(dist * 8.0 - u_time * 1.2) * 0.4;
        wave *= u_amplitude;

        float hue = u_color.x + wave + uv.x * 0.15 + uv.y * 0.08;
        float sat = 0.55 + wave * 2.0;
        float val = 0.18 + abs(wave) * 3.0;

        vec3 rgb = hsv2rgb(vec3(hue, sat, val));
        gl_FragColor = vec4(rgb, 1.0);
      }
    `;

    function compileShader(type: number, src: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      return shader;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uColor = gl.getUniformLocation(program, "u_color");
    const uAmp = gl.getUniformLocation(program, "u_amplitude");

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let start = performance.now();

    function render() {
      const t = (performance.now() - start) / 1000 * speed;
      gl!.uniform1f(uTime, t);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform2f(uMouse, mouseRef.current.x, 1 - mouseRef.current.y);
      gl!.uniform3f(uColor, ...color);
      gl!.uniform1f(uAmp, amplitude);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    }
    render();

    function onMouseMove(e: MouseEvent) {
      if (!mouseReact || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    }
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [color, speed, amplitude, mouseReact]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        className="absolute inset-0"
        style={{ background: `rgba(7, 4, 9, ${overlayOpacity})` }}
      />
    </div>
  );
}
