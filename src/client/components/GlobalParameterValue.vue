<template>
<div :title="$t(title)">
  <div :class="iconClass"></div>
  <div class="global_params_value">
    <div v-if="isMax">
      <img src="assets/misc/checkmark.png" class="checkmark" :alt="$t('Completed!')">
    </div>
    <div v-else>
      {{value}}{{suffix}}
    </div>
  </div>
</div>
</template>

<script lang="ts">

import Vue from 'vue';
import {GlobalParameter} from '@/common/GlobalParameter';

// This component is only configured for offial global parameters, and not the moon global parameters.
type BaseGlobalParameter = Exclude<
  GlobalParameter,
  GlobalParameter.MOON_HABITAT_RATE |
  GlobalParameter.MOON_MINING_RATE |
  GlobalParameter.MOON_LOGISTICS_RATE>;

const attributes: Record<BaseGlobalParameter, {max: number, title: string, iconClass: string}> = {
  [GlobalParameter.TEMPERATURE]: {title: 'Temperature', iconClass: 'temperature-tile'},
  [GlobalParameter.OXYGEN]: {title: 'Oxygen Level', iconClass: 'oxygen-tile'},
  [GlobalParameter.OCEANS]: {title: 'Oceans', iconClass: 'ocean-tile'},
  [GlobalParameter.VENUS]: {title: 'Venus Scale', iconClass: 'venus-tile'},
};

export default Vue.extend({
  name: 'global-parameter-value',
  props: {
    param: {
      type: String as () => BaseGlobalParameter,
    },
    value: {
      type: Number,
    },
  },
  computed: {
    isMax(): boolean {
      let max: number;

      if (this.param === GlobalParameter.TEMPERATURE) {
        max = this.game.maxTemperature;
      } else if (this.param === GlobalParameter.OXYGEN) {
        max = this.game.maxOxygenLevel;
      } else if (this.param === GlobalParameter.OCEANS) {
        max = this.game.maxOceanTiles;
      } else if (this.param === GlobalParameter.VENUS) {
        max = this.game.maxVenusScale;
      } else {
        console.error('Global Parameter name does not match any of the four parameters');
      }

      return this.value === max;
    },
    title(): string {
      return attributes[this.param].title;
    },
    iconClass(): string {
      return attributes[this.param].iconClass;
    },
    suffix(): string {
      return this.param === GlobalParameter.OXYGEN ? '%' : '';
    },
  },
});

</script>
