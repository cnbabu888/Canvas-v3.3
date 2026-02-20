// @ts-nocheck

export class RenderEngine {
    private canvas: HTMLCanvasElement;
    private device: GPUDevice | null = null;
    private context: GPUCanvasContext | null = null;
    private format: GPUTextureFormat = 'bgra8unorm';
    private pipeline: GPURenderPipeline | null = null;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    async init() {
        if (!navigator.gpu) {
            console.error("WebGPU not supported");
            return;
        }

        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            console.error("No WebGPU adapter found");
            return;
        }

        this.device = await adapter.requestDevice();
        this.context = this.canvas.getContext('webgpu') as GPUCanvasContext;

        this.format = navigator.gpu.getPreferredCanvasFormat();
        this.context.configure({
            device: this.device,
            format: this.format,
            alphaMode: 'premultiplied',
        });

        await this.createPipeline();
        this.render();
    }

    private async createPipeline() {
        if (!this.device) return;

        const shaderModule = this.device.createShaderModule({
            code: `
                @vertex
                fn vs_main(@builtin(vertex_index) VertexIndex : u32) -> @builtin(position) vec4<f32> {
                    var pos = array<vec2<f32>, 4>(
                        vec2<f32>(-1.0, -1.0),
                        vec2<f32>(1.0, -1.0),
                        vec2<f32>(-1.0, 1.0),
                        vec2<f32>(1.0, 1.0)
                    );
                    return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
                }

                @fragment
                fn fs_main(@builtin(position) GlobalInvocationID : vec4<f32>) -> @location(0) vec4<f32> {
                    let gridColor = vec4<f32>(0.2, 0.2, 0.2, 0.1); // Subtle grey
                    let bgColor = vec4<f32>(0.95, 0.95, 0.96, 1.0); // Off-white canvas
                    
                    // Simple grid logic (placeholder for 60fps infinite grid)
                    let x = GlobalInvocationID.x;
                    let y = GlobalInvocationID.y;
                    
                    if (u32(x) % 50 == 0 || u32(y) % 50 == 0) {
                        return gridColor;
                    }
                    return bgColor;
                }
            `
        });

        this.pipeline = this.device.createRenderPipeline({
            layout: 'auto',
            vertex: {
                module: shaderModule,
                entryPoint: 'vs_main',
            },
            fragment: {
                module: shaderModule,
                entryPoint: 'fs_main',
                targets: [{ format: this.format }],
            },
            primitive: {
                topology: 'triangle-strip',
            },
        });
    }

    render = () => {
        if (!this.device || !this.context || !this.pipeline) return;

        const commandEncoder = this.device.createCommandEncoder();
        const textureView = this.context.getCurrentTexture().createView();

        const renderPassDescriptor: GPURenderPassDescriptor = {
            colorAttachments: [{
                view: textureView,
                clearValue: { r: 0.95, g: 0.95, b: 0.96, a: 1.0 },
                loadOp: 'clear',
                storeOp: 'store',
            }],
        };

        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(this.pipeline);
        passEncoder.draw(4, 1, 0, 0);
        passEncoder.end();

        this.device.queue.submit([commandEncoder.finish()]);

        requestAnimationFrame(this.render);
    }
}
