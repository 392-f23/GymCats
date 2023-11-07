//OUR K-Nearest-Neighbors match making algorithm! 

const encodeFeatures = (allUserData) => {
    let uids = [];
    let features= [];
    let index = 0
    for(const user in allUserData) {
        uids.push(user.uid)
        var userData = user;
    //     "PartnerPreferences" : {
    //         "Gender": ["Male"],
    //         "Age": 1356,
    //         "ExperienceLevel": "5+ Years",
    //         "WorkoutFrequency": 5,
    //         "UsualWorkoutTime": "Morning",
    //         "Goals": ["Powerlifting"],
    //         "GymPreference": "SPAC"
    // }
        features.push([])
        for(const gender in ["Male", "Female", "Nonbinary", "Other"]){
            features[index].push(userData.PartnerPreferences.Gender.includes(gender) ? 1 : 0)
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
            features[index].push(lowAge <= userData.Age <= highAge ? 1 : 0); 
        }

        for(const expLevel in ["Beginner (<1 year)", "Intermediate (1-3 years)","Advanced (3-5 years)", "Expert (5+ years)"]){
            features[index].push(userData.PartnerPreferences.ExperienceLevel.includes(expLevel) ? 1 : 0)
        }
        for(const gym in ["SPAC", "Blomquist"]){
            features[index].push(userData.PartnerPreferences.GymPreference.includes(gym) ? 1 : 0); 
        }
        for(const freq in ["1", "2", "3", "4", "5", "6", "7"]){
            features[index].push(userData.PartnerPreferences.WorkoutFrequency.includes(freq) ? 1 : 0); 
        }
        for(const time in ["Morning", "Afternoon", "Night"]){
            features[index].push(userData.PartnerPreferences.UsualWorkoutTime.includes(time) ? 1 : 0);
        }
        for(const goal in ["Powerlifting", "Bodybuilding", "Weightloss"]){
            features[index].push(userData.PartnerPreferences.Goals.includes(goal) ? 1 : 0);
        }
    
        index++;
    }
    console.log("encodedFeatures: \n")
    console.log(features)
    return [uids, features]
}

export const computeMatchesBasedOnEncoding = (allUserData, personalUserId, N) => {
    ///Output format: [["similarity_dist", "matchid"], ...] => sorted so in home page we can display top N! 
    const [allUserIds, features] = encodeFeatures(allUserData);
    let personalUserIdIndex = features[allUserIds.indexOf(personalUserId)]
    let distances = []
    allUserIds.forEach((partnerUserId, partnerUserIdIndex) => {
        if (partnerUserId != personalUserId) {
            const distance = euclideanDistance(features[personalUserIdIndex], features[partnerUserIdIndex])
            distances.push([distance, partnerUserId])
        }
    })
    distances.sort((a, b) => a[0] < b[0]); 
    const topNMatches = distances.splice(0, N); 
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