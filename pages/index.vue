<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col items-center justify-center w-[375px]">
      <div class="flex mb-5 w-full gap-2">
        <Input v-model="inputCity" placeholder="Search City..." class="flex-grow"/>
        <Button class="ml-2 px-3" @click="updateCity">
          <fa :icon="['fas', 'search']" />
        </Button>
      </div>
      <Card class="weather-card h-[550px] rounded-lg shadow-lg w-full">
        <CardHeader>
          <CardTitle>Weather in {{ city }}</CardTitle>
        </CardHeader>
        <CardContent>
          <p v-if="weatherData">Temperature: {{ weatherData.main.temp }}°C</p>
          <p v-else>{{ status }}</p>
        </CardContent>
        <CardFooter>
          <!-- You can add footer content here if needed -->
        </CardFooter>
      </Card>
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
      } catch (error) {
        this.status = 'Error fetching weather data: ' + error.message;
        console.error('Error:', error);
      }
    },
    updateCity() {
      this.city = this.inputCity; // Update city with input value
      this.fetchWeatherData(); // Fetch weather data for the new city
    }
  },
  async mounted() {
    this.fetchWeatherData();
  },
};
</script>