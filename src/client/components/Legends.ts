import {BoardName} from '@/common/boards/BoardName';
import {Position, calculateTilePosition} from './board/BoardSpaceTilePosition';

export type TileLegendData = {
  text: Array<string>,
  target: {row: number, col: number},
}

export type TileLegend = {
  text: Array<string>,
  labelPosition: Position,
  textPosition: Position,
  linePosition: { start: Position, end: Position }
}

const LEGENDS_DATA: { [boardName: string]: Array<TileLegendData> } = {
  [BoardName.THARSIS]: [
    {
      text: ['Testest', 'City'],
      target: {row: 0, col: 0},
    },
  ],
  [BoardName.HELLAS]: [],
  [BoardName.ELYSIUM]: [],
  [BoardName.ARABIA_TERRA]: [],
  [BoardName.UTOPIA_PLANITIA]: [],
  [BoardName.VASTITAS_BOREALIS_NOVUS]: [],
  [BoardName.VASTITAS_BOREALIS]: [],
  [BoardName.AMAZONIS]: [],
  [BoardName.TERRA_CIMMERIA]: [],
  [BoardName.TERRA_CIMMERIA_NOVUS]: [],
};

const LEGENDS: { [boardName: string]: Array<TileLegend> } = {
  [BoardName.THARSIS]: [],
  [BoardName.HELLAS]: [],
  [BoardName.ELYSIUM]: [],
  [BoardName.ARABIA_TERRA]: [],
  [BoardName.UTOPIA_PLANITIA]: [],
  [BoardName.VASTITAS_BOREALIS_NOVUS]: [],
  [BoardName.VASTITAS_BOREALIS]: [],
  [BoardName.AMAZONIS]: [],
  [BoardName.TERRA_CIMMERIA]: [],
  [BoardName.TERRA_CIMMERIA_NOVUS]: [],
};

export function parseLegendsData(equatorLength: number): { [boardName: string]: Array<TileLegend> } {
  for (const boardName in LEGENDS_DATA) {
    if (Object.prototype.hasOwnProperty.call(LEGENDS_DATA, boardName)) {
      const boardLegendData = LEGENDS_DATA[boardName];

      boardLegendData.forEach((legendData) => {
        // const halfEquator = Math.floor(equatorLength);
        const labelPosition = getLabelPositionAtRowStart(legendData.target.row, equatorLength);
        const textPosition = getLabelTextPosition(labelPosition);
        const linePosition = getLabelLinePosition(labelPosition);
        const parsedLabel = {
          text: legendData.text,
          labelPosition,
          textPosition,
          linePosition,
        };

        LEGENDS[boardName].push(parsedLabel);
      });
    }
  }

  return LEGENDS;
}

export function getLabelPositionAtRowStart(tileRow: number, equatorLength: number): Position {
  const yRelativeToEquator = Math.floor(equatorLength / 2) - tileRow;
  const tilePosition = calculateTilePosition(0, yRelativeToEquator, equatorLength);

  return {
    x: (tilePosition.x ) - 6,
    y: tilePosition.y - 0.5,
  };
}

export function getLabelPositionAtRowEnd(tileRow: number, equatorLength: number): Position {
  const yRelativeToEquator = Math.floor(equatorLength / 2) - tileRow;
  const lastRowTile = equatorLength - yRelativeToEquator;
  const tilePosition = calculateTilePosition(lastRowTile, yRelativeToEquator, equatorLength);

  return {
    x: (tilePosition.x ) + 6,
    y: tilePosition.y - 0.5,
  };
}

export function getLabelPositionAtColStart(tileRow: number, equatorLength: number): Position {
  const yRelativeToEquator = Math.floor(equatorLength / 2);
  const tilePosition = calculateTilePosition(tileRow, yRelativeToEquator, equatorLength);

  return {
    x: (tilePosition.x ),
    y: tilePosition.y - 6,
  };
}

export function getLabelPositionAtColEnd(tileRow: number, equatorLength: number): Position {
  const yRelativeToEquator = Math.floor(equatorLength / 2);
  const tilePosition = calculateTilePosition(tileRow, yRelativeToEquator, equatorLength);

  return {
    x: (tilePosition.x ),
    y: tilePosition.y + 6,
  };
}

export function getLabelTextPosition(labelPosition: Position): Position {
  return {
    x: labelPosition.x,
    y: 1.2,
  };
}

export function getLabelLinePosition(labelPosition: Position): {start: Position, end: Position} {
  return {
    start: {
      x: labelPosition.x + 10,
      y: labelPosition.y + 0.6,
    },
    end: {
      x: 50,
      y: 50,
    },
  };
}
