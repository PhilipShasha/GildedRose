class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality(){
    for (let item of this.items) {
      this.updateItemQuality(item);
    }

    return this.items;
  }

  updateItemQuality(item) {
    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        this.adjustQuality(item, -1);
      }
    } else {
      this.adjustQuality(item, 1);
      if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sellIn < 11) {
          this.adjustQuality(item, 1);
        }
        if (item.sellIn < 6) {
          this.adjustQuality(item, 1);
        }
      }
    }
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sellIn = item.sellIn - 1;
    }
    if (item.sellIn < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            this.adjustQuality(item, -1);
          }
        } else {
          this.adjustQuality(item, -item.quality);
        }
      } else {
        this.adjustQuality(item, 1);
      }
    }
  }

  adjustQuality(item, adjustment) {
    let newQuality = item.quality + adjustment;
    if (newQuality <= 50 && newQuality >= 0){
      item.quality = newQuality
    }
  }

}
module.exports = {
  Item,
  Shop
}