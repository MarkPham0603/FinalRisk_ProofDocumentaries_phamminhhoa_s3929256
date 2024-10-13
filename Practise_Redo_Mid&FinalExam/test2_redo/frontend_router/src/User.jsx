import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export async function loadUser({ params }) {
  const user = await fetch(`http://localhost:2222/users/${params.userID}`);
  return user;
}


export default function User() {
  const user = useLoaderData();
  const [followingList, setFollowingList] = useState(user.following_list);
  const navigate = useNavigate();

  const handleUnfollow = async (userIdToUnfollow) => {
    try {
      // Replace with your actual unfollow API call
      const response = await fetch(
        `http://localhost:2222/users/${user.id}/unfollow/${userIdToUnfollow}`,
        { method: 'POST' } // Adjust method as needed by your API
      );

      if (!response.ok) {
        throw new Error('Unfollow failed');
      }

      const updatedUser = await response.json(); // Parse updated user data

      setFollowingList((prevFollowingList) =>
        prevFollowingList.filter((followingId) => followingId !== userIdToUnfollow)
      );

    } catch (error) {
      console.error('Unfollow error:', error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  };

  const followingDisplay = followingList.map((followingId) => (
    <li key={followingId}>
      {followingId} <button onClick={() => handleUnfollow(followingId)}>Unfollow</button>
    </li>
  ));

  const followerDisplay = user.follower_list.map((followerId) => (
    <li key={followerId}>{followerId}</li>
  ));

  return (
    <>
      <h2>User details</h2>
      <ul>
        <li>ID: {user.id}</li>
        <li>Name: {user.name}</li>
        <li>Following: {user.following_count}</li>
        <li>Follower: {user.follower_count}</li>
      </ul>
      
      <ul>
        <h3>Following List:</h3>
        {followingDisplay}
        <h3>Follower List:</h3>
        {followerDisplay}
      </ul>
    </>
  )
}
