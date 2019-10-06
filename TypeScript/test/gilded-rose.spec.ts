import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function() {
  describe('is not "Aged Brie" and "Backstage passes to a TAFKAL80ETC concert"', () => {
    describe('Not "Sulfuras, Hand of Ragnaros"', () => {
      it('should return sellIn of -1', function() {
        const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
        const items = gildedRose.updateQuality();
        const foo = items[0];
        expect(foo.name).to.equal('foo');
        expect(foo.sellIn).to.equal(-1);
        expect(foo.quality).to.equal(0);
      });

      it('should reduce quantity by one if quantity >= 0 and sellIn >= 0', function() {
        const gildedRose = new GildedRose([new Item('foo', 0, 2)]);
        const items = gildedRose.updateQuality();
        const foo = items[0];
        expect(foo.name).to.equal('foo');
        expect(foo.sellIn).to.equal(-1);
        expect(foo.quality).to.equal(0);
      });

      it('should not reduce quantity by one if quantity = 0 and sellIn >= 0', function() {
        const gildedRose = new GildedRose([new Item('foo', 1, 0)]);
        const items = gildedRose.updateQuality();
        const foo = items[0];
        expect(foo.name).to.equal('foo');
        expect(foo.sellIn).to.equal(0);
        expect(foo.quality).to.equal(0);
      });
    });
  });

  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    describe('quantity less than 50', () => {
      it('should increase quality by 1 sell in 11 and more', () => {
        const gildedRose = new GildedRose([
          new Item('Backstage passes to a TAFKAL80ETC concert', 11, 49)
        ]);
        const items = gildedRose.updateQuality();
        const foo = items[0];
        expect(foo.name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(foo.sellIn).to.equal(10);
        expect(foo.quality).to.equal(50);
      });

      describe('sell in 6 or more, sell in less than 11', () => {
        it('should increase cap by 2 when quality is 6', () => {
          const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 6)
          ]);
          const items = gildedRose.updateQuality();
          const foo = items[0];
          expect(foo.name).to.equal(
            'Backstage passes to a TAFKAL80ETC concert'
          );
          expect(foo.sellIn).to.equal(9);
          expect(foo.quality).to.equal(8);
        });

        it('should increase cap by 2 when quality is 48', () => {
          const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 48)
          ]);
          const items = gildedRose.updateQuality();
          const foo = items[0];
          expect(foo.name).to.equal(
            'Backstage passes to a TAFKAL80ETC concert'
          );
          expect(foo.sellIn).to.equal(9);
          expect(foo.quality).to.equal(50);
        });
        it('should cap quality to max of 50', () => {
          const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49)
          ]);
          const items = gildedRose.updateQuality();
          const foo = items[0];
          expect(foo.name).to.equal(
            'Backstage passes to a TAFKAL80ETC concert'
          );
          expect(foo.sellIn).to.equal(9);
          expect(foo.quality).to.equal(50);
        });
      });

      describe('should increase cap by 3 if sellin less than 6', () => {
        it('should cap quality to max of 50', () => {
          const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 6, 49)
          ]);
          const items = gildedRose.updateQuality();
          const foo = items[0];
          expect(foo.name).to.equal(
            'Backstage passes to a TAFKAL80ETC concert'
          );
          expect(foo.sellIn).to.equal(5);
          expect(foo.quality).to.equal(50);
        });

        it('should increase quality till 50 when quality is 47', () => {
          const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 47)
          ]);
          const items = gildedRose.updateQuality();
          const foo = items[0];
          expect(foo.name).to.equal(
            'Backstage passes to a TAFKAL80ETC concert'
          );
          expect(foo.sellIn).to.equal(4);
          expect(foo.quality).to.equal(50);
        });

        it('should increase quality by 3 when quality is 0', () => {
          const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0)
          ]);
          const items = gildedRose.updateQuality();
          const foo = items[0];
          expect(foo.name).to.equal(
            'Backstage passes to a TAFKAL80ETC concert'
          );
          expect(foo.sellIn).to.equal(4);
          expect(foo.quality).to.equal(3);
        });
      });
    });

    describe('sellIn < 0', () => {
      it('should return quality of 0', () => {
        const gildedRose = new GildedRose([
          new Item('Backstage passes to a TAFKAL80ETC concert', 0, 999)
        ]);
        const items = gildedRose.updateQuality();
        const foo = items[0];
        expect(foo.name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(foo.sellIn).to.equal(-1);
        expect(foo.quality).to.equal(0);
      });

      it('should return quality of 0', () => {
        const gildedRose = new GildedRose([
          new Item('Backstage passes to a TAFKAL80ETC concert', 0, -999)
        ]);
        const items = gildedRose.updateQuality();
        const foo = items[0];
        expect(foo.name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(foo.sellIn).to.equal(-1);
        expect(foo.quality).to.equal(0);
      });
    });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    const itemName = 'Sulfuras, Hand of Ragnaros';
    it('should not decrease sellIn by 1', () => {
      const gildedRose = new GildedRose([new Item(itemName, 5, 0)]);
      const items = gildedRose.updateQuality();
      const foo = items[0];
      expect(foo.name).to.equal(itemName);
      expect(foo.sellIn).to.equal(5);
      expect(foo.quality).to.equal(0);
    });
  });

  describe('Aged Brie', () => {
    it('should increase quality by one if sellIn >= 0', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 1, 0)]);
      const items = gildedRose.updateQuality();
      const foo = items[0];
      expect(foo.name).to.equal('Aged Brie');
      expect(foo.sellIn).to.equal(0);
      expect(foo.quality).to.equal(1);
    });

    it('should increase quality by two if sellIn <= 0', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 0)]);
      const items = gildedRose.updateQuality();
      const foo = items[0];
      expect(foo.name).to.equal('Aged Brie');
      expect(foo.sellIn).to.equal(-1);
      expect(foo.quality).to.equal(2);
    });
  });
});
