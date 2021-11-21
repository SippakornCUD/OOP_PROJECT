import React from "react";
import { Bar } from 'react-chartjs-2'

function Barchart({csv}) {

    let arr=[]
    csv.forEach((file)=>{
    //   console.log(file.Score)
      const sco = file.Score.substring(0, 2)
      arr.push(sco)
    })
    arr.sort()

    let label_array=[arr[0]]        //['25']
    console.log("label_array   ",label_array)
    let count_array=[1]            //[1]
    console.log("count_array   ",count_array)

    for(let i=1; i<arr.length; i++){
      if(label_array.indexOf(arr[i])===-1){
        label_array.push(arr[i])
        count_array.push(1)
      }else{
        let index = label_array.indexOf(arr[i])
        count_array[index]++
      }
    }

    console.log("label_array   ",label_array)
    console.log("count_array   ",count_array)

    const data = {
        labels: label_array,
        datasets: [
          {
            label: 'Score ',
            data: count_array,
            backgroundColor: 'rgb(255, 99, 132, 1)',
          }
        ],
      };
    return(
        <div>
        <p>{arr.length}</p>
        <Bar data={data}/>
        </div>
    )
}

export default Barchart