import { counterService } from "../../modules/counter/counter.service";

export class IdGenerator {
    static async generate(prefix: string): Promise<string> {
        return counterService.generate(prefix);
    }
}