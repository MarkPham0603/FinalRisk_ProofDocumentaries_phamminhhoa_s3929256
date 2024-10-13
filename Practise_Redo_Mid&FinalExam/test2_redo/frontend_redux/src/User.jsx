import { useLoaderData, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useMemo } from 'react';
import { togglefanFollower, isFan } from './userSlice';

export async function loadUser({ params }) {
  const response = await fetch(`http://localhost:2222/users/${params.userID}`);
  if (!response.ok) {
    throw new Error('Failed to load user');
  }
  const user = await response.json();
  return user;
}

export default function User() {
  const user = useLoaderData();
  const [followingList, setFollowingList] = useState(user.following_list || []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fanStatuses = useSelector((state) =>
    user.follower_list.map((followerId) => ({
      id: followerId,
      isFan: isFan(state, followerId),
    }))
  );

  const followerDisplay = useMemo(() => {
    return fanStatuses.map(({ id, isFan }) => (
      <li key={id}>
        {id}
        <input
          type="checkbox"
          checked={isFan}
          onChange={() => dispatch(togglefanFollower({ user_id: id }))}
        />
      </li>
    ));
  }, [fanStatuses, dispatch]);

  const handleUnfollow = async (userIdToUnfollow) => {
    try {
      const response = await fetch(
        `http://localhost:2222/users/${user.id}/unfollow/${userIdToUnfollow}`,
        { method: 'POST' }
      );

      if (!response.ok) {
        throw new Error('Unfollow failed');
      }

      const updatedUser = await response.json();
      setFollowingList((prevFollowingList) =>
        prevFollowingList.filter((followingId) => followingId !== userIdToUnfollow)
      );
    } catch (error) {
      console.error('Unfollow error:', error);
    }
  };

  const followingDisplay = followingList.map((followingId) => (
    <li key={followingId}>
      {followingId} <button onClick={() => handleUnfollow(followingId)}>Unfollow</button>
    </li>
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
        <h3>Followings List:</h3>
        {followingDisplay}
        <h3>Followers List:</h3>
        {followerDisplay}
      </ul>
    </>
  );
}
