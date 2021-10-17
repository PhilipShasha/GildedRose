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
    this.agedBrie = 'Aged Brie';
    this.backstagePass = 'Backstage passes to a TAFKAL80ETC concert';
    this.sulfuras = 'Sulfuras, Hand of Ragnaros';
    this.conjured = 'Conjured Mana Cake';
  }

  updateQuality(){
    for (let item of this.items) {
      this.updateItemQuality(item);
    }

    return this.items;
  }

  updateItemQuality(item) {
    let degradeRate = -1;
    let itemCanDegrade = (item.name != this.agedBrie && item.name != this.backstagePass && item.name !=this.sulfuras);
    
    if (item.name == this.conjured){
      degradeRate = -2;
    }

    if (itemCanDegrade) {
      this.adjustQuality(item, degradeRate);
    }


    if (item.name == this.agedBrie || item.name == this.backstagePass) {
      this.adjustQuality(item, 1);
    }

    if (item.name == this.backstagePass) {
      if (item.sellIn < 11) {
        this.adjustQuality(item, 1);
      }
      if (item.sellIn < 6) {
        this.adjustQuality(item, 1);
      }
    }

    if (item.name != this.sulfuras) {
      item.sellIn = item.sellIn - 1;
    }
    if (item.sellIn < 0) {
      if (itemCanDegrade) {
        this.adjustQuality(item, degradeRate);
      }

      if (item.name == this.agedBrie) {
        this.adjustQuality(item, 1);
      } else if (item.name == this.backstagePass){
        this.adjustQuality(item, -item.quality);
      }
    }
  }

  adjustQuality(item, adjustment) {
    let newQuality = item.quality + adjustment;
    if (newQuality <= 0){
      item.quality = 0;
    }
    else if (newQuality >= 50) {
      item.quality = 50;
    }
    else{
      item.quality = newQuality;
    }
  }

}
module.exports = {
  Item,
  Shop
}