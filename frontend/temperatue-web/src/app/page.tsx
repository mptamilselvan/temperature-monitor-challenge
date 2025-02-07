'use client'

import Image from "next/image";
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import axios from "axios";
import { Box } from '@mui/material';
import { io } from 'socket.io-client';

//const socket = io('http://localhost:3001');
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const socket = io(API_URL, {
  transports: ['websocket'], // WebSocket transport
  withCredentials: true,     // credentials are included
});

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [temperature, setTemperature] = useState(null);
  const [temperatures, setTemperatures] = useState(null);

  useEffect(() => {
	  
    socket.on('temperatureUpdate', (data) => {
		//console.log('get temperature data',data);	
	  if(typeof data.temperature!='undefined') {	
		setTemperature(data.temperature);
	  }
    });

	fetchAllTemperatures();
    setLoading(false);

    const interval = setInterval(() => {
	  fetchAllTemperatures();
    }, 5000); // 5 seconds interval
    return () => {
	  clearInterval(interval);
      socket.disconnect();
    };
  }, []);
  
  const fetchAllTemperatures = async () => {
    try {
      // setLoading(true);
	  //const API_URL = 'http://localhost:3001/public/temperatures?token=leeloolxp';
	  console.log(process.env.NEXT_PUBLIC_API_URL);
	  //const API_URL = process.env.NEXT_PUBLIC_API_URL+'/public/temperatures?token=leeloolxp';
	  const url = API_URL+'/public/temperatures?token=leeloolxp';
      const response = await axios.get(url);
	  setLoading(false);
	  console.log('respone');
	  console.log(response.data);
	  if(response.data.status=='ok') {
		setTemperatures(response.data.data);
	  }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  
 const getlist = () => {
    try {
		console.log('getlisting');
		console.log(temperatures);
		if(temperatures!==null && typeof temperatures=='object' && temperatures.length>0) {
			const listItems = temperatures.map(temp =>
					
					<li style={{ marginLeft: 0,  isplay: "flex", flex:1, lexDirection:"row", background:"#fafafa" }} key={temp._id ? temp._id:'key0'}>
					 
						 <div style={{ display: "flex", justifyContent: "space-between" }}>
						 
							 <div><span className="text-black-900" style={{ fontSize:33, padding:10, fontWeight:"bold" }}>{temp.temperature ? temp.temperature:'--'}</span> &deg; {temp.type ? temp.type:''}  <br />
							  <span style={{fontSize:14, color:"#afb3ba" }}>Last updated</span> {temp.time_difference ? temp.time_difference:''} ago
							 </div>
							 
							 <div style={{ marginLeft:130, textAlign:"right"}}>
							  <p style={{ marginLeft: 10 }}>
								<b><span style={{color:"green", fontWeight:"bold"}}>{temp.feel ? temp.feel.toUpperCase():''}</span></b>
							   
							  </p>
							 </div>
						 
						 </div>
					 
					</li>
					
			);
			return listItems;
		}
    } catch (error) {
      console.error("Error generating list:", error);
    } finally {
      //setLoading(false);
    }
 };
	
  if(loading) {
	  return (
	   <div className="App">
		<div className="spinner"></div>
	   </div>
	  )
  }	  
 
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      
		<div style={{ marginLeft: 0,  height:10, border:1, borderBlockColor:"#00" }}>
			<h1>Temperature Monitor</h1>
		</div>
	   
		<Box component="span" className="live_box" 
			sx={{ p: 2, border: '1px solid grey', textAlign: "center" }}>
		
			<span style={{ color:"#afb3ba" }}>Current Temperature </span><br/>  
			
			<div style={{ margin:20, flex:"column" }}>
				<span className="text-black-900" style={{ fontSize:33, fontWeight:"bold" }}>{temperature ? temperature.temperature:'--'}</span> &deg; {temperature ? temperature.type:''} 
			</div>
			
			<br/>
			
			<span style={{color:"green", fontWeight:"bold"}}>{temperature ? temperature.feel.toUpperCase():''}</span>&nbsp; 
			<span style={{fontSize:14, color:"#afb3ba" }}>Last updated </span> {temperature ? temperature.time_difference:''} ago
			
		</Box>
 
	   <div style={{ marginLeft: 0,  height:10, border:1, borderBlockColor:"#00" }}>
       <h2>Recent readings</h2>
	   </div>
	   <div className="live_box"> 
		<ul style={{ listStyleType: "none", marginLeft: 0, padding:12, isplay: "flex", border:"1px solid silver", borderBlockColor:"#00", width:1000, flexDirection: "column" }}  key=''>{getlist()}</ul>
	   </div>
      </main>
    </div>
  );
}