const OnboardingPersonalPage = () => {
    return (
        <>
            <h1>GymCats</h1>
            <input id = "Gender" type = "radio" value = "Male">
                <label for = "Male"></label> 
                <label for = "Female"></label> 
                <label for = "Nonbinary"></label> 
                <label for = "Other"></label> 
            </input> 
            <label htmlFor="Age">Age:</label>
            <input id = "Age" type="number"></input>
        </>
    );  
}

export default OnboardingPersonalPage; 