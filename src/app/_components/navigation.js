'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Container, Nav, Navbar } from 'react-bootstrap';

export function Navigation() {
	const pathname = usePathname();

	return (
		<Navbar expand="lg" bg="dark" data-bs-theme="dark">
			<Container>
				<Navbar.Brand href="/">Weather React</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="weather-navbar">
					<Nav className="me-auto">
						<Nav.Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
							Home
						</Nav.Link>
						<Nav.Link className={`link ${pathname === '/weather' ? 'active' : ''}`} href="/weather">
							Weather
						</Nav.Link>
						{/* <Nav.Link className={`link ${pathname === '/weatherserver' ? 'active' : ''}`} href="/weatherserver">
							Weather Serverside
						</Nav.Link> */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
