import React from "react";

function Result({secretNum,term}){
    let result;
    if(term){
    if(term>secretNum){
        result ='higher';
    }else if(term<secretNum){
        result ='lower';
    }else{
        result ='enter valid input';
    }
}
    return <h3>you guest:{result}</h3>
}

export default Result;
