import React from "react";
import Logo from "../Logo/Logo";
import ImageForm from "../ImageForm/ImageForm";
import FaceRecognition from '../FaceRecognition/FaceRecognition'
import { useState} from "react";
import useSWR from 'swr';
import {useNavigate} from 'react-router-dom'


const Home = ()=>{

    const goto = useNavigate('')

    const token = localStorage.getItem('jwt-token')
    const fetcher = (url) => fetch(url,{
        headers:{
            'auth':token
        }
    })
    .then(res => res.json())

    const {data,err,isLoading} = useSWR('/api/home',fetcher)

    const [box ,setBox]  = useState({})
    const [imageUrl,setInputUrl] = useState('')
    const onButtonSubmit = () => {
        console.log(3)
        // const PAT = 'a837b5c1c5f54b52bccaf2f29569a3ff';
        // const USER_ID = 'clarifai';
        // const APP_ID = 'main';
        // const MODEL_ID = 'face-detection';
        // const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
        // const raw = JSON.stringify({
        //     "user_app_id": {
        //         "user_id": USER_ID,
        //         "app_id": APP_ID
        //     },
        //     "inputs": [
        //         {
        //             "data": {
        //                 "image": {
        //                     "url": imageUrl
        //                 }
        //             }
        //         }
        //     ]
        // });

        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Authorization': 'Key ' + PAT
        //     },
        //     body: raw
        // };

        // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        //     .then(response => response.json())
        //     .then(result => {

        //         const regions = result.outputs[0].data.regions;
        //         console.log(regions)
        //         displayFaceBox(calculateFaceLocation(result))

        //     })
        //     .catch(error => console.log('error', error));
        fetch('/api/home',{
            method:"POST",
            body:JSON.stringify({
                image:imageUrl
            }),
            headers:{
                'Content-type':'application/json',
                'auth':token
            }
        })
        .then(res=>res.json())
        .then(res=>{
            // console.log(res)
            displayFaceBox(calculateFaceLocation(res))
        })
    }

    
    const calculateFaceLocation = (data) => {
        // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        console.log(data.box)
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
          leftCol: data.box.left_col * width,
          topRow: data.box.top_row * height,
          rightCol: width - (data.box.right_col * width),
          bottomRow: height - (data.box.bottom_row * height)
        }
      }


    const displayFaceBox = (box) => {
        setBox(box)
    }

    const onInputChange = (event) => {
        setInputUrl(event.target.value)
    }



    const handleSignOut = () => {
        localStorage.removeItem('jwt-token')
        goto('/signin')
    }
    if(err){
        return(
            <div>
                {`Error while accessing home page ${err}`}
            </div>
        )
    }

    if(isLoading){
        return(
            <div>
                {`Loading`}
            </div>
        )
    }

    if(data.status){
        return(
            <div>
                <Logo handleSignOut = {handleSignOut} />
                <ImageForm
                    onInputChange={onInputChange}
                    onButtonSubmit={onButtonSubmit}
                  />
                <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
        )
    }
    else if(!data.status){
        console.log(`Unauthorized access ${data.message}`)
        goto('/signin')
        return(
            <div>
                Unauthorized access {`${data.message}`}
            </div>
        )
    }

}


export default Home