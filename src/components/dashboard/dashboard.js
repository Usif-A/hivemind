import "./dashboard.css"
import { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
export default function Dashboard({posts}){

const [comments,setComments] = useState()
const [selectedPost,setSelectedPost] = useState(1)


ChartJS.register(ArcElement,CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

useEffect(()=>{
    getComments()
})

const prepDataLine = () => {
    let counter = {}
    let max = 0
    let posts =  Array.from(new Set(comments.map((it)=> it.postId)))
   
    posts.map((postId)=>{
        var count = comments.filter((it)=> it.postId == postId).length
        if (count > max) max = count
        if (count in counter) counter[count] +=1
        else   counter[count] =1
    })
    
    var labs = []
    var data = []
    for(var i=0; i<=max;i++ ){
        labs.push(i)
        if( i.toString() in counter) data.push(counter[i])
        else data.push(0)
    }


    const lineData = {
        labels: labs,
        datasets: [
          {
            
            data: data,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

      return lineData



}

    const prepDataNut = () =>{
       let mails = new Set(comments.filter((it)=> it.postId == selectedPost).map((it)=> it.email))
       let dataCount = []
       
       for (let mail of mails){
        
        dataCount.push(comments.filter((it)=> it.postId == selectedPost && mail == it.email).length)
       }


       var data = {
        labels: Array.from(mails),
        
        datasets: [
          {
            label: '# of comments',
            data: dataCount,
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 159, 64)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

       return data
       
    }  

    const getComments = async () =>{
        return fetch('https://jsonplaceholder.typicode.com/comments')
  .then((response) => response.json())
  .then((json) => {
    setComments(json)
    
  });
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
             },
          title: {
            display: false,
          },
        },
        scales: {
            y: {
              ticks: {
                color: '#282c34',
                font: {
                  size: 18,
                }
              }
            },
            x: {
              ticks: {
                color: '#282c34',
                font: {
                  size: 18
                }
              }
            }
          }
      };
      

      
      


  
  

    return( <div className="flex-row dash-cont">
        {comments?<><div className="flex-col dash-card-cont">
        <h1>comment frequency on posts</h1>
        
        <div className="dashboard-card">
        <Line options={options} data={prepDataLine()} />
        

        </div>
        </div>

    <div className="flex-col dash-card-cont">
        <h1>Users on Posts</h1>
        
        <div className="dashboard-card">
        
        <Doughnut  data={prepDataNut()} options={{plugins: {
            legend: {
                display: false
             },
                 title: {
                    display: true,
                    text: `PostID:${selectedPost}`
                }}}}/>
        </div>

<div className="post-sel">
            <Dropdown>
            <Dropdown.Toggle variant='Secondary' id="dropdown-basic">
        Select a post
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {posts.map((post)=>{
            return(<Dropdown.Item onClick={()=>{setSelectedPost(post.id)}} >{post.title}</Dropdown.Item>)
        })}
        

      </Dropdown.Menu>
            </Dropdown>
        </div>

    </div>
    </>:<></>}


    </div>
)
}