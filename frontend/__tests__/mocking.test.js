function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

describe("mocking learning", () => {
  it("mocks a reg function", () => {
    const fetchDogs = jest.fn();
    fetchDogs("snickers");
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith("snickers");
    fetchDogs("hugo");
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });

  it("can create a person", () => {
    const me = new Person("Wes", ["pizza", "burgs"]);
    expect(me.name).toBe("Wes");
  });

  it("can fetch foods", async () => {
    const me = new Person("Wes", ["pizza", "burgs"]);
    //mock the favFoods function
    me.fetchFavFoods = jest.fn().mockResolvedValue(["sushi", "ramen"]);
    const favFoods = await me.fetchFavFoods();
    expect(favFoods).toContain("ramen");
  });
});
