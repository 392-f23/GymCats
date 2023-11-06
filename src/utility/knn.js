//OUR K-Nearest-Neighbors match making algorithm! 

const encodeFeatures = (data) => {
    let uuids = [];
    let encodedFeatures= [];
    let index = 0
    for(const uuid in data) {
        uuids.push(uuid)
        var userData = data[uuid];
    //     "PartnerPreferences" : {
    //         "Gender": ["Male"],
    //         "Age": 1356,
    //         "ExperienceLevel": "5+ Years",
    //         "WorkoutFrequency": 5,
    //         "UsualWorkoutTime": "Morning",
    //         "Goals": ["Powerlifting"],
    //         "GymPreference": "SPAC"
    // }
        encodeFeatures.push([])
        for(const gender in ["Male", "Female", "Nonbinary", "Other"]){
            encodeFeatures[index].push(userData.Gender.includes(gender) ? 1 : 0)
        }
        // TODO implement age encoding
        
        for(const age in ["18-20", "21-30", "31-40", "41+"]){
            var lowAge, highAge; 
            if(age.indexOf("-") !== -1){
                lowAge = age.split("-")[0];
                highAge = age.split("-")[1]; 
            } else {
                lowAge = age.split("+")[0]; 
                highAge = 100; 
            }
            encodeFeatures[index].push(lowAge <= userData.Age <= highAge ? 1 : 0); 
        }

        for(const expLevel in ["Beginner (<1 year)", "Intermediate (1-3 years)","Advanced (3-5 years)", "Expert (5+ years)"]){
            encodeFeatures[index].push(userData.ExperienceLevel.includes(expLevel) ? 1 : 0)
        }
        for(const gym in ["SPAC", "Blomquist"]){
            encodeFeatures[index].push(userData.GymPreference.includes(gym) ? 1 : 0); 
        }
        for(const freq in ["1", "2", "3", "4", "5", "6", "7"]){
            encodeFeatures[index].push(userData.WorkoutFrequency.includes(freq) ? 1 : 0); 
        }
        for(const time in ["Morning", "Afternoon", "Night"]){
            encodeFeatures[index].push(userData.UsualWorkoutTime.includes(time) ? 1 : 0);
        }
        for(const goal in ["Powerlifting", "Bodybuilding", "Weightloss"]){
            encodeFeatures[index].push(userData.Goals.includes(goal) ? 1 : 0);
        }
    
        index++;
    }
    console.log("encodedFeatures: \n")
    console.log(encodedFeatures)
    return [uuids, encodeFeatures]
}

export const computeMatchesBasedOnEncoding = (userData, uuid, N) => {
    ///Output format: [["similarity_dist", "matchid"], ...] => sorted so in home page we can display top N! 
    const [uuids, encodeFeatures] = encodeFeatures(userData);
    let UOIIndex = encodeFeatures[uuids.indexOf(uuid)]
    let distanceVec = []
    let distance = 0
    for(let i = 0; i < uuids.length; i++){
        distance = euclideanDistance(encodeFeatures[i], encodeFeatures[UOIIndex]);
        distanceVec.push([distance, uuid]);
    }
    distanceVec.sort((a, b) => a[0] < b[0]); 
    const topNMatches = distanceVec.splice(0, N); 
    return topNMatches.map(a => a[1]);
};

function euclideanDistance(vector1, vector2) {
    if (vector1.length !== vector2.length) {
        throw new Error("Vectors must have the same dimensionality");
    }

    let squaredDistance = 0;
    for (let i = 0; i < vector1.length; i++) {
        squaredDistance += Math.pow(vector1[i] - vector2[i], 2);
    }

    const distance = Math.sqrt(squaredDistance);
    return distance;
}