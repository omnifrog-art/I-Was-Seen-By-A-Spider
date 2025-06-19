window.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.scrolling-track');
    const items = track.querySelectorAll('.bg-text');
    let itemWidth = items[0].offsetWidth;
    let gap = window.innerWidth * 0.1; // 10vw
    let position = 0;
    const speed = 0.5; // 固定速度
    function updateSizes() {
        itemWidth = items[0].offsetWidth;
        gap = window.innerWidth * 0.1;
    }
    function animate() {
        position -= speed;
        if (Math.abs(position) >= (itemWidth + gap)) {
            position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }
    // 初始化尺寸
    updateSizes();
    // animate() 延迟1秒启动
    setTimeout(() => {
        animate();
    }, 1000);
    // 监听窗口变化更新尺寸
    window.addEventListener('resize', updateSizes);
    // 淡入效果
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transition = 'opacity 1s ease-out';
    });
    setTimeout(() => {
        items.forEach(item => {
            item.style.opacity = '1';
        });
    }, 1000); // 页面完全加载后1秒，开始淡入
});

window.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.content-wrapper');
    if (wrapper) {
        wrapper.style.opacity = '0';
        wrapper.style.transition = 'opacity 1s ease-out';
        setTimeout(() => {
            wrapper.style.opacity = '1';
        }, 1000); // 页面加载1秒后，开始淡入
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const shells = document.querySelectorAll('.bg-text-shell');
    let isCrtRunning = false;
    let tinyGlitchTimer = null;
    let bigGlitchTimer = null;
    function clearClones() {
        shells.forEach(shell => {
            const clones = shell.querySelectorAll('.bg-text-clone');
            clones.forEach(clone => {
                clone.style.opacity = 0;
                clone.style.transform = 'translate(0, 0) scale(1)';
                clone.style.filter = 'none';
            });
        });
    }
    function doTinyGlitch() {
        if (isCrtRunning) return;
        shells.forEach(shell => {
            const clones = shell.querySelectorAll('.bg-text-clone');
            const offsetX = () => (Math.random() * 12 - 6) + "px";
            const offsetY = () => (Math.random() * 12 - 6) + "px";
            const randomOpacity = 0.15 + Math.random() * 0.1;
            clones.forEach(clone => {
                clone.style.opacity = randomOpacity.toFixed(2);
                clone.style.transform = `translate(${offsetX()}, ${offsetY()})`;
                clone.style.filter = "none";
            });
            setTimeout(() => {
                clones.forEach(clone => {
                    clone.style.opacity = 0;
                    clone.style.transform = `translate(0, 0)`;
                });
            }, 200);
        });
    }
    function scheduleTinyGlitch() {
        if (tinyGlitchTimer) clearTimeout(tinyGlitchTimer);
        if (isCrtRunning) return;
        doTinyGlitch();
        tinyGlitchTimer = setTimeout(scheduleTinyGlitch, Math.random() * 1000 + 1000);
    }
    function doBigGlitchOnce() {
        shells.forEach(shell => {
            const clones = shell.querySelectorAll('.bg-text-clone');
            const offsetX = () => (Math.random() * 100 - 50) + "px";
            const offsetY = () => (Math.random() * 100 - 50) + "px";
            const randomOpacity = 0.7 + Math.random() * 0.25;
            clones.forEach(clone => {
                clone.style.opacity = randomOpacity.toFixed(2);
                clone.style.transform = `translate(${offsetX()}, ${offsetY()}) scale(${1 + Math.random() * 0.08})`;
                clone.style.filter = "blur(0.6px) contrast(150%)";
            });
            setTimeout(() => {
                clones.forEach(clone => {
                    clone.style.opacity = 0;
                    clone.style.transform = `translate(0, 0) scale(1)`;
                    clone.style.filter = "none";
                });
            }, 180);
        });
    }
    function scheduleBigGlitch() {
        if (bigGlitchTimer) clearTimeout(bigGlitchTimer);
        if (isCrtRunning) return;
        const blastCount = Math.floor(Math.random() * 3) + 1;
        let delay = 0;
        for (let i = 0; i < blastCount; i++) {
            setTimeout(() => {
                if (!isCrtRunning) doBigGlitchOnce();
            }, delay);
            delay += 160 + Math.random() * 40;
        }
        const nextDelay = delay + Math.random() * 3000 + 3000;
        bigGlitchTimer = setTimeout(scheduleBigGlitch, nextDelay);
    }
    function startGlitches() {
        scheduleTinyGlitch();
        scheduleBigGlitch();
    }
    function stopGlitches() {
        clearTimeout(tinyGlitchTimer);
        clearTimeout(bigGlitchTimer);
        tinyGlitchTimer = null;
        bigGlitchTimer = null;
        clearClones();
    }
    function crtEffect() {
        isCrtRunning = true;
        stopGlitches();
        shells.forEach(shell => {
            const texts = shell.querySelectorAll('.bg-text, .bg-text-clone');
            texts.forEach(text => {
                text.style.transition = "none";
                text.style.transform = "scaleY(1) scaleX(1) translate(0, 0)";
                text.style.opacity = "1";
                text.style.filter = "none";
            });
            setTimeout(() => {
                texts.forEach(text => {
                    if (text.classList.contains('bg-text-clone')) {
                        text.style.transition = "opacity 0.2s ease-out, transform 0.2s ease-in";
                        text.style.opacity = "0";
                        text.style.transform = "scaleY(0.05) scaleX(1)";
                    } else {
                        text.style.transition = "transform 0.2s ease-in";
                        text.style.transform = "scaleY(0.05) scaleX(1)";
                        text.style.opacity = "1";
                    }
                });
            }, 10);
            setTimeout(() => {
                texts.forEach(text => {
                    text.style.transition = "transform 0.1s ease-in, opacity 0.1s ease-out";
                    text.style.transform = "scaleY(0.05) scaleX(0)";
                    text.style.opacity = "0";
                });
            }, 210);
            setTimeout(() => {
                texts.forEach(text => {
                    text.style.transition = "opacity 3s ease-out, transform 0s";
                    text.style.transform = "scaleY(1) scaleX(1)";
                    text.style.opacity = "1";
                });
                isCrtRunning = false;
                startGlitches();
            }, 1800);
        });
    }
    // ⏱ 延迟3秒首次执行 CRT，再每12秒循环一次
    setTimeout(() => {
        crtEffect();
        setInterval(crtEffect, 12000);
    }, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector(".grain-overlay");
    if (supportsWebGL()) {
        initWebGLGrain();
    } else {
        initCanvas2DGrain();
    }
    function supportsWebGL() {
        try {
            const canvas = document.createElement("canvas");
            return !!window.WebGLRenderingContext && canvas.getContext("webgl");
        } catch (e) {
            return false;
        }
    }
    function initWebGLGrain() {
        const layers = [
            { id: "grain-base", frag: baseFrag },
            { id: "grain-float", frag: floatFrag },
            { id: "grain-warp", frag: warpFrag }
        ];
        const dpr = window.devicePixelRatio || 1;
        function createCanvas(id) {
            const canvas = document.createElement("canvas");
            canvas.id = id;
            canvas.className = "grain-canvas";
            overlay.appendChild(canvas);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            return canvas;
        }
        function createShader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        }
        function createProgram(gl, vsSource, fsSource) {
            const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
            const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
            const program = gl.createProgram();
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);
            return program;
        }
        const programs = layers.map(({ id, frag }) => {
            const canvas = createCanvas(id);
            const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
            const vsSource = `attribute vec4 a_position; void main() { gl_Position = a_position; }`;
            const fsSource = frag();
            const program = createProgram(gl, vsSource, fsSource);
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                -1, -1, 1, -1, -1, 1,
                -1, 1, 1, -1, 1, 1
            ]), gl.STATIC_DRAW);
            const aPosition = gl.getAttribLocation(program, "a_position");
            gl.enableVertexAttribArray(aPosition);
            gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
            const uTime = gl.getUniformLocation(program, "u_time");
            return { gl, program, canvas, uTime };
        });
        function resize() {
            programs.forEach(({ gl, canvas }) => {
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                gl.viewport(0, 0, canvas.width, canvas.height);
            });
        }
        window.addEventListener("resize", resize);
        resize();
        let time = 0;
        let lastFrame = 0;
        const fps = 24;
        const frameInterval = 1000 / fps;
        function render(timestamp) {
            if (timestamp - lastFrame >= frameInterval) {
                time += 0.015;
                programs.forEach(({ gl, program, uTime }) => {
                    gl.useProgram(program);
                    gl.uniform1f(uTime, time);
                    gl.drawArrays(gl.TRIANGLES, 0, 6);
                });
                lastFrame = timestamp;
            }
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }
    function initCanvas2DGrain() {
        const canvas = document.createElement("canvas");
        canvas.className = "grain-canvas";
        overlay.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        function generateAlphaGrain() {
            const width = canvas.width;
            const height = canvas.height;
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const isGrain = Math.random() < 0.06;
                const alpha = isGrain ? 20 + Math.random() * 20 : 0;
                const gray = 180 + Math.random() * 30; // 更偏亮
                data[i] = gray;
                data[i + 1] = gray;
                data[i + 2] = gray;
                data[i + 3] = alpha;
            }
            ctx.putImageData(imageData, 0, 0);
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        setInterval(() => {
            generateAlphaGrain();
        }, 1000 / 24);
    }
    // 🎨 shader functions - 黑白灰收敛版
    function baseFrag() {
        return `
        precision mediump float;
        uniform float u_time;
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453);
        }
        void main() {
          vec2 uv = gl_FragCoord.xy * 1.5;
          float g = random(uv + u_time * 10.0);
          float gray = 0.6 + g * 0.3; // ⚡️亮度范围限定在0.6-0.9
          gl_FragColor = vec4(vec3(gray), g * 0.04); // ⚡️粒子透明度调低
        }`;
    }
    function floatFrag() {
        return `
        precision mediump float;
        uniform float u_time;
        void main() {
          vec2 uv = gl_FragCoord.xy * 0.002 + u_time * 0.02;
          float flow = fract(sin(dot(uv, vec2(15.1, 63.8))) * 10000.0);
          flow = smoothstep(0.4, 1.0, flow);
          gl_FragColor = vec4(vec3(flow), flow * 0.02);
        }`;
    }
    function warpFrag() {
        return `
        precision mediump float;
        uniform float u_time;
        void main() {
          vec2 uv = gl_FragCoord.xy;
          float shift = sin(uv.y * 0.05 + u_time * 2.0) * 0.003;
          float g = fract(sin(dot((uv + vec2(shift, 0.0)) * 1.2, vec2(12.9898,78.233))) * 43758.5453);
          vec3 gray = vec3(g);
          gl_FragColor = vec4(gray, g * 0.03);
        }`;
    }
});