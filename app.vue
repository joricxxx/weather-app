<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-700">
    <div class="flex flex-col items-center justify-center w-[375px] max-sm:w-[300px]  bg-gradient-to-r from-green-400 to-emerald-600 py-14">
      <div class="card">
        <div class="search flex">
          <Input v-model="inputCity" placeholder="Search Country, City, Province..." class="flex-grow bg-white"/>
          <Button class="ml-2 px-3" @click="updateCity">
            <fa :icon="['fas', 'search']" class="text-white"/>
          </Button>
        </div>

        <div class="weather items-center flex justify-center p-4 rounded-lg mt-4 text-white">
          <div class="flex items-center flex-col">
            <img :src="weatherImage" alt="Weather Image" v-if="weatherImage">
            <div class="flex flex-col items-center gap-4">
              <p class="temperature text-[30px] font-semibold">{{ weatherData?.main?.temp }}°C</p>
              <h1 class="city text-[25px] -mt-5">{{ weatherData?.name || city }}</h1>

              <div class="mt-10 flex items-center gap-10">
                <div class="humidity flex gap-2">
                  <img src="assets/img/humidity.png" class="w-7 h-7" alt="Humidity Icon">
                  <div>
                    <p class="font-semibold text-[18px]">{{ weatherData?.main?.humidity}}%</p>
                    <p class="-mt-1">Humidity</p>
                  </div>
                </div>

                <div class="wind flex gap-2">
                  <img src="assets/img/wind.png" class="w-7 h-7" alt="Wind Icon">
                  <div >
                    <p class="font-semibold text-[18px]">{{ weatherData?.wind?.speed }} km/h</p>
                    <p  class="-mt-1">Wind</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputCity: '', // New data property for input value
      city: 'Philippines',
      weatherData: null,
      status: 'Loading weather data...',
      weatherImage: '', // New data property for weather image
    };
  },
  methods: {
    async fetchWeatherData() {
      const apiKey = this.$config.public.apiKey; // Accessing the API key from the config
      console.log('API key:', apiKey);
      this.status = 'Loading weather data...';
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: this.city,
            appid: apiKey, // Using the API key
            units: 'metric'
          }
        });
        this.weatherData = response.data;
        this.status = null; // Clear loading status
        this.updateWeatherImage(); // Update weather image based on fetched data
      } catch (error) {
        this.status = 'Error fetching weather data: ' + error.message;
        console.error('Error:', error);
      }
    },
    updateCity() {
      this.city = this.inputCity; // Update city with input value
      this.fetchWeatherData(); // Fetch weather data for the new city
    },
    updateWeatherImage() {
      if (this.weatherData && this.weatherData.weather && this.weatherData.weather.length > 0) {
        const iconCode = this.weatherData.weather[0].icon;
        this.weatherImage = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      } else {
        this.weatherImage = '';
      }
    }
  },
  async mounted() {
    this.fetchWeatherData();
  },
};
</script>