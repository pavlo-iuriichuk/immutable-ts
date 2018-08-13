import { expect } from "chai";
import { List } from "./List";
describe("List", () => {
  describe("#size()", () => {
    it("should return 0 for empty list", () => {
      expect(List.Empty().size()).to.eq(0);
    });
    it("should return 1 for list with one element", () => {
      expect(new List(1).size()).to.eq(1);
    });
    it("should return 2 for list of 2 elements", () => {
      expect(new List(1, new List(2)).size()).to.eq(2);
    });
  });
});
