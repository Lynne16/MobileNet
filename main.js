Webcam.set({
    height:300,
    width:310,
    image_format: 'png',
    png_quality: 90,
    constraints:{
        facingMode: "environment"
        //facingMode environment means it will automaticly search for a rear camera,
        //if it finds a rear camera it wil open the rear camera else it will open the front camera
    }
});

camera=document.getElementById("camera");


Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version: ', ml5.version);

//Image Classifier is a predefined function of ml5 which is use tio trigger ml5.js Image Classification function
classifier=ml5.imageClassifier('MobileNet',modelLoaded);
//MobileNet is a pre-trained Model which is trained on 1.3 billion images

function modelLoaded(){
    //We console a message just to check wether ml5  image classification has started 
    console.log('Model Loaded');
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("object_name").innerHTML=results[0].label;
    }
}