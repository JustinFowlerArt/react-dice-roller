import { useState } from 'react';

export const DieRoller = () => {
	const [dice, setDice] = useState({
		quantity: 1,
		sides: 6,
	});
	const [total, setTotal] = useState(1);
	const [rolls, setRolls] = useState<Array<number>>([]);

	const rollDice = () => {
		const results = [];
		let total = 0;
		for (let i = 0; i < dice.quantity; i++) {
			const roll = Math.ceil(Math.random() * dice.sides);
			results.push(roll);
			total += roll;
		}
		return { results, total };
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { results, total } = rollDice();
		setRolls(results);
		setTotal(total);
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		const input: number = parseFloat(value);
		setDice({ ...dice, [name]: input });
		setRolls([]);
	};

	return (
		<>
			<form
				className='flex flex-col items-center'
				onSubmit={e => handleSubmit(e)}
			>
				<div className='flex'>
					<div className='flex flex-col items-center'>
						<label htmlFor='diceQuantity'>Number of Dice</label>
						<input
							type='number'
							name='quantity'
							value={dice.quantity}
							onChange={e => handleChange(e)}
							className='border w-1/2'
						></input>
					</div>
					<div className='flex flex-col items-center'>
						<label htmlFor='diceSides'>Number of Sides</label>

						<select
							name='sides'
							value={dice.sides}
							onChange={e => handleChange(e)}
						>
							<option value={4}>4 sided</option>
							<option value={6}>6 sided</option>
							<option value={8}>8 sided</option>
							<option value={10}>10 sided</option>
							<option value={12}>12 sided</option>
							<option value={20}>20 sided</option>
						</select>
					</div>
				</div>
				<button type='submit' className='mt-6 bg-slate-200 w-12 rounded-md'>
					Roll
				</button>
			</form>
			<ul className='mt-6 border-2 w-40 min-h-[2rem]'>
				{rolls?.map((roll, index) => {
					if (dice.sides === 20) {
						if (roll === 20) {
							return (
								<li key={index} className='font-bold'>
									{roll} - Crit Success!
								</li>
							);
						} else if (roll === 1) {
							return (
								<li key={index} className='italic'>
									{roll} - Crit Fail!
								</li>
							);
						} else {
							return <li key={index}>{roll}</li>;
						}
					} else {
						if (roll === dice.sides) {
							return (
								<li key={index} className='font-bold'>
									{roll} - Max!
								</li>
							);
						} else {
							return <li key={index}>{roll}</li>;
						}
					}
				})}
			</ul>
			{rolls.length > 0 && dice.sides !== 20 && <p>Total: {total}</p>}
		</>
	);
};
