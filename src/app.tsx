import { DieRoller } from './components/dieRoller';

export const App = () => {
	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-3xl font-bold underline'>React Dice Roller</h1>
			<DieRoller />
		</div>
	);
};
