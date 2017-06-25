//Part 2 Plot Map

function drawMap(us,salaryData,mapSvg){
    //STEP 2.1 draw us map
    var path = d3.geo.path();
    var states=mapSvg.append('g')
       .attr("class", "states")
       .append("path")
       .datum(topojson.feature(us, us.objects.states))//use datum because we want a single path instead of multiple paths. 
       .attr("d", path); 
      
   //STEP 2.2 organize the dataset for map drawing
  stateSalary=createDataForEachState(salaryData,stateCoordinates)
  

  totalSalaryRange=findTotalSalaryRange(stateSalary.features)
  dotRadiusRange={min:10,max:40}

  dotColorScale=d3.scale.linear()
                .domain([totalSalaryRange.min,totalSalaryRange.average,totalSalaryRange.max])
                .range(["red","white","green"])
  //STEP 2.3 
  dotRadiusScale=d3.scale.linear()
                .domain([totalSalaryRange.min,totalSalaryRange.max])//your work here 
                .range([dotRadiusRange.min,dotRadiusRange.max])//your work here

  // dotRadiusScale=d3.scale.linear()
  //               .domain([totalSalaryRange.min,totalSalaryRange.average, totalSalaryRange.max])//your work here 
  //               .range([dotRadiusRange.min,totalSalaryRange.average, dotRadiusRange.max])//your work here  

  //STEP 2.4 and STEP 2.5           
  symbols=mapSvg.append('g')
                .selectAll(".symbol")
                .data(stateSalary.features)
                .enter()
                .append("path")
                .attr("class", "symbol")
                .attr("d", path.pointRadius(function(d) { 
                    totalS=d.properties.totalSalary
                    peopleEachState = d.properties.employees.length
                    averageS = totalS / peopleEachState  

                    return dotRadiusScale(averageS) 
                  }))
                .style("fill",function(d,i){
                    totalS=d.properties.totalSalary
                    peopleEachState = d.properties.employees.length
                    averageS = totalS / peopleEachState 
                    return dotColorScale(averageS)
                  })

          
    return symbols
}

