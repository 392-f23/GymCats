export const getNaiveMatches = (allUserData, personalUserId) => {
    var uids = [];
    var personalData = [];
    var partnerPreferences = [];

    console.log("all user data", allUserData);
    console.log("personalUserId", personalUserId);

    for (var user in allUserData) {
        uids.push(user.uid);
        // personalData.push(user);
        // partnerPreferences.push([]);
    }
};