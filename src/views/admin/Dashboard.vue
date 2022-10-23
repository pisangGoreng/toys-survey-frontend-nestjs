<template>
  <div class="flex flex-wrap h-full">
    <Spinner :isShow="storeGetters.isLoading" />

    <div class="overflow-auto bg-emerald-500 w-full" id="app">
      <Options label="Store" tag="selectedStore" :options="storeOptions" />
      <div class="h-5 w-full bg-red-300" />
      <Options
        label="Sales"
        tag="selectedEmployee"
        :options="employeesOptions"
      />

      <div class="mt-5 pt-0">
        <input
          type="text"
          placeholder="Regular Input"
          class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-xl shadow w-full border-0 focus:ring-0"
          v-model="receiptNumber"
        />
      </div>

      <div class="flex w-full h-auto items-center bg-blue-500">
        <div class="ml-2 mt-5">
          <img
            :src="selectedSalesImage"
            alt="..."
            class="shadow-lg rounded object-cover border-none salesImage"
          />
        </div>

        <div class="justify-start pl-4">
          <p class="text-xl font-medium text-gray-700">
            Toko: {{ selectedStoreName }}
          </p>
          <p class="text-xl font-medium text-gray-700">
            Sales: {{ selectedSalesName }}
          </p>
          <p class="text-xl font-medium text-gray-700">
            No receipt: {{ receiptNumber }}
          </p>
          <p class="text-xl font-medium text-gray-700">
            Rating transaksi: {{ ratingTransaction }}
          </p>
          <p class="text-xl font-medium text-gray-700">
            Loading: {{ storeGetters.isLoading }}
          </p>
        </div>
      </div>

      <div class="flex w-2/3 bg-red-300 items-center justify-around mt-5">
        <button
          class="button flex flex-wrap justify-center w-3 h-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500"
          @click="setRating(-1)"
        >
          <div class="">
            <img
              src="https://cdn-icons-png.flaticon.com/512/725/725070.png"
              alt="..."
              class="shadow rounded-full align-middle border-none"
            />
          </div>
        </button>

        <button
          class="button flex flex-wrap justify-center w-3 h-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500"
          @click="setRating(0)"
        >
          <div class="">
            <img
              src="https://cdn-icons-png.flaticon.com/512/725/725107.png"
              alt="puas"
              class="shadow rounded-full align-middle border-none"
            />
          </div>
        </button>

        <button
          class="button flex flex-wrap justify-center w-3 h-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500"
          @click="setRating(1)"
        >
          <div class="">
            <img
              src="https://cdn-icons-png.flaticon.com/512/637/637546.png"
              alt="puas"
              class="shadow rounded-full align-middle border-none"
            />
          </div>
        </button>
      </div>

      <button
        class="submit bg-red-500 text-white active:bg-red-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        @click="setRating(1)"
      >
        Submit
      </button>
    </div>
  </div>
</template>
<script>
import Options from "@/components/Options/Options.vue"
// import Spinner from "@/components/Spinner/Spinner.vue"
import { mapActions } from "vuex"

export default {
  name: "dashboard-page",
  components: {
    Options,
    // Spinner,
  },
  data() {
    return {
      storeOptions: [],

      employeesOptions: [],
      isEmployeeOptionsDisabled: true,
      receiptNumber: "",
    }
  },
  computed: {
    storeGetters() {
      return this.$store.getters.storeGetters()
    },
    ratingGetters() {
      return this.$store.getters.ratingGetters()
    },
    selectedStoreName() {
      let name = ""
      if (this.ratingGetters.selectedStore !== null) {
        name = this.ratingGetters.selectedStore.label
      }

      return name
    },
    selectedSalesName() {
      let name = ""
      const { selectedEmployee } = this.ratingGetters
      if (selectedEmployee !== null) {
        name = `${selectedEmployee.label} ${selectedEmployee.details.nik}`
      }

      return name
    },
    selectedSalesImage() {
      let imageUrl =
        "https://drive.google.com/file/d/1sSdyeNeFzPjTNheP4ThZyEP-dYSKTI55/view?usp=sharing"
      // if (this.ratingGetters.selectedEmployee !== null) {
      // imageUrl = this.ratingGetters.selectedEmployee.details.image_url
      // }
      console.log("cek ", imageUrl.match(/[-\w]{25,}/)[0])
      return `https://drive.google.com/uc?id=${imageUrl.match(/[-\w]{25,}/)[0]}`
    },
    ratingTransaction() {
      let rating = ""
      console.log(this.ratingGetters.ratingValue)
      switch (this.ratingGetters.ratingValue) {
        case 1:
          rating = "Puas"
          break

        case 0:
          rating = "Normal"
          break

        default:
          rating = "Kecewa"
          break
      }
      return rating
    },
  },
  watch: {
    "$store.state.store.storesDetails": {
      handler: function (storesDetails) {
        this.storeOptions = this.generateStoreOptions(storesDetails)
      },
      immediate: true,
      deep: true,
    },
    "$store.state.rating.selectedStore": {
      handler: function (selectedStore) {
        if (selectedStore === null) {
          return true
        }

        this.employeesOptions = this.generateEmployeeOptions(
          selectedStore.childrens
        )
        this.isEmployeeOptionsDisabled = false
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions(["SET_RATING_ACTION"]),
    generateStoreOptions(storesDetails) {
      return storesDetails.map((storeDetails) => {
        const { store, employee } = storeDetails
        return {
          name: store.location,
          label: `Toys ${store.location}`,
          isSelected: false,
          value: store.id,
          childrens: employee,
          details: storeDetails,
        }
      })
    },

    generateEmployeeOptions(empolyeesDetails) {
      return empolyeesDetails.map((employee) => {
        return {
          name: employee.full_name,
          label: employee.full_name,
          isSelected: false,
          value: employee.id,
          childrens: [],
          details: employee,
        }
      })
    },

    setRating(rating) {
      console.log(rating)
      this.SET_RATING_ACTION({ field: "ratingValue", value: rating })
    },
  },
}
</script>

<style scoped>
.salesImage {
  width: 180px;
  height: 180px;
}

img {
  widows: 200px;
  height: 200px;
}

.red {
  background-color: red;
}

/* .button {
  padding: 15px 25px;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: #04aa6d;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #f3f3f3;
}

.button:hover {
  background-color: #3e8e41;
}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
} */

/* ---------- Useful Button styling ---------- */

.button {
  position: relative;
  background-color: transparent;
  border-radius: 4em;
  font-size: 16px;
  color: white;
  padding: 0.8em 1.8em;
  cursor: pointer;
  user-select: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s; /* Safari */
}

.button:hover {
  transition-duration: 0.1s;
  background-color: transparent;
}

.button:after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 4em;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.5s;
  box-shadow: 0 0 10px 40px white;
}

.button:active:after {
  box-shadow: 0 0 0 0 white;
  position: absolute;
  border-radius: 4em;
  left: 0;
  top: 0;
  opacity: 1;
  transition: 0s;
}

.button:active {
  top: 1px;
}

/* ---------- Looking nice on CodePen ---------- */

@import url("https://fonts.googleapis.com/css2?family=Jost&display=swap");

html,
body {
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Jost", sans-serif;
  font-size: 14px;
  background-image: linear-gradient(to bottom right, #ffa578, #ff675a);
}

h1 {
  font-size: calc(1.5em + 3vw);
  margin: -2em 0 2em;
  text-align: center;
  line-height: 1.3em;
}

.submit {
  width: 100px;
}
</style>
