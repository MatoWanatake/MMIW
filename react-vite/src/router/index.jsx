import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import StoriesPage from "../components/Stories/StoriesPage";
import CreateStoryPage from "../components/Stories/CreateStoryPage";
import StoryDetailPage from '../components/Stories/StoryDetailPage';
import EditStoryPage from '../components/Stories/EditStoryPage';
import UsersList from '../components/Users/UsersList';
import FollowingList from '../components/Follows/FollowingList';
import FollowersList from '../components/Follows/FollowersList';
import HomePage from '../components/Homepage/HomePage';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "stories",
        element: <StoriesPage />,
      },
      {
        path: "stories/new",
        element: <CreateStoryPage />,
      },
      {
        path: "stories/:id",
        element: <StoryDetailPage />,
      },
      {
        path: "stories/:id/edit",
        element: <EditStoryPage />,
      },
      {
        path: "users",
        element: <UsersList />,
      },
      {
        path: "following",
        element: <FollowingList />,
      },
      {
        path: "followers",
        element: <FollowersList />,
      },
    ],
  },
]);
