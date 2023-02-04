import { useRef, useState } from 'react';
import masterCard from '../../../assets/masterCard.svg'
import styles from './Card3dHover.module.scss';

const Card3dHover = () => {
	const [cardRotateX, setCardRotateX] = useState(0);
	const [cardRotateY, setCardRotateY] = useState(0);
	const [cardTransition, setCardTransition] = useState(
		'transform 0.5s ease-in-out'
	);
	const [offsetX, setOffsetX] = useState(0);
	const [offsetY, setOffsetY] = useState(0);
	const [highlightLeft, setHighlightLeft] = useState('-20%');
	const [highlightTop, setHighlightTop] = useState('-13%');
	const [highlightTransition, setHighlightTransition] = useState(
		'left 0.5s ease-in-out, top 0.5s ease-in-out'
	);
	const cardWrapper = useRef();

	const handleMouseOver = (e) => {
		// remove transition
		setCardTransition('none');
		setHighlightTransition('none');

		setOffsetX(e.nativeEvent.offsetX);
		setOffsetY(e.nativeEvent.offsetY);
		const { width, height } = cardWrapper.current.getBoundingClientRect();
		const halfWidth = width / 2;
		const halfHeight = height / 2;

		// calculate angle
		const rotationY = ((offsetX - halfWidth) / halfWidth) * 10;
		const rotationX = ((offsetY - halfHeight) / halfHeight) * 10;

		// setCardRotateY(halfHeight)
		setCardRotateY(rotationY);
		setCardRotateX(rotationX);

		// set rotation
		setHighlightLeft((rotationY / 10) * -30);
		setHighlightTop((rotationX / 10) * -30);
	};

	const handleMouseLeave = (e) => {
		setCardTransition('transform 0.5s ease-in-out');
		setCardRotateY(0);
		setCardRotateX(0);
		setHighlightTransition('left 0.5s ease-in-out, top 0.5s ease-in-out');

		// add default position back to highlight
		setHighlightLeft(-20);
		setHighlightTop(-13);
	};
	return (
		<div className={styles.container}>
			<div
				className={styles.cardWrapper}
				ref={cardWrapper}
				onMouseMove={handleMouseOver}
				onMouseLeave={handleMouseLeave}>
				<div
					className={styles.card}
					style={{
						transform: `rotateY(${cardRotateY}deg) rotateX(${cardRotateX}deg)`,
						transition: cardTransition,
					}}>
					<div className={styles.bg}>
						<img
							// src='https://www.logo.wine/a/logo/Mastercard/Mastercard-Logo.wine.svg'
							src={masterCard}
							alt='mastercard'
						/>
					</div>
					<div className={styles.cardName}>
						<p>VLADO CAVRIC</p>
					</div>
					<div className={styles.cardNumber}>
						<div className={styles.cardNumber__stars}>****</div>
						<div className={styles.cardNumber__stars}>****</div>
						<div className={styles.cardNumber__stars}>****</div>
						<div>1234</div>
					</div>
					<div
						className={styles.highlight}
						style={{
							left: `${highlightLeft}%`,
							top: `${highlightTop}%`,
							transition: highlightTransition,
						}}></div>
				</div>
			</div>
		</div>
	);
};

export default Card3dHover;
