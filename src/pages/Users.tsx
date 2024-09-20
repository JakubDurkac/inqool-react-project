import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface User {
  id: string;
  name: string;
  gender: "female" | "male" | "other";
  banned: boolean;
}

const fetchUsers = async () => {
  const { data } = await axios.get<User[]>(
    "https://inqool-interview-api.vercel.app/api/users"
  );

  return data;
};

const Users = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <table className="table table-light table-striped border-dark">
      <thead className="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th scope="col">Banned</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.banned ? "Yes" : "No"}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Users;
