<template>
    <div :class="getGameBoardClassName()" :style="setBoardWidth()">
        <div class="hide-tile-button-container">
          <div class="hide-tile-button" @click="$emit('toggleTileView')" data-test="hide-tiles-button" v-i18n>
            {{ tileView }} tiles
          </div>
        </div>
        <div class="board-outer-spaces" id="colony_spaces">
            <board-space :space="getSpaceById('01')" text="Ganymede Colony" :tileView="tileView"></board-space>
            <board-space :space="getSpaceById('02')" text="Phobos Space Haven" :tileView="tileView"></board-space>
            <board-space :space="getSpaceById('69')" text="Stanford Torus" :tileView="tileView"></board-space>
            <template v-if="venusNextExtension">
              <board-space :space="getSpaceById('70')" text="Luna Metropolis" :tileView="tileView"></board-space>
              <board-space :space="getSpaceById('71')" text="Dawn City" :tileView="tileView"></board-space>
              <board-space :space="getSpaceById('72')" text="Stratopolis" :tileView="tileView"></board-space>
              <board-space :space="getSpaceById('73')" text="Maxwell Base" :tileView="tileView"></board-space>
            </template>
            <template v-if="pathfindersExpansion">
              <!-- <board-space :space="getSpaceById('74')" text="Martian Transhipment Station" :tileView="tileView"></board-space> -->
              <board-space :space="getSpaceById('75')" text="Ceres Spaceport" :tileView="tileView"></board-space>
              <board-space :space="getSpaceById('76')" text="Dyson Screens" :tileView="tileView"></board-space>
              <board-space :space="getSpaceById('77')" text="Lunar Embassy" :tileView="tileView"></board-space>
              <board-space :space="getSpaceById('78')" text="Venera Base" :tileView="tileView"></board-space>
            </template>
        </div>

        <div class="global-numbers">
            <div class="global-numbers-temperature">
                <div :class="getScaleCSS(lvl)" v-for="(lvl, idx) in getValuesForParameter('temperature')" :key="idx" :style="getScaleStepPosition(lvl)">{{ lvl.strValue }}</div>
            </div>

            <div class="global-numbers-oxygen">
                <div :class="getScaleCSS(lvl)" v-for="(lvl, idx) in getValuesForParameter('oxygen')" :key="idx" :style="getScaleStepPosition(lvl)">{{ lvl.strValue }}</div>
            </div>

            <div class="global-numbers-venus" v-if="venusNextExtension">
                <div :class="getScaleCSS(lvl)" v-for="(lvl, idx) in getValuesForParameter('venus')" :key="idx" :style="getScaleStepPosition(lvl)">{{ lvl.strValue }}</div>
            </div>

            <div class="global-numbers-oceans">
              <span v-if="this.oceans_count === this.maxOceans">
                <img width="26" src="assets/misc/circle-checkmark.png" class="board-ocean-checkmark" :alt="$t('Completed!')">
              </span>
              <span v-else>
                {{this.oceans_count}}/{{this.maxOceans}}
              </span>
            </div>

            <div v-if="aresExtension && aresData !== undefined">
                <div v-if="aresData.hazardData.erosionOceanCount.available">
                    <div class="global-ares-erosions-icon"></div>
                    <div class="global-ares-erosions-val">{{aresData.hazardData.erosionOceanCount.threshold}}</div>
                </div>
                <div v-if="aresData.hazardData.removeDustStormsOceanCount.available">
                    <div class="global-ares-remove-dust-storms-icon"></div>
                    <div class="global-ares-remove-dust-storms-val">{{aresData.hazardData.removeDustStormsOceanCount.threshold}}</div>
                </div>
                <div v-if="aresData.hazardData.severeErosionTemperature.available">
                    <div class="global-ares-severe-erosions"
                    :class="'global-ares-severe-erosions-'+aresData.hazardData.severeErosionTemperature.threshold"></div>
                </div>
                <div v-if="aresData.hazardData.severeDustStormOxygen.available">
                    <div class="global-ares-severe-dust-storms"
                    :class="'global-ares-severe-dust-storms-'+aresData.hazardData.severeDustStormOxygen.threshold"></div>
                </div>
            </div>

            <div v-if="altVenusBoard" class="global-alt-venus">
              <div class="std-wild-resource p18"></div>
              <div class="std-wild-resource p20"></div>
              <div class="std-wild-resource p22"></div>
              <div class="std-wild-resource p24"></div>
              <div class="std-wild-resource p26"></div>
              <div class="std-wild-resource p28"></div>
              <div class="std-wild-resource p30"></div>
              <div class="wild-resource p30b"></div>
            </div>
        </div>

        <div class="board board-debug" id="main_board">
            <board-space
              v-for="curSpace in getAllSpacesOnMars()"
              :key="curSpace.id"
              :space="curSpace"
              :equatorLength="equatorLength"
              :aresExtension="aresExtension"
              :tileView="tileView"
              data-test="board-space"
            />

            <svg id="board_legend" height="550" width="630" class="board-legend">
              <template v-if="boardName === BoardName.THARSIS">
                  <g id="ascraeus_mons" transform="translate(95, 192)">
                      <text class="board-caption">
                          <tspan dy="15">Ascraeus</tspan>
                          <tspan x="12" dy="12">Mons</tspan>
                      </text>
                      <line x1="38" y1="20" x2="88" y2="26" class="board-line"></line>
                      <text x="86" y="29" class="board-caption board_caption--black">●</text>
                  </g>

                  <g id="pavonis_mons" transform="translate(90, 230)">
                      <text class="board-caption">
                          <tspan dy="15">Pavonis</tspan>
                          <tspan x="4" dy="12">Mons</tspan>
                      </text>
                      <line x1="35" y1="25" x2="72" y2="30" class="board-line" />
                      <text x="66" y="33" class="board-caption board_caption--black">●</text>
                  </g>

                  <g id="arsia_mons" transform="translate(77, 275)">
                      <text class="board-caption">
                          <tspan dy="15">Arsia</tspan>
                          <tspan x="-2" dy="12">Mons</tspan>
                      </text>
                      <line x1="25" y1="20" x2="49" y2="26" class="board-line" />
                      <text x="47" y="29" class="board-caption board_caption--black">●</text>
                  </g>

                  <g id="tharsis_tholus" transform="translate(85, 175)">
                      <text class="board-caption" dx="47">
                          <tspan dy="-7">Tharsis</tspan>
                          <tspan dy="12" x="48">Tholus</tspan>
                      </text>
                      <line y1="-3" x2="160" y2="2" class="board-line" x1="90"></line>
                      <text x="158" y="5" class="board-caption board_caption--black">&#x25cf;</text>
                  </g>

                  <g id="noctis_city" transform="translate(85, 320)">
                      <text class="board-caption">
                          <tspan dy="15">Noctis</tspan>
                          <tspan x="7" dy="12">City</tspan>
                      </text>
                      <line x1="30" y1="20" x2="140" y2="-20" class="board-line"></line>
                      <text x="136" y="-18" class="board-caption board_caption--black">&#x25cf;</text>
                  </g>
              </template>

              <template v-if="boardName === BoardName.ELYSIUM">
                  <g id="elysium_mons" transform="translate(110, 190)">
                      <text class="board-caption">
                          <tspan dy="15">Elysium</tspan>
                          <tspan x="8" dy="12">Mons</tspan>
                      </text>
                  </g>

                  <g id="hecatus_tholus"  transform="translate(130, 150)">
                      <text class="board-caption">
                          <tspan dy="15">Hecatus</tspan>
                          <tspan x="3" dy="12">Tholus</tspan>
                      </text>
                  </g>

                  <g id="arsia_mons" transform="translate(545, 272)">
                      <text class="board-caption">
                          <tspan dy="15">Arsia</tspan>
                          <tspan x="0" dy="12">Mons</tspan>
                      </text>
                  </g>

                  <g id="olympus_mons" transform="translate(505, 190)">
                      <text class="board-caption">
                          <tspan x="-5" dy="15">Olympus</tspan>
                          <tspan x="4" dy="12">Mons</tspan>
                      </text>
                  </g>
                </template>

                <template v-if="boardName === BoardName.ARABIA_TERRA">
                  <g id="tikhonarov" transform="translate(487, 185)">
                      <text class="board-caption">
                          <tspan>Tikhonarov</tspan>
                      </text>
                      <line x1="15" y1="5" x2="3" y2="20" class="board-line"></line>
                      <text x="1" y="22" class="board-caption board_caption--black">&#x25cf;</text>
                  </g>
                  <g id="ladon" transform="translate(286, 496)">
                      <text class="board-caption">
                          <tspan>Ladon</tspan>
                      </text>
                      <line x1="20" y1="-12" x2="17" y2="-70" class="board-line"></line>
                      <text x="14" y="-68" class="board-caption board_caption--black">&#x25cf;</text>
                  </g>
                  <g id="flaugergues" transform="translate(480, 405)">
                      <text class="board-caption">
                          <tspan>Flaugergues</tspan>
                      </text>
                      <line x1="0" y1="2" x2="-15" y2="10" class="board-line"></line>
                      <text x="-17" y="12" class="board-caption board_caption--black">&#x25cf;</text>
                  </g>
                  <g id="charybdis" transform="translate(455, 450)">
                      <text class="board-caption">
                          <tspan>Charybdis</tspan>
                      </text>
                      <line x1="0" y1="2" x2="-15" y2="10" class="board-line"></line>
                      <text x="-17" y="12" class="board-caption board_caption--black">&#x25cf;</text>
                  </g>
                </template>

                <template v-if="boardName === BoardName.AMAZONIS">
                  <g id="albor_tholus" transform="translate(85, 175)">
                      <text class="board-caption" dx="47">
                          <tspan dy="-7">Albor</tspan>
                          <tspan dy="12" x="48">Tholus</tspan>
                      </text>
                      <line y1="-3" x2="160" y2="2" class="board-line" x1="90"></line>
                      <text x="158" y="5" class="board-caption board_caption--black">&#x25cf;</text>
                  </g>
                  <g id="anseris_mons" transform="translate(525, 330)">
                      <text class="board-caption">
                          <tspan>Anseris</tspan>
                          <tspan x="5" dy="12">Mons</tspan>
                      </text>
                      <line x1="6" y1="-4" x2="-90" y2="-27" class="board-line"></line>
                      <text x="-95" y="-25" class="board-caption board_caption--black">&#x25cf;</text>
                  </g>
                  <g id="pindus_mons" transform="translate(500, 370)">
                      <text class="board-caption">
                          <tspan>Pindus</tspan>
                          <tspan x="5" dy="12">Mons</tspan>
                      </text>
                      <line x1="6" y1="-4" x2="-90" y2="-27" class="board-line"></line>
                      <text x="-95" y="-25" class="board-caption board_caption--black">&#x25cf;</text>
                  </g>
                  <g id="ulysses_tholus" transform="translate(325, 496)">
                      <text class="board-caption">
                          <tspan>Ulysses</tspan>
                          <tspan x="10" dy="12">Tholus</tspan>
                      </text>
                      <line x1="20" y1="-1" x2="4" y2="-109" class="board-line"></line>
                      <text x="1" y="-107" class="board-caption board_caption--black">&#x25cf;</text>
                  </g>
                </template>

                <template v-if="boardName === BoardName.VASTITAS_BOREALIS">
                  <g id="elysium_mons_vastitas_borealis"  transform="translate(410, 70)">
                      <text class="board-caption">
                          <tspan dy="15">Elysium</tspan>
                          <tspan x="5" dy="12">Mons</tspan>
                      </text>
                  </g>
                  <g id="alba_fossae"  transform="translate(350, 70)">
                      <line x1="20" y1="30" x2="41" y2="82" class="board-line"></line>
                      <text x="39" y="85" class="board-caption board_caption--black">&#x25cf;</text>
                      <text class="board-caption">
                          <tspan dy="15">Alba</tspan>
                          <tspan x="5" dy="12">Fossae</tspan>
                      </text>
                  </g>
                  <g id="ceranius_fossae" transform="translate(80, 230)">
                      <text class="board-caption">
                          <tspan dy="15">Ceranius</tspan>
                          <tspan x="9" dy="12">Fossae</tspan>
                      </text>
                      <line x1="35" y1="25" x2="72" y2="30" class="board-line" />
                      <text x="66" y="33" class="board-caption board_caption--black">●</text>
                  </g>
                  <g id="alba_mons" transform="translate(105, 200)">
                      <text class="board-caption">
                          <tspan dy="15">Alba</tspan>
                          <tspan x="9" dy="12">Mons</tspan>
                      </text>
                      <line x1="35" y1="25" x2="94" y2="31" class="board-line" />
                      <text x="92" y="34" class="board-caption board_caption--black">●</text>
                  </g>
                </template>

                <template v-if="boardName === BoardName.TERRA_CIMMERIA">
                  <g id="albor_tholus"  transform="translate(260, 70)">
                      <text class="board-caption">
                          <tspan dy="15">Albor</tspan>
                          <tspan x="5" dy="12">Tholus</tspan>
                      </text>
                  </g>
                  <g id="apollinaris_mons" transform="translate(500, 210)">
                      <text class="board-caption">
                          <tspan>Apollinaris</tspan>
                          <tspan x="10" dy="12">Mons</tspan>
                      </text>
                      <line x1="15" y1="5" x2="-35" y2="30" class="board-line"></line>
                      <text x="-40" y="33" class="board-caption board_caption--black">&#x25cf;</text>
                  </g>
                  <g id="hadriacus_mons" transform="translate(78, 320)">
                      <text class="board-caption">
                          <tspan dy="15">Hadriacus</tspan>
                          <tspan x="24" dy="12">Mons</tspan>
                      </text>
                  </g>
                  <g id="tyrrhenus_mons" transform="translate(80, 230)">
                      <text class="board-caption">
                          <tspan dy="15">Tyrrhenus</tspan>
                          <tspan x="9" dy="12">Mons</tspan>
                      </text>
                      <line x1="35" y1="25" x2="72" y2="30" class="board-line" />
                      <text x="66" y="33" class="board-caption board_caption--black">●</text>
                  </g>
                </template>
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as constants from '@/common/constants';
import BoardSpace from '@/client/components/BoardSpace.vue';
import {AresData} from '@/common/ares/AresData';
import {SpaceModel} from '@/common/models/SpaceModel';
import {SpaceType} from '@/common/boards/SpaceType';
import {SpaceId} from '@/common/Types';
import {TileView} from '@/client/components/board/TileView';
import {BoardName} from '@/common/boards/BoardName';

