import * as THREE from 'three';

const CAMERA_FOV = 75;
const CAMERA_ASPECT = 2;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 5;

const NOOP = () => {};

export default class ThreeApplication {
  constructor({
    pixelRatio = window.devicePixelRatio,
    autoResize = true,
    onRenderCallback = NOOP,
  } = {}) {
    this.autoResize = autoResize;
    this.width = 0;
    this.height = 0;
    this.pixelRatio = pixelRatio;
    this.onRenderCallback = onRenderCallback;
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('js-canvas'),
      antialias: true
    });
    this.camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      CAMERA_ASPECT,
      CAMERA_NEAR,
      CAMERA_FAR
    );
    this.camera.position.z = -10;
    this.scene = new THREE.Scene();
  }



  resizeToCanvasSize() {
    const { clientWidth, clientHeight } = this.renderer.domElement;
    this.resize(clientWidth, clientHeight);
  }

  resize(width, height) {
    const { renderer, camera, pixelRatio } = this;
    if (this.width !== width || this.height !== height) {
      this.width = width * pixelRatio | 0;
      this.height = height * pixelRatio | 0;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }

  onRender() {
    const { camera, renderer, autoResize } = this;
    if (autoResize) {
      this.resizeToCanvasSize();
    }
    this.onRenderCallback({
      camera,
      renderer,
    });
  }
}