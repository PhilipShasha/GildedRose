var {expect} = require('chai');
var fs = require('fs');
var {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it("comply to the master.txt file", function() {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20), //
      new Item("Aged Brie", 2, 0), //
      new Item("Elixir of the Mongoose", 5, 7), //
      new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6)
    ];

    let numDays = 31;
    let gildedRose = new Shop(items);
    let output = "";

    for (let i = 0; i < numDays; i++) {
      output += "-------- day " + i + " --------\n";
      output += "name, sellIn, quality\n";

      for (let j = 0; j < items.length; j++) {
        let item = items[j];
        output += item.name + ", " + item.sellIn + ", " + item.quality + "\n";
      }
      output += "\n";

      gildedRose.updateQuality();

    }

    let master = fs.readFileSync('./test/master.txt', 'utf8');
    expect(output).to.equal(master);
  });
});