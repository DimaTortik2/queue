import { Link } from '../router';
import { Button } from '../shared/button/button';
import { ErrorIcon } from '../shared/icons/404';
import { CenteredContent } from '../shared/layouts/_centered-content';
import classes from './404.module.css';

export default function ErrorPage() {
	return (
		<CenteredContent>
			<div className={classes.contentWrapper}>
				<ErrorIcon
					color='#ffffff20'
					w={(((window.innerWidth / 100) * window.innerHeight) / 100) * 1.3}
					h={(((window.innerWidth / 100) * window.innerHeight) / 100) * 1.3}
				/>
				<p>Что-то ты не туда пошел, Дорогой мой друг</p>
				<Link to={'/'}>
					<Button variant='red' className='text-xl py-2 px-4'
					>
						Давай на главную
					</Button>
				</Link>
			</div>
		</CenteredContent>
	);
}
