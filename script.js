const { createApp } = Vue
const app = createApp({})



createApp({
  mounted() {
    this.determineUniqueBottons();
  },

  
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
},
destroyed() {
    window.removeEventListener('resize', this.handleResize);
},
  
 
  data() {
    return {
      searchBarVal: '',
      responseData: 'hello',
      resultsArray: [],
      filteredresultsArray: [],
      sortValue:"Reset to Original",
      resultCount: '0',
      genreSelected: new Set(),
      genreSelectedId: new Set(),
      uniqueGenre: new Set(),
      buttonToAudio: new Map(),
      buttonToAudioObject: new Map(),
      buttontoStatus: new Map(),
      collectionNameToTrack: new Map(),


  buttonArray:['hello'],
  dropDownArray:[
  { text: "Reset to Original", selected: true },
  { text: "Collection Name", selected: false},
  { text: "Price", selected: false}]
    }
  },
  methods: {
   
    handleResize() {
      console.log('calculating');
      this.windowWidth = window.outerWidth
      this.windowHeight = window.outerHeight
      console.log(this.windowWidth);
      console.log(this.windowHeight);
    }
   
  

  }
}).mount('#app')