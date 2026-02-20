import type { Command } from './Command';

export class CommandManager {
    private history: Command[] = [];
    private future: Command[] = [];
    private maxHistory: number = 100;

    constructor() { }

    execute(command: Command) {
        command.execute();
        this.history.push(command);
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
        this.future = []; // Clear redo stack on new action
    }

    undo() {
        const command = this.history.pop();
        if (command) {
            command.undo();
            this.future.push(command);
        }
    }

    redo() {
        const command = this.future.pop();
        if (command) {
            command.execute();
            this.history.push(command);
        }
    }

    canUndo(): boolean {
        return this.history.length > 0;
    }

    canRedo(): boolean {
        return this.future.length > 0;
    }
}
