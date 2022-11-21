const { createApp } = Vue

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
/*store buttons as an array*/

  buttonArray:[],
  dropDownArray:[
  { text: "Reset to Original", selected: true },
  { text: "Collection Name", selected: false},
  { text: "Price", selected: false}]
    }
  },
  methods: {
    //need to have an array of artists. From that we display tracks

    //monitor what the search bar value is
     searchBarValueDetermine(event){
     
      this.searchBarVal = event.target.value;
    },
    //parse url for itunes API
    urlGenerate(){
      //need to get all the individual words in the search result
      searchBarValCopy = this.searchBarVal
      lowerCase = searchBarValCopy.toLocaleLowerCase();
      spaceRemoved = lowerCase.replace(" ", "+");
      //finalUrl ="https://itunes.apple.com/search?term="+spaceRemoved+"&origin=*";
      //add limit
      finalUrl ="https://itunes.apple.com/search?term="+spaceRemoved+"&attribute=allArtistTerm";
      console.log(finalUrl);
      return finalUrl;
    },
    //once the search bar value has been entered
     async searchBarEnter(event){
      if(event.keyCode === 13){
        console.log("enter has been pressed");
        console.log("search bar value is " + this.searchBarVal);
        //get url for Itunes API
        url = this.urlGenerate();
        await this.fetchUrl(url);

      
        console.log(this.resultsArray);
        //reset values
        this.sortValue = "Reset to Original";
        this.uniqueGenre.clear();
        this.buttonToAudio.clear();
        this.buttonToAudioObject.clear();

        //update drop down to reset to original
        for(let i = 0; i < this.dropDownArray.length; ++i){
          if(this.dropDownArray[i].text === "Reset to Original"){
            this.dropDownArray[i].selected = true;
          }
          else{
            this.dropDownArray[i].selected = false;
          }
        }
        
        //console.log(this.resultCount);
        if(this.resultCount === 0){
          this.buttonArray = [];
          alert("No artist Found!!!!");
        }
        else{
          this.buttonArray = [];
          this.buttonArray.push({ text: "ALL", selected: true });
        }
        
          
          //find all the unique genre 
          
          for(let i = 0; i < this.resultsArray.length; ++i){
           
            this.uniqueGenre.add(this.resultsArray[i].primaryGenreName);
            let key = this.resultsArray[i].trackId;
            let audioLink = this.resultsArray[i].previewUrl;
            this.buttonToAudio.set(key, audioLink);
            this.buttonToAudioObject.set(key, new Audio(audioLink));
            this.buttontoStatus.set(key,false);
            //this.collectionNameToTrack.set(this.resultsArray[i].collectionName,this.resultsArray[i].trackName);
         
            if(this.collectionNameToTrack.has(this.resultsArray[i].collectionName) === true){
              this.collectionNameToTrack.get(this.resultsArray[i].collectionName).push(this.resultsArray[i].trackName)
            }
            else{
              this.collectionNameToTrack.set(this.resultsArray[i].collectionName,[this.resultsArray[i].trackName]);
            }

            if(this.resultsArray[i].artistName == ""){
              console.log("invalid");
              this.resultsArray[i].artistName = "No information provided";
            }
            if(this.resultsArray[i].collectionName === ""){
              this.resultsArray[i].collectionName = "No information provided";
              console.log("invalid");
            }

            else if(this.resultsArray[i].kind === ""){
              this.resultsArray[i].kind = "No information provided";
            }

            else if(this.resultsArray[i].previewUrl === ""){
              this.resultsArray[i].previewUrl = "No information provided";
            }
            else if(this.resultsArray[i].trackId === ""){
              this.resultsArray[i].trackId = "No information provided";
            }
            else if(this.resultsArray[i].country === ""){
              this.resultsArray[i].country = "No information provided";
            }
          

        }
        
        console.log('map');
        console.log(this.collectionNameToTrack);
        //this.convertMaptoArray();

          
          const iterator = this.uniqueGenre.values();
          for (const entry of iterator) {
            buttonElement = {text: entry, selected:false};
            this.buttonArray.push(buttonElement);
          }
          console.log(this.buttonArray);

        
        


      }
    },
     async fetchUrl(url){
      try {
        const response = await axios.get(url);
        this.responseData = response.data
        this.resultsArray = response.data.results;
        this.filteredresultsArray = [...this.resultsArray];
        this.resultCount = response.data.resultCount;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    processFetchedData(){
       for(let i = 0; i < 1; ++i){
        console.log(this.resultsArray[i].artistName);
       }
    },

    updateButtonStatus(button){
      console.log(button.text + 'clicked');
      if(button.selected === true){
        button.selected = false;
      }
      else{
        button.selected = true;
        if(button.text !== 'ALL'){
          this.buttonArray[0].selected = false;
        }

        if(button.text === 'ALL'){
          for(let i = 0; i < this.buttonArray.length; ++i){
            if(this.buttonArray[i].text !== 'ALL'){
              this.buttonArray[i].selected = false;
            }
          }
        }
        
      }


      //now update search results based on genre
      this.updateGenre(true);
        
     

    },

    updateGenre(ifSort){
      console.log("update genre function")
      this.genreSelectedId.clear();
      const iterator = this.genreSelected.values();
      for(let i = 0; i < this.buttonArray.length; ++i){
        if(this.buttonArray[i].selected === true){
          this.genreSelectedId.add(this.buttonArray[i].text);
        }
      }

      if(this.buttonArray[0].selected === true){
        this.filteredresultsArray = [...this.resultsArray];
        console.log("results" + this.filteredresultsArray);
        this.resultCount = this.filteredresultsArray.length;
      }
      else{
        this.filteredresultsArray = [...this.resultsArray.filter(this.filterResults)];
        this.resultCount = this.filteredresultsArray.length;
      }
      if(ifSort === true){
        this.dropdownContainerUpdate(this.sortValue);
      }
     
      
    },

    updateDropDown(item){
      console.log(item.text);
      //update dropdown display
      let selectedSortVal;
      for(let i = 0; i < this.dropDownArray.length; ++i){
        if(this.dropDownArray[i].text === item.text){
          this.dropDownArray[i].selected = true;
          selectedSortVal = this.dropDownArray[i];
        }
        else{
          this.dropDownArray[i].selected = false;
        }
      }
      this.sortValue = selectedSortVal.text;
      this.dropdownContainerUpdate(selectedSortVal.text);

      


    },

    //filter resulst based on drop down values
    dropdownContainerUpdate(val){
        console.log("hello");
        console.log(this.resultsArray);
        if(val === "Reset to Original"){
          console.log("reset");
          this.updateGenre(false);
          console.log(this.resultsArray);
          console.log(this.filteredresultsArray);
        }
        else if(val === "Collection Name"){
          console.log("collection");
            this.filteredresultsArray.sort(function(a,b){
              let x = a.collectionName;
              let y = b.collectionName;
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
        });
        this.resultCount = this.filteredresultsArray.length;

        }
        else if(val === "Price"){
          console.log("price");
          
          this.filteredresultsArray.sort(function(a,b){
            return a.trackPrice - b.trackPrice;
        });
        this.resultCount = this.filteredresultsArray.length;
        

        }
    },

    filterResults(value){
      return this.genreSelectedId.has(value.primaryGenreName);

    },

    audioButton(value){
      console.log(value.previewUrl);
      //let audio = this.buttonToAudio.get(value.trackId);
    
     // audio.play();
     let audio = this.buttonToAudioObject.get(value.trackId)
     if(this.buttontoStatus.get(value.trackId) === false){
      this.buttontoStatus.set(value.trackId,true);
      audio.play();
     }
     else{
      this.buttontoStatus.set(value.trackId,false);
      audio.pause();
     }
  
     console.log(audio);
     

    },
    convertMaptoArray(){
      this.collectionNameToTrack.forEach((value, key) => {
        console.log(value + key);
      });
        

    },

    displayTrackName(){
      console.log("display");
      alert(this.sortValue);

    }
   
   
  

  }
}).mount('#app')