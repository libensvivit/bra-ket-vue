<template>
  <div
    ref="wrapper"
    class="ket-list"
  >
    <table
      :class="tableClass(darkMode)"
    >
      <thead>
        <tr>
          <th class="w1">
            step
          </th>
          <th class="w2">
            value
          </th>
          <th>state</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(step, i) in steps"
          :key="`step-${i}`"
        >
          <td class="td">
            {{ i }}
          </td>
          <td class="td">
            {{ step.value }}
          </td>
          <td class="td">
            <ket
              class="ket"
              :vector="step.vector"
              :dark-mode="darkMode"
              :selected-option="selectedOption"
              :all-bases="allBases"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div
      :class="legendClass(darkMode)"
    >
      <div>
        <coordinate-legend
          v-if="showLegend"
          class="legend-list"
          :dark-mode="darkMode"
          :complex-style="selectedOption"
          :dimension-names="dimensionNames"
        />
        <div class="btn-legend-group">
          <span class="btn-legend">view</span>
          <span class="btn-legend">base change</span>
        </div>
      </div>
    </div>
    <div class="btn-group">
      <span>
        <options-group
          key="options-group-complex"
          :dark-mode="darkMode"
          :options="options"
          :selected-option="selectedOption"
          @selected="selectedOption = $event"
        />
      </span>
      <span>
        <span
          v-for="bases in allBases"
          :key="`basis-${bases.name}`"
        >
          <span
            v-if="bases.name == 'polarization'"
          >
            <options-group-svg
              v-if="dimensionNames.indexOf(bases.name) > -1"
              :key="`options-group-basis-${bases.name}`"
              :dark-mode="darkMode"
              :options="bases.availableBases"
              :selected-option="bases.selected"
              @selected="bases.selected = $event"
            />
          </span>
          <span
            v-else
          >
            <options-group
              v-if="dimensionNames.indexOf(bases.name) > -1"
              :key="`options-group-basis-${bases.name}`"
              :dark-mode="darkMode"
              :options="bases.availableBases"
              :selected-option="bases.selected"
              @selected="bases.selected = $event"
            />
          </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Vector } from 'quantum-tensors';
import CoordinateLegend from '@/lib-components/coordinate-legend.vue';
import OptionsGroup from '@/lib-components/options-group.vue';
import OptionsGroupSvg from '@/lib-components/options-group-svg.vue';
import Ket from '@/lib-components/ket.vue';

export default Vue.extend({
  components: {
    CoordinateLegend,
    OptionsGroup,
    OptionsGroupSvg,
    Ket,
  },
  props: {
    steps: {
      type: Array as () => {value: number | string, vector: Vector}[],
      default: () => [],
    },
    showLegend: {
      type: Boolean,
      default: true,
    },
    darkMode: {
      type: Boolean,
      default: true,
    },
  },
  data(): any {
    return {
      options: ['polar', 'polarTau', 'cartesian', 'color'],
      selectedOption: 'polar',
      allBases: [
        { name: 'polarization', availableBases: ['HV', 'DA', 'LR'], selected: 'HV' },
        { name: 'spin', availableBases: ['spin-x', 'spin-y', 'spin-z'], selected: 'spin-z' },
        { name: 'qubit', availableBases: ['01', '+-', '+i-i'], selected: '01' },
      ],
    };
  },
  computed: {
    dimensionNames(): string[] {
      if (this.steps.length === 0) {
        return [];
      }
      return this.steps[0].vector.names;
    },
  },
  methods: {
    tableClass(darkStyle = true): string {
      if (darkStyle) {
        return 'table-dark';
      }
      return 'table-bright';
    },
    legendClass(darkStyle = true): string {
      if (darkStyle) {
        return 'legend-dark';
      }
      return 'legend-bright';
    },
  },
});
</script>

<style lang="scss" scoped>
.table-dark {
  font-size: 12px;
  font-weight: 300;
  text-align: left;
  color: rgba(255, 255, 255, 0.6);
  border-collapse: separate;
  border-spacing: 10px;
  & .td {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  }
}
.table-bright {
  font-size: 12px;
  font-weight: 300;
  text-align: left;
  color: rgba(0, 0, 0, 0.6);
  border-collapse: separate;
  border-spacing: 10px;
  & .td {
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  }
}
th {
  font-weight: 300;
  text-transform: uppercase;
}
.w1 {
  width: 40px;
}
.w2 {
  width: 80px;
}
.ket-list {
  padding-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  transition: height 0.5s;
  overflow: hidden;
  align-content: space-between;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  & .hidebutton {
    font-size: 0.8rem;
  }
  & .ket {
    font-weight: 500;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    & .controls {
      font-size: 0.8rem;
      color: white;
      padding: 10px;
    }
    & .absorptions {
      font-size: 0.8rem;
      color: white;
      padding: 10;
      margin: 10px;
    }
  }
  & .btn-group {
    text-align: center;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    margin: 0px 4px;
  }
  @media screen and (max-width: 1000px) {
    border: none;
  }
}
.legend-dark {
  & .btn-legend-group {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 1);
    margin: 0px 10px;
  }
  & .btn-legend {
    font-size: 12px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
  }
  & .legend-list {
    margin: 0px 10px;
    border-top: 1px solid rgba(255, 255, 255, 1);
  }
}
.legend-bright {
  & .btn-legend-group {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.8);
    margin: 0px 10px;
  }
  & .btn-legend {
    font-size: 12px;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
  }
  & .legend-list {
    margin: 0px 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.8);
  }
}
.step {
  font-size: 0.8rem;
  line-height: 150%;
}

h3 {
  font-size: 1rem;
}
</style>
