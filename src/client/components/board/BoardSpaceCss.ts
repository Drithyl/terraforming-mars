export default class BoardSpaceCss {
  row: number;
  column: number;
  equatorLength: number;
  yRelativeToEquator: number;
  cssPosition: CSSPosition;

  constructor(spaceX: number, spaceY: number, equatorLength: number) {
    if (equatorLength === undefined) {
      throw new Error(`BoardSpaceTile expected a SpaceModel with a defined equatorLength, i.e. a space on Mars`);
    }

    this.row = spaceY;
    this.column = spaceX;
    this.equatorLength = equatorLength;
    this.yRelativeToEquator = Math.floor(this.equatorLength / 2) - spaceY;
    this.cssPosition = calculateTilePosition(spaceX, this.yRelativeToEquator, equatorLength);
  }
}

function calculateTilePosition(spaceX: number, yRelativeToEquator: number, equatorLength: number): CSSPosition {
  // Initial position of any row on css left
  const xStart = 54 / equatorLength;

  // Rows are placed beginning at the equator, then up and below
  // 50 means top: 50% of the div that is the planet
  const yStart = 50;

  // The left: % space to advance for each next tile in a row
  const xInterval = 99 / equatorLength;

  // The left: % space that every row is offset forward relative to the equator row
  const xOffset = 49.5 / equatorLength;

  // The top: % space that every row is offset up and down relative to the equator row
  const yOffset = 81 / equatorLength;

  // Calculate the total row offset based on where this row lies relative to the equator
  const rowOffset = Math.abs(yRelativeToEquator * xOffset);

  // Calculate the total column offset based on where this row lies relative to the equator
  const colOffset = yRelativeToEquator * yOffset;

  // Our css left and top properties with their final % number for this particular space
  const x = xStart + (spaceX * xInterval) - rowOffset;
  const y = yStart - colOffset;

  return {
    x,
    y,
  };
}

// A position to be used in CSS values, usually with absolute/relative positioned items, as % or left/top
type CSSPosition = {
  x: number,
  y: number
}
