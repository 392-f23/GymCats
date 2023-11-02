import { Box, Typography, useTheme } from "@mui/material";
import { dummyMatches } from "../assets/dummydata";
import React, { useState } from "react";
import Container from "../components/Container";
import photoUrl from "../assets/profile.jpeg";
import { StyledDivider } from "../components/StyledDivider";
import FriendRequestCard from "../components/FriendRequestCard";
import Navbar from "../components/Navbar";

function RequestsPage() {
    const theme = useTheme();
    const [friends, setFriends] = useState(dummyMatches);
    const [friendRequests, setFriendRequests] = useState(dummyMatches);
    const [selected, setSelected] = useState("requests");

    return (
        <Box sx={{ backgroundColor: theme.palette.primary[1] }}>
            <Container>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h1">GymCats</Typography>
                    <Box
                        component="img"
                        src={photoUrl}
                        sx={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    />
                </Box>
                <StyledDivider />
                {friends.length === 0 ? (
                    <Typography variant="p">No new friend requests yet!</Typography>
                ) : (
                    <Typography variant="p">Your Friend Requests</Typography>
                )}
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        mt: 2,
                    }}
                >
                    {friends.map((match, index) => (
                        <FriendRequestCard key={index} person={match} photoURL={photoUrl} />
                    ))}
                </Box>
                <StyledDivider />
                {friendRequests.length === 0 ? (
                    <Typography variant="p">No new friend requests yet!</Typography>
                ) : (
                    <Typography variant="p">Your Friend Requests</Typography>
                )}
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        mt: 2,
                    }}
                >
                    {friendRequests.map((match, index) => (
                        <FriendRequestCard key={index} person={match} photoURL={photoUrl} />
                    ))}
                </Box>
            </Container>
            <Navbar selected={selected} setSelected={setSelected} />
        </Box>
    )
}

export default RequestsPage;