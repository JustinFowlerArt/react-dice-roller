interface Props {
	quantity: number;
	sides: number;
	index: number;
	handleChange: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>,
		index: number
	) => void;
	handleAdd: () => void;
	handleRemove: (index: number) => void;
}

export const Dice = ({
	index,
	quantity,
	sides,
	handleChange,
	handleAdd,
	handleRemove,
}: Props) => {
	return (
		<div className='grid grid-cols-12 w-80 items-center'>
			<div className='col-span-5 flex flex-col items-center'>
				<label htmlFor='diceQuantity'>Number of Dice</label>
				<input
					type='number'
					name='quantity'
					value={quantity}
					onChange={e => handleChange(e, index)}
					className='border w-1/2 text-center'
				></input>
			</div>
			<div className='col-span-5 flex flex-col items-center'>
				<label htmlFor='diceSides'>Number of Sides</label>

				<select
					name='sides'
					value={sides}
					onChange={e => handleChange(e, index)}
				>
					<option value={4}>4 sided</option>
					<option value={6}>6 sided</option>
					<option value={8}>8 sided</option>
					<option value={10}>10 sided</option>
					<option value={12}>12 sided</option>
					<option value={20}>20 sided</option>
				</select>
			</div>
			<div className='col-span-2 flex justify-center items-center text-xl aspect-square'>
				{index === 0 ? (
					<button
						type='button'
						onClick={handleAdd}
						className='h-8 w-8 bg-slate-700 text-white font-bold rounded-full '
					>
						+
					</button>
				) : (
					<button
						type='button'
						onClick={() => handleRemove(index)}
						className='h-8 w-8 bg-slate-200 font-bold rounded-full'
					>
						-
					</button>
				)}
			</div>
		</div>
	);
};