class GlobalParamLevel {
  constructor(
    public value: number,
    public currentStepNumber: number,
    public totalSteps: number,
    public isActive: boolean,
    public strValue: string,
    public paramName: string,
  ) {
  }
}

// Represents the three main CSS parameters used to position
// a parameter on the track: left, top and rotation
class GlobalParamLevelTrackPosition {
  constructor(
    public cssLeft: number,
    public cssTop: number,
    public rotation: number,
  ) {
  }
}

// Helper class to position the global parameters' numbers along the global tracks
// dynamically, regardless of the number of steps, instead of hardcoding them
class GlobalTrackDisplay {
  public startToEndRotation: number;
  public directionOfRotation: number;

  constructor(
    public cssLeftStart: number,
    public cssTopStart: number,
    public firstStepRotation: number,
    public lastStepRotation: number,
    public trackDirectionX: number,
    public trackDirectionY: number,
  ) {
    this.startToEndRotation = Math.abs(firstStepRotation - lastStepRotation);
    this.directionOfRotation = (this.firstStepRotation < this.lastStepRotation) ? 1 : -1;
  }

  calculateGlobalParamPositionOnTrack(globalParamLevel: GlobalParamLevel): GlobalParamLevelTrackPosition {
    // The three values that we need to calculate to return
    // an instance of GlobalParamLevelTrackPosition
    let cssLeft: number = this.cssLeftStart;
    let cssTop: number = this.cssTopStart;
    let rotation: number = 0;

    // The higher the precision, the more granular the steps along
    // the track curve will be, but the more iterations it will take
    const precision: number = 10;

    // The initial direction along which the numbers on the track
    // will be distributed, i.e. the oxygen track moves from bottom
    // to top, whereas venus moves from left to right
    const vxStart = this.trackDirectionX;
    const vyStart = this.trackDirectionY;

    // Start at the rotation of the very first number on the track
    const rotationStart = this.firstStepRotation;

    // The amount by which the track numbers will be rotated at each step,
    // i.e. if the first number is at a rotation of 55, and this value is 6,
    // then the second number will be at a rotation of 49 or 61, depending on
    // the direction of the rotation
    let rotationPerParamLevel = this.startToEndRotation / globalParamLevel.totalSteps;
    rotationPerParamLevel *= this.directionOfRotation;

    // Based on the above, the rotation at which this particular
    // globalParamLevel should display on its position on the track
    rotation = rotationStart + (rotationPerParamLevel * globalParamLevel.currentStepNumber);

    // The amount of rotation to perform each granular step before
    // advancing the position in the vector's direction
    const rotationStep = (1 / precision) * this.directionOfRotation;

    let step = rotationStart;

    // To calculate the left and top position of this globalParamLevel, we
    // will iterate a number of steps along the arc of the track's curve,
    // each loop rotating the directional vector towards `rotation`,
    // and accumulating the position until we reach the desired rotation
    while (this.hasReachedRotation(step, rotation) === false) {
      // Convert the degrees of this step to radians
      const radians = step * Math.PI / 180;

      // Rotate the initial vector to the rotation of this step
      const vx = vxStart * Math.cos(radians) - vyStart * Math.sin(radians);
      const vy = vxStart * Math.sin(radians) + vyStart * Math.cos(radians);

      // Move along this vector one more step
      cssLeft += vx;
      cssTop += vy;

      // Increment our step angle for the next movement
      step += rotationStep;
    }

    return new GlobalParamLevelTrackPosition(cssLeft, cssTop, rotation);
  }

