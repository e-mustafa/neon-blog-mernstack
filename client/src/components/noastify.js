import { toast } from 'react-toastify';

export const notifySuccess = (mes) => {
	toast.success(mes, {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'dark',
	});
};

export const notifyError = (mes) => {
	toast.error(mes, {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'dark',
	});
};

export const notifyInfo = (mes) => {
	toast.info(mes, {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'dark',
	});
};
