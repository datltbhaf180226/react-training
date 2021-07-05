import Login from "./Login";

function Profile({ currentUser }) {
  return (
    <div>
      {currentUser ? (
        <ul>
          <li>ID: {currentUser.id}</li>
          <li>Name: {currentUser.name}</li>
          <li>Created at: {currentUser.createdAt?.slice(0, 10)}</li>
        </ul>
      ) : (
        <div>
          <p>Please login to view profile</p>
          <Login />
        </div>
      )}
    </div>
  );
}

export default Profile;
