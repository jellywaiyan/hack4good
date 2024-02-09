// Filename - components/Footer.js

import React from "react";
import {
	Box,
	FooterContainer,
	Row,
	Column,
	FooterLink,
	Heading,
} from "./FooterStyles";

const Footer = () => {
	return (
		<Box>
			<h1
				style={{
					color: "black",
					textAlign: "center",
					marginTop: "10px",
				}}
			>
				Find Your Cause, Become A Volunteer!
			</h1>
			<FooterContainer>
					<Column>
						<Heading>Contact Us</Heading>
						<FooterLink href="#">
							FaceBook
						</FooterLink>
						<FooterLink href="#">
							Email
						</FooterLink>
						<FooterLink href="#">
							Phone
						</FooterLink>
					</Column>
			</FooterContainer>
		</Box>
	);
};
export default Footer;