  // Helper to check if our current rotation step has already reached the track
  // step's desired rotation. This check is dynamic because the direction of
  // the rotation can change depending on which track we are displaying
  hasReachedRotation(currentRotation: number, rotationGoal: number): boolean {
    if (this.firstStepRotation < rotationGoal) {
      return currentRotation >= rotationGoal;
    } else {
      return currentRotation <= rotationGoal;
    }
  }
}

export default Vue.extend({
  name: 'board',
  props: {
    spaces: {
      type: Array as () => Array<SpaceModel>,
    },
    equatorLength: {
      type: Number,
    },
    venusNextExtension: {
      type: Boolean,
    },
    venusScaleLevel: {
      type: Number,
    },
    altVenusBoard: {
      type: Boolean,
    },
    boardName: {
      type: String,
    },
    oceans_count: {
      type: Number,
    },
    oxygen_level: {
      type: Number,
    },
    temperature: {
      type: Number,
    },
    maxOxygen: {
      type: Number,
    },
    maxOceans: {
      type: Number,
    },
    maxVenus: {
      type: Number,
    },
    minTemperature: {
      type: Number,
    },
    maxTemperature: {
      type: Number,
    },
    aresExtension: {
      type: Boolean,
    },
    pathfindersExpansion: {
      type: Boolean,
    },
    aresData: {
      type: Object as () => AresData | undefined,
    },
    tileView: {
      type: String as () => TileView,
      default: 'show',
    },
  },
  components: {
    BoardSpace,
  },
  data() {
    return {
      constants,
    };
  },
  methods: {
    getAllSpacesOnMars(): Array<SpaceModel> {
      const boardSpaces: Array<SpaceModel> = [...this.spaces];
      boardSpaces.sort(
        (space1: SpaceModel, space2: SpaceModel) => {
          return parseInt(space1.id) - parseInt(space2.id);
        },
      );
      return boardSpaces.filter((s: SpaceModel) => {
        return s.spaceType !== SpaceType.COLONY;
      });
    },
    getSpaceById(spaceId: SpaceId): SpaceModel {
      for (const space of this.spaces) {
        if (space.id === spaceId) {
          return space;
        }
      }
      throw new Error('Board space not found by id \'' + spaceId + '\'');
    },
    getValuesForParameter(targetParameter: string): Array<GlobalParamLevel> {
      const values:Array<GlobalParamLevel> = [];
      let startValue: number;
      let endValue: number;
      let step: number;
      let curValue: number;
      let strValue: string;
      let currentStepNumber: number;

      switch (targetParameter) {
      case 'oxygen':
        startValue = constants.MIN_OXYGEN_LEVEL;
        endValue = this.maxOxygen;
        step = 1;
        curValue = this.oxygen_level;
        break;
      case 'temperature':
        startValue = this.minTemperature;
        endValue = this.maxTemperature;
        step = 2;
        curValue = this.temperature;
        break;
      case 'venus':
        startValue = constants.MIN_VENUS_SCALE;
        endValue = this.maxVenus;
        step = 2;
        curValue = this.venusScaleLevel;
        break;
      default:
        throw new Error('Wrong parameter to get values from: ' + targetParameter);
      }
      const totalSteps: number = ((endValue - startValue) / step);

      for (let value = endValue; value >= startValue; value -= step) {
        strValue = (targetParameter === 'temperature' && value > 0) ? '+'+value : value.toString();
        currentStepNumber = ((value - startValue) / step);
        values.push(
          new GlobalParamLevel(value, currentStepNumber, totalSteps, value === curValue, strValue, targetParameter),
        );
      }
      return values;
    },
    // Return the inline style to position this param level on the page
    // dynamically through the helper GlobalTrackDisplay class
    getScaleStepPosition(paramLevel: GlobalParamLevel): object {
      const targetParameter = paramLevel.paramName;

      // Static values needed to drive the positioning along this track
      let leftStart: number;
      let topStart: number;
      let rotationStart: number;
      let rotationEnd: number;
      let trackDirectionX: number;
      let trackDirectionY: number;

      switch (targetParameter) {
      case 'oxygen':
        leftStart = 26.65;
        topStart = 84.65;
        rotationStart = -53;
        rotationEnd = 38;
        trackDirectionX = 0;
        trackDirectionY = -0.071;
        break;
      case 'temperature':
        leftStart = 73.15;
        topStart = 85.75;
        rotationStart = 57;
        rotationEnd = -41;
        trackDirectionX = 0;
        trackDirectionY = -0.07;
        break;
      case 'venus':
        leftStart = 23.9;
        topStart = 21.1;
        rotationStart = -43;
        rotationEnd = 43;
        trackDirectionX = 0.069;
        trackDirectionY = 0;
        break;
      default:
        throw new Error('Wrong parameter to get step position values from: ' + targetParameter);
      }

      const globalTrackDisplay = new GlobalTrackDisplay(
        leftStart,
        topStart,
        rotationStart,
        rotationEnd,
        trackDirectionX,
        trackDirectionY,
      );

      const paramTrackPosition = globalTrackDisplay.calculateGlobalParamPositionOnTrack(paramLevel);

      const styleObject = {
        left: `${paramTrackPosition.cssLeft}%`,
        top: `${paramTrackPosition.cssTop}%`,
        transform: `rotate(${paramTrackPosition.rotation}deg)`,
      };

      return styleObject;
    },
    getScaleCSS(paramLevel: GlobalParamLevel): string {
      let css = 'global-numbers-value';
      if (paramLevel.isActive) {
        css += ' val-is-active';
      }
      return css;
    },
    oceansValue() {
      const oceans_count = this.oceans_count || 0;
      const leftover = this.maxOceans - oceans_count;
      if (leftover === 0) {
        return '<img width="26" src="assets/misc/circle-checkmark.png" class="board-ocean-checkmark" :alt="$t(\'Completed!\')">';
      } else {
        return `${oceans_count}/${this.maxOceans}`;
      }
    },
    getGameBoardClassName(): string {
      return this.venusNextExtension ? 'board-cont board-with-venus' : 'board-cont board-without-venus';
    },
    setBoardWidth(): object {
      const equatorLength = this.equatorLength;
      console.log(`equatorLength: ${equatorLength}`);

      // Standard board is 670px wide, with an equator of 9 tiles.
      // Extrapolating this to any other length: 670 / 9 = 74.4
      const widthToEquatorFactor = 74.4;
      const width = equatorLength * widthToEquatorFactor;

      return {
        width: `${width}px`,
      };
    },
  },
  computed: {
    BoardName(): typeof BoardName {
      return BoardName;
    },
  },
});
</script>
