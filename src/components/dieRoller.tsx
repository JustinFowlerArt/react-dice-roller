import { useState } from 'react';
import { Dice } from './dice';

interface iDice {
	id: number;
	quantity: number;
	sides: number;
}

export const DieRoller = () => {
	const [dice, setDice] = useState<Array<iDice>>([
		{
			id: 1,
			quantity: 1,
			sides: 6,
		},
	]);
	const [total, setTotal] = useState(1);
	const [rolls, setRolls] = useState<Array<iDice>>([]);

	const rollDice = () => {
		const results: iDice[] = [];
		let total = 0;
		for (let index = 0; index < dice.length; index++) {
			for (let i = 0; i < dice[index].quantity; i++) {
				const roll = Math.ceil(Math.random() * dice[index].sides);
				results.push({
					id: results.length + 1,
					quantity: roll,
					sides: dice[index].sides,
				});
				total += roll;
			}
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
			| React.ChangeEvent<HTMLSelectElement>,
		index: number
	) => {
		const { name, value } = e.target;
		const input: number = parseFloat(value);
		const updatedDice = [...dice];
		updatedDice[index][name as keyof iDice] = input;
		setDice(updatedDice);
		setRolls([]);
	};

	const handleAdd = () => {
		setDice([
			...dice,
			{
				id: dice.length + 1,
				quantity: 1,
				sides: 6,
			},
		]);
	};

	const handleRemove = (index: number) => {
		const updatedDice = [...dice];
		updatedDice.splice(index, 1);
		setDice(updatedDice);
	};

	return (
		<>
			<form
				className='flex flex-col items-center mt-4'
				onSubmit={e => handleSubmit(e)}
			>
				{dice.map((die, index) => {
					return (
						<Dice
							key={die.id}
							index={index}
							quantity={die.quantity}
							sides={die.sides}
							handleChange={handleChange}
							handleAdd={handleAdd}
							handleRemove={handleRemove}
						/>
					);
				})}
				<button
					type='submit'
					className='mt-6 bg-slate-700 text-white w-12 rounded-md'
				>
					Roll
				</button>
			</form>
			<ul className='mt-6 border-2 w-40 min-h-[2rem]'>
				{rolls?.map(roll => {
					if (roll.sides === 20) {
						if (roll.quantity === 20) {
							return (
								<li key={roll.id} className='font-bold'>
									d{roll.sides}: {roll.quantity} - Crit Success!
								</li>
							);
						} else if (roll.quantity === 1) {
							return (
								<li key={roll.id} className='italic'>
									d{roll.sides}: {roll.quantity} - Crit Fail!
								</li>
							);
						} else {
							return (
								<li key={roll.id}>
									d{roll.sides}: {roll.quantity}
								</li>
							);
						}
					} else {
						if (roll.quantity === roll.sides) {
							return (
								<li key={roll.id} className='font-bold'>
									d{roll.sides}: {roll.quantity} - Max!
								</li>
							);
						} else {
							return (
								<li key={roll.id}>
									d{roll.sides}: {roll.quantity}
								</li>
							);
						}
					}
				})}
			</ul>
			{rolls.length > 0 && <p>Total: {total}</p>}
		</>
	);
};
