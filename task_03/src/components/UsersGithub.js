import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Card, CardContent, CardMedia } from "@mui/material";

const UserInfo = (props) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                component="img"
                height="auto"
                image={props.avatar_url}
            />
            <CardContent>
                <h3>
                    Login: {props.login}
                </h3>
                <h4>
                    Repositories: {props.public_repos}
                </h4>
                <h4>
                    Followers: {props.followers}
                </h4>
            </CardContent>
        </Card>
    );
}

export default function UsersGithub() {
    const [userObj, setUserObj] = useState(null);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            await loadUserInfo();
        };
        fetchData();
    }, []);

    useEffect(() => {

    }, [userObj]);
    const handleOnChange = (event) => {
        setUserName(event.target.value);
        console.log(userName);
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        await loadUserInfo(userName);
    }

    const loadUserInfo = async (userName) => {
        const query = `https://api.github.com/users/${userName}`;

        try {
            const resp = await axios.get(query);
            if (resp.status === 200) {
                console.log(resp.data);
                setUserObj(resp.data);
                console.log(setUserObj.userName)
            }
        }
        catch {
            setUserObj(null);
        }

    }
    return (
        <div className="container">
            <form onSubmit={handleOnSubmit}>
                <TextField
                    label="Input user name for search"
                    fullWidth
                    margin="normal"
                    value={userName}
                    onChange={handleOnChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Search
                </Button>
            </form>

            {userObj == null ?
            (
                <h1>
                    Not Found
                </h1>
            )
            :
            (
                <UserInfo {...userObj} />
            )}
        </div>
    );
}