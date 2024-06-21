import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {Stack, Typography } from '@mui/material';
import { CloudUploadOutlined } from '@mui/icons-material';

function DragDropImg({ setImg }) {
	const [files, setFiles] = useState([]);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: 'image/*',
		multiple: false,
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});

	useEffect(() => {
		setImg && setImg(files[0]);
	}, [files, setImg]);

	console.log(files[0]);

	// const UploadedImage = files.map((file) => (
	// 	<Box key={file.name}>
	// 		<div>
	// 			<img src={file.preview} style={{ width: "200px" }} alt="preview" />
	// 		</div>
	// 	</Box>
	// ));

	return (
		<Stack
			gap={3}
			alignItems="center"
			p={3}
			minHeight="200px"
			border="2px dashed gray"
			{...getRootProps()}
			className="cv-upload-img-container p-4 d-flex flex-column gap-3 align-items-center text-center"
		>
			<CloudUploadOutlined />
			<input {...getInputProps()} />
			{isDragActive ? (
				<Typography variant="h5">Drop file now... </Typography>
			) : (
				<Typography variant="h5">
					Drag & drop files or{' '}
					<Typography
						variant="body2"
						component="span"
						sx={{
							textDecoration: 'underline',
							color: 'text.disabled',
							cursor: 'pointer',
							'&:hover': { color: 'primary' },
						}}
					>
						Browse
					</Typography>
				</Typography>
			)}

			<Typography variant="body2" color="text.disabled" maxWidth="300px">
				Supported formats: JPEG, PNG, Jpg, GIF
			</Typography>

			{/* {files[0] && (
					<CardMedia
						component="img"
						height="100%"
						image={files[0]?.preview}
						alt="Uploaded Image"
					/>
				)} */}
		</Stack>
	);
}

export default React.memo(DragDropImg);
