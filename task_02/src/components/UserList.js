import { useEffect, useState } from "react"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { DataGrid } from '@mui/x-data-grid';

const apiURL = "https://dummyjson.com/users";
const limit = 50;

export default function UserList() {

    const [users, setUsers] = useState([]);
    const columns =
    [
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
            width: 10,
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
            width: 100,
            editable: true,
        },
    ];
    
    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers()
    {
        let url=`https://dummyjson.com/users?limit=${limit}`;
        
        let response = await fetch(url);
        let data = await response.json();

        setUsers([...users, ...data.users]);
    };

    return (
        <div className="container">
            <h2>User List</h2>

            <DataGrid
                rows = {users}
                columns = {columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 15 },
                    },
                }}
                checkboxSelection/>
        </div>
        );
}