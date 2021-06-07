/** @format */
import React, { useState, useEffect } from "react";
import "./App.css";
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from "./constants/constants";
import Airtable from "airtable";
import Goal from "./components/goal";
import styled from "styled-components";
import { GlobalStyle } from "./styles/Global.styles";

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

const StyledH1 = styled.h1`
	text-align: center;
	font-size: 4rem;
	margin: 1rem 0;
`;

function App() {
	const [goals, setGoals] = useState([]);
	const [updates, setUpdates] = useState([]);

	useEffect(() => {
		// fetch goals
		base("Goals")
			.select({ view: "Grid view" })
			.eachPage(
				function page(records, fetchNextPage) {
					setGoals(records);
					// console.log("records", records);

					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);
		// fetch Updates
		base("Updates")
			.select({
				view: "Grid view",
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setUpdates(records);
					// console.log("Updates", records);

					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);
	}, []);
	return (
		<>
			<GlobalStyle />
			<StyledH1>My Goals</StyledH1>
			{goals.map((goal) => (
				<Goal
					key={goal.id}
					goal={goal.fields}
					updates={updates.filter(
						(update) => update.fields.GoalID[0] === goal.id
					)}
				/>
			))}
		</>
	);
}

export default App;
