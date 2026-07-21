import { counterRepository } from "./counter.repository";

export class CounterService {
    async generate(prefix: string): Promise<string> {
        const sequence = await counterRepository.getNextSequence(prefix);

        return `${prefix}-${sequence.toString().padStart(6, "0")}`;
    }
}

export const counterService = new CounterService();