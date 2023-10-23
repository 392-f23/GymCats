// 

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
        

        for(const expLevel in ["Beginner (<1 year)", "Intermediate (1-3 years)","Advanced (3-5 years)", "Expert (5+ years)"]){
            encodeFeatures[index].push(userData.ExperienceLevel.includes(expLevel) ? 1 : 0)
        }

        // for()
}
}