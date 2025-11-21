document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector(".add-btn");
    const interBtn = document.querySelector(".interpolate");
    const xInput = document.getElementById("x");
    const yInput = document.getElementById("y");
    const xCal = document.getElementById("x-cal")
    const display = document.querySelector(".display");
    const resetBtn = document.querySelector(".reset-btn");
    const resultBox = document.querySelector(".result");
  
    // list of x,y tuples
    const points = [];
  
    addBtn.addEventListener("click", () => {
      const xVal = xInput.value.trim();
      const yVal = yInput.value.trim();
  
      if (!xVal || !yVal) return;
  
      // save to the list
      points.push([parseFloat(xVal), parseFloat(yVal)]);
  
      // create the row visually
      const row = document.createElement("div");
      row.className = "table-r";
  
      const xCell = document.createElement("div");
      xCell.className = "table-c x";
      xCell.textContent = xVal;
  
      const yCell = document.createElement("div");
      yCell.className = "table-c y";
      yCell.textContent = yVal;
  
      row.appendChild(xCell);
      row.appendChild(yCell);
      display.appendChild(row);
  
      // clear inputs
      xInput.value = "";
      yInput.value = "";
  
      console.log(points); // shows the list in console
    });

      // --- RESET BUTTON ---
  resetBtn.addEventListener("click", () => {
    // clear array
    points.length = 0;

    // remove all .table-r rows (but keep the header)
    const rows = display.querySelectorAll(".table-r");
    rows.forEach(r => r.remove());

    // clear inputs
    xInput.value = "";
    yInput.value = "";
    resultBox.textContent = "";
    xCal.value="";

  });
  interBtn.addEventListener("click", ()=>{
    if(! xCal) return;
    const pointsSorted = points.sort((a, b) => a[0] - b[0])
    const x = xCal.value.trim()
    let line = []
    if(x<pointsSorted[0][0]) line = [pointsSorted[0],pointsSorted[1]]
    else if (x>pointsSorted[pointsSorted.length-1][0]) line = [pointsSorted[pointsSorted.length-2],pointsSorted[pointsSorted.length-1]]
    else {
        for(let i=0; i<points.length; i++){
            if(x>=pointsSorted[i][0] && x<=pointsSorted[i+1][0]) { 
                line=[pointsSorted[i], pointsSorted[i+1]];
                break;
            }
        }
    }
    resultBox.textContent = `y: ${interp(line, x)}` 
  })
  });
  

  function interp(line,x){
    y = (line[1][1]-line[0][1])/(line[1][0]-line[0][0])*(x - line[0][0]) + line[0][1];
    return y;
  }