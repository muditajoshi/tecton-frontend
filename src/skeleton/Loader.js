import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../css/loader.css';

const Loader = (props) => {
	return (
		<Spinner
			animation='border'
			role='status'
			variant='primary'
			className='loader'
			style={{display:props.val}}
			size="sm"
            
		/>
	);
};

export default Loader;
