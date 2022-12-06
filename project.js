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
      resultsArray: [],
      filteredresultsArray: [],
      sortValue:"Reset to Original",
      resultCount: '0',
      languages: new Set(),
      buttons: new Set(),
      windowWidth: 0,
      windowHeight: 0,

  buttonArray:[
    {text: 'All', selected: true}
  ],
  projectArray:[
  { text: "Euchre Simulator", alt: "Euchre Simulator", id: 0, src: "assets/euchre.png" , languages:['C++'], description : "A simulator for a card game of Euchre with two types of player inputs: a computer-controlled player that uses one basic-strategy and a human-controlled player than can read in instructions."},
  { text: "SQL Clone", alt: "SQL Clone", id: 1, src: "assets/SQL-Clone.png", languages:['C++'], description : "Emulated in C++ of a simplistic relational database, which has an interface that supports the fundamental SQL commands, while prioritizing efficiency."},
  { text: "Image Processing", alt: "Image Processing",id: 2, src: "assets/image-processing.png", languages:['C++'], description: "Program that uses the seaming carve algorithm to manipulate images without distorting them."},
  { text: "Itunes Clone", alt: "Itunes Clone",id: 3, src: "assets/itunes.png", languages:['JavaScript', 'HTML/CSS', 'BootStrap','VueJs'], description : "An iteractive itunes clone so that a user can serch up artists and listen to music composed by the artist" },
  { text: "Number Classifier", alt: "Number Classifier", id: 4, src: "assets/numbers.png", languages: ['Julia', 'Python'], description: "Program that is able to classify drawn numbers ranging from 0 to 9"},
  { text: "Piazza Posts Classifier", alt: "Piazza Posts Classifier",id: 5, src: "assets/piazza.png", languages:['C++'], description: "Sorts and classifies Piazza post into tags based on the content of a post using ML and NLP techniques"},
  { text: "Star Wars Battle Simulation",  alt: "Star Wars Battle Simulation",id: 6, src: "assets/starwars.png", languages:['C++'], description: "Alogrithm to simulate a war between Star Wars characters based on army size and multiple factors"},
  { text: "Treasure Hunt Algorithm",  alt: "Treasure Hunt Algorithm", id: 7, src: "assets/treasure.png" , languages:['C++'], description: "Algorithm to determnine the most shortest path to a certain location, if possible"},
  { text: "Asteroid Game", alt: "Asteroid Game",id: 8, src: "assets/asteroid.png", languages:['JavaScript', 'HTML/CSS', 'BootStrap', 'jQuery'], description: "Interactive game where the player controls a rocket and needs to avoid asteroids while trying to level up" }
],
 
projectFilteredArray:[
  { text: "Euchre Simulator", alt: "Euchre Simulator", id: 0, src: "assets/euchre.png" , languages:['C++'], description : "A simulator for a card game of Euchre with two types of player inputs: a computer-controlled player that uses one basic-strategy and a human-controlled player than can read in instructions."},
  { text: "SQL Clone", alt: "SQL Clone", id: 1, src: "assets/SQL-Clone.png", languages:['C++'], description : "Emulated in C++ of a simplistic relational database, which has an interface that supports the fundamental SQL commands, while prioritizing efficiency."},
  { text: "Image Processing", alt: "Image Processing",id: 2, src: "assets/image-processing.png", languages:['C++'], description: "Program that uses the seaming carve algorithm to manipulate images without distorting them."},
  { text: "Itunes Clone", alt: "Itunes Clone",id: 3, src: "assets/itunes.png", languages:['JavaScript', 'HTML/CSS', 'BootStrap','VueJs'], description : "An iteractive itunes clone so that a user can serch up artists and listen to music composed by the artist" },
  { text: "Number Classifier", alt: "Number Classifier", id: 4, src: "assets/numbers.png", languages: ['Julia', 'Python'], description: "Program that is able to classify drawn numbers ranging from 0 to 9"},
  { text: "Piazza Posts Classifier", alt: "Piazza Posts Classifier",id: 5, src: "assets/piazza.png", languages:['C++'], description: "Sorts and classifies Piazza post into tags based on the content of a post using ML and NLP techniques"},
  { text: "Star Wars Battle Simulation",  alt: "Star Wars Battle Simulation",id: 6, src: "assets/starwars.png", languages:['C++'], description: "Alogrithm to simulate a war between Star Wars characters based on army size and multiple factors"},
  { text: "Treasure Hunt Algorithm",  alt: "Treasure Hunt Algorithm", id: 7, src: "assets/treasure.png" , languages:['C++'], description: "Algorithm to determnine the most shortest path to a certain location, if possible"},
  { text: "Asteroid Game", alt: "Asteroid Game",id: 8, src: "assets/asteroid.png", languages:['JavaScript', 'HTML/CSS', 'BootStrap', 'jQuery'], description: "Interactive game where the player controls a rocket and needs to avoid asteroids while trying to level up" }
]


    }
  },
  methods: {

    determineUniqueBottons(){
      for(let i = 0; i < this.projectArray.length; ++i ){
        for(let j = 0; j < this.projectArray[i].languages.length; ++j ){
          this.buttons.add(this.projectArray[i].languages[j]);
        }
      }
      this.buttons.forEach(key => {
        console.log(key);
        this.buttonArray.push({text: key, selected:false});
      }
        );
     console.log(this.buttonArray);

    },

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