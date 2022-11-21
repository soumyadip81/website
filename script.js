const { createApp } = Vue
const app = createApp({})


createApp({
 
  data() {
    return {
      searchBarVal: '',
      responseData: '',
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


  buttonArray:[],
  dropDownArray:[
  { text: "Reset to Original", selected: true },
  { text: "Collection Name", selected: false},
  { text: "Price", selected: false}]
    }
  },
  methods: {
   
   
   
  

  }
}).mount('#app')