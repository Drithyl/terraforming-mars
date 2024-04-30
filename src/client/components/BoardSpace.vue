<template>
  <div :class="getMainClass()" :data_space_id="space.id" :style="getSpaceMargin()">
    <board-space-tile
      :space="space"
      :aresExtension="aresExtension"
      :tileView="tileView"
    ></board-space-tile>
    <div class="board-space-text" v-if="text" v-i18n>{{ text }}</div>
    <bonus :bonus="space.bonus" v-if="showBonus"></bonus>
    <template v-if="tileView === 'coords'">
      <div class="board-space-coords">({{ space.y }}, {{ space.x }}) ({{ space.id }})</div>
    </template>
    <template v-if="tileView === 'show'">
      <div :class="'board-cube board-cube--'+space.color" v-if="space.color !== undefined"></div>
      <template v-if="space.gagarin !== undefined">
        <div v-if="space.gagarin === 0" class='gagarin'></div>
        <div v-else class='gagarin visited'></div>
      </template>
      <template v-if="space.cathedral === true">
        <div class='board-cube--cathedral'></div>
      </template>
      <template v-if="space.nomads === true">
        <div class='board-cube--nomad'></div>
      </template>
      <template v-if="space.undergroundResources !== undefined">
        <underground-resources
          :space="space"
          :tileView="tileView"
        ></underground-resources>
      </template>
    </template>
    </div>
</template>

<script lang="ts">

import Vue from 'vue';
import Bonus from '@/client/components/Bonus.vue';
import BoardSpaceTile from '@/client/components/board/BoardSpaceTile.vue';
import UndergroundResources from '@/client/components/board/UndergroundResources.vue';
import {TileView} from '@/client/components/board/TileView';
import {SpaceModel} from '@/common/models/SpaceModel';

export default Vue.extend({
  name: 'board-space',
  props: {
    space: {
      type: Object as () => SpaceModel,
    },
    equatorLength: {
      type: Number,
    },
    text: {
      type: String,
    },
    aresExtension: {
      type: Boolean,
    },
    tileView: {
      type: String as () => TileView,
    },
  },
  data() {
    return {};
  },
  components: {
    'bonus': Bonus,
    'board-space-tile': BoardSpaceTile,
    'underground-resources': UndergroundResources,
  },
  methods: {
    getMainClass(): string {
      const mainClass = 'board-space-cont';
      const selectableClass = 'board-space-selectable';

      if (+this.space.id < 100) {
        return `${mainClass} board-space-${this.space.id.toString()} ${selectableClass}`;
      }

      return `${mainClass} ${selectableClass}`;
    },
    // Calculate top and left % values to correctly place
    // the hexagon tiles on the planet's board
    getSpaceMargin(): object {
      // IDs lower than 100 are offworld colonies, not tiles on mars, so ignore them
      if (+this.space.id < 100) {
        return {};
      }

      // Needed so compiler doesn't get grumpy, since the property is defined as optional
      if (this.space.yRelativeToEquator === undefined) {
        console.error(`yRelativeToEquator is undefined on space with id ${this.space.id}`);
        return {};
      }

      // Needed so compiler doesn't get grumpy, since the property is defined as optional
      if (this.equatorLength === undefined) {
        console.error(`equatorLength is undefined on space with id ${this.space.id}`);
        return {};
      }

      // Length of the longest (middle) row in the planet. The placement of every tile
      // uses this as an anchor to align everything properly regardless of size
      const equatorLength = this.equatorLength;

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
      const rowOffset = Math.abs(this.space.yRelativeToEquator * xOffset);

      // Calculate the total column offset based on where this row lies relative to the equator
      const colOffset = this.space.yRelativeToEquator * yOffset;

      // Our css left and right properties with their final % number for this particular space
      const left = xStart + (this.space.x * xInterval) - rowOffset;
      const top = yStart - colOffset;

      console.log(`${this.space.id} left: ${xStart} + (${this.space.x} * ${xInterval}) - ${rowOffset}`);

      // The final style object to return
      const styleObject = {
        left: `${left}%`,
        top: `${top}%`,
      };

      return styleObject;
    },
  },
  computed: {
    showBonus(): boolean {
      return this.space.tileType === undefined || this.tileView === 'hide';
    },
  },
});

</script>

