import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import MainAppBar from './components/MainAppBar';
import Footer from './components/Footer';
import HomePage from './pages/homePage';
import AddBlogPage from './pages/addBlogPage';
import EditBlogPage from './pages/editBlogPage';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import BlogDetailsPage from './pages/blogDetailsPage';
import Page404 from './pages/page404';
import DashBoard from './components/Users/DashBoard';
import ShowBlogsPage from './pages/showBlogsPage';


import { useSelector } from 'react-redux';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#028fa6',
		},
	},
});

function App() {
	const isLogin = useSelector((state) => state?.user?.isLoggedIn);
	const { isAdmin } = useSelector((state) => state?.user?.user);
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<ToastContainer />
			{/* ---------------------- Header --------------------------- */}
			<MainAppBar />

			{/* ---------------------- Routes --------------------------- */}
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/blogs" element={<HomePage />} />

				<Route path="/user/login" element={<LoginPage />} />
				<Route path="/user/register" element={<RegisterPage />} />
				<Route path="blogs/blog-details/:id" element={<BlogDetailsPage />} />

				{isLogin && (
					<>
						<Route path="/blogs/create-blog" element={<AddBlogPage />} />
						<Route path="/blogs/edit-blog/:id" element={<EditBlogPage />} />

						<Route path="/user/dashboard" element={<DashBoard />} />
						<Route path="/user/edit-infos" element={<DashBoard />} />
						<Route path="/user/edit-password" element={<DashBoard />} />

						{/* <Route path="/user/logout-all" element={<DashBoard />} /> */}
					</>
				)}
				<Route
					path="/dashboard/my-blogs"
					element={<ShowBlogsPage title="My Blogs" />}
				/>
				{isLogin && isAdmin && (
					<Route
						path="/admin/dashboard/all-blogs"
						element={<ShowBlogsPage title="All Blogs" />}
					/>
				)}

				<Route path="*" element={<Page404 />} />
			</Routes>

			{/* ---------------------- Footer ---------------------------- */}
			<Footer />
		</ThemeProvider>
	);
}

export default App;
