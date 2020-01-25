// Use D3 fetch to read the JSON file

d3.json("samples.json").then(function(importedData){
    // console.log(importedData);
    var data = importedData;
    var metadata = data.metadata;
    console.log(metadata);
    var samples = data.samples;
    console.log(samples);

    // build demographic info table

    var demographicsTable = d3.select('#sample-metadata');

    // Iterate through each study subject
    metadata.forEach((testSubject) => {

      // build test subject ID dropdown
      var testSubjectDropdown = d3.select('#selDataset');
      
          samples.forEach((testSubject) => {       
              var row = testSubjectDropdown.append("option");
              row.attr("value", testSubject.id);
              row.text(testSubject.id);
          });
  
    });

    // build initial plot

    function init() {
      // Use D3 to select the dropdown menu
      var dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.node().value;
      console.log(dataset);
      
      function filterTestSubject(subject) {
          return subject.id == "940";
        }
      
      // 2. Use filter() to pass the filter function as its argument
      var filteredSubject = metadata.filter(filterTestSubject);
      console.log(filteredSubject);  
      
      var filteredValues = samples.filter(filterTestSubject);
      console.log(filteredValues);    
  
  
      // Sort the data array using the sample values
      sortedData = filteredValues.sort((a, b)=>
      b.sample_values - a.sample_values);
  
      // update demographics table
  
      demographicsTable.selectAll('p').html("")
  
      filteredSubject.forEach(subject =>{
      var textline = demographicsTable.append('p');
      textline.text(`ID: ${subject.id}`);
      var textline = demographicsTable.append('p');
      textline.text(`Ethnicity: ${subject.ethnicity}`);
      var textline = demographicsTable.append('p');
      textline.text(`Gender: ${subject.gender}`);
      var textline = demographicsTable.append('p');
      textline.text(`Age: ${subject.age}`);
      var textline = demographicsTable.append('p');
      textline.text(`Location: ${subject.location}`);
      var textline = demographicsTable.append('p');
      textline.text(`BB Type: ${subject.bbtype}`);
      var textline = demographicsTable.append('p');
      textline.text(`WFreq: ${subject.wfreq}`);
  
      var otus = [];
  
      for (i=0;i<10;i++){
          otus.push(`OTU ${sortedData["0"].otu_ids[i]}`)
      };
  
      console.log(otus);
  
      // Trace1 for top 10 OTU bar chart
      var trace1 = {
          x: sortedData["0"].sample_values.slice(0,10).reverse(),
          y: otus.reverse(),
          text: sortedData["0"].otu_labels.slice(0,10).reverse(),
          name: "OTUs",
          type: "bar",
          orientation: "h",
          };
  
      // data
      var chartData = [trace1];
  
      // define layout
      var layout = {
      title: "Top 10 OTUs",
      xaxis:{title:'OTU Sample Value'},
      height: 600,
      width: 400
      };
  
      // Render the plot to the div tag with id "bar"
      Plotly.newPlot("bar", chartData, layout);
   
      //plot bubble chart
  
      var trace1 = {
          x: sortedData["0"].otu_ids,
          y: sortedData["0"].sample_values,
          mode: 'markers',
          text: sortedData["0"].otu_labels,
          marker: {
            color: sortedData["0"].otu_ids,
            opacity: sortedData["0"].otu_ids,
            size: sortedData["0"].sample_values
          }
        };
        
        var data = [trace1];
        
        var layout = {
          title: 'OTU Sample Data',
          showlegend: false,
          height: 600,
          width: 800,
          xaxis:{title:'OTU ID'},
          yaxis:{title:'OTU Sample Value'}
        };
        
        Plotly.newPlot('bubble', data, layout);
  
      });
  
    }


    init();

// Call updatePlotly() when a change takes place to the DOM
d3.select("#selDataset").on("change", updatePlotly);

function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.node().value;
    console.log(dataset);
    
    function filterTestSubject(subject) {
        return subject.id == dataset;
      }
    
    // 2. Use filter() to pass the filter function as its argument
    var filteredSubject = metadata.filter(filterTestSubject);
    console.log(filteredSubject);  
    
    var filteredValues = samples.filter(filterTestSubject);
    console.log(filteredValues);    


    // Sort the data array using the sample values
    sortedData = filteredValues.sort((a, b)=>
    b.sample_values - a.sample_values);

    // update demographics table

    demographicsTable.selectAll('p').html("")

    filteredSubject.forEach(subject =>{
    var textline = demographicsTable.append('p');
    textline.text(`ID: ${subject.id}`);
    var textline = demographicsTable.append('p');
    textline.text(`Ethnicity: ${subject.ethnicity}`);
    var textline = demographicsTable.append('p');
    textline.text(`Gender: ${subject.gender}`);
    var textline = demographicsTable.append('p');
    textline.text(`Age: ${subject.age}`);
    var textline = demographicsTable.append('p');
    textline.text(`Location: ${subject.location}`);
    var textline = demographicsTable.append('p');
    textline.text(`BB Type: ${subject.bbtype}`);
    var textline = demographicsTable.append('p');
    textline.text(`WFreq: ${subject.wfreq}`);

    var otus = [];

    for (i=0;i<10;i++){
        otus.push(`OTU ${sortedData["0"].otu_ids[i]}`)
    };

    console.log(otus);

    // Trace1 for top 10 OTU bar chart
    var trace1 = {
        x: sortedData["0"].sample_values.slice(0,10).reverse(),
        y: otus.reverse(),
        text: sortedData["0"].otu_labels.slice(0,10).reverse(),
        name: "OTUs",
        type: "bar",
        orientation: "h",
        };

    // data
    var chartData = [trace1];

    // define layout
    var layout = {
    title: "Top 10 OTUs",
    xaxis:{title:'OTU Sample Value'},
    height: 600,
    width: 400
    };

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", chartData, layout);
 
    //plot bubble chart

    var trace1 = {
        x: sortedData["0"].otu_ids,
        y: sortedData["0"].sample_values,
        mode: 'markers',
        text: sortedData["0"].otu_labels,
        marker: {
          color: sortedData["0"].otu_ids,
          opacity: sortedData["0"].otu_ids,
          size: sortedData["0"].sample_values
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'OTU Sample Data',
        showlegend: false,
        height: 600,
        width: 800,
        xaxis:{title:'OTU ID'},
        yaxis:{title:'OTU Sample Value'}
      };
      
      Plotly.newPlot('bubble', data, layout);

    });

  }

        
});

  
