import { useState, useEffect } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');

	useEffect(() => {
		// fetch(
		// 	'https://api.openweathermap.org/data/2.5/weather?q=Belgorod&lang=ru&units=metric&appid=81657edbd6844491d3e0746b5b118a0c',
		// )
		// 	.then((res) => res.json())
		// 	.then(({ name, main, weather }) => {
		// 		setCity(name);
		// 		setTemperature(Math.round(main.temp));
		// 		setWeather(weather[0].description);
		// 	});

		setCity('Белгород');
		setTemperature(Math.round(25.18));
		setWeather('ясно');
	}, []);

	return (
		<div className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{city},{' '}
					{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
				</div>
				<div>
					{temperature} градусов, {weather}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120px;
	width: 1000px;
	padding: 20px 40px;
	background-color: #fff;
	box-shadow: 0px 2px 17px #000;
	font-weight: bold;
`;
