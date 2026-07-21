import { counterService } from "./counter.service";

export class CounterController {
    async generate(prefix: string): Promise<string> {
        return counterService.generate(prefix);
    }
}

export const counterController = new CounterController();