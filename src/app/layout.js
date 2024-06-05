import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from './_components/navigation';
import { Container } from 'react-bootstrap';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Weather site with react',
	description: 'Website created with react to display weather data',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Container fluid>
					<Navigation />
					{children}
				</Container>
			</body>
		</html>
	);
}
