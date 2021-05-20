import './App.css';
import UploadButton from './components/UploadButton/UploadButton';
import { useState } from 'react';
import Table from './components/Table/Table';
import {defaultData} from './defaultData';

function App() {

	const [data, setData] = useState(defaultData);
	const [fatalError, setFatalError] = useState(false);

	return (
		<div className="App">
			<UploadButton setData={setData} setFatalError={setFatalError}/>
			<Table data={data} setFatalError={setFatalError} fatalError={fatalError}/>
		</div>
	);
}

export default App;
