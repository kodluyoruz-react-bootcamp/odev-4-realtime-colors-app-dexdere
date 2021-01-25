import './style.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { initSocket, disconnectSocket, sendColor, subscribeToColor } from './ServiceSocket';

function App() {
	useEffect(() => {
		initSocket();
		subscribeToColor((color) => setColor(color));

		return () => disconnectSocket();
	}, []);

	const onClickHandler = (e) => {
		e.preventDefault();
		sendColor(color);
	};

	const [color, setColor] = useState('green');
	const [hidden, setHidden] = useState(false);

	const pickerStyles = {
		default: {
			picker: {
				position: 'absolute',
				bottom: '53%',
				left: '44%',
			},
		},
	};
	return (
		<div style={{ background: color }} className="App">
			<div className="container">
				{hidden && (
					<SketchPicker
						styles={pickerStyles}
						color={color}
						onChange={(updatedColor) => setColor(updatedColor.hex)}
					/>
				)}
				<button onClick={() => setHidden(!hidden)}>
					{hidden ? 'Close Color Picker' : 'Open Color Picker'}{' '}
				</button>
				<button onClick={onClickHandler}> Change Color</button>
			</div>
		</div>
	);
}

export default App;
