import React from 'react';
import { CSVReader } from 'react-papaparse';
import {button} from './UploadButton.module.css';

const buttonRef = React.createRef();

const UploadButton = ({setFatalError, setData}) => {

	const handleOpenDialog = (e) => (buttonRef.current) ? buttonRef.current.open(e) : null;

	const handleOnFileLoad = (data, file) => {
		console.log(data)
		setData(data);
		/csv$/.test(file.name) ? setFatalError(false) : setFatalError(true);
	};

	return (
		<CSVReader
			ref={buttonRef}
			onFileLoad={handleOnFileLoad}
		>
			{({file}) => (
				<div className={button}>
					<button
					type="button"
					onClick={handleOpenDialog}
					>
						Import file csv
					</button>
					<span>{(file && file.name) || 'default data'}</span>
				</div>
			)}
		</CSVReader>
	);

}
export default UploadButton;