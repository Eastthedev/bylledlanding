import * as THREE from 'three';

const fragmentShader = `
uniform float time;
uniform float progress;
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;

uniform vec4 resolution;
uniform vec2 uMouse;
uniform float uGridSize;
uniform bool uHighlightHoveredCell;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5, 0.555);
  vec4 color = texture2D(uTexture, newUV);
  vec4 offset = texture2D(uDataTexture, vUv);
  
  vec4 finalColor = texture2D(uTexture, newUV - 0.02 * offset.rg);
  
  if (uHighlightHoveredCell) {
    float mouseGridX = floor(uMouse.x * uGridSize);
    float mouseGridY = floor(uMouse.y * uGridSize);
    float currentGridX = floor(vUv.x * uGridSize);
    float currentGridY = floor(vUv.y * uGridSize);
    
    if (currentGridX == mouseGridX && currentGridY == mouseGridY) {
      finalColor = vec4(0.03921568627, 0.08235294118, 0.05490196078, 1.0);
    }
  }
  
  gl_FragColor = finalColor;
}
`;

const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}

export class HeroDistortion {
  constructor(container) {
    this.container = container;
    this.width = container.offsetWidth || 1512;
    this.height = container.offsetHeight || 865;
    
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x0a150e, 1);
    
    this.container.appendChild(this.renderer.domElement);
    
    const t = 1;
    this.camera = new THREE.OrthographicCamera(t / -2, t / 2, t / 2, t / -2, -1000, 1000);
    this.camera.position.set(0, 0, 2);
    
    this.time = 0;
    this.mouse = { x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5, vX: 0, vY: 0 };
    this.isPlaying = true;
    
    this.settings = {
      grid: 16,
      mouse: 0.15,
      strength: 0.08,
      relaxation: 0.85,
      highlightHoveredCell: false,
    };
    
    this.addObjects();
    this.resize();
    this.render = this.render.bind(this);
    this.render();
    this.setupResize();
    this.mouseEvents();
  }

  mouseEvents() {
    window.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / this.width;
      const y = (e.clientY - rect.top) / this.height;
      
      this.mouse.x = clamp(x, 0, 1);
      this.mouse.y = clamp(y, 0, 1);
      this.mouse.vX = this.mouse.x - this.mouse.prevX;
      this.mouse.vY = this.mouse.y - this.mouse.prevY;
      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;
    });
  }

  setupResize() {
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    if (!this.width || !this.height) return;
    
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.imageAspect = 865.36 / 1512;
    
    let a1, a2;
    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = (this.height / this.width) / this.imageAspect;
    }
    
    if (this.material) {
      this.material.uniforms.resolution.value.x = this.width;
      this.material.uniforms.resolution.value.y = this.height;
      this.material.uniforms.resolution.value.z = a1;
      this.material.uniforms.resolution.value.w = a2;
    }
    
    this.camera.updateProjectionMatrix();
    this.regenerateGrid();
  }

  regenerateGrid() {
    this.size = this.settings.grid;
    const count = this.size * this.size;
    const data = new Float32Array(4 * count);
    
    for (let p = 0; p < count; p++) {
      const f = Math.random() * 255 - 125;
      const S = Math.random() * 255 - 125;
      const d = p * 4;
      data[d] = f;
      data[d + 1] = S;
      data[d + 2] = f;
      data[d + 3] = 255;
    }
    
    this.texture = new THREE.DataTexture(data, this.size, this.size, THREE.RGBAFormat, THREE.FloatType);
    this.texture.magFilter = this.texture.minFilter = THREE.NearestFilter;
    this.texture.needsUpdate = true;
    
    if (this.material) {
      this.material.uniforms.uDataTexture.value = this.texture;
    }
  }

  addObjects() {
    this.regenerateGrid();
    
    const textureLoader = new THREE.TextureLoader();
    const mainTexture = textureLoader.load('/images/index-hero-hd.webp', () => {
      this.resize();
    });
    
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
        uTexture: { value: mainTexture },
        uDataTexture: { value: this.texture },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uGridSize: { value: 16 },
        uHighlightHoveredCell: { value: false },
      },
      vertexShader,
      fragmentShader,
    });
    
    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  updateDataTexture() {
    if (!this.texture || !this.texture.image) return;
    const data = this.texture.image.data;
    for (let p = 0; p < data.length; p += 4) {
      data[p] *= this.settings.relaxation;
      data[p + 1] *= this.settings.relaxation;
    }
    
    const gridX = this.size * this.mouse.x;
    const gridY = this.size * (1 - this.mouse.y);
    const radius = this.size * this.settings.mouse;
    const aspect = this.height / this.width;
    
    for (let p = 0; p < this.size; p++) {
      for (let f = 0; f < this.size; f++) {
        const distSq = ((gridX - p) ** 2) / aspect + ((gridY - f) ** 2);
        const radSq = radius ** 2;
        if (distSq < radSq) {
          const idx = 4 * (p + this.size * f);
          let w = radius / Math.sqrt(distSq || 0.0001);
          w = clamp(w, 0, 10);
          data[idx] += this.settings.strength * 100 * this.mouse.vX * w;
          data[idx + 1] -= this.settings.strength * 100 * this.mouse.vY * w;
        }
      }
    }
    
    this.mouse.vX *= 0.9;
    this.mouse.vY *= 0.9;
    this.texture.needsUpdate = true;
  }

  render() {
    if (!this.isPlaying) return;
    this.time += 0.05;
    this.updateDataTexture();
    
    if (this.material) {
      this.material.uniforms.time.value = this.time;
      this.material.uniforms.uMouse.value.x = this.mouse.x;
      this.material.uniforms.uMouse.value.y = 1 - this.mouse.y;
      this.material.uniforms.uGridSize.value = this.settings.grid;
    }
    
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
  }

  destroy() {
    this.isPlaying = false;
    if (this.renderer?.domElement) this.renderer.domElement.remove();
    this.geometry?.dispose();
    this.material?.dispose();
    this.texture?.dispose();
    this.renderer?.dispose();
  }
}
