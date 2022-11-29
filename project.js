const { createApp } = Vue
const app = createApp({})



createApp({

  
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
      responseData: 'asaas',
      resultsArray: [],
      filteredresultsArray: [],
      sortValue:"Reset to Original",
      resultCount: '0',
      genreSelected: new Set(),
      genreSelectedId: new Set(),
      languages: new Set(),
      buttonToAudio: new Map(),
      buttonToAudioObject: new Map(),
      buttontoStatus: new Map(),
      collectionNameToTrack: new Map(),
      windowWidth: 0,
      windowHeight: 0,


  buttonArray:[
    {text: 'All', selected: true},
    {text: 'C++', selected: false},
    {text: 'C', selected: false},
    {text: 'JavaScript', selected: false},
    {text: 'jQuery', selected: false},
    {text: 'Julia', selected: false},
    {text: 'HTML', selected: false},
    {text: 'CSS', selected: false},
    {text: 'Python', selected: false},
    {text: 'BootStrap', selected: false},
    {text: 'VueJs', selected: false}
  ],
  projectArray:[
  { text: "Euchre", id: 0, src: "assets/euchre.png" , languages:['C++']},
  { text: "SQL Clone", id: 1, src: "assets/SQL-Clone.png", languages:['C++'] },
  { text: "Image Processing", id: 2, src: "assets/image-processing.png", languages:['C++'] },
  { text: "Itunes Clone", id: 3, src: "assets/itunes.png", languages:['JavaScript', 'HTML', 'CSS', 'BootStrap','VueJs'] },
  { text: "Number Classifier", id: 4, src: "assets/numbers.png", languages: ['Julia', 'Python']},
  { text: "Piazza Posts Classifier", id: 5, src: "assets/piazza.png", languages:['C++']},
  { text: "Star Wars Battle Simulation", id: 6, src: "assets/starwars.png", languages:['C++'] },
  { text: "Treasure Hunt Algorithm", id: 7, src: "assets/treasure.png" , languages:['C++']},
  { text: "Asteroid Game", id: 8, src: "assets/asteroid.png", languages:['JavaScript', 'HTML', 'CSS', 'BootStrap', 'jQuery'] }
],
 
projectFilteredArray:[
  { text: "Euchre", id: 0, src: "assets/euchre.png" , languages:['C++']},
  { text: "SQL Clone", id: 1, src: "assets/SQL-Clone.png", languages:['C++'] },
  { text: "Image Processing", id: 2, src: "assets/image-processing.png", languages:['C++'] },
  { text: "Itunes Clone", id: 3, src: "assets/itunes.png", languages:['JavaScript', 'HTML', 'CSS', 'BootStrap','VueJs'] },
  { text: "Number Classifier", id: 4, src: "assets/numbers.png", languages: ['Julia', 'Python']},
  { text: "Piazza Posts Classifier", id: 5, src: "assets/piazza.png", languages:['C++']},
  { text: "Star Wars Battle Simulation", id: 6, src: "assets/starwars.png", languages:['C++'] },
  { text: "Treasure Hunt Algorithm", id: 7, src: "assets/treasure.png" , languages:['C++']},
  { text: "Asteroid Game", id: 8, src: "assets/asteroid.png", languages:['JavaScript', 'HTML', 'CSS', 'BootStrap', 'jQuery'] }
]


    }
  },
  methods: {

    sortArrays(val){
      if(val === 'All'){
        for(let i = 0; i < this.buttonArray.length; ++i){
          if(this.buttonArray[i].text == 'All' && this.buttonArray[i].selected === false){
            this.buttonArray[i].selected = true;
          }
          else{
            this.buttonArray[i].selected = false;
          }
        }
      }
      //if not all
      else{
        for(let i = 0; i < this.buttonArray.length; ++i){
          if(this.buttonArray[i].text == val && this.buttonArray[i].selected === false){
            this.buttonArray[i].selected = true;
          }
          else if(this.buttonArray[i].text == val && this.buttonArray[i].selected === true){
            this.buttonArray[i].selected = false;
          }
        
            this.buttonArray[0].selected = false;
          
          
        }

      }

      this.filterResults();
    },

    filterResults(){
      //if all is selected display orignal result
      if(this.buttonArray[0].selected === true){
        
        this.projectFilteredArray = [...this.projectArray]
      }

      else{
        this.languages.clear();
        
        for(let i = 0; i < this.buttonArray.length; ++i){
          if(this.buttonArray[i].selected === true && this.buttonArray[i].text !== 'All'){
           this.languages.add(this.buttonArray[i].text);
          }
        }
        console.log(this.languages);

        this.projectFilteredArray = [...this.projectArray];
        this.projectFilteredArray = this.projectFilteredArray.filter(this.filterCondition);

        console.log(this.projectFilteredArray);
      }

    },

    filterCondition(val){
     // console.log(val.languages);
     
      for(let i = 0; i < val.languages.length; ++i){
       let codingLang = val.languages[i];
      // console.log(codingLang);
        if(this.languages.has(val.languages[i])){
          return true;
        }
      }
    },

    handleResize() {
      console.log('calculating');
      this.windowWidth = window.outerWidth
      this.windowHeight = window.outerHeight
      console.log(this.windowWidth);
      console.log(this.windowHeight);
    }
   
   
   
  

  },
  
}).mount('#project')