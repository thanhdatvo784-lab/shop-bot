import { CounterModel } from "./counter.model";

export class CounterRepository {
    async getNextSequence(key: string): Promise<number> {
        const counter = await CounterModel.findOneAndUpdate(
            { key },
            { $inc: { sequence: 1 } },
            {
                new: true,
                upsert: true,
            }
        );

        return counter.sequence;
    }
}

export const counterRepository = new CounterRepository();