import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './App.css';
import Card from './components/Card.js';
import Vehicles from './components/Vehicles.js';
import logo from './webmotors.svg';

const baseURL = 'http://desafioonline.webmotors.com.br/api/OnlineChallenge';

export default function App() {
	const [makes, setMakes] = useState([]);
	const [countMakes, setCountMakes] = useState(0);
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		let makeAr = [];
		await fetch(`${baseURL}/make`).then(
			response => response.json().then(data => {
				data.map(make => {
					makeAr.push({
						value: make.ID,
						label: make.Name,
						selected: false,
					});
					return makeAr;
				});	
			})
		);
		
		await makeAr.forEach(m => {
			let models = [];
			fetch(`${baseURL}/model?makeID=${m.value}`).then(
				response => response.json().then(mod => {
					mod.map(model => {	
						models.push({
							value: model.ID,
							label: model.Name
						})
						return models;
					});	
				})
			);

			m.models = models;
		}); 
		setMakes(makeAr);
	}, []);

	async function handleSelectMakes(v,o){
		const newMakes = await makes.map( make => {
			if(o.action === 'select-option' && make.value === o.option.value){
				setCountMakes(countMakes + 1);
				return { ...make, selected: !make.selected };
			}else if(o.action === 'remove-value' && make.value === o.removedValue.value){
				setCountMakes(countMakes - 1);
				return { ...make, selected: !make.selected }
			}else{
				return make;
			}
		});
		setMakes(newMakes);
	}

	function customTheme(theme){
		return {
			...theme,
			colors: {
				...theme.colors,
				primary25: '#f3123c',
				primary: '#ebebeb',
			}
		}
	}

	function handleCardMakes(make){
		return (make.selected && 
			<>
				<h2 className="labelMake">
					{make.label}
				</h2>
				<div className="Container">{
					make.models.map( model => {
						return <Card model={model} />
					})
				}</div>
			</>

		)
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} alt="logo" />
			</header>
			<div className="Selection">
				<h1>Líder do segmento!</h1>
				<Select 
					theme={customTheme}
					onChange={handleSelectMakes}
					options={makes}
					placeholder="Selecione uma marca"
					isSearchable
					isMulti
					autoFocus
				/>
			</div>
			
			{ countMakes > 0 &&
				makes.map( make => { 
					return <div className="ContainerRow">

						{ handleCardMakes(make) }
					</div>
				})
			}
			
			<Vehicles />				
		</div>
	);
};
