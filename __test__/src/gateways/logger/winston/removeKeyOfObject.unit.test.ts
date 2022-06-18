import { removeKeyOfObject } from "../../../../../src/gateways/logger/winston/removeKeyOfObject";

class TestKeyToRemove {
    public test01: string;
    public test02: string;
}

describe("Test of removeKeyOfObject", () => {
    it("Should remove field", () => {
        const testKeyToRemove = new TestKeyToRemove();
        testKeyToRemove.test01 = "anyTest01";
        testKeyToRemove.test02 = "anyTest02";

        const removedResponse = removeKeyOfObject(testKeyToRemove, ["test01"]);

        expect(removedResponse).toEqual({ test02: "anyTest02" });

        expect(testKeyToRemove).toEqual({ test01: "anyTest01", test02: "anyTest02" });
    });

    it("Should remove all fields", () => {
        const testKeyToRemove = new TestKeyToRemove();
        testKeyToRemove.test01 = "anyTest01";
        testKeyToRemove.test02 = "anyTest02";

        const removedResponse = removeKeyOfObject(testKeyToRemove, ["test01", "test02"]);

        expect(removedResponse).toEqual({});

        expect(testKeyToRemove).toEqual({ test01: "anyTest01", test02: "anyTest02" });
    });
});
