import { Row, Col } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import data from './brain.json';
import './tree.css';
import 'antd/dist/antd.css';
import TreeMenu from 'react-simple-tree-menu';
import '../node_modules/react-simple-tree-menu/dist/main.css';
import Barchart from './Barchart';
import './Chart.css'


function Treelist(){
  const [state, setState] = useState({image:""})
  const [datacsv, setDatacsv] = useState({csv : []})

  const click=()=>{
    axios.post('http://localhost:9000/csv',{csv :"../brain/csv.csv"}).then((res)=>setDatacsv({csv : res.data[0]}))
    axios.post('http://localhost:9000/image',{image :"../brain/test/00001/FLAIR/Image-100.dcm"}).then((res)=>setState({image : res.data}))
  }
  console.log("state.image",state.image)
  console.log("state csv  ",state.csv)
  console.log("state      ",state)
    
    return (
        <Row>
        <Col span={6}>
          <div className="body">
            <p onClick={()=>click()} >Hello</p>
            {/* <TreeMenu data={data} onClickItem={({ key, label, value }) => {
              if(value){
                //console.log(value,"value")
                if(!value.includes(".csv")){
                axios.post('http://localhost:9000/image',{image:value}).then(respons=>setState({image : respons.data}));
                // console.log(state.image)
                }else{
                  if(value.includes(".csv")){
                    axios.post('http://localhost:9000/csv',{image:value}).then(respons=>       /*console.log("Res.data  ",respons.data[0])
                    
                    //setState({csv : respons.data[0],image: label}))
                    // console.log("label  ",label)
                    // console.log(state.csv)
                  }
                }
              }
            }} /> */}
          </div>
        </Col>
        <Col span={18}>
          <div className="body">
             <table>
                {datacsv.csv.map((file)=>{
                    return(
                        <tr className='table-chart'>
                            <td className='table-chart'>
                                {file.Score}
                            </td>
                            <td className='table-chart'>
                                {file.Name}
                            </td>
                        </tr>
                    );
                })}
            </table>
            {(state.csv!==[])?<div><Barchart csv={datacsv.csv}/></div>:null}
            <img src={`data:image/jpeg;base64,${state.image}`} width={300} />
          </div>
        </Col>
        </Row>
    );
};

export default Treelist;