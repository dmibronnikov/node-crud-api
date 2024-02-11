import { sayHi } from "index";

describe('simple tests', () => {
    test('just to check it works', () => {
        const logSpy = jest.spyOn(console, 'log');

        sayHi();

        expect(logSpy).toHaveBeenCalledWith('Hey!');
    });
});