/**
 * FileIO: Utilities for file system interactions (Save, Load, Clipboard).
 */
export class FileIO {

    /**
     * Trigger a file download in the browser.
     * @param content String content to save
     * @param filename default filename
     * @param type MIME type (e.g. 'application/json', 'chemical/x-mdl-molfile')
     */
    static saveFile(content: string, filename: string, type: string) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Serializes the entire canvas state (molecule, viewport, etc.) to JSON.
     * @param molecule The molecule object
     * @param storeState Additional store state (zoom, offset)
     */
    static saveToChemora(molecule: any, storeState: any): string {
        const data = {
            version: '3.2',
            timestamp: new Date().toISOString(),
            molecule: {
                atoms: Array.from(molecule.atoms.entries()),
                bonds: Array.from(molecule.bonds.entries())
            },
            view: {
                zoom: storeState.zoom,
                offset: storeState.offset // Vec2D
            }
        };
        return JSON.stringify(data, null, 2);
    }

    /**
     * Trigger file picker and load content.
     */
    static openFile(accept: string = '.chemora,.json,.mol,.sdf'): Promise<{ name: string, content: string }> {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = accept;
            input.onchange = (e: any) => {
                const file = e.target.files[0];
                if (!file) {
                    reject('No file selected');
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    resolve({
                        name: file.name,
                        content: event.target?.result as string
                    });
                };
                reader.onerror = (err) => reject(err);
                reader.readAsText(file);
            };
            input.click();
        });
    }

    /**
     * Copy text to clipboard.
     */
    static async copyToClipboard(text: string): Promise<void> {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy', err);
            // Fallback?
        }
    }
}
