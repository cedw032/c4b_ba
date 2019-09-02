import React, {useState, useEffect} from 'react';
import cx from 'classnames';

const Button = (props) => {
	const [clicked, setClicked] = useState(false);

	const clickDuration = 140;

	useEffect(() => {
		return () => {
			if (clicked) clearTimeout(clicked);		
		};
	}, [clicked]);

	return (

		<button {...props}
			onClick={(e) => {
				if (props.onClick) props.onClick();

				if (clicked) clearTimeout(clicked);

				setClicked(setTimeout(() => {
					setClicked(false);
				}, clickDuration));
			}}
			className={cx(
				props.className,
				clicked && 'clicked'
			)}/>
	);
};

export default Button;

