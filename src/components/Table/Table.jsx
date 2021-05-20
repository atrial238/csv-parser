import {table_style, error ,error_message} from './Table.module.css';

const Table = ({data, setFatalError, fatalError}) => {
	let tableHeader;
	let tableBody;

	const regExpPhone = /^\+?1?[0-9]{10}$/,
			regExpEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
			regExpDateYMD =/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
			regExpDateMDY = /^(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;

	const findDuplicate = (array, element, indexRow) => {
		return array.findIndex((tableRow, index) => tableRow.data.find(el => el.trim() === element) && indexRow !== index)
	}

	if(data) {
		//create tabel haeader
		tableHeader = data[0].data.map((el, index) => <th key={index} scope='col'>{el}</th>);
		tableHeader = [<th key={-1} scope='col'>id</th>, ...tableHeader, <th key={tableHeader.length} scope='col'>Duplicate with</th>];

		//separate header
		tableBody = data.slice(1).map((el, indexRow, tableBody) => {
			let duplicateWith = -1;
			//create table rows
			return <tr key={indexRow}>{
				//create table columns, add id column and duplicate with column
				[<td key='-1'>{indexRow + 1}</td>, ...el.data.map((el, i, arr) => {
					el = el.trim();
					//do validation
					switch(i){
						//validate full name
						case 0:
							if(el === '') setFatalError(true);
							return <td key={i}>{el}</td>;
						//validate phone number
						case 1:
							duplicateWith = findDuplicate(tableBody, el, indexRow);
							if(el === '') setFatalError(true);
							return el.match(regExpPhone)
								? <td key={i}>{`+1${el.match(/[0-9]{10}$/)[0]}`}</td>
								: <td key={i} className={error}>{el}</td>
						//validate email
						case 2: 
							duplicateWith = findDuplicate(tableBody, el, indexRow);
							if(el === '') setFatalError(true);
							return regExpEmail.test(el)
								? <td key={i}>{el}</td>
								: <td key={i} className={error}>{el}</td>;
						//validate age
						case 3:
							return Number.isInteger(+el) && el >= 21 && el
								? <td key={i}>{el}</td>
								: <td key={i} className={error}>{el}</td>
						//validate experience
						case 4:
							return !Number.isNaN(+el) && el >= 0 && +el < arr[3]
								? <td key={i}>{el}</td>
								: <td key={i} className={error}>{el}</td>
						//validate Yearly income
						case 5:
							return Number.isInteger(+el) && +el < 1e+6 && +el >= 0
								? <td key={i}>{el}</td>
								: !Number.isNaN(+el) && +el < 1e+6 && +el >= 0
								? <td key={i}>{Number(el).toFixed(2)}</td>
								: <td key={i} className={error}>{el}</td>
						//validate has children
						case 6:
							return el === '' || el.toLowerCase() === 'false'
								? <td key={i}>false</td>
								: el.toLowerCase() === 'true'
								? <td key={i}>true</td>
								: <td key={i} className={error}>{el}</td> 
						//validate License states 
						case 7:
							return /[A-Z]{2}/.test(el) || /^[A-Za-z]+$/.test(el)
								? <td key={i}>{el}</td>
								: <td key={i} className={error}>{el}</td>
						//validate Expiration date
						case 8:
							const currentDate = Date.now();
							const expirationDate = Date.parse(el);
							return (regExpDateYMD.test(el) || regExpDateMDY.test(el)) && expirationDate > currentDate
								? <td key={i}>{el}</td>
								: <td key={i} className={error}>{el}</td>
						//validate License number
						case 9:
							return /^\w{6}$/.test(el)
							? <td key={i}>{el}</td>
							: <td key={i} className={error}>{el}</td>
						default:
							return ''
					}
				}), <td key={el.data.length}>{duplicateWith === -1 ? '' : duplicateWith + 1}</td>]}
			</tr>});
	}

	const table = (
		<table className={table_style}>
			<thead>
				<tr>{tableHeader}</tr>
			</thead>
			<tbody>
				{tableBody}
			</tbody>
		</table>
	)

	return fatalError ? <div className={error_message}>File format is not correct</div> : table;
}
export default Table;