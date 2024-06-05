import Image from 'next/image';
import styles from './page.module.css';
import { Container } from 'react-bootstrap';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<Container fluid="md">Welcome to the weather react site.</Container>
		</>
	);
}
