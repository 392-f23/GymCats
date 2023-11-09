export const getNaiveMatches = (allUserData, personalUserId) => {
    var uids = [];
    var userPersonalData = {};
    var matches = [];
    var numMatchingFieldsRequired = 1; // todo: change this number?

    var personalUserData = allUserData[personalUserId];
    var partnerPreferences = personalUserData.PartnerPreferences;

    for (var user in allUserData) {
        if (isInvalidMatch(user, personalUserId, personalUserData.Friends, personalUserData.NotInterested)) continue;
        uids.push(user);
        var userData = allUserData[user];
        userPersonalData[user] = userData;
    }

    for (var user in userPersonalData) {
        var userData = userPersonalData[user];
        var numMatchingFields = 0;
        for (var field in userData.PersonalData) {
            if (checkMatch(userData.PersonalData[field], partnerPreferences[field])) {
                numMatchingFields++;
            }
        }
        if (numMatchingFields >= numMatchingFieldsRequired) {
            matches.push(allUserData[user]);
        }
    }

    return matches;
};

const isInvalidMatch = (otherUser, personalUserId, personalUserFriends, personalUserNotInterested) => {
    return (otherUser == personalUserId || personalUserFriends.includes(otherUser) || personalUserNotInterested.includes(otherUser));
};

const checkMatch = (object1, object2) => {
    if ((typeof object1 === 'string' || object1 instanceof String) && (typeof object2 === 'string' || object2 instanceof String)) {
        return object1 === object2;
    } else if (Array.isArray(object1) && Array.isArray(object2)) {
        var match = true;
        for (var i = 0; i < object1.length; i++) {
            match = match && checkMatch(object1[i], object2[i]);
        }
        return match;
    }
};