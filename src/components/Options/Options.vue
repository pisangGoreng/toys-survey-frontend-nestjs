<template>
  <div
    class="relative inline-block text-left w-full mb-1 focus:outline-none"
    v-on:clickout="autoClosed"
  >
    <div
      class="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xl font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500"
    >
      <label
        class="inline-flex justify-between w-full items-center"
        @click="toggleOptions()"
      >
        <span class="">{{ label }}</span>
        <div
          class="flex item-center justify-center h-5 w-5 text-2xl text-gray-500"
        >
          <i v-if="isOpen" class="fas fa-caret-up" />
          <i v-else class="fas fa-caret-down" />
        </div>
      </label>
    </div>

    <div
      class="scale-in-tl origin-top-right z-20 right-0 flex-wrap overflow-auto mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
      v-if="isOpen"
    >
      <div class="flex justify-center items-center">
        <input
          type="text"
          v-model="keyword"
          class="block w-full text-gray-700 px-4 py-2 text-lg border-0 focus:ring-0"
          placeholder="Search here..."
          @change="filterByKeyword({ isDeleteKeyUpPressed: false })"
          @keyup.delete="keyupDeleteKeyword()"
        />
        <button
          class="mt-1 px-6 py-2 flex justify-center items-center border-0 focus:ring-0 hover:text-red-900"
          @click="resetKeyword"
        >
          <i class="fas fa-times text-sm ml-2 text-red-400" />
        </button>
      </div>

      <div v-for="(option, index) in filteredOptions" :key="index" class="py-1">
        <label
          class="items-center text-gray-400 justify-between flex px-4 py-2 text-xs hover:text-gray-900"
        >
          <span class="ml-2">{{ showLabel(option.label) }}</span>
          <input
            name="radio"
            type="radio"
            class="form-checkbox mr-1"
            @click="setOption(option)"
            :checked="isChecked(option)"
          />
        </label>
      </div>
    </div>

    <p v-if="isDisabled" class="text-xs text-red-400">{{ warningMessage }}</p>
  </div>
</template>

<script>
import "clickout-event"
import { mapActions } from "vuex"

export default {
  components: {},
  props: {
    label: { required: true, type: String, default: () => "" },
    tag: { required: true, type: String, default: () => "" },
    criteria: { required: true, type: String, default: () => "" },
    options: { required: true, type: Array, default: () => [] },
    isDisabled: { required: false, type: Boolean, default: () => false },
    parent: { required: false, type: String, default: () => null },
  },
  data() {
    return {
      filteredOptions: [],
      initialOptions: [],
      isOpen: false,
      isAllSelected: true,
      keyword: "",
      selectedOption: null,
      // selectedColor: "transparent",
      warningMessage: `Please select ${this.parent} first`,
    }
  },
  watch: {
    keyword: function () {
      this.filterByKeyword({
        isDeleteKeyUpPressed: false,
        initialOptionsName: "initialOptions",
        filterOptionsResultsName: "options",
        keywordName: "keyword",
      })
    },
    options: function (newOptions) {
      this.filteredOptions = newOptions
      this.initialOptions = newOptions
    },
  },
  methods: {
    ...mapActions(["SET_RATING_ACTION"]),

    isChecked(option) {
      const { selectedOption } = this
      if (selectedOption === null) {
        return false
      }

      return selectedOption.value === option.value
    },

    keyupDeleteKeyword() {
      this.filterByKeyword({
        isDeleteKeyUpPressed: true,
      })
    },

    filterByKeyword({ isDeleteKeyUpPressed = false }) {
      const { keyword, initialOptions, filteredOptions } = this

      if (keyword.length === 0) {
        this.filteredOptions = this.initialOptions
      } else {
        this.filteredOptions = this.getFilterOptionsByKeyword({
          keyword: keyword,
          options: isDeleteKeyUpPressed ? initialOptions : filteredOptions,
        })
      }
    },

    getFilterOptionsByKeyword({ keyword, options }) {
      return options.filter(({ label }) =>
        label.toLowerCase().includes(keyword)
      )
    },

    setOption(option) {
      this.SET_RATING_ACTION({ field: this.tag, value: option })
      this.selectedOption = option
      this.toggleOptions()
    },

    resetKeyword() {
      this.keyword = ""
    },

    toggleOptions() {
      if (this.isDisabled === false) {
        this.isOpen = !this.isOpen
        this.resetKeyword()
      }
    },

    showLabel(string) {
      return string
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")
    },

    autoClosed() {
      this.isOpen = false
    },
  },
}
</script>

<style>
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}

.chip-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: fit-content;
}

.scale-in-tl {
  -webkit-animation: scale-in-tl 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: scale-in-tl 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2022-10-22 0:26:49
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-in-tl
 * ----------------------------------------
 */
@-webkit-keyframes scale-in-tl {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
    opacity: 1;
  }
}
@keyframes scale-in-tl {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
    opacity: 1;
  }
}

.scale-out-tl {
  -webkit-animation: scale-out-tl 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
    both;
  animation: scale-out-tl 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2022-10-22 0:28:7
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-out-tl
 * ----------------------------------------
 */
@-webkit-keyframes scale-out-tl {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    opacity: 1;
  }
}
@keyframes scale-out-tl {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    opacity: 1;
  }
}
</style>
