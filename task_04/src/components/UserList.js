import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const apiURL = "https://dummyjson.com/users";
const limit = 50;

export default function UserList() {

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90,
        },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'maidenName',
            headerName: 'Maiden name',
            width: 150,
            editable: true,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            sortable: false,
            width: 100,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 265,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 140,
            editable: true,
        },
        {
            field: 'birthDate',
            headerName: 'Birth date',
            width: 150,
            editable: true,
        },
    ];

    async function loadUsers() {
        const response = await axios.get(`${apiURL}?limit=${limit}`);
        
        setUsers(response.data.users);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const handleRowClick = async (params) => {
        const userId = params.row.id;
        
        await loadUserPosts(userId);
    };

    async function loadUserPosts(userId) {
        const response = await axios.get(`https://dummyjson.com/posts/user/${userId}`);
        
        setPosts(response.data.posts);
    }

    return (
        <div className="container">
            <h2>User List</h2>
            
            <DataGrid
                rows={users}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                onRowClick={handleRowClick}
            />
            
            <h2>User Posts</h2>
            
            <div>
                {posts.length > 0 ?
                (
                    posts.map(post => (
                        <div key={post.id} className="post">
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </div>
                    ))
                )
                :
                (
                    <h4>No posts</h4>
                )}
            </div>
        </div>
    );
}
