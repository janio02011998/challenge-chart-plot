import formartInputToJson from "./formartInputToJson";
import timeStampCheck from "./timeStampCheck";
import lastIndex from "./lastIndex";
import getIndexStop from "./getIndexStop";
import minInterval from "./minInterval";

let chartData: any = [];

/* This function is used when an span event is called for 
update list of datas removing index that timestamp is out new interval. */
function updateDatas(newInterval: any) {
  for (let i = 0; i < chartData.length; i++) {
    if (!timeStampCheck(newInterval, chartData[i][0])) {
      chartData.splice(i, 1);
    }
  }
}

// This functions is so much important, it is responsible to load data in charData 
// that is used after to plot in chart.
function labelAndCategories(sJson: any, group1: any, select1: any, timestamp1: any) {
  let label = ""; // variable for concatenation between strings of group
  let labelgroup = []; // list for concatenation between strings of group and strings of select

  for (let i = 0; i < group1.length; i++) {
    label = label + " " + sJson[group1[i]];
  }

  for (let i = 0; i < select1.length; i++) {
    labelgroup[i] = label + " " + select1[i];
    labelgroup[i] = labelgroup[i].replace(/_/g, " ");
    //dic[labelgroup[i]] = sJson[select1[i]];
    //alert(timestamp1+"_"+labelgroup[i]+"_"+sJson[select1[i]]);
    chartData.push([timestamp1, labelgroup[i], sJson[select1[i]]]);
  }
}


// This function is core of application, here the input is convert to JSON object 
// and this select, group, type events are detected and store, the function call outher 
// functions secondary to clear and transform formart of input and output data.
function handleInput(str: any) {
  // inputArea has of input in formart JSON, then now is possible access as object, ex:  inputArea[0].event;
  let inputArea = formartInputToJson(str);
  
  // index now has position of event start, this is so much import why if index < 0,
  // then not have event start, therefore is wrong 
  let index = lastIndex(inputArea);
  if (index < 0) {
    alert("Error, start not found");
    return false;
  }

  let stop = getIndexStop(inputArea);
  if (stop < 0) {
    alert("Error, stop not found!");
  }

  let select = inputArea[index].select;
  let group = inputArea[index].group;
  let timeStartAndTimeEnd: any = [];
  let event = { "span": false, "data": false };

  for (let i = index + 1; i < inputArea.length; i++) {
    switch (inputArea[i].type) {
      case 'span':

        // update timestamp
        timeStartAndTimeEnd = [inputArea[i].begin, inputArea[i].end];

        if (event['span']) {
          // update data
          if (chartData.length > 0) {
            alert("load new datas");
            updateDatas(timeStartAndTimeEnd);
          }

        } else {
          event['span'] = true;
          //alert(event['span']);
        }

        break;

      case 'data':

        if ((event['span']) && (timeStampCheck(timeStartAndTimeEnd, inputArea[i].timestamp))) {
          // if (i === 2) {
          //   console.log(chartData, 'before')
          // }
          labelAndCategories(inputArea[i], group, select, inputArea[i].timestamp);
          // if (i === 2) {
          //   console.log(chartData, 'after')
          // }
        }
        break;

      case 'stop':

        if (chartData.length == 0) {
          alert("Not have data to plot :(");
          return false;
        }

        let aux1: any = {};
        let aux2: any = {};
        let list: any = [];

        for (let i = 0; i < chartData.length; i++) {
          try {
            aux1[chartData[i][1]].push(chartData[i][2]);

          } catch {
            aux1[chartData[i][1]] = [chartData[i][2]];
          }
        }

        // parse to formart object
        for (let i in aux1) {
          try {
            // possible error, is always undefined
            aux2[i].data = aux1[i];
          } catch {
            aux2[i] = { name: i, data: [] };
            aux2[i].data = aux1[i];
            list.push(aux2[i]);
          }
        }

        // convert timestamp in date after cut date and get only seconds
        let timeInit = minInterval(timeStartAndTimeEnd[0]);
        let timeFinish = minInterval(timeStartAndTimeEnd[1]);

        return {
          categories: [timeInit, timeFinish],
          series: list
        };

      default:
        // whether default is executed is why formart data is wrongly
        // then is display
        alert("Input not have event valid to start!");
        return false;
    }
  }
}

export { handleInput }