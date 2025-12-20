import clsx from 'clsx';
import { Link } from '../router';
import { Button } from '../shared/button/button';
import { ErrorIcon } from '../shared/icons/404-icon';
import { CenteredContent } from '../shared/layouts/_centered-content';
import classes from './404.module.css';

export default function ErrorPage() {
	return (
		<CenteredContent>
			<div className={classes.contentWrapper}>
				<ErrorIcon color='#ffffff20' w={100} h={100} />
				<p className={classes.p}>Что-то ты не туда пошел, Дорогой мой друг</p>
				<Link to={'/'}>
					<Button
						variant='red'
						className={clsx('text-xl py-2 px-4', classes.button)}
					>
						Давай на главную
					</Button>
				</Link>
			</div>
		</CenteredContent>
	);
}
